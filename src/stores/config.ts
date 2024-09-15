import { i18n, type Locale } from '@/i18n'

export const useConfigStore = defineStore(
  'config',
  () => {
    const currentPath = ref('')

    function setCurrentPath(path: string) {
      currentPath.value = path
    }

    const isMobile = ref(false)

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
    const { locale } = toRefs(reactive(i18n.global))

    const appTitleKey = ref('title')

    function setAppTitleKey(key: string) {
      appTitleKey.value = key
    }

    function setLanguage(val: Locale) {
      language.value = val
      locale.value = val
      document.title = i18n.global.t('title')
      document.documentElement.setAttribute('lang', val)
    }

    return {
      appTitleKey,
      setAppTitleKey,
      currentPath,
      setCurrentPath,
      isMobile,
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
