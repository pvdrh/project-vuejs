<template>
  <div>
    <div class="listWrap" id="list2">
      <div class="list-header">
        <div class="list-name" ref="listName" @click="editName()">
          {{list.name}}
        </div>
        <el-button class="list-more-action" type="info" size="mini" style="border: 0">
          <i class="el-icon-close" @click="deleteList()"></i>
        </el-button>
        <input class="list-name-edit" type="text" v-model="listName" ref="inputName" @blur="saveName()" @keydown.enter="saveName()">
      </div>
      <div v-for="(card, index) in getCardsByListId" :key="index" class="card" ref="card">
        <el-card shadow="hover" body-style="padding: 0 0 0 10px" class="card-content">
          {{card.name}}
        </el-card>
      </div>
      <div class="btn-add-card" ref="btnAddCard">
        <el-button type="info" size="small" class="add-card" @click="addCard()">
          <i class="el-icon-plus"></i>
          Thêm thẻ mới
        </el-button>
      </div>
      <div class="form-add-card" ref="formAddCard">
        <el-input placeholder="Nhập tiêu đề cho thẻ này..." v-model="cardName"></el-input>
        <el-button type="success" size="small" @click="saveCard()">Thêm thẻ</el-button>
        <i class="el-icon-close" @click="cancelAddCard()"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  props: ['list'],
  name: "List",
  components: {

  },
  computed: {
    ...mapState('home', [
        'cards'
    ]),
    getCardsByListId () {
      return this.cards.filter(card => card.list_id === this.list.id)
    }
  },
  data () {
    return {
      listName: this.list.name,
      cardName: '',
      newCard: []
    }
  },
  methods: {
    ...mapMutations('home', [
      'addNewCard', 'removeList'
    ]),
    editName() {
      this.$refs.listName.style.display = 'none'
      this.$refs.inputName.style.display = 'block'
    },
    saveName() {
      this.list.name = this.listName
      this.$refs.listName.style.display = 'block'
      this.$refs.inputName.style.display = 'none'
      console.log(this.list)
    },
    addCard() {
      this.$refs.btnAddCard.style.display = 'none'
      this.$refs.formAddCard.style.display = 'block'
    },
    cancelAddCard() {
      this.$refs.btnAddCard.style.display = 'block'
      this.$refs.formAddCard.style.display = 'none'
      this.cardName = ''
    },
    saveCard() {
      if (this.cardName != '')
      {
        this.newCard.push(this.cards.length + 1)
        this.newCard.push(this.cardName)
        this.newCard.push(this.list.id)
        this.addNewCard(this.newCard)
        this.cancelAddCard()
        this.newCard = []
      }
    },
    deleteList() {
      this.removeList(this.list)
    }
  }
}
</script>

<style lang="scss" scoped>
  .listWrap {
    padding: 6px 8px;
    text-align: left;
    background: #1A1B41;
    border-radius: 5px;
    width: 270px;
    box-sizing: border-box;
    color: white;
    float: left;
    margin-right: 10px;
    min-height: 80px;
    max-height: 700px;
    overflow: auto;
    .list-header {
      position: relative;
      font-size: 14px;
      font-weight: bold;
      height: 30px;
      padding: 5px 20px 5px 5px;
      .list-name {
        cursor: pointer;
        padding-left: 5px;
      }
      .list-more-action {
        position: absolute;
        right: 0;
        top: 4px;
        padding: 4px;
        cursor: pointer;
      }
      .list-name-edit {
        height: 22px;
        border: 2px solid #0080dd;
        border-radius: 3px;
        padding-left: 3px;
        font-weight: bold;
        color: #5e6c84;
        font-size: 14px;
        width: 216px;
        display: none;
      }
    }
    .card {
      padding-bottom: 7px;
      cursor: pointer;
      .card-content {
        height: 32px;
        display: flex;
        align-items: center;
      }
    }
    .add-card {
      width: 100%;
      padding-left: 10px;
      text-align: left;
      color: #5e6c84;
      background-color: #ebecf0;
      border-color: #ebecf0
    }
    .form-add-card {
      display: none;
    }
  }
</style>