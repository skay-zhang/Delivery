import { createApp } from 'vue'
import router from './plugins/router.js'
import App from './App.vue'
import './style.css'

const app = createApp(App);

app.use(router).mount('#app');