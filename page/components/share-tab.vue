<template>
  <div>
    <el-scrollbar height="568px" noresize>
      <div>
        <div class="pa-10 pb-0" v-if="enable">
          <share-item :list="list" />
        </div>
        <div class="tips flex align-center justify-center full-width" v-else>
          <div class="text-center">
            <el-icon class="tips-icon">
              <RemoveFilled />
            </el-icon>
            <div>分享服务未启用</div>
          </div>
        </div>
      </div>
      <div id="drop" class="flex align-center justify-center" v-show="drop">
        <div class="text-center">
          <el-icon class="drop-icon">
            <Pointer />
          </el-icon>
          <div>拖入文件即可加入分享</div>
        </div>
        <div id="drop-mask"></div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { RemoveFilled, Pointer } from '@element-plus/icons-vue'
import share from '../../basic/plugins/share';
import ShareItem from './share-item.vue';

export default {
  name: "shareTab",
  components: { RemoveFilled, Pointer, ShareItem },
  data() {
    return {
      enable: true,
      drop: false,
      list: []
    }
  },
  methods: {
    initDrop() {
      let dropbox = document.getElementById("drop");
      dropbox.addEventListener("dragleave", this.dragEnd);
      dropbox.addEventListener("drop", this.dropEnd, false);
      window.addEventListener("dragenter", this.dragStart);
      window.addEventListener("dragover", this.dragStart);
    },
    getList() {
      this.list = share.getList();
    },
    dragStart(e) {
      e.stopPropagation();
      e.preventDefault();
      this.drop = true;
    },
    dragEnd(e) {
      e.stopPropagation();
      e.preventDefault();
      this.drop = false;
    },
    dropEnd(e) {
      this.drop = false;
      this.list = share.addItem(e.dataTransfer.files);
    },
  },
  mounted() {
    console.log('share show')
    this.initDrop();
    this.getList();
  },
  beforeUnmount() {
    console.log('share hide')
    let dropbox = document.getElementById("drop");
    dropbox.removeEventListener("dragleave", this.dragEnd);
    dropbox.removeEventListener("drop", this.dropEnd, false);
    window.removeEventListener("dragenter", this.dragStart);
    window.removeEventListener("dragover", this.dragStart);
  }
};
</script>

<style scoped>
.tips {
  height: calc(100vh - 132px);
}

.tips-icon {
  margin-bottom: 20px;
  color: #c45656;
  font-size: 80px;
}

#drop {
  background-color: rgba(0, 0, 0, .3);
  transition: all ease-out 0.3s;
  font-size: 18px;
  position: fixed;
  height: 700px;
  width: 100%;
  z-index: 9;
  left: 0;
  top: 0;
}

#drop-mask {
  position: absolute;
  height: 700px;
  z-index: 10;
  width: 100%;
  left: 0;
  top: 0;
}

.drop-icon {
  margin-bottom: 20px;
  font-size: 80px;
}

.icon {
  background-color: var(--app-topbar-btn-hover-color);
  transition: all ease-out 0.3s;
  border-radius: 6px;
  margin-right: 10px;
  padding: 3px;
  height: 30px;
  width: 30px;
}

.size {
  margin-top: -5px;
}

.info {
  width: 260px;
}

.card {
  transition: all ease-out 0.3s;
  cursor: pointer;
}

.card:hover {
  background-color: var(--app-menu-hover-color);
}

.card:hover .icon {
  background-color: var(--app-menu-active-color);
}

.card:active {
  background-color: var(--app-menu-active-color);
}
</style>
