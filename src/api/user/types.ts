export interface IUser {
  userId: number
  userName: string
  userPass: string
  userEmail: string
  userAvatar: string
  userRole: number
}

export interface GetUserList {
  result: IUser[]
  total: number
}
