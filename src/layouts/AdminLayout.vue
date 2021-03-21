<template>
  <div class="container">
    <el-container class="wrap">
      <el-header class="header">
        <div class="header-container">
          <div class="header-left"></div>
          <div class="header-center">
            <div class="logo">
              <img @click="goBack" src="../assets/image/zent_logo_dark.png">
            </div>
          </div>
          <div class="header-right">
            <el-dropdown>
              <el-avatar
                  src="https://genk.mediacdn.vn/k:thumb_w/640/2015/screen-shot-2015-07-30-at-2-31-57-pm-1438334096188/cau-chuyen-ve-nguoi-tao-ra-chu-ech-xanh-than-thanh.png"></el-avatar>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-user">
                 <router-link to="/profile">{{authUser.name}}</router-link>
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-setting">
                  <a>Đổi Mật Khẩu</a>
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-unlock"><a @click="logout">Đăng Xuất</a></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-main class="main">
        <slot name="main"></slot>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "AdminLayout",
  methods: {
    ...mapMutations('auth', ['updateLoginStatus', 'updateAuthUser', 'updateToken']),
    async logout() {
        localStorage.removeItem('access_token')
        this.updateLoginStatus(false)
        this.updateAuthUser({})
        if (this.$router.currentRoute.name !== 'Login') {
          await this.$router.push({ name: 'Login' })
        }
      },
      goBack(){
        this.$router.push({ name: 'Home' })
      }
  },
  computed:{
    ...mapState('auth',[
        'authUser'
    ]),
  }
}
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  background-image: url("../assets/image/bg.jpg");
  overflow: auto;
  position: relative;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

  .wrap {
    height: 100%;
    display: flex;
    flex-direction: column;

    .header {
      padding: 0;
      min-height: 80px;
      max-height: 80px;
      overflow: hidden;

      .header-container {
        max-height: 50px;
        background-color: rgba(0, 0, 0, .25);
        box-sizing: border-box;
        display: flex;
        overflow: hidden;
        justify-content: space-between;

        .header-center {
          .logo {
            img {
              width: 110px;
              height: 50px;
              cursor: pointer;
            }
          }
        }

        .header-right {
          .el-dropdown {
            .el-avatar {
              width: 36px;
              height: 36px;
              margin: 6px;
            }
          }
        }
      }
    }

    .main {
      position: relative;
      height: 100%;
      overflow-y: hidden;
      padding: 0;
    }
  }
}
</style>