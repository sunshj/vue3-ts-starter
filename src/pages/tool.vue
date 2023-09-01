<template>
  <RouterView />
</template>

<script setup lang="ts">
definePage({
  redirect: '/tool/editor'
})
</script>

<route lang="yaml">
meta:
  title: '系统工具'
  icon: 'i-menu-setting'
  isMenuitem: true
  menuitemOrder: 3
</route>
