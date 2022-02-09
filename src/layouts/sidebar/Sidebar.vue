<template>
  <div class="side-bar-view">
    <Logo />
    <SidebarMenu />
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
}
</script>

<style lang="scss" scoped>
.side-bar-view {
  flex: 220;
  width: 0;
  background: #fefefe;
  z-index: 3;
  box-shadow: 0px 1px 5px 0px rgba(163, 161, 186, 0.22);
}
</style>
