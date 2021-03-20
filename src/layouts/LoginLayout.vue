<template>
  <div class="login">
    <slot name="login"></slot>
  </div>
</template>

<script>
export default {
  name: "LoginLayout"
}
</script>

<style scoped>
.login{
  height: 100vh;
  overflow: auto;
  background-image: url("../assets/image/bg-login.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>