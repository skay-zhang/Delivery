<script setup>
import { Close, Minus } from '@element-plus/icons-vue'
</script>

<template>
  <div id="app-head">
    <div id="head-bar" class="windows">
      <div class="minimize left">
        <el-icon>
          <Minus />
        </el-icon>
      </div>
      <div class="close">
        <el-icon>
          <Close />
        </el-icon>
      </div>
      <div class="minimize right">
        <el-icon>
          <Minus />
        </el-icon>
      </div>
    </div>
    <div class="title full-width">Delivery</div>
  </div>
</template>

<style scoped>
#app-head {
  border-radius: 8px 8px 0 0;
  background-color: #333333;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -webkit-app-region: drag;
  justify-content: center;
  align-items: center;
  user-select: none;
  font-size: 12px;
  color: #999;
  display: flex;
  height: 30px;
  width: 100%;
}

.title {
  line-height: 30px;
}

#head-bar {
  align-items: center;
  display: flex;
}

#head-bar.windows {
  position: absolute;
  right: 0;
}

#head-bar * {
  cursor: pointer;
}

/* Windows */
#head-bar.windows .minimize,
#head-bar.windows .close {
  -webkit-app-region: no-drag;
  justify-content: center;
  align-items: center;
  line-height: 12px;
  font-weight: bold;
  color: #f4f4f4;
  font-size: 16px;
  display: flex;
  height: 30px;
  width: 30px;
}

#head-bar.windows .minimize.right {
  display: none;
}

#head-bar.windows .minimize:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

#head-bar.windows .minimize:active {
  background-color: rgba(255, 255, 255, 0.3);
}

#head-bar.windows .close:hover {
  border-radius: 0 8px 0 0;
  background-color: rgba(255, 0, 0, 0.8);
}

#head-bar.windows .close:active {
  background-color: rgba(255, 0, 0, 0.5);
}

#head-bar.macos {
  position: absolute;
  left: 0;
}

/* MacOS */
#head-bar.macos .minimize,
#head-bar.macos .close {
  -webkit-app-region: no-drag;
  margin: 8.5px 0 8.5px 8.5px;
  justify-content: center;
  border-radius: 100%;
  align-items: center;
  line-height: 12px;
  font-weight: bold;
  font-size: 12px;
  display: flex;
  height: 13px;
  width: 13px;
}

/* 最小化按钮 */
#head-bar.macos .minimize.left {
  display: none;
}

#head-bar.macos .minimize {
  background-color: #feb429;
  color: #feb429;
}

#head-bar.macos:hover .minimize {
  color: #76480d;
}

#head-bar.macos .minimize:active {
  background-color: #ffc457;
}

/* 关闭按钮 */
#head-bar.macos .close {
  background-color: #ff544d;
  color: #ff544d;
}

#head-bar.macos:hover .close {
  color: #980a0a;
}

#head-bar.macos .close:active {
  background-color: rgb(252, 104, 99);
}
</style>
