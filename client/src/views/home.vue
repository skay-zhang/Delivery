<template>
  <app-header :state="state" @upload="openDrawer()" />
  <el-scrollbar height="calc(100vh - 100px)">
    <div class="content mb-5">
      <template v-if="state.share">
        <share-block :list="list" :mode="mode" />
        <div class="tool">
          <div class="tool-item" :class="{ loading }" @click="getList">
            <el-icon>
              <Refresh />
            </el-icon>
          </div>
          <div class="tool-item" @click="switchMode">
            <el-icon v-if="mode === 'tile'">
              <Tickets />
            </el-icon>
            <el-icon v-else-if="mode === 'classify'">
              <Memo />
            </el-icon>
          </div>
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
  </el-scrollbar>
  <receive-block ref="receive" />
</template>

<script>
import { UploadFilled, UserFilled, RemoveFilled, Download, Refresh, Tickets, Memo } from '@element-plus/icons-vue'
import ReceiveBlock from '../components/receive-block.vue'
import ShareBlock from '../components/share-block.vue'
import AppHeader from '../components/app-header.vue'
import api from '../plugins/api'

export default {
  name: "Home",
  components: { UploadFilled, UserFilled, RemoveFilled, Download, Refresh, Tickets, Memo, AppHeader, ReceiveBlock, ShareBlock },
  data() {
    return {
      loading: false,
      state: { share: false, receive: false },
      list: [],
      mode: 'tile' // tile or classify
    };
  },
  methods: {
    getList() {
      if (this.loading) return;
      this.loading = true;
      api.getList().then(res => {
        setTimeout(() => {
          this.loading = false;
        }, 1000)
        if (res.state) this.buildList(res.data);
        else {

        }
      }).catch(() => {
        // 无法连接服务器
        setTimeout(() => {
          this.loading = false;
        }, 1000)
      });
    },
    buildList(data) {
      let list = [];
      let mode = this.mode;
      if (mode === 'classify') {
        let type = {};
        for (let i in data) {
          let list = type[data[i].icon];
          if (list === undefined) type[data[i].icon] = list = [];
          list.push(data[i]);
        }
        // 单独提出其他类型的文件
        let other = type.other;
        if (other) delete type.other;
        for (let key in type) list.push({
          name: key,
          list: type[key]
        })
        // 将其他类型追加在最后面
        if (other) list.push({
          name: 'other',
          list: other
        })
      } else if (mode === 'tile') list = data;
      this.list = list;
    },
    switchMode() {
      if (this.loading) {
        this.$message.warning('正在加载数据,请稍后再试...')
        return;
      }
      this.list = [];
      this.mode = this.mode === 'classify' ? 'tile' : 'classify';
      localStorage.setItem('cache:share:mode', this.mode);
      this.getList();
    },
    openDrawer() {
      this.$refs.receive.open();
    },
  },
  mounted() {
    // 初始化分享模式
    let mode = localStorage.getItem('cache:share:mode');
    if (mode) this.mode = mode;
    // 初始化系统状态
    let state = localStorage.getItem('app:state');
    if (state) this.state = JSON.parse(state);
    // 加载分享列表
    if (this.state.share) this.getList();
  }
}
</script>

<style scoped>
.content {
  max-width: 1000px;
  margin: 0 auto;
}

.error {
  height: calc(100vh - 100px);
  width: 100%;
}

.tool {
  background-color: var(--app-card-active-color);
  top: calc(50vh - 70px);
  padding: 5px 5px 0 5px;
  border-radius: 6px;
  position: fixed;
  right: 10px;
}

.tool-item {
  background-color: var(--app-card-color);
  transition: all ease-out 0.3s;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  margin-bottom: 5px;
  cursor: pointer;
  font-size: 24px;
  display: flex;
  height: 40px;
  width: 40px;
}

.tool-item:hover {
  background-color: var(--app-menu-active-color);
}

.tool-item:active {
  background-color: var(--app-background-color);
}

.tool-item.loading i {
  animation: rotate 1s infinite;
}

@media only screen and (min-width: 1200px) {
  .tool {
    right: calc(50vw - 560px);
  }
}

@media only screen and (max-width: 500px) {
  .tool {
    top: calc(100vh - 150px);
    align-items: center;
    padding-right: 0;
    display: flex;
    right: 5px;
  }

  .tool-item {
    margin-right: 5px;
  }
}


@keyframes rotate {
  100% {
    transform: rotate(-360deg);
  }
}
</style>