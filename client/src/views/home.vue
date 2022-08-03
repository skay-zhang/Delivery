<template>
  <div>
    <div class="border-bottom">
      <div class="header flex align-center justify-between">
        <div class="title flex align-center">
          <div class="name">Delivery</div>
          <span>Client</span>
        </div>
        <div class="menu flex align-center">
          <div class="menu-item flex align-center">
            <el-icon size="28px">
              <UploadFilled />
            </el-icon>
            <div>发送文件</div>
          </div>
          <div class="menu-item flex align-center">
            <el-icon size="23px">
              <UserFilled />
            </el-icon>
            <div>Admin</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <el-empty description="没有分享的文件" />
    </div>
  </div>
</template>

<script>
import { UploadFilled, UserFilled } from '@element-plus/icons-vue'
export default {
  name: "Home",
  components: { UploadFilled, UserFilled },
  data() { }
}
</script>

<style scoped>
.header {
  max-width: 1000px;
  margin: 0 auto;
  height: 48px;
}

.content {
  max-width: 1000px;
  margin: 0 auto;
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
  cursor: pointer;
  padding: 0 10px;
  height: 48px;
}

.menu-item i {
  margin-right: 5px;
}

.menu-item:hover {
  background-color: var(--app-menu-hover-color);
}

.menu-item:active {
  background-color: var(--app-menu-active-color);
}
</style>
