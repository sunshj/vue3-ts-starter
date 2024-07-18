<template>
  <el-breadcrumb separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbs"
        :key="index"
        :to="item.isLink ? { path: item.path } : ''"
      >
        {{ item.title }}
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
const breadcrumbs = useBreadcrumb()
</script>
