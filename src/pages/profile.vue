<template>
  <div>
    <el-page-header content="个人中心" style="margin-bottom: 15px" @back="$router.back()">
      <template #title>返回</template>
    </el-page-header>

    <custom-card :padding="15" title="用户信息">
      <div class="login-info">
        <div>用户名：{{ state?.name }}</div>
        <div>邮箱：{{ state?.email }}</div>
        <div>权限：{{ state?.role === 2 ? '管理员' : '普通用户' }}</div>
        <div>注册时间：{{ timeFormat(state?.createdAt!) }}</div>
      </div>
    </custom-card>
  </div>
</template>

<script setup lang="ts">
import { ApiGetUser } from '@/api/user'
import { timeFormat } from '@/utils'

const userStore = useUserStore()

const { state } = useAsyncState(ApiGetUser(userStore.userInfo.id), null)
</script>

<style lang="scss" scoped>
.login-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
