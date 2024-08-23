import { createSingletonPromise } from '@vueuse/core'
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

export const refreshToken = createSingletonPromise(() => getRefreshToken().then(token => !!token))
