<template>
  <div>
    <el-dialog
        :visible.sync="dialogVisible"
        width="40%"
        style="text-align: left;">
      <el-row>
        <el-col :span="18">
          <div class="detail-card-header">
            <i class="el-icon-bank-card"></i>
            <input type="text" v-model="card.title" class="detail-card-title" @keydown.enter="updateCardName">
          </div>
          <el-row>
            <el-col :span="22">
              <div v-if="card.labels" class="" style="margin-bottom: 10px">
                <div style="margin-bottom: 5px">NHÃN</div>
                <el-tag v-for="(label, index) in card.labels" :key="index"
                        :color="label.color"
                        effect="dark"
                        style="margin-right: 5px; border: 0">
                  {{label.name}}
                </el-tag>
              </div>
              <div class="deadline" v-if="card.deadline">
                <div style="margin-bottom: 5px">NGÀY HẾT HẠN</div>
                <el-checkbox v-model="deadlineStatus" @change="handleChangeDeadlineStatus">
                  <div class="card-action-btn" style="padding-right: 7px">
                    {{formatDate(card.deadline)}}
                    <div class="status-deadline-fail" v-if="formatDate(deadline) < moment(new Date()).format('YYYY-MM-DD HH:mm:ss') && card.status == 0">QUÁ HẠN</div>
                    <div class="status-deadline-success" v-else-if="card.status ==1">HOÀN TẤT</div>
                  </div>
                </el-checkbox>
              </div>
            </el-col>
          </el-row>
          <el-row style="" class="card-info">
            <el-col :span="2" style="font-size: 20px">
              <i class="el-icon-tickets"></i>
            </el-col>
            <el-col :span="22" style="padding-right: 18px" id="description">
              <div class="card-info-title">
                Mô tả
                <el-button size="small" style="padding: 5px 10px; margin-left: 5px" @click="openEditCardDescription" plain>Chỉnh sửa</el-button>
              </div>
              <div v-if="card.description" class="card-description" ref="description">
                {{ card.description }}
              </div>
              <div v-else class="add-card-description" ref="cardDescriptionBtn" @click="openEditCardDescription">
                Thêm mổ tả chi tiết...
              </div>
              <textarea ref="cardDescription" v-model="carDescription" class="add-card-description-textarea"
                        @blur="updateCardDescription"></textarea>
            </el-col>
          </el-row>
          <el-row style="" class="card-info" v-for="(checkList, index) in card.check_lists" :key="index">
            <el-col :span="2" style="font-size: 20px">
              <i class="el-icon-s-claim"> </i>
            </el-col>
            <el-col :span="22" style="padding-right: 18px">
              <div class="card-info-title">
                {{checkList.title}}
                <el-button size="small" style="padding: 5px 10px; margin-left: 5px; float: right" @click="handleDeleteCheckList(checkList.id)" plain>Xóa</el-button>
              </div>
              <el-progress :percentage="checkPercentComplete(checkList.check_list_childs)" style="margin-bottom: 15px"></el-progress>
              <div class="check-list-childs" v-for="(child, index) in checkList.check_list_childs" :key="index">
                <el-checkbox v-if="child.status == 1" v-model="child.status" checked @change="changeStatusCheckListChild(child.id, child.status)">{{child.title}}</el-checkbox>
                <el-checkbox v-else v-model="child.status" @change="changeStatusCheckListChild(child.id, child.status)">{{child.title}}</el-checkbox>
              </div>
              <input v-if="addSubCheckList" type="text" class="input-sub-check-list" placeholder="Thêm một mục" ref="inputSubCheckList" v-model="subCheckListName">
              <div v-if="addSubCheckList" ref="btnSubCheckList">
                <el-button size="small" @click="closeAddSubCheckList">Hủy</el-button>
                <el-button size="small" type="success" @click="handleCreateSubCheckList(checkList.id)">Thêm</el-button>
              </div>
              <div v-if="!addSubCheckList" class="card-action-btn" ref="btnAddSubCheckList" style="width: 110px" @click="openAddSubCheckList">
                Thêm một mục
              </div>
            </el-col>
          </el-row>
          <el-row style="" class="card-info">
            <el-col :span="2" style="font-size: 20px">
              <i class="el-icon-paperclip"></i>
            </el-col>
            <el-col :span="22" style="padding-right: 18px">
              <div class="card-info-title">
                Các tập tin đính kèm
              </div>
              <div class="file-item" v-for="file in card.files" :key="file.id">
                <img class="card-files" :src="baseFileUrl + file.path" alt="">
                <div class="card-files-info">
                  <div class="file-name">{{file.name}}</div>
                  <el-popover
                      placement="top"
                      width="160"
                      v-model="deleteFilePop">
                    <p>Bạn có chắn chắn muốn xóa?</p>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="info" @click="deleteFilePop = false">Hủy</el-button>
                      <el-button type="danger" size="mini" @click="handleDeleteFile(file.id)">Xóa</el-button>
                    </div>
                    <el-link type="info" slot="reference">Xóa</el-link>
                  </el-popover>
                  <el-popover
                      placement="top-start"
                      width="280"
                      trigger="click"
                      >
                    <div class="add-labels">
                      <div class="add-labels-header">
                        Sửa tệp đính kèm
                      </div>
                      <div class="form-add-labels" style="display: block">
                        Tên liên kết
                        <br>
                        <input type="text" class="label-name" ref="inputLabel" v-model="fileName" >
                        <el-button type="success" size="small" @click="handleChangeFileName(file.id)">Cập nhật</el-button>
                      </div>
                    </div>
                    <el-link type="info" slot="reference" @click="openChangeFileName(file.name)">Chỉnh sửa</el-link>
                  </el-popover>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="card-info">
          <div style="margin-bottom: 7px">THÊM VÀO THẺ</div>
          <el-popover
              placement="bottom"
              width="3280"
              trigger="click">
            <div class="add-labels">
              <div class="add-labels-header">
                Nhãn
              </div>
              <div ref="listLabel">
                <div class="card-action-btn" style="justify-content: center; margin-top: 15px; font-size:14px" @click="openFromAddlabel">
                  Thêm nhãn mới
                </div>
                <div v-for="label in labels" :key="label.id">
                  <el-tag
                      :color="label.color"
                      style="width: 87%; margin: 0 12px 3px 0; color: #ffffff; font-family: Arial; cursor: pointer"
                      @click="addExitsLabel(label.id)">{{label.name}}</el-tag>
                  <i class="el-icon-edit" style="cursor: pointer" @click="openFromEditlabel(label.name, label.id)"></i>
                </div>
              </div>
              <div class="form-add-labels" style="margin-bottom:5px" ref="formAddLabel">
                Tên
                <br>
                <input type="text" class="label-name" ref="inputLabel" v-model="labelName">
                <p style="margin: 0 0 5px 0">Chọn một màu</p>
                <div class="labels-color" style="background-color: #34D399" @click="selectlabelColor('#34D399')"><i class="check-color el-icon-check"></i></div>
                <div class="labels-color" style="background-color: #FACC15" @click="selectlabelColor('#FACC15')"><i class="check-color el-icon-check"></i></div>
                <div class="labels-color" style="background-color: #FB923C" @click="selectlabelColor('#FB923C')"><i class="check-color el-icon-check"></i></div>
                <div class="labels-color" style="background-color: #F87171" @click="selectlabelColor('#F87171')"><i class="check-color el-icon-check"></i></div>
                <div class="labels-color" style="background-color: #A78BFA" @click="selectlabelColor('#A78BFA')"><i class="check-color el-icon-check"></i></div>
                <div class="labels-color" style="background-color: #60A5FA" @click="selectlabelColor('#60A5FA')"><i class="check-color el-icon-check"></i></div>
                <div class="labels-color" style="background-color: #34d3ce" @click="selectlabelColor('#34d3ce')"><i class="check-color el-icon-check"></i></div>
                <div class="labels-color" style="background-color: #51e87c" @click="selectlabelColor('#51e87c')"><i class="check-color el-icon-check"></i></div>
                <div class="labels-color" style="background-color: #F472B6" @click="selectlabelColor('#F472B6')"><i class="check-color el-icon-check"></i></div>
                <div class="labels-color" style="background-color: #34363b" @click="selectlabelColor('#34363b')"><i class="check-color el-icon-check"></i></div>
                <el-button class="btn-save-label" type="success" size="small" @click="addLabel">Tạo mới</el-button>
                <el-button class="btn-save-label" type="info" size="small" @click="cancelFromAddlabel">Hủy</el-button>
              </div>
              <div class="form-add-labels" ref="formEditLabel">
                Tên
                <br>
                <input type="text" class="label-name" ref="inputLabel" v-model="labelNameEdit">
                <el-button class="btn-save-label" type="danger" size="small" @click="handleDeleteLabel(labelId)">Xóa</el-button>
                <el-button class="btn-save-label" type="info" size="small" @click="cancelFromEditlabel">Huỷ</el-button>
              </div>
            </div>
            <div class="card-action-btn" slot="reference">
              <i class="el-icon-collection-tag" style="margin-right: 7px"> </i>
              Nhãn
            </div>
          </el-popover>
          <el-popover
              placement="bottom"
              width="300"
              trigger="click">
            <div class="add-labels">
              <div class="add-labels-header">
                Thêm danh sách công việc
              </div>
              <div class="form-add-labels" style="display: block">
                Tiêu đề
                <br>
                <input type="text" class="label-name" v-model="checkListName">
                <el-button class="btn-save-label" type="success" size="small" @click="addCheckList">Thêm</el-button>
              </div>
            </div>
            <div class="card-action-btn" slot="reference">
              <i class="el-icon-s-claim" style="margin-right: 7px"> </i>
              Việc cần làm
            </div>
          </el-popover>
          <div class="card-action-btn">
            <i class="el-icon-time" style="margin-right: 7px"> </i>
            Ngày hết hạn
            <el-date-picker
                v-model="deadline"
                type="datetime"
                size="mini"
                @change="updateDeadline">
            </el-date-picker>
          </div>
          <label for="file">
            <div class="card-action-btn">
              <i class="el-icon-link" style="margin-right: 7px"> </i>
              Đính kèm
            </div>
          </label>
          <input style="display: none" ref="file" type="file" accept="image/*" id="file" @change="handleUploadFile">
        </el-col>
      </el-row>
    </el-dialog>
    <div class="card" ref="card" @mouseover="cardHover" @mouseleave="cardHoverOut">
      <div class="card-more" ref="cardMore" @click="handleDeleteCard" slot="reference"><i class="el-icon-delete"></i></div>
      <div class="card-content" @click="openDetailCard">
        <div class="card-labels">
          <el-tag v-for="(label, index) in card.labels" :key="index"
                  :color="label.color"
                  effect="dark"
                  style="margin-right: 5px; border: 0">
          </el-tag>
        </div>
        <div class="card-name">
          <div style="width: 100%;">{{card.title}}</div>
        </div>
        <div class="status-deadline-fail" style="width: 64px; display:inline-block; margin: 0 0 4px 0; font-size: 14px" v-if="formatDate(deadline) < moment(new Date()).format('YYYY-MM-DD HH:mm:ss') && card.status == 0"><i class="el-icon-time"></i> {{fomatDateCard(card.deadline)}}</div>
        <div class="status-deadline-success" style="width: 64px; display:inline-block; margin: 0 0 4px 0; font-size: 14px" v-else-if="card.status ==1"><i class="el-icon-time"></i> {{fomatDateCard(card.deadline)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import moment from 'moment'

export default {
  props: ['cardId'],
name: "Card",
  components: {
  },
  data () {
    return {
      cardName: '',
      newCard: [],
      dialogVisible: false,
      labels: [],
      carDescription: false,
      labelName: '',
      labelNameEdit: '',
      labelColor: '',
      labelId: '',
      cards: [],
      deadline: '',
      checkListName: '',
      card: [],
      subCheckListName: '',
      addSubCheckList: false,
      deadlineStatus: '',
      fileName: '',
      popoverFile: false,
      popoverLabel: false,
      deleteFilePop: false,
      baseFileUrl: 'http://vuecourse.zent.edu.vn/storage/',
    }
  },
  methods: {
    openDetailCard() {
      this.dialogVisible = true
      console.log(this.card)
      api.getLabels().then((response) => {
        this.labels = response.data.data
      })
    },
    updateCardName() {
      let data = {
        title: this.card.title
      }
      api.editCard(this.card.id, data).then(() => {
        this.$message({
          message: 'Thành công!',
          type: 'success',
          center:true
        });
      })
    },
    openEditCardDescription() {
      if (!this.card.description) {
        this.$refs.cardDescriptionBtn.style.display = 'none'
      }
      if (this.card.description) {
        this.$refs.description.style.display = 'none'
      }
      this.$refs.cardDescription.style.display = 'block'
    },
    updateCardDescription() {
      let data = {
        description: this.carDescription
      }
      api.editCard(this.card.id, data).then(() => {
        this.$message({
          message: 'Thành công!',
          type: 'success',
          center:true
        });
        this.getDetailCard()
        this.$refs.cardDescription.style.display = 'none'
      })
    },
    selectlabelColor(color) {
      this.$refs.inputLabel.style.background = color
      this.$refs.inputLabel.style.color = '#ffffff'
      this.$refs.inputLabel.style.border = '#ffffff'
      this.labelColor = color
    },
    addLabel() {
      if (this.labelName && this.labelColor) {
        let data = {
          name: this.labelName,
          color: this.labelColor
        }
        api.createLabel(this.card.id, data).then((response) => {
          console.log(response)
          this.labelName = ''
          this.labelColor = ''
          this.$refs.inputLabel.style.background = '#ffffff'
          this.$refs.inputLabel.style.color = '#000000'
          this.$refs.inputLabel.style.border = '#000000'
          this.getDetailCard()
          this.dialogVisible = true
        })
      }
    },
    addCheckList() {
      let data = {
        title: this.checkListName,
        card_id: this.card.id
      }
      api.createChecklist(data).then(() => {
        this.getDetailCard()
      })
    },
    handleDeleteCheckList(id) {
      api.deleteCheckList(id).then(() => {
        this.getDetailCard()
      })
    },
    openAddSubCheckList() {
      this.addSubCheckList = true
    },
    handleCreateSubCheckList(id) {
      if (this.subCheckListName != '') {
        let data = {
          title: this.subCheckListName,
          check_list_id: id
        }
        api.createSubCheckList(data).then(() => {
          this.getDetailCard()
          this.addSubCheckList = false
          this.subCheckListName = ''
        })
      }
    },
    closeAddSubCheckList() {
      this.addSubCheckList = false
    },
    changeStatusCheckListChild(id, status) {
      if (status) {
        status = 1
      } else {
        status = 0
      }
      let data = {
        status: status
      }
      api.updateStatusCheckListChild(id, data).then(() => {

      })
    },
    checkPercentComplete(arr) {
      let totalChildrenWork = arr.length;
      let a = 0;
      if(arr.length !== 0) {
        arr.forEach((item) => {
          if(item.status == 1) {
            a = a + 1;
          }
        })
        return Math.ceil(a / totalChildrenWork * 100)
      } else {
        return 0
      }
    },
    getDetailCard() {
      api.detailCard(this.cardId).then((response) => {
        this.card = response.data.data
        this.carDescription = response.data.data.description
        if (this.card.status == 1) {
          this.deadlineStatus = true
        } else {
          this.deadlineStatus = false
        }
      })
    },
    cardHover() {
      this.$refs.cardMore.style.display = 'block'
    },
    cardHoverOut() {
      this.$refs.cardMore.style.display = 'none'
    },
    updateDeadline() {
      let data = {
        deadline: this.formatDate(this.deadline)
      }
      api.cardDeadline(this.card.id, data).then(() => {
        this.getDetailCard()
      })
    },
    formatDate (dateString) {
      return moment(dateString).format('YYYY-MM-DD HH:mm:ss')
    },
    fomatDateCard(date) {
      return moment(date).format('DD - MM')
    },
    handleChangeDeadlineStatus(event) {
      let data
      if (event) {
        data = {
          status: 1
        }
      } else {
        data = {
          status: 0
        }
      }
      api.updateCardStatus(this.card.id, data).then(() => {
        this.getDetailCard()
      })
    },
    handleUploadFile(event) {
      if (event.target.files.length) {
        const data = new FormData()
        data.append('file', event.target.files[0])
        api.uploadFile(this.card.id, data).then(() => {
          this.getDetailCard()
        })
      }
    },
    openChangeFileName(name) {
      this.fileName = name
    },
    handleChangeFileName(id) {
      let data = {
        name: this.fileName
      }
      api.changeFileName(id, data).then(() => {
        this.getDetailCard()
        this.popoverFile = false
      })
    },
    handleDeleteCard() {
      this.$confirm('Bạn có chắc chắn muốn xóa không?', 'Chú Ý', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
        confirmButtonClass: 'btn-delete-list',
        type: 'warning'
      }).then(() => {
        api.deleteCard(this.card.id).then(() => {
          this.$message({
            message: 'Xóa thành công.',
            type: 'success',
            center:true
          });
          this.$emit('reload')
        }).catch(() => {
          this.$message({
            message: 'Xóa thất bại!',
            type: 'error',
            center:true
          });
        })
      }).catch(() => {})
    },
    openFromAddlabel() {
      this.$refs.formAddLabel.style.display = 'block'
      this.$refs.listLabel.style.display = 'none'
    },
    cancelFromAddlabel() {
      this.$refs.formAddLabel.style.display = 'none'
      this.$refs.listLabel.style.display = 'block'
    },
    addExitsLabel(label_id) {
      let check = false
      this.card.labels.forEach((label) => {
        if(label.id === label_id) {
          check = true
        }
      })
      if (!check) {
        let data = {
          label_id: label_id
        }
        api.addLabel(this.card.id, data).then(() => {
          this.getDetailCard()
        })
      } else if (check) {
        let data = {
          label_id: label_id
        }
        api.removeLabelFromCard(this.card.id, data).then(() => {
          this.getDetailCard()
        })
      }
    },
    openFromEditlabel(labelName, labelId) {
      this.labelNameEdit = labelName
      this.$refs.formEditLabel.style.display = 'block'
      this.$refs.listLabel.style.display = 'none'
      this.labelId = labelId
    },
    cancelFromEditlabel() {
      this.$refs.formEditLabel.style.display = 'none'
      this.$refs.listLabel.style.display = 'block'
    },
    handleDeleteLabel(id) {
      api.deleteLabel(id).then(() => {
        this.getDetailCard()
        api.getLabels().then((response) => {
          this.labels = response.data.data
        })
        this.cancelFromEditlabel()
      })
    },
    handleDeleteFile(id) {
      this.deleteFilePop = false
      api.deleteFile(id).then(() => {
        this.getDetailCard()
      })
    }
  },
  mounted() {
    this.getDetailCard()
  }
}
</script>

<style lang="scss" scoped>
.detail-card-header {
    width: 95%;
    position: absolute;
    top: -40px;
    font-size: 21px;

    .detail-card-title {
      margin-left: 15px;
      font-size: 20px;
      border: none;
      height: 30px;
      width: 90%;
    }

    .detail-card-title:focus {
      margin-left: 15px;
      font-size: 20px;
      border: none;
      outline:none;
      height: 30px;
      width: 90%;
      box-shadow: inset 0 0 0 2px #c1c3c5;
    }
  }

  #description {
    position: relative;
  }

  .status-deadline-fail {
    color: white;
    padding: 1px;
    font-size: 12px;
    background-color: #ec9488;
    border-radius: 3px;
    margin-left: 7px;
  }

  .status-deadline-success {
    color: white;
    padding: 1px;
    font-size: 12px;
    background-color: #61bd4f;
    border-radius: 3px;
    margin-left: 7px;
  }

  .card-info {
    margin-top: 20px;

    .card-info-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 15px;
    }

    .card-description {
      width: 100%;
      max-height: 100px;
      overflow: auto;
      box-sizing: content-box;
    }

    .add-card-description {
      width: 100%;
      height: 56px;
      padding: 10px;
      box-sizing: border-box;
      background-color: rgba(9,30,66,.04);
      cursor: pointer;
      border-radius: 3px;
    }

    .add-card-description:hover {
      background-color: rgb(22 23 25 / 12%);
    }

    .add-card-description-textarea {
      width: 100%;
      height: 100px;
      padding: 10px;
      box-sizing: border-box;
      font-family: Arial;
      font-size: 14px;
      display: none;
      border:none;
      outline: none;
      box-shadow: inset 0 0 0 2px #dddddd;
    }

    .input-sub-check-list {
      width: 100%;
      height: 30px;
    }

    .check-list-childs {
      margin-bottom: 15px;
    }

    .card-files {
      width: 115px;
      height: 80px;
      border-radius: 3px;
    }

    .file-item {
      position: relative;
      margin-bottom: 10px;
      height: 80px;

      .card-files-info {
        width: 200px;
        position: absolute;
        top: 10px;
        left: 130px;

        .file-name {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 25px;
        }
      }
    }

    .file-item:hover {
      background-color: rgb(22 23 25 / 12%);
    }
  }

  .add-labels {
    height: auto;

    .add-labels-header {
      display: flex;align-items: center;
      justify-content: center;
      height: 30px;
      font-size: 14px;
      border-bottom: 1px solid rgb(9 30 66 / 40%);
      margin-bottom: 15px;
    }

    .form-add-labels {
      display: none;
      font-family: Arial;

      .label-name {
        width: 98%;
        height: 30px;
        display: block;
        margin: 5px 0 10px 0;
        box-sizing: border-box;
        padding-left: 10px;
        border-radius: 20px;
        border:none;
        outline: none;
        box-shadow: inset 0 0 0 2px #dddddd;
      }

      .labels-color {
        width: 55px;
        height: 32px;
        margin: 0 5px 5px 0;
        float: left;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;

        .check-color {
          display: none;
        }
      }

      .btn-save-label {
        margin-top: 10px;
      }
    }
  }

  .card-action-btn {
    width: 100%;
    height: 32px;
    border-radius: 3px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding-left: 7px;
    background-color: rgba(9,30,66,.04);
    margin-bottom: 7px;
    cursor: pointer;

    .el-date-editor {
      opacity: 0;
      position: absolute;
      width: 167px;
    }
  }

  .card-action-btn:hover {
    background-color: rgb(22 23 25 / 12%);
  }

  .drag-cards {
    overflow: auto;
    max-height: 400px;

    .card {
      padding-bottom: 15px;
      outline: none;
      border:none;
      cursor: pointer;
      position: relative;

      .card-content {
        min-height: 50px;
        height: auto;
        background-color: white;
        padding: 0 0 0 10px;
        border-radius: 3px;
        box-shadow: 0 1px 0 rgb(9 30 66 / 30%);
        align-items: center;

        .card-labels {
          width: 100%;

          .el-tag {
            height: 10px;
            width: 40px;
          }
        }

        .card-name {
          width: 100%;
          display: flex;
          align-items: center;
          height: 32px
        }
      }

      .card-content:hover {
        background-color: #f1f3fd;
      }

      .card-more {
        padding: 3px;
        width: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 20px;
        position: absolute;
        right: 2px;
        top: 2px;
        display: none;
        z-index: 100;
      }

      .card-more:hover {
        background-color: #ebecf0;
      }
    }
  }
</style>