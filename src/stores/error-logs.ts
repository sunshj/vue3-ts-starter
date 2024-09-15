interface ILogData {
  err: any
  instance: any
  info: string
  url: string
}

export const useErrorLogsStore = defineStore('errorLogs', () => {
  const logs = ref<ILogData[]>([])

  function add(log: ILogData) {
    logs.value.push(log)
  }

  function clear() {
    logs.value.length = 0
  }

  return { logs, add, clear }
})
