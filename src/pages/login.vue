<template>
  <ActionFormCard title="后台管理" subtitle="欢迎登录到后台管理系统" @reset="resetForm">
    <template #form>
      <!-- 表单 -->
      <el-form
        ref="loginFormRef"
        class="login_form"
        :model="loginForm"
        :rules="loginFormRules"
        status-icon
        @submit.prevent
      >
        <!-- username -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" :prefix-icon="User" placeholder="用户名" />
        </el-form-item>
        <!-- password -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            show-password
            :prefix-icon="Key"
            placeholder="密码"
          />
        </el-form-item>
        <!-- 按钮 -->
        <el-button
          v-throttle
          class="submit_btn"
          type="primary"
          native-type="submit"
          :loading="loginLoading"
          @click="submitForm"
        >
          <SvgIconArrowRightToBracket />
          <span style="margin-left: 5px">登入</span>
        </el-button>
      </el-form>
    </template>
  </ActionFormCard>
</template>

<script setup lang="ts">
import { Key, User } from '@element-plus/icons-vue'
import { isPassword, isUserName } from '@/common/async-validators'
import { delay } from '@/utils'
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
  username: '',
  password: ''
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
  const formEl = loginFormRef.value
  if (!formEl) return
  await formEl.validate(async valid => {
    if (!valid) {
      ElMessage.warning('未通过校验')
      return
    }
    ElMessage.success('已通过校验')
    loginLoading.value = true
    // 异步请求
    await delay(1000 + Math.random() * 2000)

    userStore.setToken(Date.now().toString())
    userStore.$patch({
      userInfo: {
        username: loginForm.username,
        lastLogin: new Date().toLocaleString()
      }
    })

    ElMessage.success('登录成功')
    router.push('/')
    loginLoading.value = false
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
