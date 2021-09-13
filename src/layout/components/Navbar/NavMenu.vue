<template>
  <div class="navMenu">
    <el-menu
      :default-active="activeMenu"
      :background-color="variables.navMenuBg"
      :text-color="variables.navMenuText"
      mode="horizontal"
      @select="handleSelect"
    >
      <div v-for="item in routes" :key="item.path" class="nav-item">
        <app-link :to="resolvePath(item)">
          <el-menu-item v-if="!item.hidden" :index="item.path">{{
            item.meta
              ? item.meta.title
              : item.children
                ? item.children[0].meta.title
                : ""
          }}</el-menu-item>
        </app-link>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import { constantRoutes } from '@/router'
import AppLink from './Link'
import { isExternal } from '@/utils/validate'

export default {
  name: 'NavMenu',
  components: {
    AppLink
  },
  data() {
    return {
      routes: this.$store.state.user.routers
    }
  },
  computed: {
    ...mapGetters(['sidebar']),
    sidebar() {
      return this.$store.state.app.sidebar
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      // 如果是首页，首页高亮
      if (path === '/home/index') {
        return '/'
      }
      // 如果不是首页，高亮一级菜单
      const activeMenu = '/' + path.split('/')[1]
      return activeMenu
    },
    variables() {
      return variables
    }
  },
  mounted() {
    this.initCurrentRoutes()
  },
  methods: {
    // 通过当前路径找到二级菜单对应项，存到store，用来渲染左侧菜单
    initCurrentRoutes() {
      const { path } = this.$route
      let route = this.routes.find(
        (item) => item.path === '/' + path.split('/')[1]
      )
      // 如果找不到这个路由，说明是首页
      if (!route) {
        route = this.routes.find((item) => item.path === '/')
      }
      // console.log(`route:${JSON.stringify(route)}`);
      this.$store.commit('user/SET_CURRENT_ROUTES', route)
      this.setSidebarHide(route)
    },
    // 判断该路由是否只有一个子项或者没有子项，如果是，则在一级菜单添加跳转路由
    isOnlyOneChild(item) {
      if (item.children && item.children.length === 1) {
        return true
      }
      return false
    },
    resolvePath(item) {
      // 如果是个完成的url直接返回
      if (isExternal(item.path)) {
        return item.path
      }
      // 如果是首页，就返回重定向路由
      if (item.path === '/') {
        const path = item.redirect
        return path
      }

      // 如果有子项，默认跳转第一个子项路由
      let path = ''
      /**
       * item 路由子项
       * parent 路由父项
       */
      const getDefaultPath = (item, parent) => {
        // 如果path是个外部链接（不建议），直接返回链接，存在个问题：如果是外部链接点击跳转后当前页内容还是上一个路由内容
        if (isExternal(item.path)) {
          path = item.path
          return
        }
        // 第一次需要父项路由拼接，所以只是第一个传parent
        if (parent) {
          path += parent.path + '/' + item.path
        } else {
          path += '/' + item.path
        }
        // 如果还有子项，继续递归
        if (item.children) {
          getDefaultPath(item.children[0])
        }
      }

      if (item.children) {
        getDefaultPath(item.children[0], item)
        return path
      }

      return item.path
    },
    handleSelect(key, keyPath) {
      // 把选中路由的子路由保存store
      const route = this.routes.find((item) => item.path === key)
      this.$store.commit('user/SET_CURRENT_ROUTES', route)
      this.setSidebarHide(route)
    },
    // 设置侧边栏的显示和隐藏
    setSidebarHide(route) {
      if (!route.children || route.children.length === 1) {
        this.$store.dispatch('app/toggleSideBarHide', true)
      } else {
        this.$store.dispatch('app/toggleSideBarHide', false)
      }
    }
  }
}
</script>

<style lang="scss">
.navMenu {
  height: 100%;
  background: transparent;
  .el-menu {
    background: transparent;
    border: none !important;
    .nav-item {
      float: left;
      background: transparent;
      border: none !important;

      .el-menu-item {
        position: relative;
        height: 60px;
        line-height: 60px;
        color: #798089;
        border-radius: 0;
      }
      .el-menu-item.is-active {
        color: #111e2c;
      }
      .el-menu-item.is-active:after {
        content: "";
        position: absolute;
        top: auto;
        bottom: -2px;
        left: 50%;
        right: auto;
        margin-left: -20px;
        width: 29px;
        height: 4px;
        background-color: #409cff;
      }
      .el-menu-item:focus,
      .el-menu-item:hover {
        outline: 0;
        background-color: transparent;
      }
    }
  }
  .el-menu .el-menu-item,
  .el-menu .el-submenu {
    border: none;
    border-bottom: 2px solid transparent;
  }
  .navMenu-menu {
    height: 100%;
    background: transparent;
    .el-menu--horizontal > .el-menu-item {
      color: #fff;
    }
  }
}
</style>
