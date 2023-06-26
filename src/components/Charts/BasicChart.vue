<template>
  <div class="__basic_chart__" :id="props.id"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import type { ECharts, EChartsOption } from 'echarts'

const props = defineProps<{
  id: string
  option: EChartsOption
}>()

const basicChart = ref<ECharts | null>(null)

function draw() {
  basicChart.value?.showLoading()
  basicChart.value?.setOption(props.option)
  basicChart.value?.hideLoading()
}

watchEffect(() => {
  nextTick(() => draw())
})

onMounted(() => {
  basicChart.value = echarts.init(document.getElementById(props.id) as HTMLDivElement)
})
</script>

<style lang="scss">
.__basic_chart__ {
  width: 100%;
  height: 270px;
}
</style>
