<template>
  <el-form></el-form>
</template>

<script>
  export default {
    name: "formRender",
    props: {
      columns: {
        type: Array,
        default: () => [
          {
            "chinaName": "", // 字段中文名
            "columnName": "", // 字段名
            "commentType": 0, // 控件类型
            "createTime": "",
            "dataType": "",
            "id": 0,
            "ifEdit": 0, // 是否唯一
            "tableId": 0,
            "updateTime": ""
          }
        ]
      }
    },
    data() {
      return {
        commentList: {
          1: 'input',
          2: 'select',
          3: 'date'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
