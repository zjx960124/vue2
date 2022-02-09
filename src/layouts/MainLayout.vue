<template>
  <div class="main-layout-view">
    <section>
      <Tabbar />
    </section>
    <section class="main-layout-main">
      <RouterViewLayout />
      <div class="alive"></div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'MainLayout'
}
</script>

<style lang="scss" scoped>
.main-layout-view {
  flex: 1700;
  width: 0;
  display: flex;
  flex-direction: column;
  .main-layout-main {
    width: 100%;
    height: calc(100% - 88px);
    background: #f6f6fa;
    box-sizing: border-box;
    padding: 3px 30px 40px;
    position: relative;
    display: flex;
    flex-direction: column;
    .alive {
      position: absolute;
      width: calc(100% - 2px);
      height: 38px;
      background: #ffffff;
      left: 0;
      bottom: 0;
      border: 1px solid #ecedf6;
    }
  }
}
</style>
