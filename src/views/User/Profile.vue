<template>
  <el-page-header @back="goBack" content="个人中心">
    <template #title>返回</template>
  </el-page-header>
</template>

<script setup lang="ts">
const router = useRouter()

function goBack() {
  router.back()
}
</script>

<style lang="scss" scoped></style>
