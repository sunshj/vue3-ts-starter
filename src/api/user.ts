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

type FindAllResData = IResData & {
  data: {
    data: {
      result: IUser[]
      total: number
    }
  }
}

type FindOneResData = IResData & {
  data: { data: IUser }
}

export const findAll = async (pagenum: number, pagesize: number, query: string) => {
  const encodeQuery = encodeURIComponent(query)
  const { data: res } = (await axios.get(
    `/user?page=${pagenum}&size=${pagesize}&query=${encodeQuery}`
  )) as FindAllResData

  if (res.code !== 200) ElMessage.error(res.data as unknown as string)
  return res.data
}

export const findOne = async (id: number) => {
  const { data: res } = (await axios.get(`/user/${id}`)) as FindOneResData
  if (res.code !== 200) ElMessage.error(res.data as unknown as string)
  return res.data
}
