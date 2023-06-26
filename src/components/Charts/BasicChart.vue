<template>
  <div class="__basic_chart__" :id="props.id"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

const props = defineProps<{
  id: string
  option: EChartsOption
}>()

function draw(option: EChartsOption) {
  const dom = document.getElementById(props.id) as HTMLDivElement
  if (dom) echarts.dispose(dom)
  const basicChart = echarts.init(dom)
  basicChart.showLoading()
  basicChart.setOption(option)
  basicChart.hideLoading()
}

watchEffect(() => {
  nextTick(() => draw(props.option))
})
</script>

<style lang="scss">
.__basic_chart__ {
  width: 100%;
  height: 270px;
}
</style>
