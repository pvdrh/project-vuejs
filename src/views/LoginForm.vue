<template>
  <div class="loginWrap">
    <div class="logo">
      <img src="../assets/image/zent_logo_dark.png" alt="">
    </div>
    <el-form :model="ruleForm" :label-position="label" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item prop="email">
        <label style="float: left; line-height:30px" >Email</label>
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <label style="float: left; line-height:30px" >Mật khẩu</label>
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
    </el-form>
    <button @click="handlelogin('ruleForm')" class="btn-login">ĐĂNG NHẬP</button>
    <p>Hoặc</p>
    <div class="register">
      <el-button @click="register()">Đăng ký</el-button>
    </div>
  </div>
</template>

<script>
import api from '../api'
import {mapState, mapMutations} from 'vuex'
export default {
  name: "LoginForm",
  data() {
    return {
      ruleForm: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          { required: true, message: 'Email không được bỏ trống!', trigger: 'change' },
          { type: 'email', message: 'Email không hợp lệ!', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'Mật khẩu không được bỏ trống!', trigger: 'change' },
          { min: 6, message: 'Mật khẩu không được ít hơn 6 kí tự', trigger: 'blur' },
        ],
      },
      label: 'top',
    }
  },
  computed: {
    ...mapState('auth', ['isAuthenticated']),
  },
  methods: {
    ...mapMutations('auth', ['updateLoginStatus', 'updateAuthUser', 'updateToken']),
    forgotPass() {
      this.$router.push('forgot-password')
    },
    handlelogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            email: this.ruleForm.email,
            password: this.ruleForm.password,
          }
          api.login(data).then((response) => {
            this.updateLoginStatus({isAuthenticated: true})
            localStorage.setItem('access_token', response.data.access_token)
            this.updateToken(response.data.access_token)
            if (this.$router.currentRoute.name !== 'Home') {
              this.$router.push({ name: 'Home' })
            }
          }).catch(() => {
            this.$message({message: 'Email hoặc mật khẩu không chính xác', type: 'error', center: true});
          })
        } else {
          return false;
        }
      });
    },
    register() {
      this.$router.push('/path/register')
    }
  }
}
</script>

<style lang="scss" scoped>
.loginWrap {
  width: 420px;
  padding: 25px;
  background-color: white;
  border-radius: 25px;
  box-sizing: border-box;
  margin-bottom: 10px;

  .logo {
    width: 100%;
    margin-bottom: 20px;

    img {
      width: 180px;
    }
  }

  .inputWrap {
  width: 100%;
  height: auto;
  overflow: hidden;

    .el-input {
      height: 45px !important;
    }

    .error {
      font-size: 12px;
      color: #f54b5e;
      float: left;
    }
  }

  .register {
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

    .el-button {
    color: white;
    width: 80%;
    height: 36px;
    border: none;
    background: #42b72a;
    text-decoration: none;
    border-radius: 25px;
    font-size: 16px;
    box-sizing: border-box;
    outline: none;
    cursor: pointer;
    }
  }
  
  .btn-login {
    color: white;
    width: 100%;
    height: 36px;
    border: none;
    background: #1877f2;
    border-radius: 25px;
    font-size: 16px;
    box-sizing: border-box;
    outline: none;
    cursor: pointer;
  }
}
</style>