<template>
  <div class="hello">
    <div class="container">
      <div class="header">
        <div class="logo" @click="goToHome()">
          <img src="../assets/image/zent_logo_dark.png">
        </div>
        <div class="avatar" @click="openSetting()">
          <el-avatar>
            <img v-if="avatarUrl" :src="avatarUrl">
            <img v-else src="../assets/image/avatar.jpg">
          </el-avatar>
        </div>
        <div class="user-setting" ref="profile">
          <div class="setting" @click="openProfile()"> <i class=" el-icon-user" style="margin-right:5px"></i> {{user.name}}</div>
          <div class="logout" @click="changePass"> <i class="el-icon-setting" style="margin-right:5px"></i>Đổi Mật Khẩu</div>
          <div class="logout" @click="handlelogout()"> <i class=" el-icon-unlock" style="margin-right:5px"></i> Đăng Xuất</div>
        </div>
        
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import api from "@/api";

export default {
  data () {
    return {
      user: [],
      baseUrl: 'http://vuecourse.zent.edu.vn/storage/users/',
      avatarUrl: ''
    }
  },
  name: "AdminLayout",
  computed: {
    ...mapState('auth', ['isAuthenticated', 'authUser']),
  },
  methods: {
    ...mapMutations('auth', ['updateLoginStatus', 'updateAuthUser']),
    openSetting() {
      if (this.$refs.profile.style.visibility == 'visible')
        this.$refs.profile.style.visibility = 'hidden'
      else this.$refs.profile.style.visibility = 'visible'
    },
    openProfile() {
      this.$router.push('profile')
      if (this.$refs.profile.style.visibility == 'visible')
        this.$refs.profile.style.visibility = 'hidden'
      else this.$refs.profile.style.visibility = 'visible'
    },
    goToHome() {
      this.$router.push('home')
    },
    changePass() {
      this.$router.push('password')
    },
    handlelogout() {
      localStorage.removeItem('access_token')
      this.updateLoginStatus(false)
      this.updateAuthUser({})
      if (this.$router.currentRoute.name !== 'Login') {
        this.$router.push({ name: 'Login' })
      }
    }
  },
  mounted() {
    api.getAuthUser().then((response) => {
      if (response) {
        this.user = response.data
        if (response.data.avatar) {
          this.avatarUrl = this.baseUrl + response.data.avatar
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .container {
    height: 100vh;
    background-image: url("../assets/image/bg.jpg");
    background-size: cover;
    overflow: auto;
    position: relative;
    background-position: center;
    background-repeat: no-repeat;
    align-items: center;
    justify-content: center;

    .header {
      width: 100%;
      height: 50px;
      padding: 4px;
      box-sizing: border-box;
      background-color: rgba(0, 0, 0, 0.25);
      display: flex;
      justify-content: center;
      align-items: center;

      .logo {
        width: 110px;
        height: 50px;
        cursor: pointer;

        img {
          width: 100%;
        }
      }

      .logo:hover {
        opacity: 0.75;
      }

      .avatar {
        width: 36px;
        height: 36px;
        position: absolute;
        right: 10px;
        cursor: pointer;

        .el-avatar {
          width: 40px;
          height: 40px;
        }
      }

      .user-setting {
        position: absolute;
        top: 45px;
        right: 5px;
        background: white;
        visibility: hidden;
        height: auto;
        padding: 10px;
        border-radius: 5px;
        font-size: 14px;
        z-index: 50;
        
        .setting, .logout {
          justify-content: left;
          display: flex;
          padding: 8px;
          cursor: pointer;
        }
      }
    }
  }
</style>