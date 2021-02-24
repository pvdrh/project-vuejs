<template>
  <div class="profileWrap">
    <div class="page-header">
      <div class="page-title">
        Thông tin tài khoản
      </div>
    </div>
    <div class="main-content">
      <div class="user-profile">
       Đây là thông tin tài khoản 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {

  }
}
</script>

<style lang="scss" scoped>
.profileWrap {
  height: 95vh;
  .page-header {
    height: 100vh;
    overflow: hidden;
    .page-title {
      margin: 0 auto;
      padding: 7px;
      float: left;
      background: #cfcfcf;
      color: white;
      border-radius: 5px;
      cursor: pointer;
    }
  }
  .main-content {
    margin: 0 7px;
    .user-profile {
      width: 900px;
      height: 400px;
      background: #c7d3e0;
    }
  }
  .user-profile{
    border-radius: 5px;
    background-color: #cfcfcf;
    margin: 0 auto;
  }
}
</style>
