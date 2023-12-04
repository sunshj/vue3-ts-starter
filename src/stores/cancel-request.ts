import { defineStore } from 'pinia'

export const useCancelRequestStore = defineStore('cancelRequest', () => {
  const cancelAjaxList = ref<Function[]>([])

  function add(cancelAjax: Function) {
    cancelAjaxList.value.push(cancelAjax)
  }

  function clear() {
    cancelAjaxList.value.forEach(cancel => {
      cancel()
    })
    cancelAjaxList.value = []
  }

  return { add, clear }
})
