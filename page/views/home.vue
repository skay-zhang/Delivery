<template>
  <div class="top-bar flex align-center justify-between">
    <div class="flex align-center">
      <div class="top-btn flex align-center" style="width: 75px">
        <el-icon class="btn-icon mr-5">
          <Connection />
        </el-icon>
        <div>
          <div class="text-small text-gray">端口</div>
          <div>56565</div>
        </div>
      </div>
      <div class="top-btn flex align-center">
        <el-icon class="btn-icon mr-5">
          <Umbrella />
        </el-icon>
        <div>
          <div class="text-small text-gray">安全</div>
          <div>已启用</div>
        </div>
      </div>
    </div>
    <div class="top-btn flex align-center">
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
  <div class="menu flex align-center">
    <div class="menu-item flex align-center justify-center" :class="{ active: select == 'share' }"
      @click="switchTab('share')">
      <div class="mr-5">分享</div>
      <el-icon class="menu-icon">
        <Upload />
      </el-icon>
    </div>
    <div class="menu-item flex align-center justify-center" :class="{ active: select == 'receive' }"
      @click="switchTab('receive')">
      <div class="mr-5">接收</div>
      <el-icon class="menu-icon">
        <Download />
      </el-icon>
    </div>
  </div>
  <div class="content">
    <template v-if="select === 'share'">
      <div class="tips">
        <el-icon class="tips-icon">
          <RemoveFilled />
        </el-icon>
        <div>分享服务未启用</div>
      </div>
    </template>
    <template v-else-if="select === 'receive'">
      <div class="tips">
        <el-icon class="tips-icon">
          <RemoveFilled />
        </el-icon>
        <div>接收服务未启用</div>
      </div>
    </template>
  </div>
</template>

<script>
import { Connection, Umbrella, Switch, Upload, Download, RemoveFilled } from '@element-plus/icons-vue'

export default {
  name: 'home',
  components: { Connection, Umbrella, Switch, Upload, Download, RemoveFilled },
  data() {
    return {
      select: 'share'
    }
  },
  methods: {
    switchTab(tab) {
      this.select = tab;
    }
  },
}
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
  border-radius: 4px;
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
  background-color: rgb(73, 73, 73);
}




.menu {
  border-bottom: 1px solid var(--app-head-border-color);
}

.menu-item {
  background-color: var(--app-menu-color);
  cursor: pointer;
  height: 28px;
  width: 50vw;
}

.menu-item:active {
  background-color: var(--app-menu-hover-color);
}

.menu-item.active {
  background-color: var(--app-menu-active-color);
  border-bottom: 2px solid var(--app-menu-active-border-color);
  margin-bottom: -1px;
  height: 27px;
}

.menu-icon {
  font-size: 16px;
}

.content {
  background-color: var(--app-content-color);
  height: 690px;
  width: 100vw;
}

.tips {
  text-align: center;
  padding-top: 230px;
  margin: 0 auto;
}

.tips-icon {
  margin-bottom: 20px;
  color: #c45656;
  font-size: 80px;
}
</style>