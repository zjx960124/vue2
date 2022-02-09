<template>
  <el-scrollbar class="scrollbar" wrap-class="scrollbar-wrap-class">
    <el-menu
      :default-active="active"
      @select="handleSelect"
      mode="vertical"
      :collapse-transition="false"
    >
      <el-menu-item index="newlyBorn">
        <i class="el-icon-menu"></i>
        <span slot="title">新生管理</span>
      </el-menu-item>
      <!-- <el-menu-item index="student">
        <i class="el-icon-document"></i>
        <span slot="title">学生管理</span>
      </el-menu-item> -->
      <el-menu-item index="system">
        <i class="el-icon-setting"></i>
        <span slot="title">系统设置</span>
      </el-menu-item>
      <el-menu-item index="informationTip">
        <i class="el-icon-setting"></i>
        <span slot="title">信息公告</span>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import store from '../../store/index'
export default {
  name: 'SidebarMenu',
  data() {
    return {
      active: store.state.activeItem
    }
  },
  watch: {
    $route: {
      handler(val) {
        this.active = val.meta.attribution || ''
      },
      immediate: true
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.handleSelect(this.$route.meta.attribution);
    })
  },
  methods: {
    handleSelect(index) {
      this.$Bus.$emit('router', { target: index });
    }
  }
}
</script>

<style lang="scss" scoped>
.scrollbar {
  padding-top: 62px;
  height: calc(100% - 88px) !important;
  ::v-deep.el-scrollbar__wrap {
    overflow: auto;
    .el-scrollbar__view {
      height: 100%;
      .el-menu {
        border-right: none;
        .el-menu-item {
          height: 104px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          line-height: 14px;
          color: #807d9e;
          padding: 0 !important;
          i {
            margin-bottom: 10px;
          }
        }
        .el-menu-item.is-active {
          background: #f7f7fb;
          position: relative;
          color: #587dfd;
          font-weight: 600;
        }
        .el-menu-item.is-active::after {
          content: "";
          position: absolute;
          left: 0;
          top: 2px;
          width: 4px;
          height: 100px;
          background-color: #587dfd;
          border-radius: 2px;
        }
      }
    }
  }
}
.scrollbar-wrap-class {
  overflow: hidden !important;
}
</style>
