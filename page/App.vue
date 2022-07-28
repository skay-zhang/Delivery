<script setup>
import AppHead from "./components/app-head.vue";
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
let locale = zhCn;
</script>

<template>
  <app-head />
  <el-config-provider :locale="locale">
    <div style="padding: 20px">Hello World</div>
  </el-config-provider>
</template>

<style scoped>

</style>
