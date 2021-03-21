<template>
  <LoginLayout>
    <template #login>
      <main class="loginWrap">
        <div class="logoWrap">
          <img class="logo" src="../../assets/image/zent_logo_dark.png" alt=""></div>
        <el-form :model="loginForm" :rules="rules" ref="ruleForm">
          <div class="formInputWrap">
              <el-form-item prop="email">
                <el-input v-model="loginForm.email" placeholder="Email"></el-input>
              </el-form-item>
          </div>
          <div class="formInputWrap">
              <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password" placeholder="Mật khẩu"
                          ></el-input>
              </el-form-item>
            </div>

          <button class="submitBtn" @click="login"
                  tabindex="0" type="button">
            <span class="btn">Đăng Nhập</span>
            <span class="MuiTouchRipple-root"></span>
          </button>
        </el-form>
          <p>Hoặc</p>
        <div class="registerWrap">
          <button class="registerBtn">
            <span class="btn" @click="register">Đăng ký</span>
            <span class="MuiTouchRipple-root"></span>
          </button>
        </div>
      </main>
    </template>
  </LoginLayout>
</template>

<script>
import api from '../../api'
import LoginLayout from "@/layouts/LoginLayout";
import {mapState, mapActions, mapMutations} from 'vuex'

export default {
  name: "Login",
  components: {
    LoginLayout
  },
  methods: {
    ...mapActions,
    ...mapMutations('auth', ['updateToken','updateLoginStatus', 'updateAuthUser']),
    register() {
      this.$router.push('/register')
    },
    login() {
      this.$refs.ruleForm.validate((valid) => {
        let infor= {
          password: this.loginForm.password,
          email: this.loginForm.email,
        }
        if (valid) {
          api.login(infor).then((response) => {
            localStorage.setItem('access_token', response.data.access_token)
            this.updateToken(response.data.access_token)
            this.updateLoginStatus(true)

            if (this.$router.currentRoute.name !== 'Home') {
              this.$router.push('/home')
            }
          }).catch(() => {
            this.$message({message: 'Sai tài khoản hoặc mật khẩu.', type: 'error', center:true});
          })
        } else {
          return false;
        }
      });
    }
  },
  computed: {
    ...mapState('auth', ['isAuthenticated']),
  },
  created() {
    if (this.isAuthenticated) this.$router.push({name: 'Admin'})
  },
  data() {
    return {
      loginForm: {
        password: "",
        email: "",
      },
      rules: {
        email: [
          {required: true, message: 'Email không được để trống.'},
        ],
        password: [
          {required: true, message: 'Mật khẩu không được để trống.'},
        ],
      },
    }
  }
}
</script>

<style scoped lang="scss">
.loginWrap {
  background: white;
  width: 360px;
  border-radius: 25px;
  display: block;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 24px;
  margin-bottom:10px;

  .logoWrap {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 25px;

    img {
      width: 210px;
      box-sizing: border-box;
      vertical-align: middle;
      border-style: none;
    }
  }
}

  .submitBtn {
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

    .btn {
      width: 100%;
      display: inherit;
      align-items: inherit;
      justify-content: inherit;
      box-sizing: border-box;
    }
  }

  .registerWrap {
    align-items: center;
    display: flex;
    justify-content: center;
    box-sizing: border-box;

    .registerBtn {
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

</style>