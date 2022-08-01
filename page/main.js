import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/el-message-box.css'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage,ElMessageBox } from 'element-plus'
import router from './plugins/router.js'
import { createPinia } from 'pinia'
import '../public/fonts/ubuntu.css'
import './style.css'

const pinia = createPinia()
const app = createApp(App);

app.use(router).use(pinia).mount('#app');
app.config.globalProperties.$message = ElMessage
app.config.globalProperties.$alert = ElMessageBox.alert
app.config.globalProperties.$confirm = ElMessageBox.confirm
app.config.globalProperties.$prompt = ElMessageBox.prompt