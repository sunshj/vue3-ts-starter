import Axios, { type AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

const baseURL = import.meta.env.VITE_API_BASE_URL

const axios = Axios.create({
  baseURL,
  timeout: 20000 // 请求超时 20s
})

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
  config => {
    const cancelRequestStore = useCancelRequestStore()
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

export { axios }

interface ResData<T> {
  statusCode: number
  message: string
  data: T
}

export async function request<T>(url: string, config?: AxiosRequestConfig) {
  const { data: res } = await axios<ResData<T>>(url, config)
  if (res.statusCode !== 200) ElMessage.error(res.data ?? res.message)

  return res.data
}
