<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import {mapState, mapMutations } from 'vuex'
import api from './api'
export default {
  name: 'App',
  computed: {
    ...mapState('auth', ['isAuthenticated']),
  },
  methods: {
    ...mapMutations('auth', ['updateLoginStatus','updateAuthUser']),
    async handleLogout() {
      localStorage.removeItem('access_token')
      localStorage.removeItem('vuex')
      this.updateLoginStatus(false)

      this.updateAuthUser({})

      if (this.$router.currentRoute.name !== 'Login') {
        await this.$router.push('/Login' )
      }
    }
  },
  mounted() {
    api.getAuthUser().then((response) => {
      this.updateAuthUser(response.data)
    })
  }
}
</script>
<style lang="scss">
body, button, html, input, select, textarea {
  color: #172b4d;
  font-size: 14px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  line-height: 20px;
}

html,body{
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

h2, h3, h4, h5, h6 {
  font-weight: 600;
  margin: 0 0 8px;
}

.el-dialog__header{
  display: none;
}
.el-dialog__body{
  padding: 0 !important;
  background-color: #f4f5f7;
}
.el-progress__text{
  float: left;
  margin-right: 5px;
  margin-left: 5px;
}
.button-link {
  background-color: rgba(9,30,66,.04);
  box-shadow: none;
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  height: 32px;
  margin-top: 8px;
  max-width: 300px;
  overflow: hidden;
  padding: 6px 12px;
  position: relative;
  text-decoration: none;
  text-overflow: ellipsis;
  -webkit-user-select: none;
  user-select: none;
  white-space: nowrap;
  transition-property: background-color,border-color,box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
}
.button-link:hover{
  background-color: #eaecf0 !important;
}

label, legend {
  font-weight: 700;
  color: #5e6c84;
  font-size: 12px;
  line-height: 16px;
  margin-top: 12px;
  margin-bottom: 4px;
  display: block;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
