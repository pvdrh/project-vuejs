<template>
  <div class="div">
    <div class="mainWrap">
      <div class="header">LẤY LẠI MẬT KHẨU</div>
      <div class="inputWrap" style="margin-bottom: 24px">
        <el-input v-model="email" type="email" @input="onChangeEmail($event)"  placeholder="Email"></el-input>
        <div v-if="emailError" class="error"><i class="el-icon-warning"></i> Email không được bỏ trống</div>
      </div>
      <button class="submit" @click="submit()">GỬI EMAIL</button>
      <el-button @click="back()"><i class="el-icon-back"></i>Đăng nhập</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      email: '',
      emailError: false
    }
  },
  methods: {
     onChangeEmail(email) {
      this.email = email
      this.emailError = false
    },
    back() {
      this.$router.push('login')
    },
    submit() {
      if (this.email.length == '') {
        this.emailError = true
      }
      if (!this.emailError) {
        this.$message({
          message: 'Gửi email thành công!',
          type: 'success'
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mainWrap {
  width: 444px;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 10px;
  box-sizing: border-box;
  .header {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 40px;
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
  .submit {
    width: 100%;
    height: 50px;
    background-color:green;
    color: #ffffff;
    border: 0;
    border-radius: 4px;
    margin-bottom: 50px;
  }
  .el-button {
    border: 0;
    color: #0080dd;
    padding: 10px;
    font-size: 14px;
    i {
      font-weight: bold;
    }
  }
}
</style>