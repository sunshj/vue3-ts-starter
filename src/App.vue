<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const locale = ref(zhCn)

try {
  // @ts-expect-error
  window.__GIT_INFO__ = __GIT_INFO__
} catch {}
</script>
