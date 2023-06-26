<template>
  <div>
    <custom-breadcrumb :bread-list="breadList"></custom-breadcrumb>

    <el-row :gutter="20">
      <el-col :span="12" :xs="24">
        <custom-card align-mode="center" :header="false">
          <basic-chart :option="pieChartOption" id="pieChart"></basic-chart>
        </custom-card>
      </el-col>

      <el-col :span="12" :xs="24">
        <custom-card align-mode="center" :header="false">
          <basic-chart :option="barChartOption" id="barChart"></basic-chart>
        </custom-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12" :xs="24">
        <custom-card align-mode="center" :header="false">
          <basic-chart :option="lineChartOption" id="lineChart"></basic-chart>
        </custom-card>
      </el-col>

      <el-col :span="12" :xs="24">
        <custom-card align-mode="center" :header="false">
          <map-chart
            id="worldMapChart"
            map="world"
            :map-geo-json="worldMapGeoJSON"
            :option="worldChartOption"
          ></map-chart>
        </custom-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import worldMapGeoJSON from '@/assets/geoJSON/world.json'

const breadList = [
  {
    path: '/charts',
    title: '图表统计'
  }
]

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
  tooltip: {
    trigger: 'axis',
    formatter: (data: any) => {
      return `
            ${data[0].name}<br>
             ${data[0].marker}<b>上行速度</b>：${data[0].value} KB/s<br>
             ${data[1].marker}<b>下行速度</b>：${data[1].value} KB/s</b>
            `
    }
  },
  legend: {
    data: ['上行', '下行'],
    selectedMode: false
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
      data: ['00:01', '00:02', '00:03', '00:04', '00:05', '00:06', '00:07']
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
      data: [12, 20, 30, 40, 50, 34, 20]
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
      data: [4, 8, 6, 2, 10, 20, 30]
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
</script>

<style lang="scss" scoped></style>
