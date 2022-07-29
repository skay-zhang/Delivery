<template>
  <app-head :system="system" />
  <el-config-provider :locale="locale">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </el-config-provider>
</template>

<script>
import { sys } from './plugins/util';
import AppHead from './components/app-head.vue';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';

export default {
  name: "appMenu",
  components: { AppHead },
  data() {
    return {
      locale: zhCn,
      system: 'other'
    };
  },
  methods: {

  },
  mounted() {
    this.system = sys.getType();
  }
};
</script>

<style scoped>
</style>
