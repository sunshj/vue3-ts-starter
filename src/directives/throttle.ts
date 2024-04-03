import type { Directive } from 'vue'

export const vThrottle: Directive<HTMLElement, number> = {
  created(el, binding) {
    const throttleTime = binding.value ?? 2000
    const eventType = binding.arg ?? 'click'
    let timerId: number | null

    el.addEventListener(
      eventType,
      event => {
        if (!timerId) {
          timerId = setTimeout(() => {
            clearTimeout(timerId!)
            timerId = null
          }, throttleTime)
        } else {
          event.stopImmediatePropagation()
        }
      },
      true
    )
  }
}
