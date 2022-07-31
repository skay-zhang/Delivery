<template>
  <div class="back flex align-center justify-center" @click="back">
    <el-icon class="mr-5">
      <ArrowLeftBold />
    </el-icon>
    <div>返回</div>
  </div>
  <div v-loading="loading">
    <el-tabs v-model="active" tab-position="left" class="setting-tabs" @tab-change="switchTab">
      <el-tab-pane name="service" label="服务">
        <div class="content">HTTP服务、WebRTC服务、P2P服务</div>
      </el-tab-pane>
      <el-tab-pane name="network" label="网络">
        <div class="content">P2P网络、HTTP端口</div>
      </el-tab-pane>
      <el-tab-pane name="security" label="安全">
        <div class="content">黑白名单、账户机制</div>
      </el-tab-pane>
      <el-tab-pane name="logs" label="日志">
        <div class="content">日志管理、日志列表</div>
      </el-tab-pane>
      <el-tab-pane name="advanced" label="高级">
        <div class="content">开放接口、实验功能</div>
      </el-tab-pane>
      <el-tab-pane name="about" label="关于">
        <div class="content">关于 Delivery</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { ArrowLeftBold } from '@element-plus/icons-vue'
import config from '../../basic/plugins/config';
import { win } from '../plugins/util';

export default {
  name: 'setting',
  components: { ArrowLeftBold },
  data() {
    return {
      loading: true,
      active: 'service',
      conf: {},
      out: 0
    }
  },
  methods: {
    init() {
      this.loading = true;
      let tab = this.$route.query.tab;
      if (tab) {
        this.active = tab;
        this.conf = config.getModule(tab);
      }
      this.switchTab();
    },
    switchTab() {
      clearTimeout(this.out);
      if (!this.loading) this.loading = true;
      this.out = setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    back() {
      this.$router.push('/home');
    }
  },
  mounted() {
    win.open();
    this.init();
  },
  watch: {
    '$route.query': {
      handler(to, from) {
        this.init();
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.back {
  border: 1px solid var(--app-head-border-color);
  background-color: var(--app-menu-color);
  width: calc(100vw - 2px);
  border-top: none;
  cursor: pointer;
  height: 28px;
}

.setting-tabs {
  height: calc(100vh - 111px);
  width: calc(100vw - 2px);
}

.content {
  padding: 10px 10px 0 0;
}
</style>