<template>
  <div class="view-layout">
    <Sidebar />
    <MainLayout />
  </div>
</template>

<script>
import state from './store'
export default {
  name: 'Layout',
  created() {
  }
}
</script>

<style lang="scss" scoped>
.view-layout {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  display: flex;
  background: #ffffff;
}
</style>
