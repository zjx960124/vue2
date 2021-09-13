<!--
*  添加新增节点按钮
-->
<script>
/* eslint-disable no-unused-vars */
import "./addBox.less";
import { NextNode } from "@/components/DrawFlow/src/components/DrawAddSelectBox/NextNode";
import { HashCode } from "../../utils";
export default {
  name: "AddBox",
  props: {
    nodeConfig: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      boxArr: [
        {
          nodeType: "2",
          value: "审批人",
          isRow: true,
          className: "approver",
          icon: "flow-approver",
        },
        {
          nodeType: "4",
          value: "抄送人",
          isRow: true,
          className: "copyer",
          icon: "flow-cc",
        },
        {
          nodeType: "5",
          value: "办理人",
          isRow: true,
          className: "handler",
          icon: "flow-handler",
        },
        {
          nodeType: "3",
          value: "条件分支",
          isRow: false,
          className: "route",
          icon: "flow-condition",
        },
      ],
    };
  },
  methods: {
    clickSelectBox(item) {
      this.getNextNode(item);
    },
    getNextNode(item) {
      const nodeConfig = this.nodeConfig;
      let { nodeId, nodeType, isRow } = Object.assign(nodeConfig, item);
      let nextNode = new NextNode({
        nodeId,
        nodeType,
        isRow,
      });
      this.$emit("clickSelectBox", nextNode);
    },
    renderAddSNode() {
      return (
        <div class="add-node-popover">
          <div class="add-node-popover-body">
            {this.boxArr.map((item) => {
              return (
                <a
                  onClick={() => {
                    this.clickSelectBox(item);
                  }}
                  class={["add-node-popover-item", item.className]}
                >
                  <div class="item-wrapper">
                    <svg-icon class="iconfont" icon-class={item.icon} />
                  </div>
                  <span>{item.value}</span>
                </a>
              );
            })}
          </div>
        </div>
      );
    },
  },
  render() {
    return this.renderAddSNode();
  },
};
</script>
