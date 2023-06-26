<template>
  <div class="__map_chart__" :id="props.id"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import type { ECharts, EChartsOption } from 'echarts'

const props = defineProps<{
  id: string
  map: string
  mapGeoJson: any
  option: EChartsOption
}>()

const mapChart = ref<ECharts | null>(null)

function draw() {
  mapChart.value?.showLoading()
  mapChart.value?.setOption(props.option)
  mapChart.value?.hideLoading()
}

watchEffect(() => {
  nextTick(() => draw())
})

onMounted(() => {
  mapChart.value = echarts.init(document.getElementById(props.id) as HTMLDivElement)
  echarts.registerMap(props.map, props.mapGeoJson as any)
})
</script>

<style lang="scss" scoped>
.__map_chart__ {
  width: 100%;
  height: 270px;
}
</style>
