<template>
  <div class="__basic_chart__" :id="props.id"></div>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import useECharts from '@/composables/useECharts'

const props = defineProps<{
  id: string
  option: EChartsOption
}>()

const dom = ref<HTMLDivElement | null>(null)

watchPostEffect(() => {
  if (!dom.value) dom.value = document.getElementById(props.id) as HTMLDivElement
  const { echartsInstance } = useECharts(dom.value)
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
