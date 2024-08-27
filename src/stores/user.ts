import router from '@/router'

export const useUserStore = defineStore(
  'user',
  () => {
    const accessToken = ref('')
    const refreshToken = ref('')

    const userInfo = ref({
      id: 0,
      name: '',
      avatar:
        'https://kjimg10.360buyimg.com/ott/jfs/t1/158031/24/34052/15691/63c68488F1f6d0939/ceccba0c6a5dacb0.jpg'
    })

    function setAccessToken(value: string) {
      accessToken.value = value
    }

    function setRefreshToken(value: string) {
      refreshToken.value = value
    }

    function setUserInfo(value: typeof userInfo.value) {
      userInfo.value = value
    }

    async function logout() {
      setAccessToken('')
      setRefreshToken('')
      await router.push('/login')
      ElMessage.info('已退出登录')
    }

    return {
      accessToken,
      refreshToken,
      setAccessToken,
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
