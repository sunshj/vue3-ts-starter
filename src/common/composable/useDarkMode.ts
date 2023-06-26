import { enable, disable } from 'darkreader'

export const darkModeState = reactive({ isDark: false, taskStartTime: 0, taskEndTime: 0 })

export function useDarkMode() {
  function updateTaskTime(startTime: number, endTime: number) {
    darkModeState.taskStartTime = startTime
    darkModeState.taskEndTime = endTime
    localStorage.setItem('darkStartTime', startTime.toString())
    localStorage.setItem('darkEndTime', endTime.toString())
  }

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
  /**
   * 设置暗黑模式启动、关闭的时间任务
   * @param {number} startTime 开始时间戳
   * @param {number} endTime 结束时间戳
   */
  function setDarkModeTask(startTime: number, endTime: number) {
    enableDarkModeTask(startTime, endTime)
    disableDarkModeTask(endTime)
  }

  /**
   * 启动暗黑模式的计划任务
   * @param {number} startTime 开始时间戳
   * @param {number} endTime 结束时间戳
 
   */
  function enableDarkModeTask(startTime: number, endTime: number) {
    if (endTime <= startTime) {
      throw new Error('结束时间不能小于开始时间')
    }
    const current = Date.now()
    let timeDiff = startTime - current // 开始~当前时间 时间差

    let newStartTime = 0
    if (timeDiff < 0) {
      if (current > startTime && current < endTime) {
        timeDiff = 1
      } else if (current > endTime) {
        newStartTime =
          startTime + Math.ceil((current - startTime) / (24 * 60 * 60 * 1000)) * 24 * 60 * 60 * 1000
        localStorage.setItem('darkStartTime', newStartTime.toString())
        timeDiff = newStartTime - current
      }
    }

    setTimeout(() => {
      toggleMode(true)
      setInterval(() => {
        toggleMode(true)
      }, 24 * 60 * 60 * 1000) // 24小时为循环周期
    }, timeDiff)
  }

  /**
   * 关闭暗黑模式的计划任务
   * @param {number} endTime 结束时间戳
   */
  function disableDarkModeTask(endTime: number) {
    const current = Date.now()
    let timeDiff = endTime - current // 获取时间差
    let newEndTime = 0

    if (timeDiff < 0) {
      newEndTime =
        endTime + Math.ceil((current - endTime) / (24 * 60 * 60 * 1000)) * 24 * 60 * 60 * 1000
      localStorage.setItem('darkEndTime', newEndTime.toString())
      timeDiff = newEndTime - current
    }

    setTimeout(() => {
      toggleMode(false)
      setInterval(() => {
        toggleMode(false)
      }, 24 * 60 * 60 * 1000) // 24小时为循环周期
    }, timeDiff)
  }

  watchPostEffect(() => {
    sessionStorage.setItem('darkMode', darkModeState.isDark.toString())
  })

  onBeforeMount(() => {
    darkModeState.isDark = sessionStorage.getItem('darkMode') === 'true'
    toggleMode(darkModeState.isDark)
  })

  return { toggleMode, updateTaskTime, setDarkModeTask }
}
