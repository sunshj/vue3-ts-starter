import type { IUser } from '../user'

export interface IAuthResponse {
  access_token: string
  refresh_token: string
  user: IUser
}
