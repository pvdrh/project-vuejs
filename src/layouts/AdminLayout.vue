<template>
  <div class="container">
    <el-container class="adminWrap">
      <el-header class="adminHeader">
        <div class="header-container">
          <div class="header-left"></div>
          <div class="header-center">
            <div class="logo">
              <img @click="gohome" src="../assets/image/zent_logo_dark.png" alt="logo">
            </div>
          </div>
          <div class="header-right">
            <el-dropdown>
              <el-avatar src="https://genk.mediacdn.vn/k:thumb_w/640/2015/screen-shot-2015-07-30-at-2-31-57-pm-1438334096188/cau-chuyen-ve-nguoi-tao-ra-chu-ech-xanh-than-thanh.png"></el-avatar>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-user"> <router-link to="/profile">Thông Tin Tài Khoản</router-link></el-dropdown-item>
                <el-dropdown-item icon="el-icon-setting">Đổi Mật Khẩu</el-dropdown-item>
                <el-dropdown-item icon="el-icon-unlock"><a @click="handleLogout">Đăng Xuất</a></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-main class="adminMain">
        <slot name="main"></slot>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {mapMutations} from "vuex";


export default {
  name: "AdminLayout",
  methods: {
    ...mapMutations('auth', ['updateLoginStatus', 'updateAuthUser', 'updateToken']),
    async handleLogout() {
      localStorage.removeItem('access_token')
        this.updateLoginStatus(false)
        this.updateAuthUser({})
        if (this.$router.currentRoute.name !== 'Login') {
          await this.$router.push({ name: 'Login' })
        }
      },
      gohome(){
        this.$router.push({ name: 'Home' })
      }
  }
}
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  overflow: auto;
  position: relative;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../assets/image/bg.jpg");
  .adminWrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    .adminHeader {
      min-height: 80px;
      max-height: 80px;
      overflow: hidden;
      padding: 0;
      .header-container {
        background-color: rgba(0, 0, 0, 0.25);
        box-sizing: border-box;
        display: flex;
        max-height: 50px;
        overflow: hidden;
        justify-content: space-between;
        .header-center {
          .logo {
            img {
              height: 50px;
              width: 100px;
            }
          }
        }
        .header-right {
          .el-dropdown {
            .el-avatar {
              outline: none;
              width: 36px;
              height: 36px;
              margin: 7px;
            }
          }
        }
      }
    }
    .adminMain {
      position: relative;
      overflow-y: hidden;
      outline: none;
      padding: 0;
      height: 100%;
    }
  }
}
</style>