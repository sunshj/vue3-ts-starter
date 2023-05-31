import { createApp, nextTick } from 'vue'
import { createPinia } from 'pinia'

import 'element-plus/dist/index.css'
import './assets/base.css'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import App from './App.vue'
import router from './router'
import './router/permission'
import fontAwesomeIcon from './common/fontAwesomeIcon'
import { vThrottle } from './common/directives'
import { useErrorLogsStore } from './stores/error-logs'

const app = createApp(App)
app.component('font-awesome-icon', fontAwesomeIcon)
app.directive('throttle', vThrottle)

app.use(mavonEditor)
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
