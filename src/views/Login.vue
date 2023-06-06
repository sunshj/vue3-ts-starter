<template>
  <div class="login_container">
    <div class="login_card">
      <div class="login_card_content">
        <div class="text">
          <div class="title">后台管理</div>
          <p>欢迎登录到后台管理系统</p>
        </div>
        <!-- 表单 -->
        <el-form
          class="login_form"
          ref="loginFormRef"
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
              show-password
              v-model="loginForm.password"
              :prefix-icon="Key"
              placeholder="密码"
            ></el-input>
          </el-form-item>
          <!-- 按钮 -->
          <el-button
            class="submit_btn"
            type="primary"
            @click="submitForm(loginFormRef)"
            native-type="submit"
            :loading="loginLoading"
            v-throttle
          >
            <font-awesome-icon icon="arrow-right-to-bracket" />
            <span style="margin-left: 5px">登入</span>
          </el-button>
        </el-form>
      </div>
      <!-- footer -->
      <div class="login_card_footer">
        <el-checkbox v-model="rememberPassChecked" label="记住密码" size="large" />

        <div class="clear_form_popover">
          <el-popover placement="top" :width="160" v-model:visible="popoverVisible" trigger="hover">
            <p>确认清空输入框？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="small" text @click="popoverVisible = false">取消</el-button>
              <el-button type="primary" size="small" @click="resetForm(loginFormRef)"
                >确定</el-button
              >
            </div>
            <template #reference>
              <span class="popover_reference">
                <el-icon :size="18"><RefreshLeft /></el-icon>
                <p>清空</p>
              </span>
            </template>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { User, Key, RefreshLeft } from '@element-plus/icons-vue'
import { ElMessage as $message } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { validateName, validatePass } from '@/common/validateRules'
import { vThrottle } from '@/common/directives'

const router = useRouter()

const loginFormRef = ref<FormInstance>()
const loginForm = reactive({
  username: '',
  password: ''
})
const loginFormRules = reactive<FormRules>({
  username: [{ validator: validateName, trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }]
})

const loginLoading = ref(false)
const popoverVisible = ref(false)
const rememberPassChecked = ref(false)

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  popoverVisible.value = false
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(valid => {
    if (!valid) {
      $message.warning('未通过校验')
      return
    }
    $message.success('已通过校验')
    loginLoading.value = true
    // 异步请求
    setTimeout(() => {
      if (rememberPassChecked.value) {
        localStorage.setItem('username', loginForm.username)
        localStorage.setItem('password', loginForm.password)
      }
      sessionStorage.setItem('token', Date.now().toString())
      $message.success('登录成功')
      router.push('/')
      loginLoading.value = false
    }, 1000 + Math.random() * 2000)
  })
}

onMounted(() => {
  const username = localStorage.getItem('username') as string
  const password = localStorage.getItem('password') as string
  if (username && password) {
    loginForm.username = username
    loginForm.password = password
  }
})
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
      border-radius: 5px 5px 0 0;
      background: white;

      .text {
        margin-bottom: 15px;
        text-align: center;

        .title {
          font-size: 36px;
        }

        p {
          margin-top: 5px;
          color: #6c757d;
          font-size: 14px;
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
      border-radius: 0 0 5px 5px;
      background: #f8f9fa;

      .clear_form_popover {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        color: #909399;
        cursor: pointer;

        .popover_reference {
          display: flex;
          align-items: center;
          gap: 2px;
          font-size: 14px;
        }
      }
    }
  }
}

@media screen and (max-width: 450px) {
  .login_container {
    .login_card {
      width: 95%;
      transform: translateY(-15px);
      transition: all 0.2s;
    }
  }
}
</style>
