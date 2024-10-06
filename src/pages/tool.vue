<template>
  <RouterView />
</template>

<script setup lang="ts">
definePage({
  redirect: '/tool/editor',
  meta: {
    title: 'menus.tools',
    icon: 'setting',
    isMenuitem: true,
    menuitemOrder: 3,
    isLink: true
  }
})
</script>
