<!--
*  生成流程绘制 基本节点(审批 抄送)组装逻辑
*  组装
-->
<script>
import AddNodeBtn from "@/components/DrawFlow/src/components/AddNodeBtn";
import FlowNode from "@/components/DrawFlow/src/components/DrawRow/FlowNode";
import RowFactory from "@/components/DrawFlow/src/components/DrawRow/FactoryRow";

import {
  RowNode,
  ConditionNode,
  CopyNode,
} from "./components/NodeConfigFactory/NodeFactory";
import FlowFactory from "./components/factory";
import { HashCode, transToTreeDat } from "./utils";

export default {
  name: "FactoryDrawFlow",
  components: {
    AddNodeBtn,
    FlowNode,
  },
  created() {
    this.init();
  },
  props: {
    FlowConfig: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  watch: {
    FlowConfig: {
      handler() {
        this.init();
      },
      deep: true,
    },
  },
  data() {
    return {
      selfConfig: [],
      currentNode: {},
      //缓存数据
      cacheData: [],
    };
  },
  methods: {
    // 初始化数据
    init() {
      try {
        if (this.FlowConfig.length > 0) {
          this.selfConfig = JSON.parse(JSON.stringify(this.FlowConfig));
        }
      } catch (error) {
        console.warn(error);
      }
    },
    // 节点数据变化事件
    nodeChange(node) {
      this.currentNode = node;
      this.selfConfig = this.selfConfig.map((item) => {
        var newItem = item;
        if (item.nodeId === node.nodeId) {
          newItem = node;
        }
        return newItem;
      });
      this.$forceUpdate();
    },
    /**
     * 添加条件框
     */
    addBranch(node) {
      let newNode = new CopyNode(node[0]);
      this.selfConfig = this.selfConfig.concat([newNode]);
    },
    /**
     * 获取传参数据结构
     */
    getResData() {
      let list = [];
      try {
        list = JSON.parse(JSON.stringify(this.selfConfig));
      } catch (error) {
        console.log(error);
      }
      this.transformTree(list);
      list.forEach((i) => {
        if (i.isRow) {
          delete i.childNode;
        }
      });
      return list;
    },
    /**
     *  @param data  源数组一维数组
     *  @requires  tree 二维数组
     */
    transformTree(data) {
      return transToTreeDat(data);
    },
    clickSelectBox(nextNode) {
      let { node, selfConfig } = this.getNodeFactory(nextNode);
      this.selfConfig = selfConfig.concat(node);
    },
    /**
     * 根据isRow去判断row或者rol
     */
    getNodeFactory(nextNode) {
      if (!nextNode.isRow) {
        let { node, selfConfig } = this.getColNode(nextNode);
        return { node, selfConfig };
      } else {
        let { node, selfConfig } = this.getRowNode(nextNode);
        return { node, selfConfig };
      }
    },
    /**
     * 获取row节点
     */
    getRowNode(nextNode) {
      let node = [new RowNode(nextNode)];
      let selfConfig = this.repickArr(node[0]);
      return { node, selfConfig };
    },
    /**
     * 获取col节点
     */
    getColNode(nextNode) {
      let groupId = HashCode();
      let node = [
        new ConditionNode({ groupId, ...nextNode }),
        new ConditionNode({ groupId, ...nextNode }),
      ];
      let repickConfig = {
        groupId: node[0].groupPid,
        nodeId: node[0].nodeId,
      };
      let selfConfig = this.repickArr(repickConfig);
      this.locationScroll();
      return { node, selfConfig };
    },
    /**
     * 定位滚动条
     */
    locationScroll() {
      // window.location.hash = ".bottom-right-cover-line";
      let el = document.getElementsByClassName("dingflow-design")[0];
      setTimeout(() => {
        el.scrollLeft = el.scrollWidth - el.clientWidth + 340;
      }, 0);
    },
    /**
     * 重定位数组
     */
    repickArr(repickConfig) {
      let selfConfig = [];
      try {
        selfConfig = JSON.parse(JSON.stringify(this.selfConfig));
      } catch (error) {
        console.warn(error);
      }

      selfConfig.forEach((i) => {
        if (i.isRow) {
          if (i.groupId === repickConfig.groupId) {
            i.groupId = repickConfig.nodeId;
          }
        } else {
          if (i.groupPid === repickConfig.groupId) {
            i.groupPid = repickConfig.nodeId;
          }
        }
      });
      return selfConfig;
    },
    // 点击节点
    clickNode(nodeConfig) {
      this.currentNode = nodeConfig;
      this.$emit("clickNode", nodeConfig);
    },
    //点击关闭节点
    closeNode(node) {
      let repickConfig = {};
      if (node.isRow) {
        repickConfig.groupId = node.groupId;
        repickConfig.nodeId = node.nodeId;
        let selfConfig = JSON.parse(JSON.stringify(this.selfConfig));
        this.selfConfig = this.deleteNode(selfConfig, node);
        this.repickDeleteArr(repickConfig);
      } else {
        this.deleteColNode(node);
      }
    },
    // 删除节点
    deleteNode(selfConfig, node) {
      selfConfig = selfConfig
        .map((i) => i.nodeId !== node.nodeId && i)
        .filter(Boolean);
      return selfConfig;
    },
    //单独删除col下node
    deleteColNode(node) {
      let selfConfig = JSON.parse(JSON.stringify(this.selfConfig));
      let nodeArr = selfConfig.filter(
        (i) => i.groupId === node.groupId && !i.isRow
      );
      let deleteArr = [];
      let repickConfig;
      if (nodeArr.length > 2) {
        //递归删除所有关联子节点
        deleteArr = [node];
        this.deleteLoop(selfConfig, node, deleteArr);
        repickConfig = {
          nodeId: node.nodeId,
          groupId: node.groupId,
        };
      } else {
        //删除整个group
        let allCol = selfConfig
          .map((i) => i.groupId === node.groupId && !i.isRow && i)
          .filter(Boolean);
        deleteArr = allCol;
        allCol.forEach((i) => {
          this.deleteLoop(selfConfig, i, deleteArr);
        });
        repickConfig = {
          nodeId: node.groupId,
          groupId: node.groupPid,
        };
      }
      deleteArr.forEach((i) => {
        selfConfig = this.deleteNode(selfConfig, i);
      });
      this.selfConfig = selfConfig;
      this.repickDeleteArr(repickConfig);
      return selfConfig;
    },
    // 循环遍历删除组下关联节点
    deleteLoop(selfConfig, node, deleteArr) {
      let currentDeleteArr = selfConfig.filter((i) => {
        if (i.isRow) {
          return i.groupId === node.nodeId;
        } else {
          return i.groupPid === node.nodeId;
        }
      });
      if (currentDeleteArr.length) {
        currentDeleteArr.forEach((i) => {
          deleteArr.push(i);
          this.deleteLoop(selfConfig, i, deleteArr);
        });
      } else {
        return;
      }
    },
    //判断是否是row
    judgeNodeIsRow(node) {
      return node.isRow;
    },
    //删除后重组数组
    repickDeleteArr(repickConfig) {
      let selfConfig = [];
      try {
        selfConfig = JSON.parse(JSON.stringify(this.selfConfig));
      } catch (error) {
        console.warn(error);
      }
      selfConfig.forEach((i) => {
        if (i.isRow && i.groupId === repickConfig.nodeId) {
          i.groupId = repickConfig.groupId;
        } else if (!i.isRow && i.groupPid === repickConfig.nodeId) {
          i.groupPid = repickConfig.groupId;
        }
      });
      this.selfConfig = selfConfig;
    },
    //绘制body
    drawBody(h, node) {
      if (node && node.childNode) {
        return FlowFactory.getFactory.bind(this, h, node.childNode)();
      } else {
        return <div></div>;
      }
    },
  },
  render(h) {
    let FlowConfig = [];
    try {
      FlowConfig = JSON.parse(JSON.stringify(this.selfConfig));
    } catch (error) {
      console.warn(error);
    }
    FlowConfig = this.transformTree(FlowConfig);
    this.cacheData = FlowConfig;
    let root = [];
    try {
      root = JSON.parse(JSON.stringify(this.selfConfig[0]));
    } catch (error) {
      console.warn(error);
    }

    return (
      <div class="design-engine">
        <div class="dingflow-design">
          <div class="ie-polyfill-container">
            <div class="box-scale" id="box-scale">
              {RowFactory.nodeWrapRender.bind(this, h, root)()}
              {this.drawBody(h, FlowConfig[0])}
              <div class="end-node">
                <div class="end-node-circle"></div>
                <div class="end-node-text">流程结束</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
</script>

<style scoped lang="less">
.design-engine {
  position: relative;
  height: 100%;
  .dingflow-design {
    width: 100%;
    // background-color: #f5f5f7;
    overflow: auto;
    // height: 100%;
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    /deep/ .ant-popover-arrow {
      display: none !important;
    }
    .ie-polyfill-container {
      display: -ms-grid;
      -ms-grid-columns: min-content;
      .box-scale {
        transform: scale(1);
        display: inline-block;
        position: relative;
        width: 100%;
        padding: 54.5px 0;
        -webkit-box-align: start;
        -ms-flex-align: start;
        align-items: flex-start;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        min-width: -webkit-min-content;
        min-width: -moz-min-content;
        min-width: min-content;
        // background-color: #f5f5f7;
        -webkit-transform-origin: 0 0 0;
        transform-origin: 50% 0px 0px;
        .end-node {
          border-radius: 50%;
          font-size: 14px;
          color: rgba(25, 31, 37, 0.4);
          text-align: left;
          .end-node-circle {
            width: 10px;
            height: 10px;
            margin: auto;
            border-radius: 50%;
            background: #dbdcdc;
          }
          .end-node-text {
            margin-top: 5px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
