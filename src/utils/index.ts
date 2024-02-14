export * from './date-fns'
export * from './axios'

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
