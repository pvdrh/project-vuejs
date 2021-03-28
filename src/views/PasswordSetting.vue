<template>
  <div class="profileWrap">
     <div>
      <span style="font-size: 36px;
        display: flex;
        margin-right: 10px;
        align-items: center;
        margin-bottom:36px;
        justify-content: center;">Thay Đổi Mật Khẩu</span>
    </div>
    <div class="main-content">
      <div class="user-profile">
        <div class="loginWrap">
          <el-form
            :model="ruleForm"
            :label-position="label"
            :rules="rules"
            ref="ruleForm"
            label-width="110px"
            class="demo-ruleForm">
            <el-form-item prop="password">
              <label style="float: left">Mật khẩu mới</label>
              <el-input type="password" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <label style="float: left">Xác nhận mật khẩu</label>
              <el-input type="password" v-model="ruleForm.checkPass"></el-input>
            </el-form-item>
          </el-form>
          <button class="btn-login" @click="changePassword('ruleForm')">
            ĐỔI MẬT KHẨU
          </button>
          <div class="forgotPass">
            <el-button @click="home">Hủy</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";

export default {
  name: "PasswordSetting",
  data() {
    var confirm = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Yêu cầu xác nhận mật khẩu"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("Mật khẩu không chính xác!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        checkPass: "",
      },
      rules: {
        password: [
          {
            required: true,
            message: "Mật khẩu không được bỏ trống!",
            trigger: "change",
          },
          {
            min: 6,
            message: "Mật khẩu không được ít hơn 6 kí tự",
            trigger: "blur",
          },
        ],
        checkPass: [{ validator: confirm, trigger: "blur" }],
      },
      label: "top",
    };
  },
  methods: {
    home() {
      this.$router.push("home");
    },
    changePassword(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            password: this.ruleForm.password,
            password_confirmation: this.ruleForm.checkPass,
          };
          api
            .changePassword(data)
            .then(() => {
              this.$message({
                message: "Thay đổi thành công.",
                type: "success",
                center:true
              });
              this.$router.push("home");
            })
            .catch(() => {
              this.$message({
                message: "Cập nhật thất bại!",
                type: "error",
                center:true
              });
            });
        }
      });
    },
  },
  mounted() {
    api.getAuthUser().then((response) => {
      if (response) {
        this.user = response.data;
        this.ruleForm.email = response.data.email;
        this.ruleForm.name = response.data.name;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.profileWrap {
  margin-top: 50px;
  max-height: 95vh;

  .main-content {
    margin: 0 7px;

    .user-profile {
      width: 440px;
      height: auto;
      margin: 0 auto;
      background: white;

      .loginWrap {
        width: 444px;
        padding: 25px;
        box-sizing: border-box;
        background-color: white;
        border-radius: 10px;

        .inputWrap {
          width: 100%;
          height: auto;
          overflow: hidden;

          .el-input {
            height: 50px !important;
          }
        }

        .forgotPass {
          margin-top: 10px;
          justify-content: center;
          display: flex;
          align-items: center;

          .el-button {
            color: #0588e6;
            border: 0;
            padding: 7px;
          }
        }
        
        .btn-login {
          margin-top: 20px;
          width: 100%;
          height: 36px;
          border: none;
          background: #42b72a;
          border-radius: 25px;
          color: white;
          font-size: 16px;
          box-sizing: border-box;
          outline: none;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
