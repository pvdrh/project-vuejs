<template>
  <div class="pop-over is-shown" :style="{left: offset.left+'px', top: offset.top+'px'}" data-elevation="1">
    <div class="no-back">
      <div class="pop-over-header js-pop-over-header"><span class="header"><i class="el-icon-loading"></i> Tùy Chọn</span>
        <a class="x icon-sm icon-close" @click="closeAction"><i class="el-icon-close"></i></a>
      </div>
      <div>
        <div class="content js-content u-fancy-scrollbar js-tab-parent" style="max-height: 475px;">
          <div>
            <div>
              <ul class="pop-over-list">
                <li><a class="js-close-list remove-list el-icon-delete" @click="deleteList"> Xóa danh sách</a></li>
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
    closeAction(){
      this.$emit('closeAction')
    },
    deleteList(){
      this.$emit('deleteList',this.offset.id)
    }
  }
}
</script>

<style scoped lang="scss">
.pop-over {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  position: absolute;
  width: 200px;
  .no-back {
    .pop-over-header {
      margin-bottom: 10px;
      height: 40px;
      position: relative;
      text-align: center;
      .header {
        overflow: hidden;
        box-sizing: border-box;
        display: block;
        line-height: 40px;
        border-bottom: 1px solid gray;
        margin: 0 16px;
        position: relative;
        text-overflow: ellipsis;
      }
      .x {
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0;
        padding: 10px 12px 10px 8px;
        height: 20px;
        font-size: 18px;
        line-height: 20px;
        width: 20px;
        display: inline-block;
        text-align: center;
        text-decoration: none;
        vertical-align: bottom;
      }
    }
    div {
      .content {
        max-height: 368px;
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
              }
            }
          }
        }
      }

    //Thanh cuộn
      .content::-webkit-scrollbar {
        width: 5px;
      }
      .content::-webkit-scrollbar-track {
        border-radius: 5px;
        background-color: #93C5FD;
      }
      .content::-webkit-scrollbar-thumb {
        background: #9CA3AF;
        border-radius: 5px;
      }
      .content::-webkit-scrollbar-thumb:hover {
        background: #4a4a727d;
      }
    }
  }
}
</style>