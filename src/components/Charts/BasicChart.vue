<template>
  <div class="chart" :option="props.option" :id="props.id"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import { onMounted } from 'vue'

const props = defineProps<{
  id: string
  option: EChartsOption
}>()

onMounted(() => {
  echarts.init(document.getElementById(props.id) as HTMLElement).setOption(props.option)
})
</script>

<style lang="scss" scoped>
.chart {
  height: 270px;
}
</style>
