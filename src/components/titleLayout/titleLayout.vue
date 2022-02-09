<template>
  <div class="title-layout">
    <div class="header">{{ title }}</div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'TitleLayout',
  props: {
    title: String
  },
  data() {
    return {}
  },
  mounted() { },
  methods: {},
}
</script>

<style lang="scss" scoped>
.title-layout {
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
  padding: 0 30px;
  background: #ffffff;
  .header {
    font-size: 14px;
    color: #9c9ab4;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ebebf5;
  }
}
</style>
