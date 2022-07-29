import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import router from './plugins/router.js'
import './style.css'

createApp(App).use(router).mount('#app')
