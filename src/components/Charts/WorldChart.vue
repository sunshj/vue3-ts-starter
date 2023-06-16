<template>
  <div class="__world_chart__" :id="props.id" ref="worldMapRef"></div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import worldMapGeoJSON from '@/assets/world.json'

const props = defineProps<{
  id: string
  option: EChartsOption
}>()

const worldMapRef = ref<HTMLDivElement>()

function draw() {
  const worldMapChart = echarts.init(worldMapRef.value as HTMLDivElement)
  worldMapChart.showLoading()
  echarts.registerMap('world', worldMapGeoJSON as any)
  worldMapChart.hideLoading()
  worldMapChart.setOption(props.option)
}

onMounted(() => {
  nextTick(() => draw())
})
</script>

<style lang="scss" scoped>
.__world_chart__ {
  height: 270px;
}
</style>
