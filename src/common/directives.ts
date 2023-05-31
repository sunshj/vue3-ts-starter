import type { DirectiveBinding } from 'vue'

export const vThrottle = {
  created(el: HTMLElement, binding: DirectiveBinding) {
    let throttleTime = binding.value
    if (!throttleTime) {
      throttleTime = 2000
    }
    let timerId: any
    el.addEventListener(
      'click',
      event => {
        if (!timerId) {
          // 第一次执行
          timerId = setTimeout(() => {
            // 清除定时器
            clearTimeout(timerId)
            timerId = null
          }, throttleTime)
        } else {
          event?.stopImmediatePropagation()
        }
      },
      true
    )
  }
}
