export type WithDate<T> = T & {
  createdAt?: string
  updatedAt?: string
}
