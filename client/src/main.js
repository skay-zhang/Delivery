import { createApp } from 'vue'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/display.css'
import { ElMessage } from 'element-plus'
import router from './plugins/router.js'
import App from './App.vue'
import './style.css'

const app = createApp(App);

app.use(router).mount('#app');
app.config.globalProperties.$message = ElMessage