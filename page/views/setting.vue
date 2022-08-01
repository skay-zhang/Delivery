<template>
  <div class="back flex align-center justify-center" @click="back">
    <el-icon class="mr-5">
      <ArrowLeftBold />
    </el-icon>
    <div>返回</div>
  </div>
  <el-tabs v-model="active" tab-position="left" class="setting-tabs">
    <el-tab-pane name="service" label="服务">
      <div class="content" v-if="conf.service">
        <!-- HTTP服务、WebRTC服务、P2P服务 -->
        <div class="flex align-center justify-between" v-if="conf.service.share">
          <div class="label">分享服务</div>
          <el-switch v-model="conf.service.share.enable" @change="(e)=>change('service',e)" />
        </div>
        <div class="flex align-center justify-between" v-if="conf.service.receive">
          <div class="label">接收服务</div>
          <el-switch v-model="conf.service.receive.enable" @change="(e)=>change('service',e)" />
        </div>
      </div>
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
</template>

<script>
import { ArrowLeftBold } from '@element-plus/icons-vue'
import config from '../../basic/plugins/config';
import { confStore } from "../plugins/store";
import { win } from '../plugins/util';

export default {
  name: 'setting',
  components: { ArrowLeftBold },
  setup(props) {
    const conf = confStore();
    return {
      conf
    }
  },
  data() {
    return {
      loading: true,
      active: 'service'
    }
  },
  methods: {
    init() {
      console.log('[setting] init config data')
      this.conf.init(config.getAll());
      let tab = this.$route.query.tab;
      if (tab) this.active = tab;
    },
    switchTab(tab) {
      if (tab) this.active = tab;
    },
    change(module){
      config.update(module,this.conf[module])
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
        this.switchTab(to.tab);
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