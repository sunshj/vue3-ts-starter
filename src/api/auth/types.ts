import type { IUser } from '../user'

export interface LoginResData {
  access_token: string
  refresh_token: string
  user: IUser
}
