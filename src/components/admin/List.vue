<template>
  <div class="listWrapper">
    <div class="listContent">
      <div class="listHeader">
        <textarea class="list-header-name list-header-edit-name"
                  @keydown.enter="updateListTitle" name="" id=""
                  cols="30" rows="10" :value="listTitle" placeholder="Nhập vào tiêu đề danh sách..."
        ></textarea>
        <div class="menu" @click="openActionList"><i class="el-icon-s-operation"></i></div>
      </div>
      <div class="listCard">
        <draggable
            class="dragArea list-group"
            item-key="id"
            :list="item.cards"
            :animation="100"
            :move="moveTask">
          <Task v-for="(card,index) in item.cards" @openQuickEdit="openQuickEdit" :key="index"
                @updateData="updateCardList"
                @openDetailCard="openDetailCard"
                :id="card.id" :card="card"/>
        </draggable>
        <NewCard v-if="cardAddOpen" v-click-outside="closeAddCard" @addCard="handleAddCard" @closeAddCard="closeAddCard"
                 :directory="item"></NewCard>
      </div>
      <div class="listFooter" v-if="!cardAddOpen">
        <div class="openCard" @click="openAddCard">
          <span class="icon-add-card"><i class="el-icon-plus"></i></span>
          <span class="text-add-card">Thêm thẻ khác</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Task from "@/components/admin/Task";
import draggable from 'vuedraggable'
import NewCard from "@/components/include/NewCard";
import api from "@/api";

export default {
  name: "List",
  props: ['item', 'index'],
  data() {
    return {
      'cardAddOpen': false,
      'listTitle': '',
    }
  },
  components: {
    Task,
    NewCard,
    draggable,
  },
  methods: {
    moveTask(event) {
      let id = event.draggedContext.element.id
      let task = event.to.parentElement
      let directory = task.parentElement;
      let payload = {
        index: event.draggedContext.futureIndex + 1,
        directory_id: directory.parentElement.getAttribute('id')
      }
      if (id !== event.draggedContext.futureIndex) {
        api.changeCardList(payload, id).then(() => {
          this.$emit('updateCardList');
        })
      }
    },
    openActionList(e){
      let rect = e.target.getBoundingClientRect();
      let data = {
        left: rect.left,
        top: rect.top,
        id: this.item.id
      };
      this.$emit('openActionList',data)
    },
    loadTitle() {
      this.listTitle = this.item.title;
    },
    openAddCard() {
      console.log('a')
      this.cardAddOpen = true;
    },
    closeAddCard() {
      this.cardAddOpen = false;
    },
    updateListTitle(e) {
      e.target.blur();
      let updateTile = {
        data: {
          title: e.target.value
        },
        id: this.item.id
      }
      this.$emit('updateListTitle', updateTile);
    },
    handleAddCard(data) {
      api.addCards(data).then((response) => {
        console.log(response)
        this.updateCardList();
      })
    },
    updateCardList() {
      this.$emit('updateCardList');
    },
    handleShowControl(data) {
      this.$emit('handleShowControl', data)
    },
    closeControlModal() {
      this.$emit('closeControlModal')
    },
    openQuickEdit(data){
      this.$emit('openQuickEdit',data)
    },
    openDetailCard(id){
      this.$emit('openDetailCard',id)
    }
  },
  mounted() {
    this.loadTitle();
    this.popupItem = this.$el
  },
  updated() {
    this.loadTitle();
  },
}
</script>

<style lang="scss" scoped>
.listWrapper {
  width: 272px;
  margin: 0 4px;
  height: 100%;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  white-space: nowrap;
  .listContent {
    background-color: #ebecf0;
    border-radius: 3px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    max-height: 100%;
    position: relative;
    white-space: normal;
    .listHeader {
      flex: 0 0 auto;
      display: flex;
      padding-left: 10px;
      position: relative;
      min-height: 20px;
      .list-header-target {
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
      .menu {
        margin: 6px 4px 4px 4px;
        padding: 6px;
        text-align: center;
        cursor: pointer;
        line-height: 20px;
        height: 22px;
        width: 22px;
        z-index: 99;
        font-size: 16px;
      }
      .menu:hover {
        background-color: rgba(9, 30, 66, .08);
      }
      .list-header-name {
        height: 22px;
        margin: 0;
      }
      .list-header-edit-name {
        resize: none;
        font-size: 16px;
        line-height: 20px;
        font-weight: 600;
        background-color: #ebecf0;
        border: none;
        height: 22px;
        width: 98%;
        margin: 6px 0;
        padding: 4px 0 4px 8px;
        cursor: pointer;
      }
      textarea:focus {
        background-color: white !important;
        overflow: hidden;
        overflow-wrap: break-word;
      }
    }
    .listFooter {
      min-height: 40px;
      max-height: 40px;
      display: flex;
      justify-content: space-between;
      margin-top: 5px;
      margin-bottom: 8px;
      .openCard {
        border-radius: 3px;
        color: #5e6c84;
        display: block;
        flex: 1 0 auto;
        margin: 2px 10px 2px 10px;
        padding: 8px 8px;
        position: relative;
        text-decoration: none;
        -webkit-user-select: none;
        user-select: none;
        text-align: left;
        cursor: pointer;
        .icon-add-card {
          margin-right: 2px;
        }
        .text-add-card {
          font-size: 14px;
        }
      }
      .openCard:hover {
        background-color: rgba(9, 30, 66, .08);
        color: #172b4d;
      }
    }
    .listCard {
      flex: 1 1 auto;
      margin-bottom: 0;
      overflow-y: auto;
      overflow-x: hidden;
      margin: 0 4px;
      padding: 0 4px;
      z-index: 1;
      min-height: 0;
    }

//Thanh Cuộn
    .listCard::-webkit-scrollbar {
      width: 5px;
    }
    .listCard::-webkit-scrollbar-track {
      border-radius: 7px;
      background-color: #93C5FD;
    }
    .listCard::-webkit-scrollbar-thumb {
      background: #9CA3AF;
      border-radius: 5px;
    }
    .listCard::-webkit-scrollbar-thumb:hover {
      background: #4a4a727d;
    }
  }
}
.listWrapper:first-child {
  margin-left: 8px;
}
</style>