import { disable, enable } from 'darkreader'
import { useConfigStore } from '@/stores'

export function useDark() {
  const configStore = useConfigStore()

  function toggle(val: boolean) {
    configStore.setIsDark(val)
    if (val) {
      enable({ brightness: 105, contrast: 95, sepia: 0, grayscale: 15 })
    } else {
      disable()
    }
  }

  onBeforeMount(() => {
    toggle(configStore.isDark)
  })
  return { toggle, isDark: toRef(configStore.isDark) }
}
