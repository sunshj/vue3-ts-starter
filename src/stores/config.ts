export const useConfigStore = defineStore(
  'config',
  () => {
    const appTitle = ref('')
    const currentPath = ref('')
    const isMobile = ref(false)
    /** 侧边栏是否折叠*/
    const isCollapse = ref(false)

    function setAppTitle(title: string) {
      appTitle.value = title
    }

    function setCurrentPath(path: string) {
      currentPath.value = path
    }

    function setIsMobile(val: boolean) {
      isMobile.value = val
      if (val) document.documentElement.dataset.device = 'mobile'
    }

    function setIsCollapse(val: boolean) {
      isCollapse.value = val
    }

    function toggleCollapse() {
      isCollapse.value = !isCollapse.value
    }

    return {
      appTitle,
      setAppTitle,
      currentPath,
      setCurrentPath,
      isMobile,
      setIsMobile,
      isCollapse,
      setIsCollapse,
      toggleCollapse
    }
  },
  {
    persist: true
  }
)
