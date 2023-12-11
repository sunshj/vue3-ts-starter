<template>
  <div>
    <el-page-header content="个人中心" style="margin-bottom: 15px" @back="$router.back()">
      <template #title>返回</template>
    </el-page-header>
    <custom-card :padding="15" title="登录信息">
      <div class="login-info">
        <div>用户名：{{ userInfo.userName }}</div>
        <div>登录时间：{{ timeFormat(userInfo.loginTime) }}</div>
      </div>
    </custom-card>
  </div>
</template>

<script setup lang="ts">
import { timeFormat } from '@/utils'

const userInfo = ref({
  userName: '',
  loginTime: 0
})

onBeforeMount(() => {
  userInfo.value = JSON.parse(sessionStorage.getItem('userInfo') ?? '{}')
})
</script>

<style lang="scss" scoped>
.login-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
