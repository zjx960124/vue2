<template>
  <div class="sidebar">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";
import Hamburger from "@/components/Hamburger";

export default {
  components: { SidebarItem, Hamburger },
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      return this.$store.state.user.currentRoutes.children;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
  },
};
</script>

<style lang="scss">
.hamburger-container {
  height: 100%;
  height: 48px;
  text-align: right;
  line-height: 48px;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;
  border-top: 1px solid #f0f2f5;
  background: #fff;

  .hamburger:hover {
    opacity: 0.8;
  }
}

.menu-image {
  margin-right: 12px;
  width: 1em;
  height: 1em;
}
</style>
