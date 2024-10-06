import { i18n } from '@/i18n'
import router from '@/router'

export const useUserStore = defineStore(
  'user',
  () => {
    /** Access Token */
    const accessToken = ref('')
    function setAccessToken(value: string) {
      accessToken.value = value
    }

    /** Refresh Token */
    const refreshToken = ref('')
    function setRefreshToken(value: string) {
      refreshToken.value = value
    }

    /** 用户信息 */
    const userInfo = ref({
      id: 0,
      name: '',
      avatar:
        'https://kjimg10.360buyimg.com/ott/jfs/t1/158031/24/34052/15691/63c68488F1f6d0939/ceccba0c6a5dacb0.jpg'
    })

    function setUserInfo(value: typeof userInfo.value) {
      userInfo.value = value
    }

    /** 退出登录 */
    async function logout() {
      setAccessToken('')
      setRefreshToken('')
      await router.push('/login')
      ElMessage.info(i18n.global.t('auth.logout_success'))
    }

    return {
      accessToken,
      setAccessToken,
      refreshToken,
      setRefreshToken,
      userInfo,
      setUserInfo,
      logout
    }
  },
  {
    persist: true
  }
)
