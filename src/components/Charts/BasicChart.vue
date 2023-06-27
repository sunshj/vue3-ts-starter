<template>
  <div class="__basic_chart__" :id="props.id"></div>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { useECharts } from '@/common/composable'

const props = defineProps<{
  id: string
  option: EChartsOption
}>()

const dom = ref<HTMLElement | null>(null)

watchPostEffect(() => {
  if (!dom.value) dom.value = document.getElementById(props.id)
  const { echartsInstance, setOptions } = useECharts(dom.value as HTMLElement)
  echartsInstance.showLoading()
  setOptions(props.option)
  echartsInstance.hideLoading()
})
</script>

<style lang="scss">
.__basic_chart__ {
  width: 100%;
  height: 270px;
}
</style>
