import { createSingletonPromise } from '@vueuse/core'
import { apiGetRefreshToken } from '@/api/auth'

export const isRefreshTokenUrl = (url?: string) => url === '/auth/refresh_token'

export const refreshToken = createSingletonPromise(() =>
  apiGetRefreshToken().then(token => !!token)
)
