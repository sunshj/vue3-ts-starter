<template>
  <div :id="props.id" class="__basic_chart__" />
</template>

<script setup lang="ts">
import useECharts from '@/composables/echarts'
import type { EChartsOption } from 'echarts'

const props = defineProps<{
  id: string
  option: EChartsOption
}>()

const dom = ref<HTMLDivElement | null>(null)

watchPostEffect(() => {
  if (!dom.value) dom.value = document.getElementById(props.id) as HTMLDivElement
  const { echartsInstance } = useECharts(dom.value as HTMLDivElement)
  echartsInstance.showLoading()
  echartsInstance.setOption(props.option)
  echartsInstance.hideLoading()
})
</script>

<style lang="scss">
.__basic_chart__ {
  width: 100%;
  height: 270px;
}
</style>
