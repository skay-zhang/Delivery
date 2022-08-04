<template>
  <div>
    <div class="border-bottom">
      <div class="header flex align-center justify-between">
        <div class="title flex align-center">
          <div class="name">Delivery</div>
          <span>Client</span>
        </div>
        <div class="menu flex align-center">
          <div class="menu-item flex align-center" :class="{ available: state.receive }">
            <el-icon size="28px">
              <UploadFilled />
            </el-icon>
            <div>发送文件</div>
          </div>
          <div class="menu-item available flex align-center">
            <el-icon size="23px">
              <UserFilled />
            </el-icon>
            <div>Admin</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <template v-if="state.share">
        <div class="file-list" v-if="list.length > 0">
          <div class="file-item" v-for="item in list" :key="item.code">
            <img class="file-icon card" :src="'./img/' + item.icon + '.png'" alt="icon" />
            <div class="file-title line-1">{{ item.name }}</div>
            <div class="text-small text-center text-gray">{{ item.size }}</div>
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
      version: '1.0.0',
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
    }
  },
  mounted() {
    let state = localStorage.getItem('app:state');
    if (state) this.state = JSON.parse(state);
    let version = localStorage.getItem('app:version');
    if (version) this.version = version;
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

.menu-item i {
  margin-right: 5px;
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
  padding: 20px 0 0 10px;
  justify-content: space-evenly;
  flex-wrap: wrap;
  display: flex;
}

.file-item {
  margin: 0 10px 10px 0;
  text-align: center;
  width: 100px;
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
</style>
