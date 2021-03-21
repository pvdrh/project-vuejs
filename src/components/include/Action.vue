<template>
  <div class="small-modal is-shown" :style="{left: offset.left+'px', top: offset.top+'px'}" data-elevation="1">
    <div class="no-back">
      <div class="header js-pop-over-header"><span class="header-title el-icon-setting"> Tùy Chọn</span>
        <a @click="closeAction"
           class="btn-close icon-sm icon-close" ><i class="el-icon-close"></i></a>
      </div>
      <div>
        <div style="max-height: 480px;" class="conten js-pop-over-content u-fancy-scrollbar js-tab-parent">
          <div>
            <div>
              <ul class="pop-over-list">
                <li><a @click="deleteList" class="js-close-list remove-list el-icon-delete"> Xóa danh sách.</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Action",
  props: ['offset'],
  methods:{
    deleteList(){
      this.$emit('deleteList',this.offset.id)
    },
    closeAction(){
      this.$emit('closeAction')
    }
  }
}
</script>

<style scoped lang="scss">
.small-modal {
  background: white;
  border-radius: 5px;
  overflow: hidden;
  position: absolute;
  width: 180px;
  z-index: 9999;
  box-shadow: 0 8px 16px -4px rgb(9 30 66 / 30%), 0 0 0 2px rgb(9 30 66 / 10%);

  .no-back {
    .header {
      height: 50px;
      position: relative;
      margin-bottom: 10px;
      text-align: center;

      .header-title {
        box-sizing: border-box;
        border-bottom: 1px solid rgba(9, 30, 66, 0.25);
        color: gray;
        z-index: 1;
        display: block;
        line-height: 40px;
        margin: 0 12px;
        overflow: hidden;
        padding: 0 32px;
        position: relative;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .btn-close {
        color: gray;
        padding: 10px 12px 10px 8px;
        position: absolute;
        top: 0;
        z-index: 2;
        height: 20px;
        font-size: 16px;
        cursor: pointer;
        line-height: 20px;
        width: 20px;
        display: inline-block;
        right: 0;
        text-align: center;
        text-decoration: none;
        vertical-align: bottom;
      }
    }

    div {
      .conten {
        max-height: 360px;
        overflow-x: hidden;
        overflow-y: auto;
        padding: 0 12px 12px;

        div {
          div {
            .pop-over-list {
              list-style: none;
              margin: 0;
              padding: 0;
              text-align: left;

              li {
                display: list-item;
                text-align: -webkit-match-parent;

                a {
                  cursor: pointer;
                  display: block;
                  padding: 6px 12px;
                  position: relative;
                  margin: 0 -12px;
                  text-decoration: none;
                }
              }
            }
          }
        }
      }

      .conten::-webkit-scrollbar {
        height: 6px;
        width: 6px;
      }

      .conten::-webkit-scrollbar-track {
        border-radius: 7px;
        background-color: gray;
      }

      .conten::-webkit-scrollbar-thumb {
        background: gray;
        border-radius: 7px;
      }

      .conten::-webkit-scrollbar-thumb:hover {
        background: rgb(99, 96, 96);
      }
    }
  }
}
</style>