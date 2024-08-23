import Axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { refreshToken } from './refresh-token'

const baseURL = import.meta.env.VITE_API_BASE_URL

const axios = Axios.create({
  baseURL,
  timeout: 20000 // 请求超时 20s
})

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    const cancelRequestStore = useCancelRequestStore()

    if (userStore.accessToken)
      config.headers.set('Authorization', `Bearer ${userStore.accessToken}`)
    if (userStore.refreshToken)
      config.headers.set('Refresh-Token', `Bearer ${userStore.refreshToken}`)

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
  async (response: AxiosResponse<ResData<any>>) => {
    const userStore = useUserStore()

    if (response.headers.authorization) {
      userStore.setAccessToken(response.headers.authorization)
    }
    if (response.headers['Refresh-Token']) {
      userStore.setRefreshToken(response.headers['Refresh-Token'])
    }

    if (response.data.statusCode === 401 && response.config.url !== '/auth/refresh_token') {
      const isSuccess = await refreshToken()
      if (isSuccess) {
        response.config.headers.set('Authorization', `Bearer ${userStore.accessToken}`)
        return await axios.request(response.config)
      }
      userStore.logout()
    }

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

export interface ResData<T> {
  statusCode: number
  message: string
  data: T
}

export async function request<T>(url: string, config?: AxiosRequestConfig) {
  const { data: res } = await axios<ResData<T>>(url, config)
  if (res.statusCode !== 200) ElMessage.error(res.data ?? res.message)

  return res.data
}

export { axios }
