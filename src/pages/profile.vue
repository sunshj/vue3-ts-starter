<template>
  <div>
    <el-page-header content="个人中心" style="margin-bottom: 15px" @back="$router.back()">
      <template #title>返回</template>
    </el-page-header>
    <custom-card :padding="15" title="登录信息">
      <div class="login-info">
        <div>用户名：{{ userStore.userInfo.username }}</div>
        <div>登录时间：{{ timeFormat(userStore.userInfo.lastLogin) }}</div>
      </div>
    </custom-card>
  </div>
</template>

<script setup lang="ts">
import { timeFormat } from '@/utils'

const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.login-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
