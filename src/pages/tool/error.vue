<template>
  <div>
    <AutoBreadcrumb />
    <el-button type="danger" @click="showMessage()">测试ERROR捕获</el-button>
  </div>
</template>

<script setup lang="ts">
definePage({
  meta: {
    title: '错误日志',
    icon: 'error',
    isMenuitem: true
  }
})

function showMessage() {
  throw new TypeError('测试ERROR捕获')
}
</script>
