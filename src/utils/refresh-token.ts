import { axios, type ResData } from './http'

async function getRefreshToken() {
  const userStore = useUserStore()

  return await axios
    .get<ResData<{ access_token: string }>>('/auth/refresh_token', {
      headers: {
        Authorization: `Bearer ${userStore.refreshToken}`
      }
    })
    .then(({ data: res }) => {
      if (res.statusCode === 200) return res.data.access_token
      ElMessage.error(`Token刷新失败：${res.message}`)
      return undefined
    })
    .catch(() => {
      ElMessage.error('登录已过期，请重新登录')
      userStore.logout()
      return undefined
    })
}

let promise: Promise<boolean> | null = null

export function refreshToken() {
  if (promise) return promise

  promise = new Promise(resolve => {
    getRefreshToken().then(token => resolve(!!token))
  })

  promise.finally(() => {
    promise = null
  })

  return promise
}
