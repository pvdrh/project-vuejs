<template>
  <div>
    <div class="listWrap" id="list2">
      <div class="list-header">
        <input type="text" class="list-name" v-model="directoryName" ref="directoryName"
               @click="handleEditName"
               @blur="cancelEditName"
               @keydown.enter="updateDirectoryName">
        <el-button class="list-more-action" size="small" style="border: 0; background-color: #ebecf0;font-size:18px">
          <i class="el-icon-close" @click="deleteList"></i>
        </el-button>
      </div>
      <draggable class="drag-cards"
                 group="cards"
                 :list="directory.cards"
                 :move="moveCard">
      <Card v-for="(card) in directory.cards" :key="card.id" :cardId="card.id" @reload="reloadDirectories"/>
      </draggable>
      <div class="btn-add-card" ref="btnAddCard">
        <el-button type="info" size="small" class="add-card" @click="addCard()">
          <i class="el-icon-plus"></i>
          Thêm thẻ khác
        </el-button>
      </div>
      <div class="form-add-card" ref="formAddCard">
        <el-input placeholder="Nhập tiêu đề cho thẻ." v-model="cardName"></el-input>
        <el-button type="success" size="small" @click="storeCard">Thêm thẻ</el-button>
        <i style="margin-left:10px" class="el-icon-close" @click="cancelAddCard()"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import api from '../api'
import Card from "@/components/Card";
import draggable from 'vuedraggable'

export default {
  props: ['directory'],
  name: "Directory",
  components: {
    Card,
    draggable
  },
  computed: {
    ...mapState('home', [

    ]),
  },
  data () {
    return {
      directoryName: this.directory.title,
      newCard: [],
      dialogVisible: false,
      cardName: '',
      card: [],
      carDescription: false,
      labelName: '',
      labels: [],
      cards: [],
      labelColor: '',
      deadline: ''
    }
  },
  methods: {
    ...mapMutations('home', [
      'addNewCard', 'removeList'
    ]),
    handleEditName() {
      this.$refs.directoryName.style.background = 'white'
    },
    cancelEditName() {
      this.$refs.directoryName.style.background = '#ebecf0'
    },
    updateDirectoryName() {
      let data = {
        title: this.directoryName
      }
      api.editDirectoryName(this.directory.id, data).then(() => {
        this.$message({
          message: 'Cập nhật thành công.',
          type: 'success',
          center:true
        });
        this.reloadDirectories()
        this.cancelEditName()
      }).catch(() => {
        this.$message({
          message: 'Cập nhật thất bại!',
          type: 'error',
          center:true
        });
      })
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
    deleteList() {
      this.$confirm('Bạn có chắc chắn muốn xóa không?', 'Chú Ý', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
        confirmButtonClass: 'btn-delete-list',
        type: 'warning'
      }).then(() => {
        api.deleteDirectory(this.directory.id).then(() => {
          this.$message({
            message: 'Xóa thành công.',
            type: 'success',
            center:true
          });
          this.reloadDirectories()
        }).catch(() => {
          this.$message({
            message: 'Xóa thất bại!',
            type: 'error',
            center:true
          });
        })
      }).catch(() => {})
    },
    storeCard() {
      let data = {
        title: this.cardName,
        index: this.directory.cards.length + 1,
        directory_id: this.directory.id
      }
      api.createCard(data).then(() => {
        this.reloadDirectories()
        this.cancelAddCard()
      }).catch(() => {
        this.$message({
          message: 'Thêm thẻ không thành công!',
          type: 'error',
          center:true
        });
        this.cancelAddCard()
      })
    },
    reloadDirectories() {
      this.$emit('reloadDirectories')
    },
    moveCard(event) {
      let id = event.draggedContext.element.id
      let index = event.draggedContext.futureIndex
      let a = event.to.parentElement
      let data = {
        index: index,
        directory_id: a.parentElement.getAttribute('id')
      }
      api.changeCardDirectory(id, data).then(() => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.listWrap {
    width: 270px;
    padding: 6px 8px;
    text-align: left;
    background: #ebecf0;
    border-radius: 5px;
    box-sizing: border-box;
    color: #5e6c84;
    float: left;
    min-height: 80px;
    margin-right: 15px;

    .list-header {
      position: relative;
      font-size: 16px;
      font-weight: bold;
      height: 35px;
      padding: 5px 20px 5px 5px;

      .list-name {
        width: 90%;
        height: 30px;
        background: #ebecf0;
        border: none;
        outline:none;
        font-size: 16px;
        white-space: normal;
      }

      .list-name:focus{
        width: 90%;
        height: 30px;
        background: #ebecf0;
        border: none;
        outline:none;
        font-size: 16px;
        box-shadow: inset 0 0 0 2px #aeb5b9;
         white-space: normal;
      }

      .list-more-action {
        position: absolute;
        right: 0;
        top: 4px;
        padding: 4px;
        cursor: pointer;
      }
    }

    .add-card {
      width: 100%;
      padding-left: 10px;
      text-align: left;
      color: #5e6c84;
      font-size: 14px;
      background-color: #ebecf0;
      border-color: #ebecf0;
      z-index: 999;
    }

    .form-add-card {
      display: none;
      
      .el-input {
        margin-bottom: 7px;
      }
    }
  }
</style>