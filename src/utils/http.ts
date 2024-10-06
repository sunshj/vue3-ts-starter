import Axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { isRefreshTokenUrl, refreshToken } from './refresh-token'

interface ResData<T> {
  statusCode: number
  message: string
  data: T
}

const defaultConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 20000
}

class Http {
  private axios = Axios.create(defaultConfig)

  constructor() {
    this.initializeRequestInterceptor()
    this.initializeResponseInterceptor()
  }

  private initializeRequestInterceptor() {
    this.axios.interceptors.request.use(
      config => {
        const userStore = useUserStore()
        const cancelRequestStore = useCancelRequestStore()

        if (userStore.accessToken && !isRefreshTokenUrl(config.url))
          config.headers.set('Authorization', `Bearer ${userStore.accessToken}`)

        config.cancelToken = new Axios.CancelToken(cancel => {
          cancelRequestStore.add(cancel)
        })

        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
  }

  private initializeResponseInterceptor() {
    this.axios.interceptors.response.use(
      async (response: AxiosResponse<ResData<any>>) => {
        const userStore = useUserStore()

        if (response.headers.authorization) {
          userStore.setAccessToken(response.headers.authorization)
        }
        if (response.headers['Refresh-Token']) {
          userStore.setRefreshToken(response.headers['Refresh-Token'])
        }

        if (response.data.statusCode === 401 && !isRefreshTokenUrl(response.config.url)) {
          const isSuccess = await refreshToken().finally(refreshToken.reset)
          if (isSuccess) {
            response.config.headers.set('Authorization', `Bearer ${userStore.accessToken}`)
            return await this.axios.request(response.config)
          }
        }

        return response
      },
      error => {
        if (error.code === 'ERR_CANCELED') return new Promise(() => null)
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
  }

  async request<T>(url: string, config?: AxiosRequestConfig) {
    const { data: res } = await this.axios<ResData<T>>(url, config)
    if (res.statusCode !== 200) {
      if (res.statusCode !== 401) ElMessage.error(res.message)
      return Promise.reject(res)
    }
    return res.data
  }

  async get<T>(url: string, config?: AxiosRequestConfig) {
    return await this.request<T>(url, { method: 'get', ...config })
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return await this.request<T>(url, { method: 'post', data, ...config })
  }

  static toFunctional(http: Http) {
    return Object.assign(http.request.bind(http), {
      get: http.get.bind(http),
      post: http.post.bind(http)
    })
  }
}

export const http = new Http()

export const $http = Http.toFunctional(http)
