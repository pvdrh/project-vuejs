<template>
  <div class="container">
    <el-container class="adminWrap">
      <el-header class="adminHeader">
        <div class="header-container">
          <div class="header-left">left</div>
          <div class="header-center">center</div>
          <div class="header-right">
            <el-dropdown>
              <el-avatar
                  src="https://genk.mediacdn.vn/thumb_w/600/2015/screen-shot-2015-07-30-at-2-31-57-pm-1438334096188.png"></el-avatar>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>Thông tin</el-dropdown-item>
                <el-dropdown-item divided><router-link to="/login">Đăng xuất</router-link></el-dropdown-item>
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
export default {
  name: "AdminLayout"
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  overflow: auto;
  position: relative;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
background-color: green;
  .adminWrap {
    height: 100%;

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
        .header-right{
          .el-dropdown{
            .el-avatar{
              width: 30px;
              height: 30px;
            }
          }
        }
      }
    }

    .adminMain{
      padding: 15px;
    }
  }
}
</style>