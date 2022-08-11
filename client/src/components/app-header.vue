<template>
  <div class="border-bottom">
    <div class="header flex align-center justify-between">
      <div class="title flex align-center">
        <div class="name">Delivery</div>
        <span>Client</span>
      </div>
      <div class="menu flex align-center">
        <div class="menu-item flex align-center" :class="{ available: state.receive }">
          <el-icon size="28px" class="mr-5">
            <UploadFilled />
          </el-icon>
          <div>发送文件</div>
        </div>
        <div class="menu-item available flex align-center" @click="$router.push('/auth')">
          <el-icon size="23px">
            <UserFilled />
          </el-icon>
          <div class="ml-5 hidden-xs-only">Admin</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UploadFilled, UserFilled } from '@element-plus/icons-vue'

export default {
  name: "appHeader",
  components: { UploadFilled, UserFilled },
  props: {
    state: {
      type: Object,
      default: () => {
        return [];
      }
    }
  },
  methods: {

  }
};
</script>

<style scoped>
.header {
  max-width: 1000px;
  margin: 0 auto;
  height: 48px;
}

.title {
  font-size: 20px;
  padding: 10px;
}

.name {
  margin-right: 5px;
  font-weight: bold;
  font-size: 24px;
}

.title span {
  background-color: var(--app-title-color);
  color: var(--app-background-color);
  border-radius: 3px;
  line-height: 16px;
  padding: 3px 5px;
  font-size: 14px;
}

.menu-item {
  color: var(--app-disabled-color);
  transition: all ease-out 0.3s;
  cursor: not-allowed;
  padding: 0 10px;
  height: 48px;
}

.menu-item.available {
  color: var(--app-text-color);
  cursor: pointer;
}

.menu-item.available:hover {
  background-color: var(--app-menu-hover-color);
}

.menu-item.available:active {
  background-color: var(--app-menu-active-color);
}
</style>
