export const useConfigStore = defineStore(
  'config',
  () => {
    /** 应用标题 */
    const appTitle = ref('后台管理')
    function setAppTitle(title: string) {
      appTitle.value = title
    }

    /** 当前路由 */
    const currentPath = ref('')
    function setCurrentPath(path: string) {
      currentPath.value = path
    }

    /** 是否为移动端 */
    const isMobile = ref(false)
    const isSupportTouch = computed(() => 'ontouchstart' in window)
    function setIsMobile(val: boolean) {
      isMobile.value = val
      if (val) document.documentElement.dataset.device = 'mobile'
    }

    /** 侧边栏是否折叠*/
    const isCollapse = ref(false)
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
      isSupportTouch,
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
