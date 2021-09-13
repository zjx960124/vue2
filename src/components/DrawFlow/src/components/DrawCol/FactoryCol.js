/**
 * col节点工厂
 */
import drawFlow from "../factory";

import "./layout.less";
function branchBoxRender(h, nodeArr) {
  let title = "添加条件";

  const colNodeArr = nodeArr.conditionNodes;
  return (
    <div class="branch-wrap">
      <div class="branch-box-wrap">
        <div class="branch-box">
          <button onClick={() => this.addBranch(colNodeArr)} class="add-branch">
            {title}
          </button>
          {colBoxRender.bind(this, h, colNodeArr)()}
        </div>
        <add-node-btn
          {...{
            props: { belongToNode: nodeArr },
            on: { clickSelectBox: this.clickSelectBox }
          }}
        ></add-node-btn>
      </div>
    </div>
  );
}
/**
 * col-box
 */
function colBoxRender(h, colNodeArr) {
  return colNodeArr.map((item, idx) => {
    switch (idx) {
      case 0:
        return (
          <div class="col-box">
            <div class="top-left-cover-line"></div>
            <div class="bottom-left-cover-line"></div>
            {conditionNodeRender.bind(this, h, item)()}
          </div>
        );
      case colNodeArr.length - 1:
        return (
          <div class="col-box">
            {conditionNodeRender.bind(this, h, item)()}
            <div class="top-right-cover-line"></div>
            <div class="bottom-right-cover-line"></div>
          </div>
        );
      default:
        return (
          <div class="col-box">{conditionNodeRender.bind(this, h, item)()}</div>
        );
    }
  });
}

function closeNode(event, node) {
  event.stopPropagation();
  this.closeNode(node);
}

function conditionNodeRender(h, node) {
  const judegeNode = { ...node };
  let tep = [];
  tep.push(
    <div class="condition-node">
      <div class="condition-node-box">
        <div
          class="auto-judge node_e27d_5719"
          onClick={() => {
            this.clickNode(node);
          }}
        >
          <div class="sort-left"></div>
          <div class="title-wrapper">
            <span class="editable-title">{judegeNode.nodeName}</span>
             <i class="anticon anticon-close close el-icon-close"
                onClick={event => {
                  closeNode.bind(this, event, node)();
                }}>
            </i>
            <span class="priority-title">
                {`优先级${judegeNode.priority || ''}`}
            </span>
          </div>
          <div class="content"
	 		  {...{
	             domProps: {
			        title: judegeNode.content
			     },
	          }}
	      >{judegeNode.content || "请选择条件"}</div>
        </div>
        <add-node-btn
          {...{
            props: { belongToNode: judegeNode },
            on: { clickSelectBox: this.clickSelectBox }
          }}
        ></add-node-btn>
      </div>
    </div>
  );

  if (node.childNode) {
    let el = drawFlow.getFactory.bind(this, h, node.childNode)();
    tep.push(el);
  }
  // let el = drawFlow.getFactory.bind(this, h, node)();
  // tep.push(el);
  return tep;
}
export default {
  branchBoxRender
};
