<template>
  <div class="card flex align-center mb-10" v-for="(item, i) in list" :key="'sf-' + i" :class="{ active: item.select }"
    @click="openInfo(item)">
    <div class="left" @click.stop>
      <el-checkbox class="select" v-model="item.select" size="large" @change="selectItem" />
      <img class="icon" :src="'/img/' + item.icon + '.png'" />
    </div>
    <div class="info">
      <div class="size text-small float-right">{{ item.size }}</div>
      <div class="title mb-5 line-1">{{ item.name }}</div>
      <div class="text-small text-gray line-1">{{ item.path }}</div>
    </div>
    <div class="remove flex align-center justify-center" @click.stop="remove(item.path)">
      <el-icon>
        <Delete />
      </el-icon>
    </div>
  </div>
  <div class="foot-bar text-small text-gray flex justify-center">
    共 {{list.length}} 项
  </div>
  <div class="tools flex align-center justify-between" :class="{ show: number > 0 }">
    <div class="text-gray">已选择 {{ number }} 项</div>
    <el-button type="danger">删除</el-button>
  </div>
  <el-drawer v-model="info.show" :title="info.data.name" direction="btt"
    :before-close="closeInfo">
    <span>Hi, there!</span>
  </el-drawer>
</template>

<script>
import { Delete } from '@element-plus/icons-vue'
export default {
  name: "shareItem",
  components: { Delete },
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      number: 0,
      info:{
        show: false,
        data: {}
      }
    }
  },
  methods: {
    openInfo(item) {
      this.info.show = true;
      this.info.data = item;
    },
    closeInfo(){
      this.info.show = false;
    },
    remove(path) {
      console.log('remove')
    },
    selectItem(e) {
      if (e) this.number = this.number + 1;
      else this.number = this.number - 1;
    }
  }
};
</script>

<style scoped>
.icon {
  background-color: var(--app-topbar-btn-hover-color);
  transition: all ease-out 0.3s;
  border-radius: 6px;
  padding: 3px;
  height: 30px;
  width: 30px;
}

.title {
  line-height: 16px;
  font-size: 14px;
}

.info {
  transition: all ease-out 0.3s;
  width: 273px;
}

.card {
  transition: all ease-out 0.3s;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  padding: 5px;
}

.card:hover {
  background-color: var(--app-menu-hover-color);
}

.card:hover .icon {
  background-color: var(--app-menu-active-color);
}

.card:active,
.card.active {
  background-color: var(--app-menu-active-color);
}

.remove {
  background-color: #c45656;
  transition: all ease-out 0.3s;
  border-radius: 6px;
  position: absolute;
  line-height: 22px;
  color: #fff;
  font-size: 22px;
  right: -50px;
  height: 36px;
  width: 36px;
  opacity: 0;
  top: 5px;
}

.card:hover .info {
  width: 235px;
}

.card:hover .remove {
  opacity: 1;
  right: 5px;
}

.remove:hover {
  background-color: #b14444;
}

.remove:active {
  background-color: #992f2f;
}

.left {
  margin-right: 7px;
  position: relative;
  height: 36px;
  width: 36px;
}

.select {
  background-color: var(--app-menu-active-color);
  transition: all ease-out 0.3s;
  height: 35.5px !important;
  width: 35.5px !important;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  position: absolute;
  display: flex;
  opacity: 0;
  left: 0;
  top: 0;
}

.left:hover .select {
  opacity: 1;
}

.card.active .select {
  opacity: 1;
}

.tools {
  border-top: 1px solid var(--app-head-border-color);
  background-color: var(--app-head-color);
  transition: all ease-out 0.3s;
  width: calc(100% - 12px);
  position: fixed;
  bottom: -42px;
  padding: 5px;
  z-index: 99;
  opacity: 0;
  left: 1px;
}

.tools.show{
  bottom: 22px;
  opacity: 1;
}

.foot-bar{
  padding-top: 10px;
  height: 35px;
  width: 100%;
}
</style>
