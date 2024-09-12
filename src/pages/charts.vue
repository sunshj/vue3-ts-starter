<template>
  <div>
    <ElRow :gutter="20">
      <ElCol :span="12" :xs="24">
        <CustomCard align-mode="center" :header="false">
          <BasicChart id="pieChart" :option="pieChartOption" />
        </CustomCard>
      </ElCol>

      <ElCol :span="12" :xs="24">
        <CustomCard align-mode="center" :header="false">
          <BasicChart id="barChart" :option="barChartOption" />
        </CustomCard>
      </ElCol>
    </ElRow>

    <ElRow :gutter="20">
      <ElCol :span="12" :xs="24">
        <CustomCard align-mode="center" :header="false">
          <BasicChart id="lineChart" :option="lineChartOption" />
        </CustomCard>
      </ElCol>

      <ElCol :span="12" :xs="24">
        <CustomCard align-mode="center" :header="false">
          <MapChart
            id="worldMapChart"
            map="world"
            :map-geo-json="worldMapGeoJSON"
            :option="worldChartOption"
          />
        </CustomCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup lang="ts">
import worldMapGeoJSON from '@/assets/geoJSON/world.json'
import type { EChartsOption } from 'echarts'

definePage({
  meta: {
    title: '图表统计',
    icon: 'chart',
    isMenuitem: true,
    menuitemOrder: 2
  }
})

const pieChartOption: Ref<EChartsOption> = ref({
  title: {
    text: 'Traffic Sources',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines']
  },
  series: [
    {
      name: 'Traffic Sources',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: 'Direct' },
        { value: 310, name: 'Email' },
        { value: 234, name: 'Ad Networks' },
        { value: 135, name: 'Video Ads' },
        { value: 1548, name: 'Search Engines' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})

const barChartOption: Ref<EChartsOption> = ref({
  title: {
    text: 'Bar Chart',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '',
      type: 'bar',
      barWidth: '60%',
      data: [120, 200, 150, 80, 70, 110, 130]
    }
  ]
})

const lineChartOption: Ref<EChartsOption> = ref({
  title: {
    text: '网速模拟'
  },
  tooltip: {
    trigger: 'axis',
    formatter: (data: any) => {
      if ((data as any[]).length === 1)
        return `
          ${data[0].name}<br>
          ${data[0].marker}<b>${data[0].seriesName}速度</b>：${data[0].value} KB/s<br>`

      return `${data[0].name}<br>
        ${data[0].marker}<b>${data[0].seriesName}速度</b>：${data[0].value} KB/s<br>
        ${data[1].marker}<b>${data[1].seriesName}速度</b>：${data[1].value} KB/s</b> `
    }
  },
  legend: {
    data: ['上行', '下行']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: []
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '单位：KB/s'
    }
  ],
  series: [
    {
      name: '上行',
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8
      },
      emphasis: {
        focus: 'series'
      },
      data: []
    },
    {
      name: '下行',
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8
      },
      emphasis: {
        focus: 'series'
      },
      data: []
    }
  ]
})

const worldChartOption: Ref<EChartsOption> = ref({
  title: {
    text: '世界地图'
  },
  tooltip: {
    trigger: 'item',
    formatter: (data: any) => {
      if (data.value) {
        return `${data.name}<br/>访问量：<b>${data.value}</b>`
      }
      return `${data.name}<br/>访问量：<b>0</b>`
    }
  },
  visualMap: {
    show: false
  },
  series: [
    {
      type: 'map',
      map: 'world',
      roam: true,
      emphasis: {
        label: {
          show: true
        }
      },
      data: [
        { name: 'Japan', value: 12 },
        { name: 'China', value: 20 },
        { name: 'United States', value: 30 },
        { name: 'United Kingdom', value: 40 }
      ]
    }
  ]
})

function randomNetworkSpeed(minSpeed: number, maxSpeed: number) {
  return Number.parseFloat((Math.random() * (maxSpeed - minSpeed) + minSpeed).toFixed(2))
}

const interval = ref(0)

onMounted(() => {
  const updateLineChartOption = () => {
    ;(lineChartOption.value.xAxis as any[])[0].data.push(new Date().toTimeString())
    ;(lineChartOption.value.series as any[])[0].data.push(randomNetworkSpeed(1, 200))
    ;(lineChartOption.value.series as any[])[1].data.push(randomNetworkSpeed(10, 1000))
  }
  updateLineChartOption()
  interval.value = setInterval(updateLineChartOption, 2000)
})

onBeforeUnmount(() => {
  clearInterval(interval.value)
})
</script>
