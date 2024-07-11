export interface IUser {
  id: number
  name: string
  pass: string
  email: string
  avatar: string
  role: number
}

export interface GetUserList {
  result: IUser[]
  total: number
}
