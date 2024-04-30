export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const userInfo = ref({
      username: '',
      avatar:
        'https://kjimg10.360buyimg.com/ott/jfs/t1/158031/24/34052/15691/63c68488F1f6d0939/ceccba0c6a5dacb0.jpg',
      lastLogin: ''
    })

    function setToken(value: string) {
      token.value = value
    }

    function setUserInfo(value: typeof userInfo.value) {
      userInfo.value = value
    }

    function logout() {
      token.value = ''
      window.location.href = '/login'
      ElMessage.info('已退出登录')
    }

    return { token, setToken, userInfo, setUserInfo, logout }
  },
  {
    persist: true
  }
)
