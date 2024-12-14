<template>
  <div>
    <ElPageHeader content="个人中心" style="margin-bottom: 15px" @back="$router.back()">
      <template #title>返回</template>
    </ElPageHeader>

    <CustomCard :padding="15" title="用户信息">
      <div class="login-info">
        <div>用户名：{{ state?.name }}</div>
        <div>邮箱：{{ state?.email }}</div>
        <div>
          <span>权限：</span>
          <span v-if="!isLoading">{{ state?.role === 2 ? '管理员' : '普通用户' }}</span>
        </div>
        <div>注册时间：{{ timeFormat(state?.createdAt!) }}</div>
      </div>
    </CustomCard>

    <CustomCard :padding="15" title="版本信息">
      <div class="login-info">
        <div>Commit Branch：{{ gitInfo.gitBranch }}</div>
        <div>Commit Hash：{{ gitInfo.gitCommit }}</div>
        <div>Commit Message：{{ gitInfo.gitCommitMessage }}</div>
        <div>Commit Date：{{ timeFormat(gitInfo.gitCommitDate) }}</div>
      </div>
    </CustomCard>
  </div>
</template>

<script setup lang="ts">
import { apiGetUser } from '@/api/user'

// @ts-expect-error
const gitInfo = (window.__RUNTIME_ENV__ = __RUNTIME_ENV__)

const userStore = useUserStore()

const { state, isLoading } = useAsyncState(apiGetUser(userStore.userInfo.id), null)
</script>

<style lang="scss" scoped>
.login-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
