import type { IResData } from '../typings'

export interface IUser {
  userId: number
  userName: string
  userPass: string
  userEmail: string
  userAvatar: string
  userRole: number
}

export type GetUserList = IResData<{
  result: IUser[]
  total: number
}>

export type GetUser = IResData<IUser>
