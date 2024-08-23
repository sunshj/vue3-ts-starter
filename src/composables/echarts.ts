import * as echarts from 'echarts'
import type { ECharts } from 'echarts'

type InitDom = HTMLDivElement | HTMLCanvasElement

interface FullOption {
  el: InitDom
  theme?: object | string
  opts?: {
    devicePixelRatio?: number
    renderer?: 'canvas' | 'svg'
    useDirtyRect?: boolean
    useCoarsePointer?: boolean
    pointerSize?: number
    ssr?: boolean
    width?: number | string
    height?: number | string
    locale?: string
  }
}

const instances = new WeakMap<InitDom, ECharts>()

/**
 * 使用 echarts 初始化图表，并返回实例对象。
 * @param domOrFullOption  包含初始化 DOM 或完整选项配置的对象。
 * @param callback  可选的回调函数，接受全局 echarts 对象作为参数。
 * @returns 包含 echarts 实例的对象。
 */
export function useECharts(
  domOrFullOption: InitDom | FullOption,
  callback?: (globalECharts: typeof echarts) => void
): ECharts {
  if (typeof callback === 'function') {
    callback(echarts)
  }

  let echartsInstance: ECharts

  if (typeof (domOrFullOption as FullOption).el !== 'undefined') {
    const { el, theme, opts } = domOrFullOption as FullOption
    if (instances.has(el)) return instances.get(el)!

    echartsInstance = echarts.init(el, theme, opts)
    instances.set(el, echartsInstance)
  } else {
    if (instances.has(domOrFullOption as InitDom)) return instances.get(domOrFullOption as InitDom)!

    echartsInstance = echarts.init(domOrFullOption as InitDom)
    instances.set(domOrFullOption as InitDom, echartsInstance)
  }

  window.addEventListener(
    'resize',
    echarts.throttle(() => echartsInstance.resize(), 500)
  )

  return echartsInstance
}
