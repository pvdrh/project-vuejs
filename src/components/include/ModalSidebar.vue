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
                  <div class="edit-labels-no-color-section-text"><p class="u-bottom">Không có màu.</p>
                    <p class="u-bottom quiet">Điều này sẽ không hiển thị trên đầu thẻ.</p></div>
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
                  <div class="edit-labels-no-color-section-text"><p class="u-bottom">Không có màu.</p>
                    <p class="u-bottom quiet">Điều này sẽ không hiển thị trên đầu thẻ.</p></div>
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
                       dir="auto">
                <input class="nch-button add-checklist" type="submit" value="Thêm">
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
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/card_color";
@import "src/assets/scss/label";
</style>