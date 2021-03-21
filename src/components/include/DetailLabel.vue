<template>
  <span class="card-label" @click="activeLabel(color)" :class="['card-label-'+color]">{{ title }}
    <span  v-if="showIcon" class="icon-sm icon-check card-label-selectable-icon">
      <i class="el-icon-check"></i>
    </span>
  </span>
</template>

<script>
import _ from 'lodash'

export default {
  name: "DetailLabel",
  props: [ 'id','title', 'card', 'isActive','color', ],
  data() {
    return {
      dataActive: '',
      showIcon: false
    }
  },
  methods: {
    activeLabel(color) {
      let data = {
        label_id: this.id,
        color: color,
        isActive: this.showIcon
      }
      this.$emit('activeLabel', data);
      this.showIcon = !this.showIcon
    },
    checkActiveEdit() {
      if (this.isActive.color === this.color) {
        this.showIcon = true;
        this.dataActive = this.color
      }
    },
    checkActive() {
      if (!_.isEmpty(this.card)) {
        this.card.labels.map((label) => {
          if (label.id === this.id) {
            this.showIcon = true
          }
        })
      }
    },
  },
  mounted() {
    this.checkActive()
    this.checkActiveEdit()
  },
  watch: {
    card: function (value) {
        value.labels.map((label) => {
          if (label.id === this.id) {
            this.showIcon = true
          }
        })
    },
    isActive: function (value) {
      if (value.color === this.color) {
        this.dataActive = this.color
        this.showIcon = true;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.card-label {
  font-weight: 800;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 0 4px;
  min-height: 20px;
  padding: 6px 12px;
  position: relative;
  width: 100%;
  color: white;
  display: block;
  white-space: nowrap;
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;

  span {
    vertical-align: bottom;
    height: 20px;
    font-size: 16px;
    line-height: 20px;
    width: 20px;
    text-align: center;
    left: 14px;
    position: absolute;
    top: 6px;
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
// .card-label-default{
//   background-color: #9CA3AF;
// }
</style>