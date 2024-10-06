import type { LoginResData } from './types'

export async function apiLogin(data: { username: string; password: string }) {
  return await http.post<LoginResData>('/auth/login', data)
}

export async function apiGetRefreshToken() {
  const userStore = useUserStore()

  const res = await http
    .get<{ access_token: string }>('/auth/refresh_token', {
      headers: {
        Authorization: `Bearer ${userStore.refreshToken}`
      }
    })
    .catch(() => {
      ElMessage.error('登录已过期，请重新登录')
      userStore.logout()
      return undefined
    })

  return res?.access_token
}
