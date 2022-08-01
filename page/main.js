import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { ElMessage } from 'element-plus'
import router from './plugins/router.js'
import { createPinia } from 'pinia'
import '../public/fonts/ubuntu.css'
import './style.css'

const pinia = createPinia()
const app = createApp(App);

app.use(router).use(pinia).mount('#app');
app.config.globalProperties.$message = ElMessage
