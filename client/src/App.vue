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
        <transition name="el-fade-in-linear" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </el-config-provider>
    <div class="copyright text-center text-gray text-small full-width">
      <div>Released under the MIT License. ( v {{version}} )</div>
      <div>Copyright © 2022-present Skay Zhang & Delivery Contributors</div>
    </div>
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
      loading: true,
      version: '1.0.0',
    };
  },
  methods: {
    init() {
      api.init().then(res => {
        if (res.state) {
          localStorage.setItem('app:state', JSON.stringify(res.data.state));
          this.version = res.data.version;
        } else localStorage.setItem('app:state', '{"share":false,"receive":false}');
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