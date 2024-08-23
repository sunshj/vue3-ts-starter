<template>
  <div :id="props.id" class="__basic_chart__" />
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'

const props = defineProps<{
  id: string
  option: EChartsOption
}>()

const dom = ref<HTMLDivElement | null>(null)

watchPostEffect(() => {
  if (!dom.value) dom.value = document.querySelector(`#${props.id}`)
  const chart = useECharts(dom.value!)
  chart.showLoading()
  chart.setOption(props.option)
  chart.hideLoading()
})
</script>

<style lang="scss">
.__basic_chart__ {
  width: 100%;
  height: 270px;
}
</style>
