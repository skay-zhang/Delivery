<script setup>
</script>

<template>
  <div id="app-head">
    <div id="head-bar" class="windows">
      <div class="minimize"></div>
      <div class="close"></div>
    </div>
    <div>Delivery v0.0.1</div>
  </div>
</template>

<style scoped>
#app-head {
  border-radius: 8px 8px 0 0;
  background-color: #333333;
  justify-content: center;
  align-items: center;
  position: absolute;
  font-size: 12px;
  color: #999;
  display: flex;
  height: 30px;
  width: 100%;
  left: 0;
  top: 0;
}

#head-bar {
  align-items: center;
  display: flex;
}

#head-bar.windows {
  position: absolute;
  right: 0;
}

#head-bar > div {
  cursor: pointer;
}

#head-bar.windows .minimize,
#head-bar.windows .close {
  height: 30px;
  width: 30px;
}

#head-bar.windows .minimize:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

#head-bar.windows .close:hover {
  border-radius: 0 8px 0 0;
  background-color: rgba(255, 0, 0, 0.5);
}

#head-bar.macos {
  position: absolute;
  left: 0;
}

#head-bar.macos .minimize,
#head-bar.macos .close {
  border-radius: 100%;
  height: 14px;
  margin: 8px 0 8px 8px;
  width: 14px;
}

#head-bar.macos .minimize {
  background-color: #ffbb00;
}

#head-bar.macos .minimize:hover {
  background-color: rgb(230, 168, 0);
}

#head-bar.macos .close {
  background-color: #ff3300;
}

#head-bar.macos .close:hover {
  background-color: #d32a00;
}
</style>
