<template>
  <div class="navbar">
    <div class="left-menu"><logo :collapse="false" /> <navMenu /></div>
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="hover">
        <div class="avatar-wrapper">
          <img :src="avatat" class="user-avatar" :onerror="defaultAvatar" />
          <span class="user-name">{{ name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <!-- <el-dropdown-item @click.native="gotoHome">
            <span style="display: block">首页</span>
          </el-dropdown-item> -->
          <el-dropdown-item @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { logout } from "@/utils/index.js";
import Logo from "./Logo";
import NavMenu from "./NavMenu";

export default {
  components: {
    Logo,
    NavMenu,
  },
  data() {
    return {
      avatat: require("@/assets/other_images/defaultHead.png"),
      defaultAvatar:
        'this.src="' + require("@/assets/other_images/defaultHead.png") + '"',
    };
  },
  computed: {
    ...mapGetters(["sidebar", "name"]),
  },
  methods: {
    // gotoHome() {
    //   this.$router.push("/");
    // },
    logout() {
      this.$confirm("确认要退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("user/logout");
          logout();
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 60px;
  background-color: #ffffff;
  overflow: hidden;

  .left-menu {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .right-menu {
    // float: right;
    height: 100%;
    line-height: 60px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
        display: flex;
        justify-content: center;
        flex-direction: row;
        align-items: center;
        margin-top: 0;
        cursor: pointer;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .user-name {
          margin-left: 5px;
          color: #333333;
          font-size: 14px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -15px;
          top: 20px;
          font-size: 12px;
          color: #fff;
        }
      }
    }
  }
}
</style>
