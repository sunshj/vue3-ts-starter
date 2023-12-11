<template>
  <div class="container">
    <el-result
      :sub-title="`抱歉，访问地址 ${$route.path} 不存在`"
      title="404 Not Found"
      icon="error"
    >
      <template #extra>
        <el-button type="primary" @click="$router.back()">返回</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-bottom: 10vh;
}
</style>
