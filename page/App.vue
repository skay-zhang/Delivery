<template>
  <div class="app-hide" :class="{ 'app-show': show }">
    <app-head :system="system" />
    <top-bar />
    <el-config-provider :locale="locale">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </el-config-provider>
  </div>
  <div class="loading flex align-center justify-center" v-if="!show">
    <div class="el-loading-spinner">
      <svg class="circular" viewBox="25 25 50 50">
        <circle class="path" cx="50" cy="50" r="20" fill="none"></circle>
      </svg>
    </div>
  </div>
</template>

<script>
import { sys } from './plugins/util';
import AppHead from './components/app-head.vue';
import TopBar from './components/top-bar.vue';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import config from '../basic/plugins/config';
import { confStore } from "./plugins/store";

export default {
  name: "appMenu",
  components: { AppHead, TopBar },
  setup(props) {
    const conf = confStore();
    return {
      conf
    }
  },
  data() {
    return {
      locale: zhCn,
      system: 'other',
      show: false,
      conf: {}
    };
  },
  methods: {
    init() {
      this.conf.init(config.getAll());
      setTimeout(() => {
        this.show = true;
      }, 1500)
    }
  },
  mounted() {
    this.system = sys.getType();
    this.init();
  }
};
</script>

<style scoped>
.app-hide {
  transition: all ease-out 0.3s;
  opacity: 0;
}

.app-show {
  opacity: 1;
}

.loading {
  position: fixed;
  height: 700px;
  z-index: 999;
  width: 100vw;
  left: 0;
  top: 0;
}
</style>
