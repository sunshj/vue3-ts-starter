<template>
  <div class="__basic_chart__" :id="props.id" ref="basicChartRef"></div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

const props = defineProps<{
  id: string
  option: EChartsOption
}>()

const basicChartRef = ref<HTMLDivElement>()

function draw() {
  const basicChart = echarts.init(basicChartRef.value as HTMLDivElement)
  basicChart.showLoading()
  basicChart.setOption(props.option)
  basicChart.hideLoading()
}

onMounted(() => {
  nextTick(() => draw())
})
</script>

<style lang="scss" scoped>
.__basic_chart__ {
  width: 100%;
  height: 270px;
}
</style>
