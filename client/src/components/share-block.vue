<template>
  <template v-if="list.length > 0">
    <template v-if="mode === 'tile'">
      <share-list :list="list" />
    </template>
    <div class="mt-15" v-else-if="mode === 'classify'">
      <div v-for="(group, index) in list" :key="index">
        <div class="group-title">{{ type[group.name] }}</div>
        <share-list :list="group.list" />
      </div>
    </div>
  </template>
  <div class="flex align-center justify-center" v-else style="height: calc(100vh - 240px);">
    <el-empty description="没有分享的文件" />
  </div>
</template>

<script>
import ShareList from './share-list.vue'
import api from '../plugins/api'

export default {
  name: "shareBlock",
  components: { ShareList },
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    mode: {
      type: String,
      default: 'tile' // tile or classify
    }
  },
  data() {
    return {
      type: {
        apk: 'Android 安装包',
        ipa: 'iOS 安装包',
        assembly: '二进制',
        audio: '音频',
        css: '层叠样式表',
        database: '数据库',
        docker: 'Docker',
        document: '文本',
        word: '文档',
        excel: '表格',
        ppt: '演示文稿',
        exe: 'Windows 应用程序',
        folder: '文件夹',
        font: '字体',
        html: 'HTML',
        ico: '图标',
        image: '图片',
        iso: '光盘镜像',
        java: 'Java',
        python: 'Python',
        javascript: 'JavaScript',
        json: 'JSON',
        markdown: 'Markdown',
        pdf: 'PDF',
        zip: '压缩包',
        shell: '脚本',
        url: '快捷方式',
        other: '其他'
      }
    };
  },
  methods: {
    addDownload(file) {
      if (file.progress != undefined) {
        this.$message.warning('正在下载中, 请勿重复操作')
        return;
      }
      api.download(file, this.downMonitor).then(res => {
        if (res.size < 50) {
          let reader = new FileReader();
          reader.readAsText(res, 'utf8');
          reader.onload = (e) => {
            let data = JSON.parse(e.target.result);
            this.$message.warning(data.message);
          }
        } else {
          setTimeout(() => {
            let url = URL.createObjectURL(res);
            let a = document.createElement("a");
            a.download = `${file.name}`;
            a.style.display = "none";
            a.href = url;
            a.click();
            URL.revokeObjectURL(a.href);
          }, 500)
        }
      }).catch(e => {
        console.log('error: ', e)
        this.$message.error('分享服务异常');
      })
    },
    downMonitor(file, event) {
      let progress = Math.ceil(event.loaded / event.total * 100);
      if (progress == 100 && event.loaded != event.total) progress = 99;
      if (progress == 100) this.downTips(file);
      file.progress = progress;
    },
    downTips(file) {
      setTimeout(() => {
        delete file.progress;
      }, 3000)
    }
  }
};
</script>

<style scoped>
.group-title {
  border-left: 5px solid var(--app-title-color);
  padding-left: 10px;
  font-size: 18px;
}
</style>