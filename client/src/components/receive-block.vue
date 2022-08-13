<template>
  <el-drawer custom-class="app-drawer" :with-header="false" v-model="drawer" direction="ttb">
    <div>
      <el-upload v-model:file-list="upload.list" drag multiple :before-upload="pretreatment" :show-file-list="false" :action="upload.url">
        <el-icon class="el-icon--upload">
          <upload-filled />
        </el-icon>
        <div class="el-upload__text">拖入文件或点此上传</div>
      </el-upload>
      <div class="mt-5">
        <el-scrollbar height="calc(500px - 200px)">
          <div class="flex align-center mb-5" v-for="item in upload.list" :key="item.uid">
            <div class="file-name line-1">{{ item.name }}</div>
            <div class="file-progress">
              <el-progress :percentage="item.percentage" :text-inside="true" :stroke-width="16"
                :status="buildProgress(item.status)" />
            </div>
            <div class="file-size">{{ buildSize(item.size) }}</div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { UploadFilled } from '@element-plus/icons-vue'

export default {
  name: "receiveBlock",
  components: { UploadFilled },
  props: {

  },
  data() {
    return {
      drawer: false,
      upload: {
        url: '',
        list: []
      },
    };
  },
  methods: {
    open() {
      this.drawer = true;
    },
    pretreatment(file){
      return new File([file],encodeURIComponent(file.name));
    },
    buildSize(number) {
      if (number >= 1073741824) return parseFloat(number / 1073741824).toFixed(2) + ' GB'
      else if (number >= 1048576) return parseFloat(number / 1048576).toFixed(2) + ' MB'
      else if (number >= 1024) return parseFloat(number / 1024).toFixed(2) + ' KB'
      else return parseFloat(number / 1024).toFixed(2) + ' B'
    },
    buildProgress(status) {
      if (status === 'uploading') return '';
      else if (status === 'success') return 'success';
      else if (status === 'fail') return 'exception';
    }
  },
  mounted() {
    // 初始化上传地址
    let location = window.location;
    this.upload.url = location.protocol + '//' + location.host + '/api/upload';
    // this.upload.url = 'http://127.0.0.1:56565/api/upload';
  }
};
</script>

<style scoped>
.file-name {
  min-width: 120px;
  width: 50%;
}

.file-size {
  text-align: right;
  min-width: 80px;
  width: 80px;
}

.file-progress {
  width: calc(100% - 10px);
  padding: 0 5px;
}
</style>
<style>
.app-drawer {
  background-color: var(--app-background-color);
  border-radius: 0 0 16px 16px;
  height: 500px !important;
  max-width: 1000px;
  margin: 0 auto;
}

.app-drawer .el-drawer__body{
  padding: 10px 10px 0 10px;
}

.app-drawer .el-upload-dragger {
  background-color: var(--app-card-color);
}

.app-drawer .el-progress__text {
  min-width: auto;
}
</style>
