<template>
  <div class="el-loading-mask" v-if="loading">
      <div class="el-loading-spinner">
        <svg class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none"></circle>
        </svg>
      </div>
  </div>
  <el-config-provider :locale="locale">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <transition name="el-fade-in-linear">
          <component :is="Component" />
        </transition>
      </keep-alive>
    </router-view>
  </el-config-provider>
</template>

<script>
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
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
      this.$router.push('/home');
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<style scoped>
</style>
