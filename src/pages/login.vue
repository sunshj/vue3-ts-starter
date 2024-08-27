<template>
  <ActionFormCard title="后台管理" subtitle="欢迎登录到后台管理系统" @reset="resetForm">
    <template #form>
      <!-- 表单 -->
      <ElForm
        ref="loginFormRef"
        class="login_form"
        :model="loginForm"
        :rules="loginFormRules"
        status-icon
        @submit.prevent
      >
        <!-- username -->
        <ElFormItem prop="username">
          <ElInput v-model="loginForm.username" :prefix-icon="User" placeholder="用户名" />
        </ElFormItem>
        <!-- password -->
        <ElFormItem prop="password">
          <ElInput
            v-model="loginForm.password"
            show-password
            :prefix-icon="Key"
            placeholder="密码"
          />
        </ElFormItem>
        <!-- 按钮 -->
        <ElButton
          v-throttle
          class="submit_btn"
          type="primary"
          native-type="submit"
          :loading="loginLoading"
          @click="submitForm"
        >
          <SvgIconArrowRightToBracket />
          <span style="margin-left: 5px">登入</span>
        </ElButton>
      </ElForm>
    </template>
  </ActionFormCard>
</template>

<script setup lang="ts">
import { Key, User } from '@element-plus/icons-vue'
import { ApiLogin } from '@/api/auth'
import { isPassword, isUserName } from '@/common/async-validators'
import type { FormInstance, FormRules } from 'element-plus'

definePage({
  meta: {
    layout: 'empty'
  }
})

const userStore = useUserStore()
const router = useRouter()

const loginFormRef = ref<FormInstance>()
const loginForm = reactive({
  username: 'sunshj',
  password: '123456'
})
const loginFormRules = reactive<FormRules>({
  username: [{ validator: isUserName, trigger: 'blur' }],
  password: [{ validator: isPassword, trigger: 'blur' }]
})

const loginLoading = ref(false)
const popoverVisible = ref(false)

const resetForm = () => {
  loginFormRef.value?.resetFields()
  popoverVisible.value = false
}

const submitForm = async () => {
  if (!loginFormRef.value) return
  await loginFormRef.value.validate(async valid => {
    if (!valid) {
      ElMessage.warning('未通过校验')
      return
    }
    loginLoading.value = true
    // 登录逻辑
    await ApiLogin({ ...loginForm })
      .then(loginData => {
        userStore.setAccessToken(loginData.access_token)
        userStore.setRefreshToken(loginData.refresh_token)
        const { id, name, avatar } = loginData.user
        userStore.setUserInfo({ id, name, avatar })

        router.push('/')
        ElMessage.success('登录成功')
      })
      .finally(() => {
        loginLoading.value = false
      })
  })
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.login_container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #e8eaf2;

  .login_card {
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    max-width: 450px;
    height: 320px;
    margin: auto;
    box-shadow: 0 4px 4px #b1bdd4;

    .login_card_content {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      padding: 24px 20px;
      background: white;
      border-radius: 5px 5px 0 0;

      .text {
        margin-bottom: 15px;
        text-align: center;

        .title {
          font-size: 36px;
        }

        p {
          margin-top: 5px;
          font-size: 14px;
          color: #6c757d;
        }
      }

      .login_form {
        width: 100%;

        .submit_btn {
          width: 100%;
          background: #0665d0;

          &:hover {
            background: #0553ab;
          }
        }
      }
    }

    .login_card_footer {
      display: flex;
      align-items: center;
      height: 50px;
      padding: 16px 24px;
      background: #f8f9fa;
      border-radius: 0 0 5px 5px;

      .clear_form_popover {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        color: #909399;
        cursor: pointer;

        .popover_reference {
          display: flex;
          gap: 2px;
          align-items: center;
          font-size: 14px;
        }
      }
    }
  }
}

@media screen and (width <= 450px) {
  .login_container {
    .login_card {
      width: 95%;
      transition: all 0.2s;
      transform: translateY(-15px);
    }
  }
}
</style>
