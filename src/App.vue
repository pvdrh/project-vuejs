<template>
  <div id="app">
<!--    <LoginLayout v-if="!checkLogin"/>-->
<!--    <AdminLayout v-else/>-->
    <router-view/>
  </div>
</template>

<script>
  // import LoginLayout from "@/layouts/LoginLayout";
  // import AdminLayout from "@/layouts/AdminLayout";
  export default {
    components: {
      // LoginLayout,
      // AdminLayout
    },
    data() {
      return {
        checkLogin: false,
      }
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
