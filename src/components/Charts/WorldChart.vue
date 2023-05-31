<template>
  <div class="chart" :option="props.option" :id="props.id"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import worldMapGeoJSON from '@/assets/world.json'

const props = defineProps<{
  id: string
  option: EChartsOption
}>()

function draw() {
  const chart = echarts.init(document.getElementById(props.id) as HTMLElement)
  chart.showLoading()
  echarts.registerMap('world', worldMapGeoJSON as any)
  chart.hideLoading()
  chart.setOption(props.option)
}

onMounted(() => {
  draw()
})
</script>

<style lang="scss" scoped>
.chart {
  height: 270px;
}
</style>
