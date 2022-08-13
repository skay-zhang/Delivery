<template>
  <div>
    <el-scrollbar height="568px" noresize>
      <div class="pa-10 pb-0">
        <div v-if="list.length > 0">
          <div class="card flex align-center mb-10" v-for="(item, i) in list" :key="'rf-' + i"
            :class="{ active: item.select }" @click="openFile(item)">
            <img class="icon" :src="'./img/' + item.icon + '.png'" alt="icon" />
            <div class="info">
              <div class="title mb-5 line-1">{{ item.name }}</div>
              <div class="text-small text-gray flex align-center">
                <div class="date flex align-center">
                  <el-icon style="margin-right: 3px">
                    <Clock />
                  </el-icon>
                  <div>{{ getDate(item.date) }}</div>
                </div>
                <div class="flex align-center">
                  <el-icon style="margin-right: 3px">
                    <PieChart />
                  </el-icon>
                  <div>{{ item.type === 'folder' ? '文件夹' : item.size }}</div>
                </div>
              </div>
            </div>
            <el-icon>
              <ArrowRight />
            </el-icon>
          </div>
        </div>
        <el-empty description="没有已接收的文件" v-else />
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { ArrowRight, Clock, PieChart } from '@element-plus/icons-vue'
import receive from '../../basic/plugins/receive';
import { date } from '../plugins/util';
import { ipcRenderer } from 'electron'

export default {
  name: "receiveTab",
  components: { ArrowRight, Clock, PieChart },
  data() {
    return {
      loading: false,
      drop: false,
      list: []
    }
  },
  methods: {
    init() {
      if (this.loading) return;
      this.loading = true;
      ipcRenderer.on('receive-callback', (_event, message) => {
        this.list.push(message)
      })
    },
    getList() {
      receive.getList(this.list);
    },
    getDate(obj) {
      if (obj) return date.distance(obj.getTime());
      else return '';
    },
    openFile(file) {
      // open file
    }
  },
  mounted() {
    this.init();
    this.getList();
  },
};
</script>
<style scoped>
.icon {
  background-color: var(--app-topbar-btn-hover-color);
  transition: all ease-out 0.3s;
  border-radius: 6px;
  margin-right: 7px;
  padding: 3px;
  height: 30px;
  width: 30px;
}

.title {
  line-height: 16px;
  font-size: 14px;
}

.info {
  margin-right: 5px;
  width: 250px;
}

.date {
  width: 140px;
}

.card {
  transition: all ease-out 0.3s;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  padding: 5px;
}

.card:hover {
  background-color: var(--app-menu-hover-color);
}

.card:hover .icon {
  background-color: var(--app-menu-active-color);
}

.card:active,
.card.active {
  background-color: var(--app-menu-active-color);
}
</style>