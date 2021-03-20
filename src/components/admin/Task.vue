<template>
  <div class="cardTodo">
    <div @click.left="openDetailCard" class="detailTodo" >
      <span class="btn-edit" @click="btnOpenEdit">
        <i class="el-icon-edit"></i>
      </span>
      <div class="list-card-labels">
        <span class="card-label label-default mod-card-front" @click="handleShowLable"
              :class="[{'labelShow' :labelShow}, 'card-label-'+label.color]" v-for="label in card.labels"
              :key="label.id">
          <span class="label-text" v-if="labelShow">{{ label.name }}</span>
        </span>
      </div>
      <p class="text-title">{{ card.title }}</p>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import api from "@/api";


export default {
  name: "Todo",
  props: ['card'],
  components: {},
  data() {
    return {
      modalShow: false,
      dialogFormVisible: false,
      editDescriptionModal: false,
      showControlModalSidebar: false,
      offsetLabel: {},
      labels: [],
      cardTitle: '',
      description: ''
    }
  },
  methods: {
    ...mapMutations('home', [
      'showLable', 'updateCardDetail'
    ]),
    handleShowLable(e) {
      e.stopPropagation()
      this.showLable()
    },
    getDetailCard() {
      api.getCard(this.card.id).then((response) => {
        this.updateCardDetail(response.data.data);
      })
    },
    handleShowControl(data) {
      this.$emit('handleShowControl', data)
    },
    openControlLabel(e) {
      let rect = e.target.getBoundingClientRect();
      let data = {
        type: 'label',
        left: rect.left,
        top: rect.top,
        id: this.card.id
      };
      this.$emit('handleShowControl', data)
    },
    openDetailCard() {
      this.$emit('openDetailCard', this.card.id)
    },
    closeControlModal() {
      this.$emit('closeControlModal')
    },
    btnOpenEdit(event) {
      event.stopPropagation()
      let parent = event.target.parentElement.parentElement
      let rect = parent.getBoundingClientRect();
      let data = {
        left: rect.left,
        top: rect.top,
        width: '250px',
        id: this.card.id
      }
      this.$emit('openQuickEdit', data)
    }
  },
  computed: {
    ...mapState('home', [
      'labelShow', 'cardDetail'
    ]),
  }
}
</script>

<style lang="scss" scoped>
.cardTodo {
  width: 100%;
  max-height: 162px;
  overflow: hidden;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
  border: none;
  background-color: #fff;
  cursor: pointer;
  display: block;
  margin-bottom: 8px;
  max-width: 300px;
  min-height: 20px;
  position: relative;
  text-decoration: none;
  z-index: 0;
  .detailTodo {
    overflow: hidden;
    padding: 12px 8px 0 8px;
    position: relative;
    z-index: 10;
    .list-card-labels {
      overflow: auto;
      position: relative;
      .card-label {
        height: 8px;
        line-height: 16px;
        padding: 0 8px;
        max-width: 198px;
        text-shadow: none;
        width: auto;
        min-width: 40px;
        margin: 0 4px 4px 0;
        float: left;
        font-size: 12px;
        font-weight: 700;
        color: #fff;
        border-radius: 5px;
      }
      .labelShow {
        height: 16px !important;
      }
    }
    .btn-edit {
      background-color: #f4f5f7;
      background-clip: padding-box;
      background-origin: padding-box;
      border-radius: 3px;
      opacity: .8;
      padding: 4px;
      position: absolute;
      right: 2px;
      top: 2px;
      visibility: hidden;
      z-index: 40;
      i {
        color: #42526e;
        height: 20px;
        font-size: 16px;
        line-height: 20px;
        width: 20px;
      }
    }
    .btn-edit:hover {
      background-color: #EBECF0;
    }
    .text-title {
      margin: 0;
      text-indent: 40px;
      direction: rtl;
      text-align: left;
    }
  }
  .thisCard:hover {
    background-color: #F4F5F7;
  }
}
.cardTodo:hover .btn-edit {
  visibility: visible;
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