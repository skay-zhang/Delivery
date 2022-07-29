<template>
  <div id="app-head">
    <div id="head-bar" :class="system">
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
    <div class="title full-width text-center">Delivery</div>
  </div>
</template>

<script>
import { Close, Minus } from '@element-plus/icons-vue'

export default {
  name: "appHead",
  components: { Close, Minus },
  props: {
    system: {
      type: String,
      default: 'other'
    }
  },
  data() {

  },
  methods: {

  },
  mounted() {

  }
};
</script>

<style scoped>
#app-head {
  background-color: var(--app-head-color);
  color: var(--app-head-text-color);
  border-radius: 8px 8px 0 0;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -webkit-app-region: drag;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  user-select: none;
  font-size: 12px;
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

/* Windows */
#head-bar.windows .minimize,
#head-bar.windows .close {
  -webkit-app-region: no-drag;
  color: var(--app-text-color);
  justify-content: center;
  align-items: center;
  line-height: 12px;
  font-size: 16px;
  cursor: pointer;
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
  color: #f4f4f4;
}

#head-bar.windows .close:active {
  background-color: rgba(255, 0, 0, 0.5);
  color: #f4f4f4;
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
  cursor: pointer;
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

@media (prefers-color-scheme: light) {
  #head-bar.windows .minimize:hover {
    background-color: rgba(113, 113, 113, 0.1);
  }

  #head-bar.windows .minimize:active {
    background-color: rgba(113, 113, 113, 0.3);
  }
}
</style>
