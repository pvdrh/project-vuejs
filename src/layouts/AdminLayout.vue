<template>
  <div class="hello">
    <div class="container">
      <div class="header">
        <div class="logo" @click="goToHome()">
          <img src="../assets/images/zent_logo_dark.png" alt="">
        </div>
        <div class="avatar" @click="setting()">
          <el-avatar>
            <img src="../assets/images/avatar.jpg" alt="">
          </el-avatar>
        </div>
        <div class="user-setting" ref="usersetting">
          <div class="user-top">
            Cài Đặt
          </div>
          <div class="user-info">
            <el-avatar>
              <img src="../assets/images/avatar.jpg" alt="">
            </el-avatar>
            <div class="name-mail">
              <div class="name">Phạm Văn Duy</div>
              <span class="email">duypv@zent.vn</span>
            </div>
          </div>
          <hr>
          <div class="setting el-icon-s-custom" @click="settingAccount()">
            <span style="padding-left:5px">Thông tin tài khoản</span>
          </div>
          <div class="logout el-icon-unlock" @click="logout()">
            <span style="padding-left:5px">Đăng xuất</span>
          </div>
        </div>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminLayout",
  methods: {
    settingAccount() {
      this.$router.push('profile')
    },
    goToHome() {
      this.$router.push('home')
    },
    logout() {
      this.$router.push('path/login')
    },
    setting() {
      if (this.$refs.usersetting.style.visibility == 'visible')
        this.$refs.usersetting.style.visibility = 'hidden'
      else this.$refs.usersetting.style.visibility = 'visible'
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    height: 100%;
    background-image: url("../assets/images/bg.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    .header {
      width: 100%;
      height: 40px;
      padding: 4px;
      box-sizing: border-box;
      background: rgba(80, 80, 80, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      .logo {
        width: 90px;
        cursor: pointer;
        img {
          width: 100%;
        }
      }
      .logo:hover {
        opacity: 1;
      }
      .avatar {
        width: 32px;
        height: 32px;
        position: absolute;
        right: 5px;
        cursor: pointer;
        .el-avatar {
          width: 32px;
          height: 32px;
          line-height: 32px;
        }
      }
      .user-setting {
        position: absolute;
        top: 45px;
        right: 5px;
        background: white;
        visibility: hidden;
        font-weight:600;
        font-size: 16px !important;
        width: 290px;
        height: auto;
        padding: 10px;
        border-radius: 5px;
        font-size: 14px;
        .user-info {
          justify-content: left;
          display: flex;
          padding: 15px 0;
          height: 40px;
          .name-mail {
            padding: 2px 2px 2px 7px;
            text-align: left;
            height: 50px;
            position: relative;
            .name {
              margin-top: 1px;
              font-size: 14px;
            }
            span {
              position: absolute;
              top: 25px;
              opacity: 0.5;
            }
          }
        }
        .setting, .logout {
          justify-content: left;
          display: flex;
          padding: 4px;
          cursor: pointer;
        }
        .setting:hover {
          background-color: #d4d7da;
        }
        .logout:hover {
          background-color: #d4d7da;
        }
      }
    }
  }
</style>