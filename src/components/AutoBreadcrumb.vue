<template>
  <ElBreadcrumb separator="/">
    <TransitionGroup name="breadcrumb">
      <ElBreadcrumbItem
        v-for="(item, index) in breadcrumbs"
        :key="index"
        :to="item.isLink ? { path: item.path } : ''"
      >
        {{ item.title }}
      </ElBreadcrumbItem>
    </TransitionGroup>
  </ElBreadcrumb>
</template>

<script setup lang="ts">
const breadcrumbs = useBreadcrumb()
</script>
