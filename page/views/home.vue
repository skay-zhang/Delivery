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
      <div class="text-center pa-10" v-else-if="select === 'receive'">
        receive
      </div>
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
import { win } from '../plugins/util';

export default {
  name: 'home',
  components: { Upload, Download, ArrowUpBold, ArrowDownBold, ShareTab },
  data() {
    return {
      select: 'share',
      fold: false,
      show: true,
      drop: false,
      list: {
        share: [],
        receive: []
      }
    }
  },
  methods: {
    init() {
      let dropbox = document.getElementById("drop");
      dropbox.addEventListener("dragleave", this.dragEnd);
      dropbox.addEventListener("drop", this.dropEnd, false);
      window.addEventListener("dragenter", this.dragStart);
      window.addEventListener("dragover", this.dragStart);
    },
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
  },
  mounted() {
    this.init();
  },
  watch: {
    '$route.query': {
      handler(to, from) {
        console.log(to, from);
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.menu {
  border-bottom: 1px solid var(--app-head-border-color);
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
  background-color: var(--app-content-color);
  height: calc(100vh - 132px);
  width: 100vw;
}

.foot {
  border-bottom: 1px solid var(--app-head-border-color);
  border-top: 1px solid var(--app-head-border-color);
  background-color: var(--app-head-color);
  color: var(--app-head-text-color);
  border-radius: 0 0 8px 8px;
  cursor: pointer;
  width: 100vw;
  height: 20px;
}
</style>