export interface IResData<T extends object | string | number | boolean> {
  code: number
  message: string
  data: T
}
