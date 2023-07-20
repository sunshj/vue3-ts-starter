import { enable, disable } from 'darkreader'

export const darkModeState = reactive({ isDark: false })

export default function useDarkMode() {
  function toggleMode(val: boolean) {
    darkModeState.isDark = val
    if (val) {
      enableDark()
    } else {
      disableDark()
    }
  }

  function enableDark() {
    enable({ brightness: 105, contrast: 95, sepia: 0, grayscale: 15 })
  }

  function disableDark() {
    disable()
  }

  watchPostEffect(() => {
    sessionStorage.setItem('darkMode', darkModeState.isDark.toString())
  })

  onBeforeMount(() => {
    darkModeState.isDark = sessionStorage.getItem('darkMode') === 'true'
    toggleMode(darkModeState.isDark)
  })

  return { toggleMode }
}
