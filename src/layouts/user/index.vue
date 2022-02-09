<template>
  <div class="user-container">
    <el-dropdown trigger="hover" @command="onCommad">
      <!--      <div class="action-wrapper">-->
      <!--        <div class="avatar">-->
      <!--          <img :src="avatar" />-->
      <!--        </div>-->
      <!--        <span class="nick-name el-dropdown-link">-->
      <!--          <span>{{ nickName || "admin" }}</span>-->
      <!--          <i class="el-icon-arrow-down tip"></i>-->
      <!--        </span>-->
      <!--      </div>-->
      <div class="action-wrapper">
        <span class="nick-name">{{ nickName || "admin" }}</span>
        <img class="avatar-img" :src="avatar" alt="" />
        <i class="el-icon-arrow-down tip"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <!--<el-dropdown-item icon="el-icon-user" command="personalCenter">
          个人中心
        </el-dropdown-item>-->
        <el-dropdown-item icon="el-icon-switch-button" command="logout">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
import { logout } from '@/api/base'
export default {
  name: 'User',
  data() {
    return {
      avatar: '',
      nickName: ''
    }
  },
  methods: {
    onCommad(command) {
      switch (command) {
        case 'personalCenter':
          this.onPersonalCenter()
          break
        case 'logout':
          this.onLogout()
          break
      }
    },
    onPersonalCenter() {
      store.toPersonalCenter && store.toPersonalCenter()
    },
    onLogout() {
      MessageBox.confirm('是否要退出登录？', '提示')
        .then(_ => {
          // store.logout()
          // store.onLogout && store.onLogout()
          logout().then((res) => {
            this.$router.replace('/login');
          })
        })
        .catch(_ => { })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-container {
  height: 100%;
  display: flex;
  align-items: center;
  .action-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 45px;
    .nick-name {
      color: #47476a;
      font-size: 12px;
      font-weight: 600;
    }
    .avatar-img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      margin-left: 20px;
      margin-right: 14px;
      margin-bottom: 7px;
    }
    .tip {
    }
  }
}
</style>
