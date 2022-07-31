import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { ElMessage } from 'element-plus'
import router from './plugins/router.js'
import '../public/fonts/ubuntu.css'
import './style.css'

const app = createApp(App);

app.use(router).mount('#app');
app.config.globalProperties.$message = ElMessage
