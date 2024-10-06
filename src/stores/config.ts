import { i18n, type Locale } from '@/i18n'

export const useConfigStore = defineStore(
  'config',
  () => {
    /** 应用标题 */
    const appTitleKey = ref('title')

    function setAppTitleKey(key: string) {
      appTitleKey.value = key
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

    const language = ref<Locale>('zh-CN')

    function setLanguage(val: Locale) {
      language.value = val
      i18n.global.locale.value = val
      document.title = i18n.global.t('title')
      document.documentElement.setAttribute('lang', val)
    }

    return {
      appTitleKey,
      setAppTitleKey,
      currentPath,
      setCurrentPath,
      isMobile,
      isSupportTouch,
      setIsMobile,
      isCollapse,
      setIsCollapse,
      toggleCollapse,
      language,
      setLanguage
    }
  },
  {
    persist: true
  }
)
