<template>
  <div :id="props.id" class="__map_chart__" />
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'

const props = defineProps<{
  id: string
  map: string
  mapGeoJson: any
  option: EChartsOption
}>()

const dom = ref<HTMLDivElement | null>(null)

watchPostEffect(() => {
  if (!dom.value) dom.value = document.querySelector(`#${props.id}`)
  const mapChart = useECharts(dom.value!, echarts => {
    echarts.registerMap(props.map, props.mapGeoJson)
  })
  mapChart.showLoading()
  mapChart.setOption(props.option)
  mapChart.hideLoading()
})
</script>

<style lang="scss" scoped>
.__map_chart__ {
  width: 100%;
  height: 270px;
}
</style>
