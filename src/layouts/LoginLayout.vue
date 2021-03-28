<template>
  <div class="hello">
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginLayout"
}
</script>

<style scoped>
.container {
  height: 100vh;
  overflow: auto;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../assets/image/bg-login.jpg");
}
</style>