<template>
  <RouterView />
</template>

<script setup lang="ts">
definePage({
  redirect: '/tool/editor',
  meta: {
    title: '系统工具',
    icon: 'setting',
    isMenuitem: true,
    menuitemOrder: 3
  }
})
</script>
