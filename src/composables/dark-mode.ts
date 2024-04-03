import { disable, enable } from 'darkreader'

export function useDarkMode() {
  const configStore = useConfigStore()

  function toggle(val: boolean) {
    configStore.setIsDark(val)
    if (val) {
      enable({ brightness: 105, contrast: 95, sepia: 0, grayscale: 15 })
    } else {
      disable()
    }
  }

  watchEffect(() => {
    toggle(configStore.isDark)
  })

  onBeforeMount(() => {
    toggle(configStore.isDark)
  })

  return { toggle, isDark: storeToRefs(configStore).isDark }
}
