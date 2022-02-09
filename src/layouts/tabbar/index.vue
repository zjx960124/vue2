<template>
  <div class="tab-bar-container" :class="{ shadow: shadowFlag }">
    <div class="input-view">
      <el-input placeholder="" v-model="input4">
        <i
          slot="suffix"
          style="font-size: 16px; margin-right: 10px"
          class="icon-yx-ss"
        ></i>
      </el-input>
    </div>
    <div class="right-warp">
      <User />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabbar',
  data() {
    return {
      input4: '',
      shadowFlag: false
    }
  },
  watch: {
  },
  mounted() {
    this.$nextTick(() => {
      this.shadowFlag = true;
    })
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.tab-bar-container {
  position: relative;
  height: 88px;
  line-height: 88px;
  box-sizing: border-box;
  white-space: nowrap;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 57px;
  padding-right: 40px;
  .input-view {
    width: 514px;
    line-height: 88px;
    height: 88px;
    display: flex;
    align-items: center;
    ::v-deep.el-input {
      .el-input__inner {
        border: 2px solid #f1f1f6;
        border-radius: 10px;
        height: 46px;
        .el-icon-search {
          font-size: 18px;
        }
      }
    }
  }
  .right-warp {
    height: 100%;
  }
}
.shadow {
  z-index: 2;
  box-shadow: 0px 1px 5px 0px rgba(163, 161, 186, 0.22);
}
</style>
