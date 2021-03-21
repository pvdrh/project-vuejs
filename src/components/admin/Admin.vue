<template>
  <AdminLayout>
    <template #main>
      <div class="adminMainContent">
        <div class="main-content">
          <div class="listTodo">
            <draggable
                class="dragArea"
                :list="list"
                item-key="id"
                :animation="100"
                :move="moveList"
            >
              <List v-for="(item,index) in list" :id="item.id"
                    @closeControlModal="closeControlModal" :key="index"
                    @updateCardList="getDataList" @updateListTitle="handleUpdateList" @openActionList="openActionList"
                    @openDetailCard="openDetailCard"
                    :index="item.index" :item="item"/>
            </draggable>

            <div class="newList" v-if="!addList">
              <div class="btn-add" @click="newList">
                <i class="el-icon-plus plus"></i>
                <span>Thêm danh sách khác</span>
              </div>
            </div>
            <NewList v-if="addList" @addList="handleAddList"
                     @closeNewList="closeNewList"></NewList>
          </div>
        </div>
      </div>
      <ModalSidebar v-if="showControlModalSidebar" :card="card" :labels="labels" @closeLabelModal="closeControlModal"
                    :offset="offset" @reloadLabel="reloadLabel"/>
      <el-dialog v-if="dialogFormVisible" id="detailTodo" class="dialogTodo" :append-to-body="true" width="40%"
                 :show-close="false"
                 :visible.sync="dialogFormVisible" @close="closeModal">
        <div class="window-wrapper js-tab-parent" data-elevation="1"><a
            class="icon-md icon-close close-button js-close-window" @click="closeModal"><i
            class="iconColse el-icon-close"></i></a>
          <div class="card-detail-window u-clearfix">
            <div class="window-header"><span
                class="window-header-icon"><i class="iconBank el-icon-bank-card"></i></span>
              <div class="window-title">
                <textarea @keydown.enter="updateCardTitle" :value="cardTitle"></textarea>
              </div>
            </div>
            <div class="window-content">
              <div class="window-main-col">
                <div class="card-detail-data u-gutter">
                  <div v-if="cardDetail.labels.length>0"
                       class="card-detail-item card-detail-item-labels u-clearfix js-card-detail-labels">
                    <h3 class="card-detail-item-header">Nhãn</h3>
                    <div class="u-clearfix js-card-detail-labels-list js-edit-label">
                  <span v-for="(item,index) in cardDetail.labels" :key="index" @click="openControlLabel"
                        :class="['card-label-'+item.color]" class="card-label" :title="item.name">
                    <span class="label-text">{{ item.name }}</span>
                  </span>
                      <a class="card-detail-item-add-button" @click="openControlLabel">
                        <span class="icon-sm icon-add"><i class="el-icon-plus"></i></span>
                      </a>
                    </div>
                  </div>
                  <div v-if="cardDetail.deadline!=null" class="card-detail-item card-detail-due-date">
                    <h3 class="card-detail-item-header">Ngày hết hạn</h3>
                    <div class="card-detail-due-date-badge js-card-detail-due-date-badge is-clickable is-due-complete"
                         title="Thẻ này đã hoàn tất.">
                      <el-checkbox v-model="isComplete" @change="changeStatusTodo"></el-checkbox>
                      <div class="card-detail-badge-due-date-react-container">
                        <div class="card-deadline-badge">
                          <button class="deadline-badge datetime-btn"
                                  data-test-id="due-date-badge-with-date-range-picker" type="button">
                            <span>{{ formatDate(deadline) }}</span>
                            <span class="card-deadline-status card-complate" v-if="isComplete">Hoàn tất</span>
                            <span class="card-deadline-status card-die"
                                  v-if="!isComplete && isDeadline===2">Quá hạn</span>
                            <span class="card-deadline-status card-near-die"
                                  v-if="!isComplete && isDeadline===1">Gần đến hạn</span>
                            <span class="nch-icon">
                            <span class="" role="img" aria-label="DownIcon"><svg width="24" height="24"
                                                                                 role="presentation"
                                                                                 focusable="false"
                                                                                 viewBox="0 0 24 24"><path
                                d="M11.293 16.707l-7.071-7.07a1 1 0 111.414-1.415L12 14.586l6.364-6.364a1 1 0 111.414 1.414l-7.07 7.071a1 1 0 01-1.415 0z"
                                fill="currentColor"></path></svg></span></span>
                            <el-date-picker
                                type="datetime"
                                v-model="deadline"
                                @change="changeDeadlineModal"
                            >
                            </el-date-picker>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="plugin-detail-badges js-plugin-badges">
                    <div></div>
                  </div>
                  <div class="u-clearfix"></div>
                </div>
                <div class="fill-card-detail-desc">
                  <div>
                    <div class="window-module">
                      <div class="window-module-title window-module-title-no-divider description-title">
                    <span class="icon-description icon-lg window-module-title-icon">
                      <i class="el-icon-s-unfold"></i>
                    </span>
                        <h3 class="u-inline-block">Mô tả</h3>
                        <div class="editable" attr="desc"><a
                            class="nch-button ml-4 hide-on-edit js-show-with-desc js-edit-desc js-edit-desc-button hide"
                            @click="openEditDescription" v-if="!editDescriptionModal && cardDetail.description !=null">Chỉnh
                          sửa</a><span
                            class="editing-members-description js-editing-members-description hide"></span></div>
                      </div>
                      <div class="u-gutter">
                        <div class="editable" attr="desc">
                          <div class="description-content js-desc-content">
                            <div class="current markeddown hide-on-edit js-desc js-show-with-desc hide"
                                 dir="auto"></div>
                            <p v-if="!editDescriptionModal && cardDetail.description==null" @click="openEditDescription"
                               class="u-bottom js-hide-with-desc">
                              <a
                                  class="description-fake-text-area hide-on-edit js-edit-desc  js-hide-with-draft"
                                  href="#">Thêm
                                mô tả chi tiết hơn...</a></p>
                            <p v-if="!editDescriptionModal && cardDetail.description!=null" @click="openEditDescription"
                               class="u-bottom js-hide-with-desc">
                              <a
                                  class="description-fake-text-area hide-on-edit js-edit-desc  js-hide-with-draft"
                                  href="#">{{
                                  cardDetail.description
                                }}</a>
                            </p>
                            <div class="description-edit edit" v-if="editDescriptionModal">
                              <textarea-autosize
                                  id="descriptionCard"
                                  v-model="description"
                                  class="description-draft"
                                  placeholder="Thêm mô tả chi tiết hơn..."
                                  ref="descriptionCard"
                                  :min-height="30"
                                  @keydown.enter="updateCardDescription"
                              />
                              <div class="edit-controls u-clearfix"><input
                                  class="nch-button nch-button--primary confirm mod-submit-edit js-save-edit"
                                  type="submit"
                                  value="Lưu" @click="updateCardDescription">
                                <div class="btnCloseAddCard" @click="editDescriptionModal = false"><i
                                    class="el-icon-close"></i></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="cardDetail.files.length > 0" class="window-module attachments-section u-clearfix">
                  <div class="window-module-title window-module-title-no-divider">
                    <span
                        class="window-module-title-icon icon-lg icon-attachment"><i
                        class="el-icon-paperclip"></i></span>
                    <h3 class="u-inline-block">Các tập tin đính kèm</h3>
                  </div>
                  <div class="u-gutter">
                    <div class="u-clearfix attachment-list ui-sortable">
                      <File v-for="(item,index) in cardDetail.files" :file="item"
                            @updateCardDetail="getDetailCard(cardDetail.id)"  @showEditFile="openEditFile" :key="index"/>
                    </div>
                  </div>
                </div>
                <div v-if="cardDetail.check_lists.length > 0"
                     class="checklist-list window-module js-checklist-list js-no-higher-edits ui-sortable">
                </div>
              </div>
              <DialogSibar @updateDetailCard="getDetailCard(cardDetail.id)" @showControl="handleShowControl"
                           @deleteCard="deleteCard" @changeDeadline="changeDeadline"
                           :card="cardDetail"/>
            </div>
          </div>
        </div>

      </el-dialog>
      <Action v-if="showActionList" @closeAction="closeActionList" @deleteList="deleteList" :offset="offset"
              v-click-outside="closeActionList"/>
      <EditFile v-if="showEditFile" :offset="offsetEditFile"/>
    </template>
  </AdminLayout>
</template>

<script>
import AdminLayout from "@/layouts/AdminLayout";
import List from "@/components/admin/List";
import NewList from "@/components/include/NewList";
import draggable from "vuedraggable";
import {mapMutations, mapState} from 'vuex'
import api from '../../api';
import _ from "lodash";
import ModalSidebar from "@/components/include/ModalSidebar";
import DialogSibar from "@/components/include/DialogSibar";
import moment from "moment";
import Action from "@/components/include/Action";
import File from "@/components/include/File";
import EditFile from "@/components/include/EditFile";

export default {
  name: "Admin",
  data() {
    return {
      addList: false,
      data: [],
      showControlModalSidebar: false,
      showActionList: false,
      showActionFile: false,
      labels: [],
      card: [],
      dialogFormVisible: false,
      editDescriptionModal: false,
      offset: {},
      offsetEdit: {},
      isComplete: false,
      isDeadline: 0,
      cardTitle: '',
      deadline: '',
      description: '',
      offsetEditFile:{},
      showEditFile:false
    }
  },
  components: {
    AdminLayout,
    List,
    draggable,
    NewList,
    ModalSidebar,
    DialogSibar,
    Action,
    File,
    EditFile
  },
  methods: {
    ...mapMutations('home', [
      'updateList', 'updateCardDetail'
    ]),
    moveList(e) {
      console.log(e)

      let id = e.draggedContext.element.id

      let payload = {
        index: e.draggedContext.futureIndex + 1,
      }
      console.log(payload)
      if (id !== e.draggedContext.futureIndex) {
        api.changeIndexList(payload, id).then(() => {
          this.getDataList()
        })
      }

    },
    openEditFile(data){
      console.log(data)
      this.offsetEditFile = data
      this.showEditFile = true;
    }
    ,
    openActionList(data) {
      this.offset = data
      this.showActionList = true
    },
    closeActionList() {
      this.showActionList = false
    },
    deleteList(id) {

      api.deleteList(id).then(() => {
        this.reload()
        this.closeActionList()
      })
    },
    newList() {
      this.addList = true
    },
    closeNewList() {
      this.addList = false
    },
    getDataList() {
      api.getList().then((response) => {
        this.updateList(response.data.data)
      })
    },
    loadData() {
      this.data = this.list
    }
    , loadDescription() {
      this.description = this.cardDetail.description;
    }
    ,
    loadTitle() {
      this.cardTitle = this.cardDetail.title;
    },
    loadDeadline() {
      this.deadline = this.cardDetail.deadline
    },
    handleAddList(data) {
      api.addList(data).then(() => {
        // console.log(response)
        this.getDataList();
      })
    },
    handleUpdateList(data) {
      api.updateTitleList(data.data, data.id).then((response) => {
        console.log(response)
        this.getDataList();
      })
    },
    async handleShowControl(data) {
      if (data.type === 'label') {
        await this.getDatalabel()
      }
      if (_.isEmpty(this.offset)) {
        this.showControlModalSidebar = true;
      }
      if (!_.isEmpty(this.offset) && this.offset.type !== data.type) {
        this.showControlModalSidebar = true;
      } else if (!_.isEmpty(this.offset) && this.offset.type === data.type) {
        this.showControlModalSidebar = !this.showControlModalSidebar
      }
      this.offset = data
    },
    getDatalabel() {
      api.getLabels().then((response) => {
        this.labels = response.data.data;
      })
    },
    closeControlModal() {
      this.showControlModalSidebar = false
    },
    async openDetailCard(id) {
      this.closeAll()
      await api.getCard(id).then((response) => {
        this.card = response.data.data;
        this.updateCardDetail(this.card)
        this.reload()
        this.dialogFormVisible = true
      })

    },
    closeModal() {
      this.showControlModalSidebar = false
      this.dialogFormVisible = false
    },
    deleteCard(data) {
      api.deleteCard(data).then(() => {
        this.closeModal()
        this.getDataList()
      })
    },
    openControlLabel(e) {
      let rect = e.target.getBoundingClientRect();
      let data = {
        left: rect.left,
        top: rect.top,
        type: 'label'
      };
      this.handleShowControl(data)
    }
    ,
    openEditDescription() {
      this.editDescriptionModal = true;
    },
    async changeDeadline(data) {
      await api.changeStatusDeadline(data, this.card.id).then(() => {
        this.getDetailCard(this.card.id);
        this.loadDeadline();
      })
      this.resetTime()
    },
    changeDeadlineModal() {
      let data = {
        deadline: moment(this.deadline).format('YYYY-MM-DD HH:mm:ss'),
        directory_id: this.card.directory_id
      }

      console.log(data)

      this.changeDeadline(data)
    },
    updateCardTitle(e) {
      e.target.blur()
      let data = {
        title: e.target.value,
      }
      api.updateCard(data, this.card.id).then(() => {
        this.getDetailCard(this.card.id)
      })
    },

    quickEditCardTitle(data) {
      api.updateCard(data, data.id).then(() => {
        this.getDetailCard(this.card.id)
      })
    },
    updateCardDescription() {
      let textarea = document.getElementById('descriptionCard')

      textarea.blur();

      let data = {
        title: this.cardDetail.title,
        description: this.description,
      }
      api.updateCard(data, this.card.id).then(() => {

        this.getDetailCard(this.card.id)
        this.editDescriptionModal = false
      })
    },
    changeStatusTodo() {
      let data = {};

      if (this.isComplete) {
        data.status = 1;
      } else {
        data.status = 0
      }

      data.directory_id = this.cardDetail.directory_id
      api.changeStatusTodo(data, this.cardDetail.id).then(() => {
        this.getDetailCard(this.cardDetail.id);
      })
    },
    formatDate(dateString) {
      return 'ngày ' + moment(dateString).format('DD-MM-yyyy  HH:mm:ss');
    },
    getDetailCard(id) {
      api.getCard(id).then((response) => {
        this.card = response.data.data;
        this.updateCardDetail(this.card)
        this.reload()
      })
    },
    resetTime() {
      this.isDeadline = 0;
      this.isComplete = false;
      this.deadline = ''
    },
    reloadLabel(data) {
      this.getDatalabel()
      this.getDataList()
      this.getDetailCard(data)
    },
    reloadDetail() {
      this.getDetailCard(this.cardDetail.id)
    },
    reload() {
      this.getDataList()
      this.loadTitle()
      this.loadDescription()
      this.loadDeadline()
      this.loadData()
      this.checkComplate()
      this.checkDeadline()
    },
    closeAll() {
      this.showActionList = false;
      this.showControlModalSidebar = false
    },
    checkComplate() {
      if (this.cardDetail.status == 0) {
        this.isComplete = false
      } else {
        this.isComplete = true
      }
    },
    checkDeadline() {
      let deadline = moment(this.cardDetail.deadline);
      let now = moment();
      if (deadline < now) {
        this.isDeadline = 2;
      } else if (deadline.format('YYYY-MM-dd') === now.format('YYYY-MM-dd')) {
        this.isDeadline = 1;
      } else {
        this.isDeadline = 0;
      }
    }
  },
  computed: {
    ...mapState('home', [
      'list', 'cardDetail'
    ]),
    ...mapState('auth', [
      'authUser'
    ])
  },
  mounted() {
    this.popupItem = this.$el
    this.getDataList()
    this.loadData()
    this.getDatalabel()
    this.loadDeadline();
    this.loadDescription();
    this.loadTitle()
    this.checkComplate()
    this.checkDeadline()
  },
  updated() {
    this.getDatalabel()
    this.getDataList()
    this.loadData()
    this.loadDeadline();
    this.loadDescription();
    this.loadTitle()
    this.checkComplate()
    this.checkDeadline()
  }
}
</script>

<style scoped lang="scss">
.card-label-yellow {
  background-color: #f2d600 !important;
}

.card-label-orange {
  background-color: #ff9f1a !important;
}

.card-label-black {
  background-color: #344563 !important;
}

.card-label-red {
  background-color: #eb5a46 !important;
}

.card-label-green {
  background-color: #61bd4f !important;
}

.card-label-purple {
  background-color: #c377e0 !important;
}

.card-label-blue {
  background-color: #0079bf !important;
}

.card-label-sky {
  background-color: #00c2e0 !important;
}

.card-label-lime {
  background-color: #51e898 !important;
}

.card-label-pink {
  background-color: #ff78cb !important;
}

.card-label-default{
  background-color: #b3bac5;
}

.dialogTodo {
    .window-wrapper {
        color: #172b4d;
        .close-button {
            color: #42526e;
            border-radius: 50%;
            position: absolute;
            top: 0;
            right: 0;
            height: 32px;
            overflow: hidden;
            padding: 4px;
            margin: 4px;
            width: 32px;
            z-index: 2;
            transition: background-color 85ms, color 85ms;
            font-size: 20px;
            display: inline-block;
            font-family: trellicons;
            font-style: normal;
            text-align: center;
            text-decoration: none;
            vertical-align: bottom;
            -webkit-font-smoothing: antialiased;
            background-color: transparent;
            cursor: pointer;
            .iconColse {
                line-height: 33px;
                font-weight: 600;
            }
        }
        .close-button:hover {
            background-color: #E2E4E9 !important;
        }
        .card-detail-window {
            min-height: 600px;
            .window-header {
                margin: 12px 40px 8px 56px;
                min-height: 32px;
                position: relative;
                z-index: 1;
                .window-header-icon {
                    left: -40px;
                    position: absolute;
                    top: 14px;
                    color: #42526e;
                    height: 32px;
                    line-height: 32px;
                    width: 32px;
                    font-size: 24px;
                    -webkit-font-smoothing: antialiased;
                    display: inline-block;
                    font-family: trellicons;
                    font-style: normal;
                    font-weight: 600;
                    text-align: center;
                    text-decoration: none;
                    vertical-align: bottom;
                    i {
                        font-weight: 600;
                    }
                }
                .window-title {
                    margin: 4px 0 0;
                    padding: 8px 0 0;
                    h2 {
                        margin-right: 4px;
                    }
                    textarea {
                        resize: none;
                        font-size: 20px;
                        line-height: 28px;
                        font-weight: 600;
                        border: none;
                        height: 28px;
                        width: 98%;
                        margin: 6px 0;
                        padding: 4px 0 4px 8px;
                        cursor: pointer;
                        background-color: #f4f5f7;
                    }
                    textarea:focus {
                        outline: none;
                        background-color: white !important;
                        box-shadow: inset 0 0 0 2px #0079bf;
                        border-color: #0079bf;
                        overflow: hidden;
                        overflow-wrap: break-word;
                        border-radius: 2px;
                        user-select: all;
                    }
                }
            }
            .window-content {
                display: flex;
                justify-content: space-between;
                .window-main-col {
                    float: left;
                    margin: 0;
                    overflow-x: hidden;
                    overflow-y: auto;
                    min-height: 24px;
                    padding: 0 8px 8px 16px;
                    position: relative;
                    width: 552px;
                    z-index: 0;
                    .card-detail-data {
                        margin-top: 8px;
                        margin-left: 40px;
                        .card-detail-item-labels {
                            display: block;
                            float: left;
                            margin: 0 8px 8px 0;
                            max-width: 100%;
                            .card-detail-item-header {
                                color: #5e6c84;
                                font-size: 12px;
                                font-weight: 500;
                                letter-spacing: .04em;
                                text-transform: uppercase;
                                display: block;
                                line-height: 20px;
                                margin: 0 8px 4px 0;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                overflow: hidden;
                            }
                            div {
                                .card-label {
                                    border-radius: 3px;
                                    box-sizing: border-box;
                                    display: block;
                                    float: left;
                                    font-weight: 600;
                                    height: 32px;
                                    line-height: 32px;
                                    margin: 0 4px 4px 0;
                                    min-width: 40px;
                                    padding: 0 12px;
                                    width: auto;
                                    cursor: pointer;
                                    .label-text {
                                        cwhite-space: nowrap;
                                        -webkit-font-smoothing: antialiased;
                                        color: #fff;
                                        line-height: 32px;
                                        font-weight: 600;
                                    }
                                }
                            }
                            .card-detail-item-add-button {
                                background-color: rgba(9, 30, 66, .04);
                                box-shadow: none;
                                border: none;
                                border-radius: 3px;
                                cursor: pointer;
                                display: block;
                                float: left;
                                margin: 0 8px 8px 0;
                                transition-property: background-color, border-color, box-shadow;
                                transition-duration: 85ms;
                                transition-timing-function: ease;
                                span {
                                    font-size: 16px;
                                    height: 16px;
                                    line-height: 16px;
                                    padding: 8px;
                                    width: 16px;
                                    color: #42526e;
                                    display: inline-block;
                                    font-family: trellicons;
                                    font-style: normal;
                                    text-align: center;
                                    text-decoration: none;
                                    vertical-align: bottom;
                                    cursor: pointer;
                                    i {
                                        font-weight: 600;
                                    }
                                }
                            }
                            .card-detail-item-add-button:hover {
                                background-color: #e2e4e9;
                            }
                        }
                        .card-detail-start-date {
                            display: block;
                            float: left;
                            margin: 0 8px 8px 0;
                            max-width: 100%;
                            .card-detail-item-header {
                                color: #5e6c84;
                                font-size: 12px;
                                font-weight: 500;
                                letter-spacing: .04em;
                                text-transform: uppercase;
                                display: block;
                                line-height: 20px;
                                margin: 0 8px 4px 0;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                overflow: hidden;
                            }
                            .card-detail-start-date-badge {
                                display: flex;
                                flex-direction: row;
                                align-items: center;
                                margin: 0 8px 8px 0;
                            }
                        }
                        .card-detail-due-date {
                            display: block;
                            float: left;
                            margin: 0 8px 8px 0;
                            max-width: 100%;
                            font-size: 14px;
                            word-break: break-all;
                            .card-detail-item-header {
                                color: #5e6c84;
                                font-size: 12px;
                                font-weight: 500;
                                letter-spacing: .04em;
                                text-transform: uppercase;
                                display: block;
                                line-height: 20px;
                                margin: 0 8px 4px 0;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                overflow: hidden;
                            }
                            .card-detail-due-date-badge {
                                display: flex;
                                flex-direction: row;
                                align-items: center;
                                margin: 0 8px 8px 0;
                                .card-detail-badge-due-date-complete-box {
                                    position: relative;
                                    border-radius: 2px;
                                    height: 16px;
                                    width: 16px;
                                    overflow: hidden;
                                    white-space: nowrap;
                                    transition: all .2s ease-in-out;
                                    background-color: #fafbfc;
                                    box-shadow: inset 0 0 0 2px #dfe1e6;
                                    margin: auto 4px auto 0;
                                    .card-detail-badge-due-date-complete-icon {
                                        height: 16px;
                                        width: 16px;
                                        opacity: 0;
                                    }
                                }
                                .el-checkbox {
                                    margin: 0 5px 0 0 !important;
                                }
                                .card-detail-badge-due-date-react-container:hover {
                                    background-color: #E2E4E9;
                                }
                                .card-detail-badge-due-date-react-container {
                                    .card-deadline-badge {
                                        .datetime-btn {
                                            position: relative;
                                            .el-date-editor {
                                                position: absolute;
                                                top: 0;
                                                left: 0;
                                                opacity: 0;
                                                input {
                                                    cursor: pointer!important;
                                                }
                                            }
                                        }
                                        .deadline-badge {
                                            position: relative;
                                            color: #172b4d;
                                            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
                                            line-height: 20px;
                                            box-sizing: border-box;
                                            display: inline-flex;
                                            align-items: center;
                                            justify-content: center;
                                            border-radius: 3px;
                                            cursor: pointer;
                                            padding: 6px 12px;
                                            text-decoration: none;
                                            background-color: rgba(9, 30, 66, .04);
                                            box-shadow: none;
                                            border: none;
                                            transition-property: background-color, border-color, box-shadow;
                                            transition-duration: 85ms;
                                            transition-timing-function: ease;
                                            overflow: visible;
                                            font: inherit;
                                            margin: 0;
                                            outline: none;
                                            .card-deadline-status {
                                                font-size: 12px;
                                                line-height: 16px;
                                                padding: 0 4px;
                                                text-transform: uppercase;
                                                border-radius: 2px;
                                                margin: auto 0 auto 8px;
                                            }
                                            .card-complate {
                                                color: #fff;
                                                background-color: #61bd4f;
                                            }
                                            .card-die {
                                                color: #fff;
                                                background-color: #ec9488;
                                            }
                                            .card-near-die {
                                                color: #172b4d;
                                                background-color: #f2d600;
                                            }
                                            .nch-icon {
                                                line-height: 10px;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .fill-card-detail-desc {
                        div {
                            .window-module {
                                clear: both;
                                margin-bottom: 24px;
                                position: relative;
                                .window-module-title {
                                    display: flex;
                                    align-items: center;
                                    min-height: 32px;
                                    border-bottom: none;
                                    padding: 8px 0;
                                    position: relative;
                                    margin: 0 0 4px 40px;
                                    .icon-description {
                                        left: -40px;
                                        position: absolute;
                                        top: 8px;
                                        height: 32px;
                                        line-height: 32px;
                                        width: 32px;
                                        font-size: 24px;
                                        -webkit-font-smoothing: antialiased;
                                        display: inline-block;
                                        font-family: trellicons;
                                        font-style: normal;
                                        text-align: center;
                                        text-decoration: none;
                                        vertical-align: bottom;
                                        .i {
                                            font-weight: 400;
                                        }
                                    }
                                    h3 {
                                        display: inline-block;
                                        width: auto;
                                        margin: 0;
                                        min-height: 18px;
                                        min-width: 40px;
                                    }
                                    .editable {
                                        a {
                                            margin-left: 8px;
                                            color: #172b4d;
                                            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
                                            font-size: 14px;
                                            line-height: 20px;
                                            font-weight: 400;
                                            box-sizing: border-box;
                                            display: inline-flex;
                                            align-items: center;
                                            justify-content: center;
                                            border-radius: 3px;
                                            cursor: pointer;
                                            padding: 6px 12px;
                                            text-decoration: none;
                                            background-color: rgba(9, 30, 66, .04);
                                            box-shadow: none;
                                            border: none;
                                            transition-property: background-color, border-color, box-shadow;
                                            transition-duration: 85ms;
                                            transition-timing-function: ease;
                                        }
                                        a:hover {
                                            background-color: #e2e4e9;
                                        }
                                    }
                                }
                                .u-gutter {
                                    margin-left: 40px;
                                    .editable {
                                        .description-content {
                                            position: relative;
                                            .u-bottom {
                                                margin-bottom: 0;
                                                padding-bottom: 0;
                                                .description-fake-text-area {
                                                    background-color: rgba(102, 81, 122, 0.1);
                                                    box-shadow: none;
                                                    border: none;
                                                    border-radius: 3px;
                                                    display: block;
                                                    min-height: 40px;
                                                    padding: 8px 12px;
                                                    text-decoration: none;
                                                }
                                                .description-fake-text-area:visited {
                                                    color: #172b4d;
                                                }
                                                .description-fake-text-area:active {
                                                    color: #172b4d;
                                                }
                                            }
                                            .description-edit {
                                                display: block;
                                                float: left;
                                                padding-bottom: 9px;
                                                z-index: 50;
                                                width: 100%;
                                                .description-draft {
                                                    min-height: 108px;
                                                    background: #fff !important;
                                                    box-shadow: none;
                                                    display: block;
                                                    width: 100%;
                                                    outline: none;
                                                    border: none;
                                                    box-sizing: border-box;
                                                    border-radius: 3px;
                                                    line-height: 20px;
                                                    padding: 8px 12px;
                                                    transition-property: background-color, border-color, box-shadow;
                                                    transition-duration: 85ms;
                                                    transition-timing-function: ease;
                                                    font: inherit;
                                                    margin: 0;
                                                }
                                                .description-draft:focus {
                                                    outline: none;
                                                    background-color: white !important;
                                                    box-shadow: inset 0 0 0 2px #0079bf;
                                                    border-color: #0079bf;
                                                    overflow: hidden;
                                                    overflow-wrap: break-word;
                                                    border-radius: 2px;
                                                    user-select: all;
                                                }
                                                .edit-controls {
                                                    clear: both;
                                                    margin-top: 8px;
                                                    display: flex;
                                                    flex-direction: row;
                                                    input {
                                                        float: left;
                                                        margin: 0 4px 0 0;
                                                        background-color: #5aac44;
                                                        box-shadow: none;
                                                        border: none;
                                                        color: #fff;
                                                        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
                                                        font-size: 14px;
                                                        line-height: 20px;
                                                        font-weight: 400;
                                                        box-sizing: border-box;
                                                        display: inline-flex;
                                                        align-items: center;
                                                        justify-content: center;
                                                        border-radius: 3px;
                                                        cursor: pointer;
                                                        padding: 6px 12px;
                                                        text-decoration: none;
                                                        transition-property: background-color, border-color, box-shadow;
                                                        transition-duration: 85ms;
                                                        transition-timing-function: ease;
                                                        outline: none;
                                                    }
                                                    input:hover {
                                                        background-color: #61bd4f;
                                                    }
                                                    .btnCloseAddCard {
                                                        margin-left: 5px;
                                                        color: #6b778c;
                                                        font-size: 28px;
                                                        font-weight: 600;
                                                        cursor: pointer;
                                                    }
                                                    .btnCloseAddCard:hover {
                                                        color: #172b4d;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .attachments-section {
                        clear: both;
                        margin-bottom: 24px;
                        position: relative;
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
                            h3 {
                                display: inline-block;
                                width: auto;
                                margin: 0;
                                min-height: 18px;
                                min-width: 40px;
                            }
                        }
                        .u-gutter {
                            margin-left: 40px;
                            .attachment-list {}
                            .show-with-attachments {
                                a {
                                    color: #172b4d;
                                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
                                    font-size: 14px;
                                    line-height: 20px;
                                    font-weight: 400;
                                    box-sizing: border-box;
                                    display: inline-flex;
                                    align-items: center;
                                    justify-content: center;
                                    border-radius: 3px;
                                    cursor: pointer;
                                    padding: 6px 12px;
                                    text-decoration: none;
                                    background-color: rgba(9, 30, 66, .04);
                                    box-shadow: none;
                                    border: none;
                                    transition-property: background-color, border-color, box-shadow;
                                    transition-duration: 85ms;
                                    transition-timing-function: ease;
                                    margin: 8px 0;
                                }
                                a:hover {
                                    background-color: #e2e4e9;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

.adminMainContent {
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-right: 0;
  position: relative;

  .main-content {
    position: relative;
    flex-grow: 1;

    .listTodo {
      display: flex;
      -webkit-user-select: none;
      user-select: none;
      white-space: nowrap;
      margin-bottom: 8px;
      overflow-x: auto;
      overflow-y: hidden;
      padding-bottom: 8px;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      top: 0;
      height: 98%;

      .newList {
        text-align: left;
        width: 272px;
        margin: 0 4px;
        border-radius: 3px;
        color: #172b4d;
        transition: color 85ms ease-in;
        box-sizing: border-box;
        display: inline-block;
        vertical-align: top;
        white-space: nowrap;

        .title {
          padding: 0 11px;

          textarea {
            background-color: #ebecf0;
            border: none;
            height: 28px;
            width: 98%;
            margin: 6px 0;
            padding: 4px 0 4px 8px;
            resize: none;
          }

          textarea[type="text"] {
            font-size: 20px;
            line-height: 24px;
            font-weight: 600;
          }

          textarea:focus {
            outline: none;
            background-color: white;
            box-shadow: inset 0 0 0 2px #0079bf;
            border-color: #0079bf;
            overflow: hidden;
            overflow-wrap: break-word;
          }
        }

        .btn-add {
          width: 100%;
          height: 50px;
          line-height: 40px;
          background-color: hsla(0, 0%, 100%, .24);
          cursor: pointer;
          border-radius: 3px;
          color: #172b4d;
          padding: 6px 14px;
          transition: color 85ms ease-in;
          box-sizing: border-box;
          white-space: nowrap;

          .plus {
            margin-right: 10px;
          }
        }

        .btn-add:hover {
          background-color: hsla(0, 0%, 100%, .5);
        }
      }
    }

    /* width */
    .listTodo::-webkit-scrollbar {
      height: 8px;
    }

    /* Track */
    .listTodo::-webkit-scrollbar-track {
      border-radius: 7px;
      background-color: #4f4f5073;
    }

    /* Handle */
    .listTodo::-webkit-scrollbar-thumb {
      background: #bcbcbe63;
      border-radius: 7px;
    }

    /* Handle on hover */
    .listTodo::-webkit-scrollbar-thumb:hover {
      background: #d3d3d87d;
    }

  }
}


</style>