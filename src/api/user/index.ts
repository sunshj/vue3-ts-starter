import type { WithDate } from '../types'
import type { GetUserList, IUser } from './types'

export * from './types'

export async function apiGetUserList(pageNum: number, pagesize: number, query: string) {
  const encodeQuery = encodeURIComponent(query)
  return await request<GetUserList>(
    `/api/user?page=${pageNum}&size=${pagesize}&query=${encodeQuery}`
  )
}

export async function apiGetUser(id: number) {
  return await request<Omit<WithDate<IUser>, 'pass'>>(`/api/user/${id}`)
}
