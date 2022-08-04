<template>
  <div class="el-loading-mask" v-if="loading">
    <div class="el-loading-spinner">
      <svg class="circular" viewBox="25 25 50 50">
        <circle class="path" cx="50" cy="50" r="20" fill="none"></circle>
      </svg>
    </div>
  </div>
  <div v-show="!loading">
    <el-config-provider :locale="locale">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <transition name="el-fade-in-linear">
            <component :is="Component" />
          </transition>
        </keep-alive>
      </router-view>
    </el-config-provider>
  </div>
</template>

<script>
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import api from './plugins/api'

export default {
  name: "App",
  data() {
    return {
      locale: zhCn,
      loading: true
    };
  },
  methods: {
    init() {
      api.init().then(res => {
        if (res.state) {
          localStorage.setItem('app:state', JSON.stringify(res.data.state));
          localStorage.setItem('app:version', res.data.version);
        } else {
          localStorage.setItem('app:state', '{"share":false,"receive":false}');
          localStorage.setItem('app:version', '1.0.0');
        }
        this.$router.push('/home');
        setTimeout(() => {
          this.loading = false;
        }, 500);
      }).catch(() => {
        // 无法连接服务器
      });
    },
  },
  mounted() {
    this.init();
  }
}
</script>

<style scoped>
</style>
