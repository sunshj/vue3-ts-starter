import { createSingletonPromise } from '@vueuse/core'
import { ApiGetRefreshToken } from '@/api/auth'

export const isRefreshTokenUrl = (url?: string) => url === '/auth/refresh_token'

export const refreshToken = createSingletonPromise(() =>
  ApiGetRefreshToken().then(token => !!token)
)
