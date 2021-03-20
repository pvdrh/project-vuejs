<template>
  <AdminLayout>
    <template #main>
      <div class="main-header">
        <div class="headerWarp">
          <div class="infoWarp">
           <p>Thông Tin Tài Khoản</p>
          </div>
        </div>
      </div>
      <div class="main-content">
        <div class="mainWrap">
          <div class="content">
            <div class="profile">
              <div class="changeProfile">
                <div class="profileAvatar">
                  <h3>Ảnh đại diện</h3>
                  <div class="avatarCover">
                    <img v-if="authUser.avatar!=null" :src="authUser.avatar" alt="">
                    <img v-else :src="profile.avatar" alt="">
                  </div>
                  <button class="changeAvatar">Thay đổi</button>
                </div>
                <form class="profileForm" action="">
                  <div class="subLabel">
                    <span>Họ và tên</span>
                  </div>
                  <div class="formInput">
                    <input class="formControl" type="text" :value="authUser.name">
                  </div>
                  <div class="subLabel">
                    <span>Email</span>
                  </div>
                  <div class="formInput">
                    <input class="formControl" type="text" :value="authUser.email">
                  </div>
                  <button class="saveProfile">Lưu</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </AdminLayout>
</template>

<script>
import AdminLayout from "@/layouts/AdminLayout";
import {mapState} from "vuex";
export default {
  name: "Profile",
  components: {
    AdminLayout
  },
  computed:{
    ...mapState('auth',[
        'authUser'
    ]),
    ...mapState('profile',[
        'profile'
    ]),
  }
}
</script>

<style scoped lang="scss">
.main-header {
  .headerWarp {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    max-width: 500px;
    position: relative;
    .infoWarp {
     font-size: 32px;
     font-weight: 600;
    }
  }
}
.saveProfile{
  border-radius: 25px !important;
}
.main-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 10 px;
  position: relative;
  .mainWrap {
    .profile {
      width: 100%;
      max-width: 400px;
      display: flex;
      flex-direction: column;
      margin: auto;
      text-align: left;
      background-color: white;
      padding: 20px;
      border-radius: 25px;
      .bannerProfile {
        display: block;
        margin: 18px auto 42px;
        max-width: 100%;
        height: auto;
      }
      h1 {
        font-size: 24px;
        font-weight: 600;
        line-height: 28px;
        margin-top: 0px;
        margin-bottom: 10px;
      }
      p {
        color: #5e6c84;
        font-size: 14px;
        line-height: 18px;
        margin-bottom: 8px;
        white-space: pre-line;
      }
      h3{
        color: #172b4d;
        font-size: 20px;
        letter-spacing: -.008em;
        font-weight: 500;
        line-height: 26px;
        margin-top: 40px;
      }
      hr{
        margin-top: 0;
        margin-bottom: 15px;
      }
      .changeProfile{
        justify-content: space-between;
        flex-direction: row-reverse;
        .profileAvatar{
          align-items: center;
          display: flex;
          flex-direction: column;
          margin-right: 4px;
          margin-top: 16px;
          h3{
            color: #172b4d;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: -.003em;
            line-height: 16px;
            margin-top: 0;
            margin-bottom: 12px;
          }
          .avatarCover{
            border-radius: 50%;
            cursor: pointer;
            overflow: hidden;
            position: relative;
            img{
              height: 100px;
              width: 100px;
              line-height: 100px;
            }
          }
          .changeAvatar{
            visibility: hidden;
          }
        }
        form{
          display: flex;
          flex-direction: column;
          flex: 0 0 355px;
          .subLabel{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 12px;
            margin-top: 0;
            span{
              font-size: 14px;
              font-weight: 600;
              line-height: 16px;
              margin-top: 0;
              padding-top: 16px;
            }
          }
          .formInput{
            width: 100%;
            input{
              outline: none;
              border: none;
              box-sizing: border-box; 
              line-height: 20px;
              font-weight: 400;
              transition-property: background-color,border-color,box-shadow;
              transition-duration: 85ms;
              transition-timing-function: ease;
              border-radius: 3px;
              padding: 8px 12px;
              box-shadow: inset 0 0 0 2px #dfe1e6;
              background-color: #fafbfc;
              margin-bottom: 0;
              width: 100%;
            }
          }
          button{
            margin-top: 50px;
            margin-right: 0;
            background-color: #42b72a;
            box-shadow: none;
            border: none;
            color: white;
            outline: 0;
            box-sizing: border-box;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            padding: 6px 12px;
          }
        }
      }
    }
  }
}
</style>