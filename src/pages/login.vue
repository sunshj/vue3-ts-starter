<template>
  <ActionFormCard :title="$t('title')" :subtitle="$t('welcome')" @reset="reset">
    <template #form>
      <ElForm
        ref="formRef"
        class="login_form"
        :model="form"
        :rules="formRules"
        status-icon
        @submit.prevent
      >
        <ElFormItem prop="username">
          <ElInput
            v-model="form.username"
            :prefix-icon="User"
            :placeholder="`${$t('auth.username')}: sunshj`"
          />
        </ElFormItem>
        <ElFormItem prop="password">
          <ElInput
            v-model="form.password"
            show-password
            :prefix-icon="Key"
            :placeholder="`${$t('auth.password')}: 123456`"
          />
        </ElFormItem>
        <ElButton
          v-throttle
          class="submit_btn"
          type="primary"
          native-type="submit"
          :loading="isSubmitting"
          @click="login"
        >
          <SvgIconArrowRightToBracket />
          <span style="margin-left: 5px">{{ $t('auth.login') }}</span>
        </ElButton>
      </ElForm>
    </template>

    <template #action>
      <LanguageDropDown />
    </template>
  </ActionFormCard>
</template>

<script setup lang="ts">
import { Key, User } from '@element-plus/icons-vue'
import { apiLogin } from '@/api/auth'

definePage({
  meta: {
    layout: 'empty'
  }
})

const userStore = useUserStore()
const router = useRouter()
const { t } = useI18n()

const { form, formRef, formRules, isSubmitting, resetForm, submitForm } = useForm(
  {
    username: '',
    password: ''
  },
  {
    rules: {
      username: [{ validator: isUserName, trigger: 'blur' }],
      password: [{ validator: isPassword, trigger: 'blur' }]
    }
  }
)

const popoverVisible = ref(false)

function reset() {
  resetForm()
  popoverVisible.value = false
}

function login() {
  submitForm(async values => {
    const res = await apiLogin(values)

    userStore.setAccessToken(res.access_token)
    userStore.setRefreshToken(res.refresh_token)
    const { id, name, avatar } = res.user
    userStore.setUserInfo({ id, name, avatar })

    router.push('/')
    ElMessage.success(t('auth.login_success'))
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
