/* eslint-disable no-unused-vars */
/**
 *  各种节点类
 */
import {
    HashCode
} from "../../utils";
export class Node {
    nodeId;
    nodeType;
    childNode;
    nodeName = "标题";
    content = "请选择";
    conditionNodes;
    constructor({
        nodeId,
        nodeType,
        isRow
    }) {
        if (nodeType === "2") {
            this.nodeName = "审批人";
        } else if (nodeType === "4") {
            this.nodeName = "抄送人";
        } else if (nodeType === "5") {
            this.nodeName = "办理人";
        }
        this.nodeId = HashCode();
        this.groupId = nodeId;
        this.nodeType = nodeType;
        this.isRow = isRow;
    }
}
export class ConditionNode {
    nodeName = "条件";
    data = {};
    constructor({
        groupId,
        nodeType,
        nodeId,
        isRow
    }) {
        this.nodeId = HashCode();
        this.groupId = groupId;
        this.nodeType = nodeType;
        this.content = "请选择条件";
        this.groupPid = nodeId;
        this.isRow = isRow;
    }
}
export class RowNode extends Node {
    data = {};
    constructor({
        nodeId,
        nodeType,
        isRow,
        nodeName
    }) {
        super({
            nodeId,
            nodeType,
            isRow,
            nodeName
        });
    }
}
export class CopyNode {
    nodeName = "标题";
    nodeId = HashCode();
    content = "请选择";
    data = {};
    constructor({
        nodeId,
        childNode,
        ...node
    }) {
        return Object.assign(node, this);
    }
}
