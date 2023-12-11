<template>
  <div>
    <custom-breadcrumb :bread-list="breadList" />
    <el-button type="danger" @click="showMessage()">测试ERROR捕获</el-button>
  </div>
</template>

<script setup lang="ts">
definePage({
  meta: {
    title: '错误日志',
    icon: 'i-menu-error',
    isMenuitem: true
  }
})

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
