<template>
  <div>
    <ElButton type="danger" @click="showMessage()">测试ERROR捕获</ElButton>
  </div>
</template>

<script setup lang="ts">
definePage({
  meta: {
    title: 'menus.error_log',
    icon: 'error',
    isMenuitem: true
  }
})

function showMessage() {
  throw new TypeError('测试ERROR捕获')
}
</script>
