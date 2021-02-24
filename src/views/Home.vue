<template>
  <div class="homeWrap">
    <div class="header">
      <div class="nav">
        Bảng
      </div>
    </div>
    <div class="main-content">
      <List v-for="(list, index) in lists" :key="index" :list="list" />
      <div class="listWrap" ref="addListBtn" @click="createListForm()">
        <i class="el-icon-plus"></i>
        Thêm danh sách khác
      </div>
      <div class="listWrap" id="addWrap" ref="addListWrap">
        <el-input placeholder="Nhập tiêu đề danh sách..." v-model="listName"></el-input>
        <el-button type="success" class="add-list" @click="createList">Thêm danh sách</el-button>
        <i class="el-icon-close close" @click="cancelCreateList()"></i>
      </div>
    </div>
  </div>
</template>

<script>
import List from "@/components/List";
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Home',
  components: {
    List
  },
  data () {
    return {
      dynamicValidateForm: {
        listName: ''
      },
      listName: '',
      newList: []
    }
  },
  computed: {
    ...mapState('home', [
        'lists'
    ])
  },
  methods: {
    ...mapMutations('home', [
       'addList'
    ]),
      cancelCreateList() {
      this.$refs.addListBtn.style.display = 'block'
      this.$refs.addListWrap.style.display = 'none'
      this.listName = ''
    },
    createListForm() {
      this.$refs.addListBtn.style.display = 'none'
      this.$refs.addListWrap.style.display = 'block'
    },
    createList() {
      if (this.listName != '')
      {
        this.newList.push(this.lists.length + 1)
        this.newList.push(this.listName)
        this.addList(this.newList)
        this.cancelCreateList()
        this.newList = []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .homeWrap {
    height: 100vh;
    .header {
      height: auto;
      overflow: hidden;
      .nav {
        margin: 7px;
        padding: 7px;
        float: left;
        background: rgba(80, 80, 80, 0.3);
        color: #fff;
        border-radius: 4px;
        cursor: pointer;
      }
    }
    .main-content {
      margin: 0 7px;
      .listWrap {
        padding: 10px 8px;
        text-align: left;
        background: rgba(80, 80, 80, 0.3);
        border-radius: 5px;
        width: 270px;
        box-sizing: border-box;
        color: #fff;
        float: left;
        margin-right: 15px;
        cursor: pointer;
      }
      #addWrap {
        background: white !important;
        color:gray;
        display: none;
        .close {
          font-size: 16px;
        }
        .add-list {
          padding: 7px 10px;
          margin: 4px 10px 0 0;
        }
      }
    }
  }
</style>
