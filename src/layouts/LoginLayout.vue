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
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0093e9;
  background-image: url("../assets/image/bg-login.jpg"), linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
}

</style>