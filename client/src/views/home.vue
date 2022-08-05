<template>
  <div class="container">
    <div class="border-bottom">
      <div class="header flex align-center justify-between">
        <div class="title flex align-center">
          <div class="name">Delivery</div>
          <span>Client</span>
        </div>
        <div class="menu flex align-center">
          <div class="menu-item flex align-center" :class="{ available: state.receive }">
            <el-icon size="28px" class="mr-5">
              <UploadFilled />
            </el-icon>
            <div>发送文件</div>
          </div>
          <div class="menu-item available flex align-center" @click="$router.push('/auth')">
            <el-icon size="23px">
              <UserFilled />
            </el-icon>
            <div class="ml-5 hidden-xs-only">Admin</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <template v-if="state.share">
        <div class="file-list" v-if="list.length > 0">
          <div class="file-box" v-for="item in list" :key="item.code" @click="addDownload(item)">
            <div class="file-item">
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
      <div class="error flex align-center justify-center" v-else>
        <div class="text-center">
          <el-icon color="#c45656" size="90px">
            <RemoveFilled />
          </el-icon>
          <div class="mt-5">分享服务未启用</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UploadFilled, UserFilled, RemoveFilled } from '@element-plus/icons-vue'
import api from '../plugins/api'

export default {
  name: "Home",
  components: { UploadFilled, UserFilled, RemoveFilled },
  data() {
    return {
      state: { share: false, receive: false },
      list: []
    };
  },
  methods: {
    getList() {
      api.getList().then(res => {
        if (res.state) {
          this.list = res.data;
        } else {

        }
      }).catch(() => {
        // 无法连接服务器
      });
    },
    addDownload(file) {
      api.download(file.code).then(res => {
        if (res.size < 50) {
          var reader = new FileReader();
          reader.readAsText(res, 'utf8');
          reader.onload = (e) => {
            let data = JSON.parse(e.target.result);
            this.$message.warning(data.message);
          }
        } else {
          let url = URL.createObjectURL(res);
          var a = document.createElement("a");
          a.download = `${file.name}`;
          a.style.display = "none";
          a.href = url;
          a.click();
          URL.revokeObjectURL(a.href);
        }
      }).catch(e => {
        console.log('error: ', e)
        this.$message.error('分享服务异常');
      })
    }
  },
  mounted() {
    let state = localStorage.getItem('app:state');
    if (state) this.state = JSON.parse(state);
    if (this.state.share) this.getList();
  }
}
</script>

<style scoped>
.header {
  max-width: 1000px;
  margin: 0 auto;
  height: 48px;
}

.content {
  max-width: 1000px;
  margin: 0 auto;
}

.title {
  font-size: 20px;
  padding: 10px;
}

.name {
  margin-right: 5px;
  font-weight: bold;
  font-size: 24px;
}

.title span {
  background-color: var(--app-title-color);
  color: var(--app-background-color);
  border-radius: 3px;
  line-height: 16px;
  padding: 3px 5px;
  font-size: 14px;
}

.error {
  height: calc(100vh - 100px);
  width: 100%;
}

.menu-item {
  color: var(--app-disabled-color);
  cursor: not-allowed;
  padding: 0 10px;
  height: 48px;
}

.menu-item.available {
  color: var(--app-text-color);
  cursor: pointer;
}

.menu-item.available:hover {
  background-color: var(--app-menu-hover-color);
}

.menu-item.available:active {
  background-color: var(--app-menu-active-color);
}

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
  cursor: pointer;
}

.file-icon {
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

@media only screen and (min-width: 1000px) {
  .file-box {
    max-width: 10% !important;
    flex: 0 0 10% !important;
  }
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
