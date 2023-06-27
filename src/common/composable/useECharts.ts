import * as echarts from 'echarts'
import type { ECharts, EChartsOption } from 'echarts'

const instances = new WeakMap<HTMLElement, ECharts>()

function initCharts(el: HTMLElement): ECharts {
  if (instances.has(el)) return instances.get(el) as ECharts

  const instance = echarts.init(el)
  instances.set(el, instance)
  return instance
}

export function useECharts(el: HTMLElement) {
  const echartsInstance = initCharts(el)

  function setOptions(option: EChartsOption) {
    echartsInstance.setOption(option)
  }

  function registerMap(map: string, geoJson: any) {
    echarts.registerMap(map, geoJson)
  }

  function reSize() {
    echartsInstance.resize()
  }

  window.addEventListener(
    'resize',
    echarts.throttle(() => reSize(), 300)
  )

  return { echartsInstance, setOptions, registerMap, reSize }
}
