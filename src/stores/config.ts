import type { RouteRecordRaw } from 'vue-router'

export const useConfigStore = defineStore(
  'config',
  () => {
    const appTitle = ref('')
    const currentPath = ref('')
    const isMobile = ref(false)
    /** 侧边栏是否折叠*/
    const isCollapse = ref(false)
    const routes = ref<RouteRecordRaw[]>([])
    const menus = ref<RouteRecordRaw[]>([])
    const isDark = ref(false)

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

    function setRoutes(val: RouteRecordRaw[]) {
      routes.value = val
    }

    function setMenus(val: RouteRecordRaw[]) {
      menus.value = val
    }

    function setIsDark(val: boolean) {
      isDark.value = val
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
      toggleCollapse,
      routes,
      setRoutes,
      menus,
      setMenus,
      isDark,
      setIsDark
    }
  },
  {
    persist: true
  }
)
