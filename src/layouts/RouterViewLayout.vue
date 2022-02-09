<template>
  <div class="router-view-layout">
    <Tabs />
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  import store from './store/index'
  export default {
    name: 'RouterViewLayout',
    data() {
      return {
        state: store.state
      }
    },
    computed: {
      cachedViews() {
        return this.state.cachedView
      },
      key() {
        return this.$route.fullPath
      }
    }
  }
</script>

<style lang="scss" scoped>
  .router-view-layout {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 0;
  }
</style>
