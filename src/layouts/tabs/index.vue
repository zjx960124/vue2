<template>
  <div class="tabs-container">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#F6F6FA"
      text-color="#9C9AB4"
      active-text-color="#34345A"
      ref="routerMenu"
    >
      <el-menu-item
        v-for="(item, index) in router"
        :key="index"
        :index="item.path"
      >
        {{ item.meta.title }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "Tabs",
  data() {
    return {
      activeIndex: '',
      router: [],
    };
  },
  watch: {
    '$route': {
      handler(val) {
        this.$nextTick(() => {
          this.$refs.routerMenu.activeIndex = val.name
        })
      },
      immediate: true
    }
  },
  mounted() {
    this.$Bus.$on("router", (res) => {
      this.router = store.state.router[2].children.filter((item) => { return item.meta.attribution === res.target })
      this.handleSelect(this.router[0].path);
    });
  },
  methods: {
    handleSelect(index) {
      console.log(index);
      this.$router.push(index);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs-container {
  .el-menu.el-menu--horizontal {
    border-bottom: 0px solid transparent;
    position: relative;
  }
  .el-menu.el-menu--horizontal::before {
    position: absolute;
    content: "";
    height: 2px;
    width: calc(100% - 20px);
    background: #ebebf5;
    left: 20px;
    bottom: 1px;
    z-index: 2;
  }
  .el-menu--horizontal > .el-menu-item {
    font-size: 16px;
    border-bottom: none;
    height: 55px;
    padding: 0;
  }
  .el-menu--horizontal > .el-menu-item + .el-menu-item {
    margin-left: 50px;
  }
  .el-menu--horizontal > .el-menu-item:hover {
    border-bottom: none;
    background-color: transparent !important;
  }
  .el-menu--horizontal > .el-menu-item.is-active {
    font-size: 16px;
    border-bottom: none;
    position: relative;
    font-weight: 500;
  }
  .el-menu--horizontal > .el-menu-item.is-active::before {
    position: absolute;
    content: "";
    bottom: 0;
    left: 50%;
    margin-left: -12px;
    width: 24px;
    height: 5px;
    z-index: 3;
    border-radius: 3px;
    background: #587dfd;
  }
}
</style>
