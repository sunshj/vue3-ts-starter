import axios from '@/utils/axios'
import { IResData } from './types'

export interface IUser {
  userId?: number
  userName: string
  userPass: string
  userEmail: string
  userAvatar: string
  userRole: number
}

type FindAllResData = {
  result: IUser[]
  total: number
}

export const findAll = async (pageNum: number, pagesize: number, query: string) => {
  const encodeQuery = encodeURIComponent(query)
  const { data: res } = await axios.get<IResData<FindAllResData | string>>(
    `/user?page=${pageNum}&size=${pagesize}&query=${encodeQuery}`
  )

  if (res.code !== 200) ElMessage.error(res.data as string)
  return res.data as FindAllResData
}

export const findOne = async (id: number) => {
  const { data: res } = await axios.get<IResData<IUser | string>>(`/user/${id}`)
  if (res.code !== 200) ElMessage.error(res.data as string)
  return res.data as IUser
}
