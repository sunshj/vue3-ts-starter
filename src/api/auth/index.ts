import { request } from '@/utils'
import type { IAuthResponse } from './types'

export const ApiLogin = async (data: { username: string; password: string }) => {
  return await request<IAuthResponse>('/auth/login', {
    method: 'POST',
    data
  })
}
