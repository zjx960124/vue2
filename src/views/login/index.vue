<template>
  <div class="login-view">
    <div class="title">欢迎登录迎新管理系统服务中心!</div>
    <div class="login-form-view">
      <img class="logo" src="../../assets/other_images/login-logo.png" alt="" />
      <el-form
        class="login-form"
        :label-position="labelPosition"
        label-width="80px"
      >
        <el-form-item label="账户名称">
          <el-input v-model="userName" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="输入密码">
          <el-input
            type="password"
            v-model="password"
            placeholder="请输入登录系统的密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="submit-btn" @click="login">登录</div>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/base'
export default {
  name: 'Login',
  data() {
    return {
      labelPosition: 'top',
      userName: '',
      password: ''
    }
  },
  mounted() {
  },
  methods: {
    login() {
      login({ userName: this.userName, password: this.password }).then((res) => {
        this.$router.push('/')
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.login-view {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    color: #6a0a0c;
    font-size: 46px;
    line-height: 1;
    margin: 109px 0 68px;
  }
  .login-form-view {
    width: 486px;
    height: 639px;
    background: #ffffff;
    opacity: 0.9;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    padding: 0 40px;
    box-sizing: border-box;
    border: 1px solid #6a0a0c;
    align-items: center;
    .logo {
      margin: 50px 0 82px;
    }
    .login-form {
      line-height: 12px;
      width: 100%;
      ::v-deep .el-form-item__label {
        line-height: 1;
        color: #666666;
        font-size: 18px;
      }
      ::v-deep .el-form-item__content {
        line-height: 18px;
        padding-bottom: 10px;
        border-bottom: 1px solid #999999;
      }
      ::v-deep .el-form-item .el-input .el-input__inner {
        height: 18px;
        width: 100%;
        border: none;
        padding: 0;
        color: #6a0a0c;
      }
      .el-form-item + .el-form-item {
        margin-top: 28px;
      }
    }
    .submit-btn {
      width: 300px;
      height: 56px;
      box-shadow: 0px 11px 14px 2px rgba(106, 10, 12, 0.35);
      color: #ffffff;
      font-size: 24px;
      line-height: 56px;
      text-align: center;
      margin-top: 70px;
      background: #6a0a0c;
      border-radius: 28px;
    }
  }
}
</style>
