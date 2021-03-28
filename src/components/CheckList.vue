<template>
  <div>
    <el-row style="" class="card-info" v-for="(checkList, index) in card.check_lists" :key="index">
      <el-col :span="2" style="font-size: 20px">
        <i class="el-icon-s-claim"> </i>
      </el-col>
      <el-col :span="22" style="padding-right: 18px">
        <div class="card-info-title">
          {{checkList.title}}
          <el-button size="small" style="padding: 5px 10px; margin-left: 5px; float: right" @click="handleDeleteCheckList(checkList.id)" plain>Xóa</el-button>
        </div>
        <el-progress :percentage="0" style="margin-bottom: 15px"></el-progress>
        <div class="check-list-childs" v-for="(child, index) in checkList.check_list_childs" :key="index">
          <el-checkbox v-if="child.status" checked @change="changeStatusCheckListChild(child.id, 0)">{{child.title}}</el-checkbox>
          <el-checkbox v-else @change="changeStatusCheckListChild(child.id, 1)">{{child.title}}</el-checkbox>
        </div>
        <input v-if="addSubCheckList" type="text" class="input-sub-check-list" placeholder="Thêm một mục" ref="inputSubCheckList" v-model="subCheckListName">
        <div v-if="addSubCheckList" ref="btnSubCheckList">
          <el-button size="small" @click="closeAddSubCheckList">Hủy</el-button>
          <el-button type="success" size="small" @click="handleCreateSubCheckList(checkList.id)">Thêm</el-button>
        </div>
        <div v-if="!addSubCheckList" class="card-action-btn" ref="btnAddSubCheckList" style="width: 110px" @click="openAddSubCheckList">
          Thêm một mục
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
name: "CheckList"
}
</script>

<style lang="scss" scoped>

</style>