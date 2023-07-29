import { createApp, nextTick } from 'vue'
import { createPinia } from 'pinia'

import 'element-plus/dist/index.css'
import './assets/css/global.css'

import App from './App.vue'
import router from './router'
import './router/permission'
import fontAwesomeIcon from './common/fontAwesomeIcon'
import { useErrorLogsStore } from './stores'
import './common/monaco'

const app = createApp(App)
app.component('font-awesome-icon', fontAwesomeIcon)

app.use(createPinia())
app.use(router)

// 全局错误捕获
app.config.errorHandler = (err, instance, info) => {
  const errorLogsStore = useErrorLogsStore()
  nextTick(() => {
    errorLogsStore.add({ err, instance, info, url: window.location.href })
  })
}

app.mount('#app')
