import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'

export const useConfigStore = defineStore(
  'config',
  () => {
    const currentPath = ref('')
    const isMobile = ref(false)
    // 侧边栏是否折叠
    const isCollapse = ref(false)
    const menus = ref<RouteRecordRaw[]>([])
    const language = ref('zh-CN')
    const isDark = ref(false)

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

    function setMenus(val: RouteRecordRaw[]) {
      menus.value = val
    }

    function setLanguage(val: string) {
      language.value = val
    }

    function setIsDark(val: boolean) {
      isDark.value = val
    }

    return {
      currentPath,
      setCurrentPath,
      isMobile,
      setIsMobile,
      isCollapse,
      setIsCollapse,
      toggleCollapse,
      menus,
      setMenus,
      language,
      setLanguage,
      isDark,
      setIsDark
    }
  },
  {
    persist: true
  }
)
