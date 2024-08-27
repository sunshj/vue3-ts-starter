<template>
  <div class="container">
    <ElResult
      :sub-title="`抱歉，访问地址 ${$route.path} 不存在`"
      title="404 Not Found"
      icon="error"
    >
      <template #extra>
        <ElButton type="primary" @click="$router.back()">返回</ElButton>
      </template>
    </ElResult>
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
