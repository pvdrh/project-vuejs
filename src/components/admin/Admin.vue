<template>
  <AdminLayout>
    <template #main>
      <div class="adminMainContent">
        <div class="main-content">
          <div class="listTask">

            <!-- Xử lý kéo thả -->
            <draggable
                class="dragArea"
                :list="list"
                item-key="id"
                :animation="100"
                :move="moveList">
              <List v-for="(item,index) in list" :id="item.id"
                    @closeControlModal="closeControlModal" :key="index"
                    @openDetailCard="openDetailCard"
                    @updateCardList="getDataList" @updateListTitle="handleUpdateList" @openActionList="openActionList"
                    :index="item.index" :item="item"/>
            </draggable>

            <div class="newList" v-if="!addList">
              <div class="btn-add" @click="newList">
                <i class="el-icon-plus plus"></i>
                <span>Thêm danh sách khác</span>
              </div>
            </div>
            <NewList v-if="addList" @addList="handleAddList" @closeNewList="closeNewList"></NewList>
          </div>
        </div>
      </div>
      <ModalSidebar v-if="showControlModalSidebar" :card="card" :labels="labels" @closeLabelModal="closeControlModal"
                    :offset="offset" @reloadLabel="reloadLabel"/>
      <el-dialog v-if="dialogFormVisible" width="50%" id="detailTodo" class="dialogTodo" :append-to-body="true"
                 :visible.sync="dialogFormVisible" 
                 :show-close="false" @close="closeModal">
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
                            @click="openEditDescription" v-if="!editDescriptionModal && cardDetail.description !=null">Chỉnh sửa</a><span
                            class="editing-members-description js-editing-members-description hide"></span></div>
                      </div>
                      <div class="u-gutter">
                        <div class="editable" attr="desc">
                          <div class="description-content js-desc-content">
                            <div class="current markeddown hide-on-edit js-desc js-show-with-desc hide" dir="auto"></div>
                            <p v-if="!editDescriptionModal && cardDetail.description==null" @click="openEditDescription"
                               class="u-bottom js-hide-with-desc">
                              <a class="description-fake-text-area hide-on-edit js-edit-desc  js-hide-with-draft"
                                  ref="#">Thêm mô tả chi tiết.</a></p>
                            <p v-if="!editDescriptionModal && cardDetail.description!=null" @click="openEditDescription"
                               class="u-bottom js-hide-with-desc">
                              <a  class="description-fake-text-area hide-on-edit js-edit-desc  js-hide-with-draft"
                                  href="#">{{ cardDetail.description }}</a>
                            </p>
                            <div class="description-edit edit" v-if="editDescriptionModal">
                              <textarea-autosize
                                  :min-height="35"
                                  id="descriptionCard"
                                  v-model="description"
                                  placeholder="Thêm mô tả chi tiết hơn."
                                  class="description-draft"
                                  ref="descriptionCard"
                                  @keydown.enter="updateCardDescription"/>
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
                <div v-if="cardDetail.check_lists.length > 0"
                     class="checklist-list window-module js-checklist-list js-no-higher-edits ui-sortable">
                  <CheckList v-for="(item, index) in cardDetail.check_lists" @updateCheckList="reloadDetail"
                             :checkList="item" :key="index" :card="cardDetail"/>
                </div>
              </div>
              <DialogSibar @updateDetailCard="getDetailCard(cardDetail.id)" @showControl="handleShowControl"
                           @deleteCard="deleteCard" :card="cardDetail"/>
            </div>
          </div>
        </div>
      </el-dialog>
      <Action v-if="showActionList" @closeAction="closeActionList" @deleteList="deleteList" :offset="offset" v-click-outside="closeActionList"/>
    </template>
  </AdminLayout>
</template>

<script>
import api from '../../api';
import _ from "lodash";
import AdminLayout from "@/layouts/AdminLayout";
import List from "@/components/admin/List";
import NewList from "@/components/include/NewList";
import draggable from "vuedraggable";
import {mapMutations, mapState} from 'vuex'
import ModalSidebar from "@/components/include/ModalSidebar";
import CheckList from "@/components/include/CheckList";
import DialogSibar from "@/components/include/DialogSibar";
import Action from "@/components/include/Action";

export default {
  name: "Admin",
  data() {
    return {
      addList: false,
      data: [],
      showControlModalSidebar: false,
      showActionList: false,
      labels: [],
      card: [],
      dialogFormVisible: false,
      editDescriptionModal: false,
      offset: {},
      offsetEdit: {},
      cardTitle: '',
      description: '',
    }
  },
  components: {
    AdminLayout,
    List,
    NewList,
    ModalSidebar,
    CheckList,
    DialogSibar,
    Action,
    draggable
  },
  methods: {
    ...mapMutations('home', [
      'updateList', 'updateCardDetail'
    ]),
    moveList(event) {
      let id = event.draggedContext.element.id
      let payload = {
        index: event.draggedContext.futureIndex + 1,
      }
      if (id !== event.draggedContext.futureIndex) {
        api.changeIndexList(payload, id).then(() => {
          this.getDataList()
        })
      }
    },
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
    }, 
    loadDescription() {
      this.description = this.cardDetail.description;
    },
    loadTitle() {
      this.cardTitle = this.cardDetail.title;
    },
    handleAddList(data) {
      api.addList(data).then(() => {
        this.getDataList();
      })
    },
    handleUpdateList(data) {
      api.updateTitleList(data.data, data.id).then(() => {
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
    openControlLabel(event) {
      let rect = event.target.getBoundingClientRect();
      let data = {
        left: rect.left,
        top: rect.top,
        type: 'label'
      };
      this.handleShowControl(data)
    },
    openEditDescription() {
      this.editDescriptionModal = true;
    },
    updateCardTitle(event) {
      event.target.blur()
      let data = {
        title: event.target.value,
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
    getDetailCard(id) {
      api.getCard(id).then((response) => {
        this.card = response.data.data;
        this.updateCardDetail(this.card)
        this.reload()
      })
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
      this.loadData()
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
    this.loadDescription();
    this.loadTitle()
  },
  updated() {
    this.getDatalabel()
    this.getDataList()
    this.loadData()
    this.loadDescription();
    this.loadTitle()
  }
}
</script>

<style scoped lang="scss">
.card-label-yellow {
  background-color: #FACC15 !important;
}

.card-label-orange {
  background-color: #FB923C!important;
}

.card-label-black {
  background-color:#34363b !important;
}

.card-label-red {
  background-color: #F87171 !important;
}

.card-label-green {
  background-color: #34D399 !important;
}

.card-label-purple {
  background-color: #A78BFA !important;
}

.card-label-blue {
  background-color: #60A5FA !important;
}

.card-label-sky {
  background-color: #34d3ce !important;
}

.card-label-lime {
  background-color: #51e87c !important;
}

.card-label-pink {
  background-color: #F472B6 !important;
}

.card-label-default{
  background-color: #9CA3AF;
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
            font-size: 20px;
            display: inline-block;
            font-style: normal;
            text-align: center;
            text-decoration: none;
            vertical-align: bottom;
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
  transition: margin .1s ease-in;
  .main-content {
    position: relative;
    flex-grow: 1;
    .listTask {
      display: flex;
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
  
  //Thanh cuộn
    .listTask::-webkit-scrollbar-track {
      border-radius: 5px;
      background-color: #93C5FD;
    }
    .listTask::-webkit-scrollbar-thumb {
      background: #9CA3AF;
      border-radius: 5px;
    }
    .listTask::-webkit-scrollbar {
      height: 5px;
    }
    .listTask::-webkit-scrollbar-thumb:hover {
      background: #4a4a727d;
    }
  }
}
</style>