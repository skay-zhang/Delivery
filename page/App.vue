<template>
  <app-head :system="system" />
  <el-config-provider :locale="locale">
    <div style="padding: 20px">Hello World</div>
  </el-config-provider>
</template>

<script>
import { sys } from './plugin/util';
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
