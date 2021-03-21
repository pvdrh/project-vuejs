<template>
  <LoginLayout>
    <template #login>
      <main class="registerWrap">
        <div class="logoWrap">
          <img class="logo" src="../../assets/image/zent_logo_dark.png" alt=""></div>
        <el-form :model="registerForm" :rules="rules" ref="ruleForm">
          <div class="formInputWrap">
            <div class="sui-input-wrap">
              <el-form-item prop="name">
                <el-input placeholder="Họ và tên" v-model="registerForm.name" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="formInputWrap">
            <div class="sui-input-wrap">
              <el-form-item prop="email">
                <el-input placeholder="Email" v-model="registerForm.email" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="formInputWrap">
              <el-form-item prop="password">
                <el-input placeholder="Mật khẩu" type="password" v-model="registerForm.password"
                          autocomplete="off"></el-input>
              </el-form-item>
            </div>

          <div class="formInputWrap">
              <el-form-item prop="confirm_password">
                <el-input placeholder="Xác nhận lại mật khẩu" type="password" v-model="registerForm.confirm_password"
                          autocomplete="off"></el-input>
              </el-form-item>
            </div>
          <button class="submitBtn"
                  tabindex="0" type="button" @click="register">
            <span class="btnLabel">Đăng Ký</span>
            <span class="MuiTouchRipple-root"></span>
          </button>
        </el-form>

        <div class="returnRegisterWrap">
          <button class="registerBtn">
            <span class="btnLabel el-icon-back" @click="login()"> Đăng nhập</span>
            <span class="MuiTouchRipple-root"></span>
          </button>
        </div>
      </main>
    </template>
  </LoginLayout>
</template>

<script>
import LoginLayout from "@/layouts/LoginLayout";
import api from '../../api'

export default {
  name: "Register",
  components: {
    LoginLayout
  },
  methods: {
    register() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let data = {
            name: this.registerForm.name,
            email: this.registerForm.email,
            password: this.registerForm.password,
          };
          api.register(data).then(() => {
            this.$message({message: 'Đăng ký thành công.', type: 'success', center:true});
          }).catch(() => {
            this.$message({message: 'oh no oh no oh no no no', type: 'error', center:true});
          })
        } else {
          return false;
        }
      });
    },
     login() {
      this.$router.push('/login')
    }
  },
  data() {
    return {
      registerForm: {
        email: "",
        password: "",
        name: "",
        confirm_password: "",
      },
      rules: {
        name: [
          {required: true, message: 'Trường này là bắt buộc.'}
        ],
        email: [
          {required: true, message: 'Email không được để trống.'}
        ],
        password: [
          {required: true, message: 'Bạn phải nhập mật khẩu của mình chứ.'}
        ],
        confirm_password: [
          {required: true, message: 'Mật khẩu không khớp'}
        ]
      },

    }
  }
}
</script>

<style scoped lang="scss">
.registerWrap {
  background: white;
  width: 360px;
  border-radius: 25px;
  display: block;
  box-sizing: border-box;
  padding: 24px;
  margin: 0 auto;
  margin-bottom:10px;

  .logoWrap {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 25px;

    img {
      box-sizing: border-box;
      width: 200px;
      vertical-align: middle;
      border-style: none;
    }
  }

  .submitBtn {
    color: white;
    width: 80%;
    border: none;
    background: #42b72a;
    text-decoration: none;
    border-radius: 25px;
    height: 36px;
    font-size: 16px;
    box-sizing: border-box;
    outline: none;
    cursor: pointer;

    .btnLabel {
      width: 100%;
      display: inherit;
      align-items: inherit;
      justify-content: inherit;
      box-sizing: border-box;
    }
  }

  .returnRegisterWrap {
    margin-top: 8px;
    align-items: center;
    display: flex;
    justify-content: center;
    padding-top: 24px;
    box-sizing: border-box;

    .registerBtn {
      color: #1877f2;
      font-size: 14px;
      line-height: 18px;
      text-transform: none;
      outline: none;
      cursor: pointer;
      border: none;
      background: none;
      padding: 6px 8px;
      border-radius: 4px;
      box-sizing: border-box;
      border: 0;
      margin: 0;
      display: inline-flex;
      outline: 0;
    }
  }
}
</style>