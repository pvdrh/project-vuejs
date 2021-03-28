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
    ...mapMutations('auth', ['updateLoginStatus', 'updateAuthUser']),
    async handleLogout() {
      localStorage.removeItem('access_token')
      this.updateLoginStatus(false)
      this.updateAuthUser({})
      if (this.$router.currentRoute.name !== 'Login') {
        await this.$router.push({ name: 'Login' })
      }
    }
  },
  mounted() {
    api.getAuthUser().then((response) => {
      if (response) {
        this.updateAuthUser(response.data)
      }
    })
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
