<template>
  <div
    class="jsTree"
    @contextmenu.prevent="handleRightClick($event, null, null, null)"
  >
    <div
      v-if="hasRightMenu && showRightMenu"
      id="perTreeMenu"
      class="tree_menu"
      :style="{ ...rightMenu }"
    >
      <ul
        v-for="(item, index) in rightMenuList"
        id="menu"
        ref="menu"
        :key="index"
        class="right-menu"
      >
        <li
          v-if="!item.hidden"
          class="menu-item"
          @click.stop="handleMenu(item.name)"
        >
          <i :class="item.icon" /> {{ item.name }}
        </li>
      </ul>
    </div>
    <div v-if="title">
      <div class="tree-title">
        <i v-if="icon" :class="icon" />
        <img v-else-if="iconSrc" :src="iconSrc">
        <span>{{ title }}</span>
      </div>
    </div>
    <div v-if="showSearch" class="js-search">
      <el-input
        v-model="filterText"
        placeholder="请输入"
        size="mini"
        clearable
        class="input-with-select"
      >
        <i
          slot="suffix"
          class="el-icon-search el-input__icon"
        /></el-input>
    </div>
    <div class="operation-header">
      <slot name="operationHeader" />
    </div>
    <el-tree
      ref="tree"
      class="filter-tree"
      :load="lzLoad"
      :node-key="nodeKey"
      :lazy="lazy"
      :data="data"
      :highlight-current="highlightCurrent"
      :default-expand-all="expandAll"
      :props="props"
      :check-strictly="checkStrictly"
      :show-checkbox="showCheckbox"
      :current-node-key="currentNodeKey"
      :filter-node-method="filterNode"
      :default-expanded-keys="defaultExpandedKeys"
      :default-checked-keys="defaultCheckedKeys"
      :expand-on-click-node="expandOnClickNode"
      @node-click="handleNodeClick"
      @node-contextmenu="handleRightClick"
      @check-change="handleCheckChange"
    >
      <template slot-scope="{ node, data }">
        <template v-if="!showSlot && node.label">
          <div
            class="custom-tree-node"
            @mouseenter="mouseenter(data)"
            @mouseleave="mouseleave(data)"
          >
            <div class="content">
              <i
                v-if="data.icon && data.icon.includes('el-icon')"
                :class="data.icon"
              />
              <el-image
                v-if="
                  data.icon &&
                    !node.isCurrent &&
                    (data.icon.includes('http://') ||
                      data.icon.includes('https://') ||
                      data.icon.includes('data:'))
                "
                class="node-image"
                :src="data.icon"
              />
              <el-image
                v-else-if="data.selectedIcon && node.isCurrent"
                class="node-image"
                :src="data.selectedIcon"
              />
              <el-tooltip
                v-if="showTooltip && node.label.length > 16"
                class="item"
                effect="dark"
                :content="node.label"
                placement="top-start"
              >
                <span> {{ node.label | ellipsis(13, 4) }} </span>
              </el-tooltip>
              <span v-else> {{ node.label }} </span>
            </div>
            <span v-show="data.show" class="lst-operation">
              <slot name="operation" :$index="node.$index" :data="data" />
            </span>
          </div>
        </template>
        <slot v-else name="node" :node="node" :data="data" />
      </template>
    </el-tree>
  </div>
</template>
<script>
export default {
  name: 'JsTree',
  props: {
    /* 树形绑定的key*/
    nodeKey: {
      type: String,
      default: 'id'
    },
    /* 数据*/
    data: {
      type: Array,
      default: () => []
    },
    /* 标题*/
    title: {
      type: String,
      default: ''
    },
    /* 标题的图标*/
    icon: {
      type: String,
      default: ''
    },
    /* 标题的图片*/
    iconSrc: {
      type: String,
      default: ''
    },
    /* 懒加载的方法*/
    lzLoad: {
      type: Function,
      default: null
    },
    filterNodeMethod: {
      type: Function,
      default: null
    },
    highlightCurrent: {
      type: Boolean,
      default: true
    },
    expandAll: {
      type: Boolean,
      default: true
    },
    /* 懒加载子节点 */
    lazy: {
      type: Boolean,
      default: false
    },
    props: {
      type: Object,
      default: {
        children: 'children',
        label: 'label'
      }
    },
    /* 启用右击菜单展示 */
    hasRightMenu: {
      type: Boolean,
      default: false
    },
    /* 树形控件右击节点菜单列表 */
    rightMenuList: {
      type: Array,
      default: () => []
    },
    /* 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。 */
    expandOnClickNode: {
      type: Boolean,
      default: false
    },
    /* 搜索框 */
    showSearch: {
      type: Boolean,
      default: true
    },
    /* 槽的展示 */
    showSlot: {
      type: Boolean,
      default: false
    },
    /*  默认展开的节点的 key 的数组 */
    defaultExpandedKeys: {
      type: Array,
      default: () => []
    },
    /* 默认勾选的节点的 key 的数组 */
    defaultCheckedKeys: {
      type: Array,
      default: () => []
    },
    /* 当前选中的节点 */
    currentNodeKey: { type: [String, Number], default: '' },
    /* 提示展示 */
    showTooltip: {
      type: Boolean,
      default: true
    },
    /* 节点是否可被选择 */
    showCheckbox: {
      type: Boolean,
      default: false
    },
    /* 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false */
    checkStrictly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      filterText: '',
      showRightMenu: false,
      rightMenu: null
    }
  },
  watch: {
    /* 搜索*/
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    mouseenter(data) {
      this.$set(data, 'show', true)
    },
    mouseleave(data) {
      this.$set(data, 'show', false)
    },
    /* 节点点击事件*/
    handleNodeClick(data, vNode, component) {
      this.$emit('node-click', data, vNode, component)
    },
    /**
     *
     * @param value
     * @param data
     */
    filterNode(value, data) {
      if (value) {
        return data[this.props.label].indexOf(value) !== -1
      }

      if (this.filterNodeMethod) {
        return this.filterNodeMethod(data)
      }

      return true
    },
    /**
     * 更新子集
     * @param {String|Number} key 树形主键
     * @param {String|Number} data 子集数据
     */
    updateKeyChildren(key, data) {
      this.$refs.tree.updateKeyChildren(key, data)
    },

    /**
     * 若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点所组成的数组
     * @param {Boolean} leafOnly 是否只是叶子节点，默认值为 false
     * @param {Boolean} includeHalfChecked 是否包含半选节点，默认值为 false
     */
    getCheckedNodes(leafOnly = false, includeHalfChecked = false) {
      return this.$refs.tree.getCheckedNodes(leafOnly, includeHalfChecked)
    },
    getCurrentNode() {
      return this.$refs.tree.getCurrentNode()
    },
    /**
     * 若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点的 key 所组成的数组
     * @param {Boolean} leafOnly 接收一个 boolean 类型的参数，若为 true 则仅返回被选中的叶子节点的 keys，默认值为 false
     */
    getCheckedKeys(leafOnly = false) {
      return this.$refs.tree.getCheckedKeys(leafOnly)
    },
    /** 右击菜单展示 */
    handleRightClick(event, data, node, obj) {
      this.contextmenuEvent = event
      this.contextmenuData = data
      this.contextmenuNode = node
      this.contextmenuObj = obj
      this.rightMenu = { top: event.pageY + 'px', left: event.pageX + 'px' }
      this.showRightMenu = true
      const self = this
      document.onclick = function (ev) {
        if (ev.target !== document.getElementById('perTreeMenu')) {
          self.showRightMenu = false
        }
      }
      this.$emit('rightClick', event, data, node, obj)
    },
    /** 右击菜单的点击事件 */
    handleMenu(name) {
      this.showRightMenu = false
      this.$emit(
        'rightMenuClick',
        name,
        this.contextmenuEvent,
        this.contextmenuData,
        this.contextmenuNode,
        this.contextmenuObj
      )
    },
    /** 节点选中状态发生变化时的回调*/
    handleCheckChange(data, checked, indeterminate) {
      this.$emit('check-change', data, checked, indeterminate)
    },
    /** 通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性 */
    setCurrentKey(key) {
      this.$refs.tree.setCurrentKey(key)
    },
    /** 根据 data 或者 key 拿到 Tree 组件中的 node */
    getNode(key) {
      const node = this.$refs.tree.getNode(key)
      return node
    },
    /**  删除 Tree 中的一个节点，使用此方法必须设置 node-key 属性 */
    remove(key) {
      const node = this.$refs.tree.getNode(key)
      this.$refs.tree.remove(node)
    },
    /**  通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性 */
    setCheckedKeys(key) {
      this.$refs.tree.setCheckedKeys(key)
    },
    /**  通过 key / data 设置某个节点的勾选状态，使用此方法必须设置 node-key 属性 */
    setChecked(key) {
      this.$refs.tree.setChecked(key)
    }
  }
}
</script>
<style lang="scss">
.jsTree {
  width: 100%;
}

.tree-title {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  height: 56px;
  text-align: center;
  background-color: #e5e5e5;
  span {
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 72px;
    letter-spacing: 0px;
    color: #333333;
  }
}

.js-search {
  margin-bottom: 10px;
  padding: 0;
}

.el-tree-node {
  padding: 3px 0;
  font-size: 14px;
}

.filter-tree {
  padding: 0;
  .node-image {
    margin-right: 6px;
    width: 14px;
    height: auto;
    line-height: 1;
  }
}

.tree_menu {
  position: fixed;
  display: block;
  z-index: 20000;
  background-color: #fff;
  padding: 5px 0;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  ul {
    margin: 0;
    padding: 0;
  }
  ul li {
    list-style: none;
    margin: 0;
    padding: 0 30px;
    font-size: 14px;
    line-height: 30px;
    cursor: pointer;
    i {
      margin-right: 5px;
    }
  }
  ul li:hover {
    background-color: #ebeef5;
  }
}

.custom-tree-node {
  display: inline-block;
  // position: relative;
  width: 100%;
  height: 100%;
  .content {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .lst-operation {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 8px;
    background: rgba(255, 255, 255, 0.8);
    z-index: 99;
    .el-button + .el-button {
      margin-left: 8px;
    }
    .el-button i {
      color: #409eff;
    }
  }
}
.el-tree--highlight-current
  .el-tree-node.is-current
  .custom-tree-node
  .lst-operation
  .el-button
  i {
  color: #409eff;
}

.operation-header {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 0;
  padding: 0 10px;
  background-color: #f5f7fa;
  // border-bottom: 1px solid #f5f5f5;
  .el-button i {
    color: #333333;
  }
}
</style>
