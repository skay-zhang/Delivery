<template>
  <div>
    <el-scrollbar height="568px" noresize>
      <div class="pa-10 pb-0">
        <el-empty description="没有已接收的文件" />
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { RemoveFilled, Pointer } from '@element-plus/icons-vue'

export default {
  name: "shareTab",
  components: { RemoveFilled, Pointer },
  data() {
    return {
      drop: false,
      list: []
    }
  },
  methods: {
    getList() {
      // get list
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style scoped>
</style>
