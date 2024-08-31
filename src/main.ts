import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp, nextTick } from 'vue'

import App from './App.vue'
import router from './router'

import './router/permission'

import './assets/css/global.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

// 全局错误捕获
app.config.errorHandler = (err, instance, info) => {
  const errorLogsStore = useErrorLogsStore()
  nextTick(() => {
    errorLogsStore.add({ err, instance, info, url: window.location.href })
  })
}

app.mount('#app')
