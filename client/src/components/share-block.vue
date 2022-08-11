<template>
  <div class="file-list" v-if="list.length > 0">
    <div class="file-box" v-for="item in list" :key="item.code" @click="addDownload(item)">
      <div class="file-item">
        <el-progress v-if="item.progress" class="file-progress" :stroke-width="4" :width="60"
          :status="item.progress == 100 ? 'success' : 'warning'" type="circle" :percentage="item.progress">
          <template #default="{ percentage }">
            <span class="text-small">{{ percentage }}%</span>
          </template>
        </el-progress>
        <img class="file-icon card" :src="'./img/' + item.icon + '.png'" alt="icon" />
        <div class="file-title line-1">{{ item.name }}</div>
        <div class="text-small text-center text-gray">{{ item.size }}</div>
      </div>
    </div>
  </div>
  <div class="flex align-center justify-center" v-else style="height: calc(100vh - 240px);">
    <el-empty description="没有分享的文件" />
  </div>
</template>

<script>
import { p } from '@antfu/utils';
import api from '../plugins/api'

export default {
  name: "shareBlock",
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    }
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
.file-list {
  box-sizing: border-box;
  position: relative;
  padding: 20px 0;
  flex-wrap: wrap;
  display: flex;
  width: 100%;
}

.file-item {
  margin: 0 auto 10px auto;
  text-align: center;
  position: relative;
  cursor: pointer;
}

.file-icon {
  transition: all ease-out 0.3s;
  margin-bottom: 5px;
  padding: 10px;
  height: 50px;
  width: 50px;
}

.file-title {
  margin-bottom: 5px;
  line-height: 16px;
  font-size: 14px;
}

.file-item:hover .file-icon {
  background-color: var(--app-card-hover-color);
}

.file-item:active .file-icon {
  background-color: var(--app-card-active-color);
}

.file-box {
  max-width: 10%;
  flex: 0 0 10%;
}

.file-progress {
  background-color: var(--app-mask-color);
  padding: 5px;
  border-radius: 8px;
  position: absolute;
  height: 60px;
  width: 60px;
}

.file-progress .text-small {
  color: var(--app-text-color);
}

@media only screen and (max-width: 768px) {
  .file-box {
    max-width: 12.5% !important;
    flex: 0 0 12.5% !important;
  }
}

@media only screen and (max-width: 650px) {
  .file-box {
    max-width: 16.5% !important;
    flex: 0 0 16.5% !important;
  }
}

@media only screen and (max-width: 500px) {
  .file-box {
    max-width: 20% !important;
    flex: 0 0 20% !important;
  }
}


@media only screen and (max-width: 375px) {
  .file-box {
    max-width: 25% !important;
    flex: 0 0 25% !important;
  }
}
</style>