<template>
  <section class="app-main">
    <sidebar v-if="!currentRoutes.hideSidebar" class="sidebar-container" />
    <fold-button
      v-if="!currentRoutes.hideSidebar"
      :is-active="sidebar.opened"
      class="fold-button"
      @toggleClick="toggleSideBar"
    />
    <section class="content-container">
      <breadcrumb
        v-if="!currentRoutes.hideBreadcrumb"
        class="breadcrumb-container"
      />
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </section>
  </section>
</template>

<script>
import { Sidebar } from './index'
import Breadcrumb from '@/components/Breadcrumb'
import FoldButton from '@/components/FoldButton'
import { mapGetters } from 'vuex'

export default {
  name: 'AppMain',
  components: {
    Breadcrumb,
    Sidebar,
    FoldButton
  },
  computed: {
    ...mapGetters(['sidebar']),
    key() {
      return this.$route.path
    },
    currentRoutes() {
      return this.$store.state.user.currentRoutes
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  position: relative;
  min-height: calc(100vh - 50px);
  width: 100%;
  overflow: hidden;
}
.content-container {
  width: 100%;
  overflow: auto;
}
.fixed-header + .app-main {
  padding-top: 60px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}

.fold-button {
  position: absolute;
  top: 50%;
  left: 0;
  width: 20px;
  height: auto;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;
  background: rgba($color: #ffffff, $alpha: 0.3);

  .foldBttonSvg:hover {
    opacity: 0.8;
  }
}
</style>
