import type { LoginResData } from './types'

export async function ApiLogin(data: { username: string; password: string }) {
  return await request<LoginResData>('/auth/login', {
    method: 'POST',
    data
  })
}

export async function ApiGetRefreshToken() {
  const userStore = useUserStore()

  const res = await request<{ access_token: string }>('/auth/refresh_token', {
    headers: {
      Authorization: `Bearer ${userStore.refreshToken}`
    }
  }).catch(() => {
    ElMessage.error('登录已过期，请重新登录')
    userStore.logout()
    return undefined
  })

  return res?.access_token
}
