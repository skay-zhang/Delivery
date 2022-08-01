<template>
  <div>
    <el-scrollbar height="568px" noresize>
      <div class="pa-10 pb-0">
        <share-item ref="share" :list="list" @remove="remove" />
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
      drop: false,
      list: []
    }
  },
  methods: {
    installDrop() {
      let dropbox = document.getElementById("drop");
      dropbox.addEventListener("dragleave", this.dragEnd);
      dropbox.addEventListener("drop", this.dropEnd, false);
      window.addEventListener("dragenter", this.dragStart);
      window.addEventListener("dragover", this.dragStart);
    },
    uninstallDrop() {
      let dropbox = document.getElementById("drop");
      dropbox.removeEventListener("dragleave", this.dragEnd);
      dropbox.removeEventListener("drop", this.dropEnd, false);
      window.removeEventListener("dragenter", this.dragStart);
      window.removeEventListener("dragover", this.dragStart);
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
    remove(e){
      if(e.length == 1) share.removeItem(e[0]);
      else share.removeList(e);
      this.$message.success('删除成功');
      this.$refs.share.cleanSelect();
      this.getList();
    }
  },
  mounted() {
    this.installDrop();
    this.getList();
  },
  beforeUnmount() {
    this.uninstallDrop();
  },
  watch: {
    '$route.path': {
      handler(to, from) {
        if (to === '/home') setTimeout(() => this.installDrop(), 300);
        else if (from === '/home') this.uninstallDrop();
      },
      deep: true
    }
  }
};
</script>

<style scoped>
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
</style>
