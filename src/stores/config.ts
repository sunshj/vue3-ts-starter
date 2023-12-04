import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  const currentPath = ref('')
  const isMobile = ref(false)

  function setCurrentPath(path: string) {
    currentPath.value = path
    sessionStorage.setItem('activePath', path)
  }

  function setIsMobile(val: boolean) {
    isMobile.value = val
    if (val) document.documentElement.dataset.device = 'mobile'
  }

  return { currentPath, setCurrentPath, isMobile, setIsMobile }
})
