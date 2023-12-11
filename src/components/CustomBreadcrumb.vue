<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="(item, index) in props.breadList"
      :key="index"
      :to="item.isLink ? { path: item.path } : ''"
    >
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
interface IBreadList {
  title: string
  path: string
  isLink?: boolean
}

const props = defineProps<{
  breadList?: IBreadList[]
}>()
</script>

<style lang="scss" scoped>
* {
  margin-bottom: 12px;
}
</style>
