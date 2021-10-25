<template>
  <div id="app">
    <div class="left">
      <div class="arrow-view" @click="lastPage">
        <i class="el-icon-arrow-left"></i>
      </div>
    </div>
    <div class="right">
      <div class="arrow-view" @click="nextPage">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <transition :name="transitionName">
      <!--<keep-alive :include="cachedViews">
        <router-view :key="key"></router-view>
      </keep-alive>-->
      <router-view :key="key"></router-view>
    </transition>
  </div>
</template>

<script>
// import {
//   addBeforeunloadListener,
//   removeBeforeunloadListener,
// } from "./utils/set-pv-uv";

import Shell from './views/shell'
export default {
  name: 'App',
  components: { Shell },
  data () {
    return {
      routerLink: [
        '/build',
        '/campus',
        '/teachers',
        '/studentDevelopment',
        '/OAProcess',
        '/networkTeaching'
      ],
      name: 'campus',
      transitionName: ''
    }
  },
  computed:{
    cachedViews() {
      return ['AutoApplyList']
    },
    key() {
      return this.$route.fullPath;
    }
  },
  methods: {
    lastPage() {
      let index = this.routerLink.findIndex((item) => item === this.$route.fullPath);
      // this.transitionName = 'vux-pop-out';
      this.$router.push(index === 0 ? this.routerLink[this.routerLink.length - 1] : this.routerLink[index - 1]);
    },
    nextPage() {
      let index = this.routerLink.findIndex((item) => item === this.$route.fullPath);
      // this.transitionName = 'vux-pop-in';
      this.$router.push(index === this.routerLink.length - 1 ? this.routerLink[0] : this.routerLink[index + 1]);
    }
  }
  // mounted() {
  //   addBeforeunloadListener();
  // },
  // beforeDestroy() {
  //   removeBeforeunloadListener();
  // },
  // methods: {},
}
</script>

<style lang="scss" scoped>
  .left {
    position: fixed;
    width: 45px;
    height: 200px;
    top: 50%;
    margin-top: -100px;
    left: 0;
    opacity: 0;
    z-index: 2;
    cursor: pointer;
    transition: opacity 1s;
    .arrow-view {
      position: absolute;
      width: .34rem;
      height: .34rem;
      border-radius: .17rem;
      left: .05rem;
      top: 50%;
      margin-top: -.17rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(31,45,61,.11);
      i {
        font-size: 22px;
        color: #ffffff;
      }
    }
  }
  .right {
    position: fixed;
    width: 45px;
    height: 200px;
    top: 50%;
    right: 0;
    margin-top: -100px;
    z-index: 2;
    opacity: 0;
    cursor: pointer;
    transition: opacity 1s;
    .arrow-view {
      position: absolute;
      width: .34rem;
      height: .34rem;
      border-radius: .17rem;
      right: .05rem;
      top: 50%;
      margin-top: -.17rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(31,45,61,.11);
      i {
        font-size: 22px;
        color: #ffffff;
      }
    }
  }
  .left:hover {
    opacity: 1;
  }
  .right:hover {
    opacity: 1;
  }
  .vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active {
    will-change: transform;
    transition: all 500ms;
    height: 100%;
    top: 0;
    position: absolute;
    backface-visibility: hidden;
    perspective: 100;
  }

  .vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
</style>

