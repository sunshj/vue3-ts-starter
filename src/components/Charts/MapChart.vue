<template>
  <div class="__map_chart__" :id="props.id" ref="mapChartRef"></div>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import useECharts from '@/composables/useECharts'

const props = defineProps<{
  id: string
  map: string
  mapGeoJson: any
  option: EChartsOption
}>()

const dom = ref<HTMLDivElement | null>(null)

watchPostEffect(() => {
  if (!dom.value) dom.value = document.getElementById(props.id) as HTMLDivElement
  const { echartsInstance } = useECharts(dom.value as HTMLDivElement, echarts => {
    echarts.registerMap(props.map, props.mapGeoJson)
  })
  echartsInstance.showLoading()
  echartsInstance.setOption(props.option)
  echartsInstance.hideLoading()
})
</script>

<style lang="scss" scoped>
.__map_chart__ {
  width: 100%;
  height: 270px;
}
</style>
