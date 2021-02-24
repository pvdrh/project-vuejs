<template>
  <div class="loginWrap">
    <div class="logo">
      <img src="../assets/images/zent_logo_dark.png" alt="">
    </div>
    <div class="inputWrap" style="margin-bottom: 24px">
      <el-input placeholder="Email" v-model="username" type="text" @input="onChangeUser($event)"></el-input>
      <div v-if="errorUsername" class="error"><i class="el-icon-warning"></i> Email không được bỏ trống</div>
    </div>
    <div class="inputWrap">
      <el-input placeholder="Mật khẩu" v-model="password" type="password" @input="onChangePass($event)"></el-input>
      <div v-if="errorPass" class="error"><i class="el-icon-warning"></i> Mật khẩu không được bỏ trống</div>
    </div>
    <button class="btn-login" @click="login()">
      ĐĂNG NHẬP
    </button>
    <div>
      <el-button class="forgotPass" @click="forgotPass()">Quên mật khẩu?</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      username: '',
      password: '',
      errorUsername: false,
      errorPass: false,
    }
  },
  methods: {
    forgotPass() {
      this.$router.push('forgot-password')
    },
    login() {
      if (this.username.length == '') {
        this.errorUsername = true
      }
      if (this.password.length == '') {
        this.errorPass = true
      }
      if (!this.errorPass && !this.errorUsername) {
        this.$router.push('/home')
      }
    },
    onChangeUser(user) {
      this.username = user
      this.errorUsername = false
    },
    onChangePass(pass) {
      this.password = pass
      this.errorPass = false
    }
  }
}
</script>

<style lang="scss" scoped>
.loginWrap {
  width: 444px;
  padding: 24px;
  background: white;
  border-radius: 10px;
  box-sizing: border-box;
  .logo {
    width: 100%;
    margin-bottom: 24px;
    img {
      width: 200px;
    }
  }
  .inputWrap {
    width: 100%;
    height: auto;
    overflow: hidden;
    .el-input {
      height: 50px !important;
    }
    .error {
      font-size: 12px;
      color: #f54b5e;
      float: left;
    }
  }
  .forgotPass {
    margin:0 auto;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .el-button {
      border: 0;
      color: #0080dd;
      padding: 7px;
    }
  }
  .btn-login {
    width: 100%;
    height: 50px;
    background-color: green;
    color: #fff;
    border: 0;
    border-radius: 4px;
    margin-top: 24px;
  }
}
</style>