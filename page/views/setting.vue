<template>
  <div class="back flex align-center justify-center" @click="back">
    <el-icon class="mr-5">
      <ArrowLeftBold />
    </el-icon>
    <div>返回</div>
  </div>
  <el-tabs v-model="active" tab-position="left" class="setting-tabs" v-loading="loading" @tab-change="tabChange">
    <el-tab-pane name="service" label="服务">
      <div class="content" v-if="conf.service">
        <!-- HTTP服务、WebRTC服务、P2P服务 -->
        <div class="card pa-10 mb-10" v-if="conf.service.share">
          <div class="flex align-center justify-between mb-10">
            <div class="label">分享服务</div>
            <el-switch v-model="conf.service.share.enable" @change="(e) => change('service', e)" />
          </div>
          <div class="flex align-center justify-between mb-10">
            <div class="label">下载速度<span class="ml-5 text-gray">(kb/s)</span></div>
            <el-input-number v-model="conf.service.share.speed" :min="50" :max="1048576" controls-position="right"
              style="width: 115px" @change="(e) => change('service', e)" disabled />
          </div>
          <div class="flex align-center justify-between">
            <div class="label">访问频率<span class="ml-5 text-gray">(次/s)</span></div>
            <el-input-number v-model="conf.service.share.qps" :min="1" :max="10" controls-position="right"
              style="width: 80px" @change="(e) => change('service', e)" disabled />
          </div>
        </div>
        <div class="card pa-10 mb-10" v-if="conf.service.share">
          <div class="flex align-center justify-between mb-10">
            <div class="label">接收服务</div>
            <el-switch v-model="conf.service.receive.enable" @change="(e) => change('service', e)" />
          </div>
          <div class="flex align-center justify-between">
            <div class="label">文件大小<span class="ml-5 text-gray">(MB)</span></div>
            <el-input-number v-model="conf.service.receive.maxSize" :min="1" :max="10240" controls-position="right"
              style="width: 100px" @change="(e) => change('service', e)" disabled />
          </div>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane name="network" label="网络">
      <div class="content">
        <div class="card pa-10 mb-10" v-if="conf.network.http">
          <div class="flex align-center justify-between mb-10">
            <div class="label">HTTP 端口</div>
            <el-input-number v-model="conf.network.http.port" :min="1024" :max="65535" controls-position="right"
              style="width: 100px" @change="(e) => change('network', e)" disabled />
          </div>
          <template v-if="kv.http">
            <div class="flex align-center justify-between">
              <div class="label">网络地址</div>
              <el-button text size="small" @click="tabChange('network')">
                <el-icon>
                  <Refresh />
                </el-icon>
              </el-button>
            </div>
            <div class="flex align-center justify-between mt-10" v-for="(item, index) in kv.http.interfaces"
              :key="index">
              <div class="label ml-5">- {{  item  }}</div>
              <el-button text size="small" @click="copy('http://' + item + ':' + conf.network.http.port)">复制</el-button>
            </div>
            <div class="flex align-center justify-between mt-10">
              <div class="label">客户端</div>
              <el-button text size="small" @click="tabChange('network')">
                <el-icon>
                  <Refresh />
                </el-icon>
              </el-button>
            </div>
            <div class="flex align-center justify-between mt-10" v-for="(item, index) in kv.http.socket" :key="index">
              <div class="label ml-5">- {{  item  }}</div>
              <div class="flex align-center">
                <el-icon color="#67C23A" class="btn mr-5" size="16px">
                  <Check />
                </el-icon>
                <el-icon color="#F56C6C" class="btn" size="16px">
                  <Close />
                </el-icon>
              </div>
            </div>
          </template>
        </div>
        <div class="card pa-10 mb-10" v-if="conf.network.webrtc">
          <div class="flex align-center justify-between">
            <div class="label">P2P 端口</div>
            <el-input-number v-model="conf.network.webrtc.port" :min="1024" :max="65535" controls-position="right"
              style="width: 100px" @change="(e) => change('network', e)" disabled />
          </div>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane name="security" label="安全">
      <div class="content">
        <div class="card pa-10 mb-10" v-if="conf.security.auth">
          <div class="flex align-center justify-between mb-10">
            <div class="label">安全认证</div>
            <el-switch v-model="conf.security.auth.enable" @change="(e) => change('security', e)" />
          </div>
          <div class="flex align-center justify-between mb-10">
            <div class="label">用户列表</div>
            <el-button plain size="small">添加</el-button>
          </div>
          <div class="flex align-center justify-between">
            <div class="label ml-5">- admin</div>
            <el-button plain size="small">删除</el-button>
          </div>
        </div>
        <div class="card pa-10 mb-10" v-if="conf.security.blacklist">
          <div class="flex align-center justify-between mb-10">
            <div class="label">黑名单</div>
            <el-button plain size="small">添加</el-button>
          </div>
          <div class="flex align-center justify-between mb-10">
            <div class="label ml-5">- 192.168.0.1</div>
            <el-button plain size="small">删除</el-button>
          </div>
          <div class="flex align-center justify-between">
            <div class="label">禁止黑名单访问</div>
            <el-switch />
          </div>
        </div>
        <div class="card pa-10 mb-10" v-if="conf.security.whitelist">
          <div class="flex align-center justify-between mb-10">
            <div class="label">白名单</div>
            <el-button plain size="small">添加</el-button>
          </div>
          <div class="flex align-center justify-between mb-10">
            <div class="label ml-5">- 192.168.1.1</div>
            <el-button plain size="small">删除</el-button>
          </div>
          <div class="flex align-center justify-between">
            <div class="label">仅允许白名单访问</div>
            <el-switch />
          </div>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane name="logs" label="日志">
      <div class="content">
        <div class="card pa-10 mb-10" v-if="conf.logs">
          <div class="flex align-center justify-between">
            <div class="label">日志</div>
            <el-switch v-model="conf.logs.enable" @change="(e) => change('logs', e)" />
          </div>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane name="advanced" label="高级">
      <div class="content">
        <div class="card pa-10 mb-10" v-if="conf.advanced.api">
          <div class="flex align-center justify-between mb-10">
            <div class="label">开放接口</div>
            <el-switch v-model="conf.advanced.api.enable" @change="(e) => change('advanced', e)" />
          </div>
          <div class="flex align-center justify-between">
            <div class="label">访问令牌</div>
            <el-button plain size="small">复制</el-button>
          </div>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane name="about" label="关于">
      <div class="content text-center">
        <img class="logo" :src="'./logo/logo.png'" alt="logo" />
        <div>Delivery</div>
        <div class="text-small text-gray">Released under the MIT License.</div>
        <div class="text-small text-gray">Copyright © 2022-present Skay Zhang & Delivery Contributors</div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { ArrowLeftBold, Refresh, Check, Close } from '@element-plus/icons-vue'
import { sys, win, http } from '../plugins/util';
import config from '../../basic/plugins/config';
import { confStore } from "../plugins/store";

export default {
  name: 'setting',
  components: { ArrowLeftBold, Refresh, Check, Close },
  setup(_props) {
    const conf = confStore();
    return {
      conf
    }
  },
  data() {
    return {
      loading: true,
      active: 'service',
      kv: {}
    }
  },
  methods: {
    init() {
      console.log('[setting] init config data')
      let tab = this.$route.query.tab;
      if (tab) this.active = tab;
      setTimeout(() => {
        this.loading = false;
      }, 500)
    },
    switchTab(tab) {
      if (tab) {
        this.active = tab;
        this.tabChange(tab);
      }
    },
    tabChange(tab) {
      this.loading = true;
      if (tab === 'network') {
        this.kv.http = http.getInfo();
      }
      setTimeout(() => {
        this.loading = false;
      }, 500)
    },
    change(module) {
      config.update(module, this.conf[module])
    },
    copy(txt) {
      sys.setCopy(txt);
      this.$message.success('复制成功');
    },
    save() {
      this.conf.init(config.getAll());
    },
    back() {
      this.$router.push('/home');
    }
  },
  mounted() {
    win.open();
    setTimeout(() => this.init(), 500)
  },
  watch: {
    '$route.query': {
      handler(to, _from) {
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

.btn {
  cursor: pointer;
}

.logo {
  height: 100px;
  width: 100px;
}
</style>