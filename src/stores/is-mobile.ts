import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useIsMobileStore = defineStore('isMobile', () => {
  const isMobile = ref(false)

  function update(val: boolean) {
    isMobile.value = val
    if (val) document.documentElement.dataset.mobile = 'mobile'
  }

  return { isMobile, update }
})
