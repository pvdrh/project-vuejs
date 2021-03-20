<template>
  <div class="pop-over is-shown" :style="{left: offset.left+'px', top: offset.top+'px'}">
    <div class="no-back">
      <div class="pop-over-header js-pop-over-header">
        <a href="#" v-if="showAddLabel" @click="backLabel"
           class="pop-over-header-back-btn icon-sm icon-back is-shown">
          <i class="el-icon-arrow-left"></i>
        </a>
        <span v-if="offset.type === 'label'" class="pop-over-header-title">{{
            showAddLabel ? (showEditLabel ? 'Sửa nhãn gián' : 'Tạo nhãn mới') : 'Nhãn'
          }}</span>
        <span v-else class="pop-over-header-title">Tạo mới công việc</span>
        <a @click="closeLabelModal" class="pop-over-header-close-btn icon-sm icon-close">
          <i class="el-icon-close"></i>
        </a>
      </div>
      <div>
        <div v-if="offset.type === 'label'" class="pop-over-content js-pop-over-content u-fancy-scrollbar js-tab-parent"
             style="max-height: 368px;">
          <div>
            <div>
              <div v-if="showAddLabel && !showEditLabel" class="edit-label">
                <label for="labelName">Tên</label>
                <input id="labelName"
                       class="js-autofocus js-label-name"
                       type="text" name="name" v-model="titleLabel">
                <label>Chọn một màu</label>
                <div class="u-clearfix">
                  <DetailLabel class="label-item" v-for="(item,index) in arrayLabels" @activeLabel="activeLabel"
                               :key="index" :color="item"/>
                </div>
                <div class="edit-labels-no-color-section u-clearfix">
                  <div class="edit-labels-no-color-section-color">
                    <DetailLabel class="label-item" :color="'default'" @activeLabel="activeLabel"/>
                  </div>
                </div>
                <div class="u-clearfix"><input class="nch-button nch-button--primary wide js-submit"
                                               @click="addLabelToCard" type="submit"
                                               value="Tạo mới">
                  <div class="u-float-right js-accessory-view-holder"></div>
                </div>
              </div>
              <div v-if="!showAddLabel" class="pop-over-section"><h4>Nhãn</h4>
                <ul class="edit-labels-pop-over js-labels-list">
                  <li v-for="(label,index) in labels" :key="index"><a class="card-label-edit-button"
                                                                      @click="editLabel(label)"><i
                      class="el-icon-edit"></i></a>
                    <DetailLabel :color="label.color" @activeLabel="changeLabel" :id="label.id" :card="card"
                                 :title="label.name"/>
                  </li>
                </ul>
                <div>
                  <button class="button full js-add-label" @click="openAddLabel">Tạo nhãn mới</button>
                </div>
              </div>
              <div v-if="showEditLabel && showAddLabel" class="edit-label"><label for="labelName">Tên</label><input
                  class="js-autofocus js-label-name"
                  type="text" name="name" v-model="titleLabel"><label>Chọn
                một màu</label>
                <div class="u-clearfix"
                >
                  <DetailLabel class="label-item" v-for="(item,index) in arrayLabels" @activeLabel="activeLabel"
                               :key="index" :color="item" :isActive="isActive"/>
                </div>
                <div class="edit-labels-no-color-section u-clearfix">
                  <div class="edit-labels-no-color-section-color">
                    <DetailLabel class="label-item" :color="'default'" @activeLabel="activeLabel"/>
                  </div>
                </div>
                <div class="u-clearfix edit-btn">
                  <input class="nch-button nch-button--primary wide js-submit" @click="updateLabel" type="submit"
                         value="Lưu">
                  <input type="submit" value="Xoá" @click="deleteLabel"
                         class="remove-label nch-button nch-button--danger">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="pop-over-content js-pop-over-content u-fancy-scrollbar js-tab-parent"
             style="max-height: 451px;">
          <div>
            <div>
              <div class="edit-label">
                <label for="id-checklist">Tiêu đề</label>
                <input id="id-checklist"
                       type="text"
                       v-model="titleCheckList"
                       dir="auto">
                <input class="nch-button add-checklist" @click="addCheckList" type="submit" value="Thêm">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DetailLabel from "@/components/include/DetailLabel";
import api from '../../api';
import {mapMutations, mapState} from "vuex";

export default {
  name: "ModalSidebar",
  props: ['offset', 'card', 'labels'],
  components: {
    DetailLabel
  },
  methods: {
    ...mapMutations('home', [
      'showLable', 'updateCardDetail'
    ]),
    closeLabelModal() {
      this.$emit('closeLabelModal')
    },
    editLabel(label) {
      this.titleLabel = label.name
      this.isActive = label
      this.showAddLabel = true
      this.showEditLabel = true;
    },
    openAddLabel() {
      this.arrayActive = []
      this.showAddLabel = true
    }
    ,
    addLabelToCard() {
      let id = this.card.id
      if (this.arrayActive.length > 0) {
        this.arrayActive.forEach((item) => {
          let data = {
            name: this.titleLabel,
            color: item
          }
          api.addLabel(data, id).then((res) => {
            console.log(res)
            this.resetLabel()
          })
        })
        this.getDetailCard()
        this.$emit('reloadLabel', this.card.id)
        this.showAddLabel = !this.showAddLabel;
      }
    },
    resetLabel() {
      this.titleLabel = '';
      this.arrayActive = [];
    }
    ,
    activeLabel(data) {
      if (this.arrayActive.includes(data.color)) {
        this.arrayActive = this.arrayActive.filter((item) => item != data.color)
      } else {
        this.arrayActive.push(data.color);
      }
    },
    changeLabel(data) {
      if (data.isActive) {
        data.directory_id = this.card.directory_id
        api.detachLabels(data, this.card.id).then(()=>{
          this.$emit('reloadLabel', this.card.id)
        })
      } else {
        api.attachLabels(data, this.card.id).then(()=>{
          this.$emit('reloadLabel', this.card.id)
        })
      }
    },
    getDetailCard() {
      api.getCard(this.card.id).then((response) => {
        this.updateCardDetail(response.data.data);
      })
    },
    deleteLabel() {
      let data = {
        name: this.titleLabel,
        color: this.isActive.color,
      }

      api.deleteLabels(data, this.isActive.id).then(() => {
        this.getDetailCard()
        this.$emit('reloadLabel', this.card.id)
        this.resetLabel()
        this.backLabel()
      })
    },
    updateLabel() {
      let data = {
        name: this.titleLabel,
        color: this.isActive.color,
      }

      api.updateLabels(data, this.isActive.id).then(() => {
        this.getDetailCard()
        this.$emit('reloadLabel', this.card.id)
        this.resetLabel()
        this.backLabel()
      })
    },
    backLabel() {
      this.showAddLabel = false
      this.showEditLabel = false
    },
    addCheckList(){
      let data = {
        title: this.titleCheckList,
        card_id: this.card.id
      }
      api.addCheckList(data).then(() => {
        this.getDetailCard()
        this.$emit('reloadLabel', this.card.id)
        this.closeLabelModal()
      })
    }
  }, computed: {
    ...mapState('home', [
      'labelShow', 'cardDetail'
    ])
  },
  watch: {},
  data() {
    return {
      thisAddLabels: [],
      arrayLabels: [
        'green',
        'yellow',
        'orange',
        'red',
        'purple',
        'blue',
        'sky',
        'lime',
        'pink',
        'black'
      ],
      showAddLabel: false,
      showEditLabel: false,
      arrayActive: [],
      titleLabel: '',
      isActive: '',
      titleCheckList:''
    }
  },
  // directives: {
  //   focus: {
  //     // directive definition
  //     inserted: function (el) {
  //       el.focus()
  //     }
  //   }
  // }
}
</script>

<style scoped lang="scss">
.pop-over {
  z-index: 9999;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 8px 16px -4px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
  overflow: hidden;
  position: absolute;
  width: 304px;
  .no-back {
    .pop-over-header {
      height: 40px;
      position: relative;
      margin-bottom: 8px;
      text-align: center;
      .pop-over-header-back-btn {
        color: #6b778c;
        padding: 10px 12px 10px 8px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        height: 20px;
        font-size: 16px;
        line-height: 20px;
        width: 20px;
        display: inline-block;
        font-family: trellicons;
        font-style: normal;
        font-weight: 400;
        text-align: center;
        text-decoration: none;
        vertical-align: bottom;
        cursor: pointer;
      }
      .pop-over-header-title {
        box-sizing: border-box;
        color: #5e6c84;
        display: block;
        line-height: 40px;
        border-bottom: 1px solid rgba(9, 30, 66, .13);
        margin: 0 12px;
        overflow: hidden;
        padding: 0 32px;
        position: relative;
        text-overflow: ellipsis;
        white-space: nowrap;
        z-index: 1;
      }
      .pop-over-header-close-btn {
        color: #6b778c;
        padding: 10px 12px 10px 8px;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 2;
        height: 20px;
        font-size: 16px;
        line-height: 20px;
        width: 20px;
        display: inline-block;
        font-family: trellicons;
        font-style: normal;
        font-weight: 400;
        text-align: center;
        text-decoration: none;
        vertical-align: bottom;
        cursor: pointer;
      }
    }
    div {
      .pop-over-content {
        max-height: 368px;
        overflow-x: hidden;
        overflow-y: auto;
        padding: 0 12px 12px;
        div {
          div {
            div.edit-label {
              label {
                text-align: left;
              }
              input {
                margin: 4px 0 12px;
                width: 100%;
                outline: none;
                border: none;
                box-shadow: inset 0 0 0 2px #dfe1e6;
                background-color: #fafbfc;
                box-sizing: border-box;
                border-radius: 3px;
                display: block;
                line-height: 20px;
                padding: 8px 12px;
                transition-property: background-color, border-color, box-shadow;
                transition-duration: 85ms;
                transition-timing-function: ease;
              }
              input:focus {
                border-color: #0079BF !important;
              }
              .add-checklist:focus {
                border-color: #0079BF !important;
              }
              .add-checklist {
                background-color: #49852e;
                box-shadow: none;
                border: none;
                color: #fff;
                outline: 0;
                width: 30%;
              }
              .u-clearfix {
                clear: both;
                content: "";
                display: table;
                .label-item {
                  float: left;
                  height: 32px;
                  margin: 0 8px 8px 0;
                  padding: 0;
                  width: 48px;
                }
                input {
                  background-color: #49852e;
                  box-shadow: none;
                  border: none;
                  color: #fff;
                  outline: 0;
                  padding-left: 24px;
                  padding-right: 24px;
                }
                input.remove-label{
                  background-color: #cf513d;
                  box-shadow: none;
                  border: none;
                  color: #fff;
                }
              }
              .edit-btn{
                display: flex;
                justify-content: space-between;
                input{
                  width: 25%;
                }
              }
              .edit-labels-no-color-section {
                display: flex;
                .edit-labels-no-color-section-text {
                  text-align: left;
                  .u-bottom {
                    margin: 0;
                  }
                  .quiet {
                    color: #5e6c84;
                  }
                }
              }
            }
            .pop-over-section {
              margin-top: 12px;
              h4 {
                color: #5e6c84;
                font-size: 12px;
                font-weight: 600;
                letter-spacing: .04em;
                line-height: 16px;
                margin-top: 16px;
                text-transform: uppercase;
                text-align: left;
              }
              .edit-labels-pop-over {
                margin-bottom: 8px;
                list-style: none;
                padding: 0;
                li {
                  padding-right: 36px;
                  position: relative;
                  .card-label-edit-button {
                    cursor: pointer;
                    border-radius: 3px;
                    padding: 6px;
                    position: absolute;
                    top: 0;
                    right: 0;
                    height: 20px;
                    font-size: 16px;
                    line-height: 20px;
                    width: 20px;
                    display: inline-block;
                    font-family: trellicons;
                    font-style: normal;
                    font-weight: 400;
                    text-align: center;
                    text-decoration: none;
                    vertical-align: bottom;
                  }
                  .card-label-edit-button:hover {
                    background-color: #ECEDF0;
                  }
                }
              }
              div {
                button {
                  background-color: #e4f0f6;
                  box-shadow: none;
                  border: none;
                  outline: 0;
                  width: 100%;
                  cursor: pointer;
                  box-sizing: border-box;
                  border-radius: 3px;
                  display: inline-block;
                  line-height: 20px;
                  margin-bottom: 8px;
                  padding: 6px 12px;
                  text-decoration: none;
                  position: relative;
                }
              }
            }
          }
        }
      }

      //Thanh cuộn
      .pop-over-content::-webkit-scrollbar {
        width: 5px;
      }
      .pop-over-content::-webkit-scrollbar-track {
        border-radius: 5px;
        background-color: #93C5FD;
      }
      .pop-over-content::-webkit-scrollbar-thumb {
        background: #9CA3AF;
        border-radius: 5px;
      }
      .pop-over-content::-webkit-scrollbar-thumb:hover {
        background: #4a4a727d;
      }
    }
  }
}

//Màu của nhãn
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

</style>