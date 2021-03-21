<template>
  <div class="pop-over is-shown" :style="{left: offset.left+'px', top: offset.top+'px'}" data-elevation="2">
    <div class="no-back">
      <div class="pop-over-header js-pop-over-header"><span class="pop-over-header-title">Sửa Tệp đính kèm</span><a
          href="#" class="pop-over-header-close-btn icon-sm icon-close"></a></div>
      <div>
        <div class="pop-over-content js-pop-over-content u-fancy-scrollbar js-tab-parent" style="max-height: 351px;">
          <div>
            <div>
              <form>
                <label>Liên kết tên
                  <input class="js-attachment-name js-autofocus" type="text"
                                          v-model="title">
                </label>
                <input
                  class="js-edit-attachment wide nch-button nch-button--primary" style="margin: 0;" type="submit"
                  value="Cập nhật">
                <div class="hide save-attachment-container"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditFile",
  props: ['offset'],
  data() {
    return {
      title: '',
    }
  },
  mounted() {
    this.title = this.offset.file.name
  }
}
</script>

<style scoped lang="scss">
.window-sidebar {
  float: right;
  padding: 0 16px 8px 8px;
  width: 168px;
  overflow: hidden;
  z-index: 10;

  .window-module {
    clear: both;
    margin-bottom: 24px;
    position: relative;

    h3 {
      margin-top: 0;
      color: #5e6c84;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: .04em;
      text-transform: uppercase;
      line-height: 20px;
      margin-bottom: -4px;
    }

    .u-clearfix {
      .remove-sidebar {
        background-color: #EB5A46;
        color: #fff !important;
      }

      .remove-sidebar:hover {
        background-color: #EB5A46 !important;
      }

      .datetime-btn {
        position: relative;

        .el-date-editor {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;

          input {
            cursor: pointer !important;
          }
        }
      }

      a:visited {
        color: #172b4d;
      }

      .btn-upload {
        cursor: pointer;
        position: relative;

        .uploadFile {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }
      }

      .icon-sm {
        height: 20px;
        font-size: 16px;
        line-height: 20px;
        width: 20px;
        margin: 0 6px 0 -6px;
      }
    }
  }
}
</style>