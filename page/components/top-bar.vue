<template>
  <div class="top-bar flex align-center justify-between">
    <div class="flex align-center">
      <div class="top-btn flex align-center" style="width: 75px" @click="openSetting('network')">
        <el-icon class="btn-icon mr-5">
          <Connection />
        </el-icon>
        <div>
          <div class="text-small text-gray">端口</div>
          <div>56565</div>
        </div>
      </div>
      <div class="top-btn flex align-center" @click="openSetting('security')">
        <el-icon class="btn-icon mr-5">
          <Umbrella />
        </el-icon>
        <div>
          <div class="text-small text-gray">安全</div>
          <div>已启用</div>
        </div>
      </div>
    </div>
    <div class="top-btn flex align-center" @click="openSetting('service')">
      <el-icon class="btn-icon mr-5" style="transform: rotate(-45deg);">
        <Switch />
      </el-icon>
      <div>
        <div class="text-small flex align-center">
          <div class="mr-5">分享:</div>
          <div class="dot-red mr-5"></div>
          <div>已停用</div>
        </div>
        <div class="text-small flex align-center">
          <div class="mr-5">接收:</div>
          <div class="dot-green mr-5"></div>
          <div>已启用</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Connection, Umbrella, Switch } from '@element-plus/icons-vue'

export default {
  name: "topBar",
  components: { Connection, Umbrella, Switch },
  methods: {
    openSetting(tab){
      this.$router.push('/setting?tab='+tab);
    }
  }
};
</script>

<style scoped>
.top-bar {
  border-bottom: 1px solid var(--app-head-border-color);
  border-top: 1px solid var(--app-head-border-color);
  background-color: var(--app-head-color);
  width: 100vw;
  height: 49px;
}

.top-btn {
  transition: all ease-out 0.3s;
  border-radius: 6px;
  width: max-content;
  cursor: pointer;
  padding: 4px;
  height: 30px;
  margin: 5px;
}

.btn-icon {
  font-size: 30px;
}

.top-btn:hover {
  background-color: var(--app-topbar-btn-hover-color)
}

.top-btn:active {
  background-color: var(--app-topbar-btn-active-color)
}
</style>
