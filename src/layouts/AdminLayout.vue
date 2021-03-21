<template>
  <div class="admin">
    <el-container class="adminWrap">
      <el-header class="adminHeader">
        <div class="header-container">
          <div class="header-left"></div>
          <div class="header-center">
            <div class="logo">
              <img src="../assets/image/zent_logo_dark.png" alt="logo">
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
      <el-main class="adminMain">
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
  },
  computed:{
    ...mapState('auth',[
        'authUser'
    ]),
  }
}
</script>

<style scoped lang="scss">
.admin {
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
      min-height: 40px;
      max-height: 40px;
      overflow: hidden;
      padding: 0;

      .header-container {
        background-color: rgba(0, 0, 0, .32);
        box-sizing: border-box;
        display: flex;
        max-height: 40px;
        overflow: hidden;
        padding: 4px;
        justify-content: space-between;

        .header-center {
          .logo {
            img {
              width: 60px;
            }
          }
        }

        .header-right {
          .el-dropdown {
            .el-avatar {
              outline: none;
              width: 30px;
              height: 30px;
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