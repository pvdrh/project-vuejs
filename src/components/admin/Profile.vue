<template>
  <AdminLayout>
    <template #main>
      <div class="header">
        <span class="title">Thông Tin Tài Khoản</span>
      </div>
          <div class="content">
            <div class="profile">
              <div class="changeProfile">
                <div class="profileAvatar">
                  <h3>Ảnh đại diện</h3>
                  <div class="avatar">
                    <img :src="profile.avatar">
                  </div>
                </div>
                <form>
                  <div class="label">
                    <span>Họ và tên</span>
                  </div>
                  <div>
                    <input class="formControl" type="text" :value="authUser.name">
                  </div>
                  <div class="label">
                    <span>Email</span>
                  </div>
                  <div>
                    <input class="formControl" type="text" :value="authUser.email">
                  </div>
                  <button style="border-radius:25px">Lưu</button>
                </form>
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
  .header {
    margin: 0 auto;
    justify-content: center;
    display: flex;
    flex-direction: column;
    padding: 20px;
    position: relative;

      .title {
        font-size: 36px;
        margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px 0;
        }
    }

    .profile {
      width: 100%;
      max-width: 400px;
      display: flex;
      flex-direction: column;
      margin: auto;
      text-align: left;
      background-color: white;
      padding: 20px;
      border-radius: 30px;
      
      .changeProfile{
        justify-content: space-between;
        flex-direction: row-reverse;

        .profileAvatar{
          align-items: center;
          display: flex;
          flex-direction: column;
          margin-right: 4px;
          margin-top: 16px;

          .avatar{
            border-radius: 50%;
            overflow: hidden;
            position: relative;
            cursor: pointer;
            img{
              height: 100px;
              width: 100px;
              line-height: 100px;
            }
          }
        }

        form{
          display: flex;
          flex-direction: column;
          flex: 0 0 355px;

          .label{
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

            input{
              outline: none;
              border: none;
              box-sizing: border-box;
              border-radius: 20px;
              padding: 8px 12px;
              font-size: 14px;
              margin-bottom: 0;
              width: 100%;
              box-shadow: inset 0 0 0 1px rgb(160, 160, 160);
            }

          button{
            margin-top: 40px;
            margin-right: 0;
            background-color: #42b72a;
            box-shadow: none;
            border: none;
            color: white;
            outline: 0;
            padding: 5px;
            font-size: 14px;
            box-sizing: border-box;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
            cursor: pointer;
          }
        }
      }
    }
</style>