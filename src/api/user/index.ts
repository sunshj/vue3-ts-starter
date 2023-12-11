import { axios } from '@/utils'
import type { GetUser, GetUserList } from './types'

export * from './types'

export const ApiGetUserList = async (pageNum: number, pagesize: number, query: string) => {
  const encodeQuery = encodeURIComponent(query)
  const { data: res } = await axios.get<GetUserList>(
    `/user?page=${pageNum}&size=${pagesize}&query=${encodeQuery}`
  )

  if (res.code !== 200) ElMessage.error(res.data as unknown as string)
  return res.data
}

export const ApiGetUser = async (id: number) => {
  const { data: res } = await axios.get<GetUser>(`/user/${id}`)
  if (res.code !== 200) ElMessage.error(res.data as unknown as string)
  return res.data
}
