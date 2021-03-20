<template>
  <div class="checklist">
    <div class="window-module-title"><span
        class="window-module-title-icon icon-lg icon-checklist"><i
        class="el-icon-folder-checked"></i></span>
      <div class="editable" attr="name">
        <h3 class="current" dir="auto" v-if="!showEditCheckList" @click="showEditCheckList = !showEditCheckList">
          {{ checkList.title }}</h3>
        <div class="window-module-title-options" v-if="!showEditCheckList">
          <a class="nch-button" @click="deleteChecklist"
             href="#" style="margin: 0">Xóa</a>
        </div>
        <div class="edit edit-heavy" v-if="showEditCheckList">
          <textarea-autosize
              :value="checkListTitle"
              class="description-draft"
              placeholder="Thêm mô tả chi tiết hơn..."
              ref="checklistCard"
              id="checklistCard"
              :min-height="30"/>
          <div class="checklist-title-edit-controls u-clearfix"><input
              class="nch-button nch-button--primary confirm mod-submit-edit js-save-checklist-title"
              type="submit" value="Lưu" @click="updateCheckListTitle">
            <a class="icon-lg icon-close dark-hover cancel js-cancel-checklist-title" @click="closeShowEditCheckList">
              <i class="el-icon-close"></i>
            </a></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import api from "../../api"

export default {
  name: "CheckList",
  props: ['checkList', 'card'],
  components: {
  },
  methods: {
    updateCheckListTitle() {
      let data = {
        title: document.getElementById('checklistCard').value
      }
      api.updateCheckListTitle(data, this.checkList.id).then(() => {
        this.showEditCheckList = false
        this.$emit('updateCheckList')
      })
    },
    deleteChecklist() {
      api.deleteChecklist(this.checkList.id).then(() => {
        this.$emit('updateCheckList')
      })
    },
    closeShowEditCheckList() {
      this.showEditCheckList = false
    },
    loadTitle() {
      this.checkListTitle = this.checkList.title
    },
    updateCheckList(){
      this.$emit('updateCheckList')
    }
  },
  data() {
    return {
      showEditCheckList: false,
      checkListTitle: '',
    }
  },
  mounted() {
    this.loadTitle()
  },
  updated() {
    this.loadTitle()
  }
}
</script>

<style scoped lang="scss">
.checklist {
  display: block;
  float: left;
  padding-bottom: 9px;
  z-index: 50;
  width: 100%;
  .window-module-title {
    display: flex;
    align-items: center;
    min-height: 32px;
    border-bottom: none;
    padding: 8px 0;
    position: relative;
    margin: 0 0 4px 40px;
    .window-module-title-icon {
      left: -40px;
      position: absolute;
      top: 8px;
      color: #42526e;
      height: 32px;
      line-height: 32px;
      width: 32px;
      font-size: 24px;
      text-align: center;
      text-decoration: none;
      vertical-align: bottom;
      display: inline-block;
      font-family: trellicons;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      i {
        font-weight: 600;
      }
    }
    .editable {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-flow: row wrap;
      cursor: auto;
      h3 {
        display: inline-block;
        width: auto;
        margin: 0;
        min-height: 18px;
        min-width: 40px;
      }
      .window-module-title-options {
        margin: 0 2px 0 auto;
        float: right;
      }
      .edit-heavy {
        display: block;
        float: left;
        padding-bottom: 9px;
        z-index: 50;
        width: 100%;
        textarea {
          background-color: #fff;
          box-shadow: inset 0 0 0 2px #0079bf;
          color: #172b4d;
          cursor: text;
          width: 100%;
          resize: vertical;
          float: none;
          display: block;
          padding-bottom: 9px;
          z-index: 50;
          text-align: initial;
          text-decoration: none;
          min-height: 32px;
          margin: 4px 0 0;
          position: relative;
          outline: none;
          border: none;
          box-sizing: border-box;
          padding: 8px 12px;
          transition-property: background-color, border-color, box-shadow;
          transition-duration: 85ms;
          transition-timing-function: ease;
          line-height: 20px;
          margin-bottom: 10px;
        }
        .checklist-title-edit-controls{
          input{
            float: left;
            margin: 0 4px 0 0;
            background-color: #5aac44;
            box-shadow: none;
            border: none;
            color: #fff;
          }
          input:hover {
            background-color: #61bd4f;
          }
          a {
            margin-left: 5px;
            color: #6b778c;
            font-size: 28px;
            font-weight: 600;
            cursor: pointer;
          }
          a:hover {
            color: #172b4d;
          }
        }
      }
    }
  }
  .checklist-progress{
    margin-bottom: 6px;
    position: relative;
  }
  .checklist-items-list{
    min-height: 8px;
  }
  .editable{
    .new-checklist-item-button{
      margin-top: 8px;
    }
  }
  .checklist-new-item{
    margin-left: 40px;
  }
}
</style>