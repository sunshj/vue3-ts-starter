import Axios from 'axios'
import { ElMessage } from 'element-plus'
import { useCancelRequestStore } from '@/stores/cancel-request'

// const baseURL = process.env.NODE_ENV === 'production' ? 'https://open.sunshj.top' : 'http://127.0.0.1:3000'
const baseURL = 'https://open.sunshj.top'

const axios = Axios.create({
  baseURL,
  timeout: 20000 // 请求超时 20s
})

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
  config => {
    const cancelRequestStore = useCancelRequestStore()
    // eslint-disable-next-line no-param-reassign
    config.cancelToken = new Axios.CancelToken(cancel => {
      cancelRequestStore.add(cancel)
    })
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.code === 'ERR_CANCELED') return new Promise(() => {})
    if (error.response && error.response.data) {
      const code = error.response.status
      const msg = error.response.data.message
      ElMessage.error(`Code: ${code}, Message: ${msg}`)
    } else {
      ElMessage.error(`${error}`)
    }
    return Promise.reject(error)
  }
)

export default axios
