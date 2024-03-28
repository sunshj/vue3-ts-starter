import { createApp, nextTick } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import './assets/css/global.css'

import App from './App.vue'
import router from './router'
import './router/permission'
import './common/monaco'

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
