<template>
  <div style="width: 100%; height: 100%">
    <fc-designer ref="designer" />
    <div style="position: fixed; top: 10px; left: 100px; z-index: 999" @click="jsons">获取json</div>
  </div>
</template>

<script>
  import checkbox from '../components/formComponent/checkbox';
  import table from '../components/formComponent/table';
  import tableColumn from '../components/formComponent/el-table-column';
  import tab from '../components/formComponent/tab';
  import tabPane from '../components/formComponent/tabPane'
  import collapse from '../components/formComponent/collapse'
  import collapseItem from '../components/formComponent/collapse-item'
export default {
  name: 'Index',
  data() {
    return {}
  },
  mounted() {
    this.$refs.designer.addComponent(tableColumn);
    //插入组件规则
    this.$refs.designer.addComponent(checkbox);
    this.$refs.designer.addComponent(tab);
    this.$refs.designer.addComponent(tabPane);
    this.$refs.designer.addComponent(table);
    this.$refs.designer.addComponent(collapse);
    this.$refs.designer.addComponent(collapseItem);
    //插入拖拽按钮到`main`分类下
    this.$refs.designer.appendMenuItem('main', {
      icon: checkbox.icon,
      name: checkbox.name,
      label: checkbox.label
    })
    this.$refs.designer.appendMenuItem('main', {
      icon: tableColumn.icon,
      name: tableColumn.name,
      label: tableColumn.label
    })
    //插入拖拽按钮到`main`分类下
    this.$refs.designer.appendMenuItem('main', {
      icon: table.icon,
      name: table.name,
      label: table.label
    })
    this.$refs.designer.appendMenuItem('main', {
      icon: tab.icon,
      name: tab.name,
      label: tab.label
    })
    this.$refs.designer.appendMenuItem('main', {
      icon: tabPane.icon,
      name: tabPane.name,
      label: tabPane.label
    })
    this.$refs.designer.appendMenuItem('main', {
      icon: collapse.icon,
      name: collapse.name,
      label: collapse.label
    })
    this.$refs.designer.appendMenuItem('main', {
      icon: collapseItem.icon,
      name: collapseItem.name,
      label: collapseItem.label
    })
  },
  methods: {
    jsons() {
      let data = JSON.parse(this.$refs.designer.getRule());
      console.log(data);
    }
  }
}
</script>

<style scoped>

</style>
