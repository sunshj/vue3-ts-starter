<template>
  <div>
    <custom-breadcrumb :bread-list="breadList"></custom-breadcrumb>
    <el-button type="danger" @click="showMessage()">测试ERROR捕获</el-button>
  </div>
</template>

<script setup lang="ts">
const breadList = [
  {
    path: '/tool',
    title: '系统工具'
  },
  {
    path: '/error',
    title: '错误日志'
  }
]

function showMessage() {
  throw new TypeError('测试ERROR捕获')
}
</script>

<style lang="scss" scoped></style>
