<template>
  <div class="menu flex align-center" v-if="!fold">
    <div class="menu-item flex align-center justify-center" :class="{ active: select == 'share' }"
      @click="switchTab('share')">
      <div class="mr-5">分享</div>
      <el-icon class="menu-icon">
        <Upload />
      </el-icon>
    </div>
    <div class="menu-item flex align-center justify-center" :class="{ active: select == 'receive' }"
      @click="switchTab('receive')">
      <div class="mr-5">接收</div>
      <el-icon class="menu-icon">
        <Download />
      </el-icon>
    </div>
  </div>
  <div class="content" v-if="!fold">
    <div v-show="show">
      <share-tab ref="share" v-if="select === 'share'" />
      <receive-tab ref="receive" v-else-if="select === 'receive'" />
    </div>
  </div>
  <div class="foot flex align-center justify-center" @click="foldWin">
    <el-icon v-if="fold">
      <ArrowDownBold />
    </el-icon>
    <el-icon v-else>
      <ArrowUpBold />
    </el-icon>
  </div>
</template>

<script>
import { Upload, Download, ArrowUpBold, ArrowDownBold } from '@element-plus/icons-vue';
import ShareTab from '../components/share-tab.vue';
import ReceiveTab from '../components/receive-tab.vue';
import { win } from '../plugins/util';

export default {
  name: 'home',
  components: { Upload, Download, ArrowUpBold, ArrowDownBold, ShareTab,ReceiveTab },
  data() {
    return {
      select: 'share',
      fold: false,
      show: true
    }
  },
  methods: {
    switchTab(tab) {
      this.select = tab;
    },
    foldWin() {
      if (this.fold) {
        win.open();
        setTimeout(() => {
          this.show = true
        }, 100)
      } else {
        win.fold();
        this.show = false
      }
      this.fold = !this.fold;
    }
  }
}
</script>

<style scoped>
.menu {
  border: 1px solid var(--app-head-border-color);
  border-top: none;
  z-index: 4;
}

.menu-item {
  background-color: var(--app-menu-color);
  cursor: pointer;
  height: 28px;
  width: 50vw;
}

.menu-item:active {
  background-color: var(--app-menu-hover-color);
}

.menu-item.active {
  background-color: var(--app-menu-active-color);
  border-bottom: 2px solid var(--app-menu-active-border-color);
  margin-bottom: -1px;
  height: 27px;
}

.menu-icon {
  font-size: 16px;
}

.content {
  border-right: 1px solid var(--app-head-border-color);
  border-left: 1px solid var(--app-head-border-color);
  background-color: var(--app-content-color);
  height: calc(100vh - 132px);
  width: calc(100vw - 2px);
}

.foot {
  border: 1px solid var(--app-head-border-color);
  background-color: var(--app-head-color);
  color: var(--app-head-text-color);
  border-radius: 0 0 8px 8px;
  width: calc(100vw - 2px);
  cursor: pointer;
  height: 20px;
}
</style>