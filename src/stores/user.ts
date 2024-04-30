export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const userInfo = ref({
      username: '',
      lastLogin: ''
    })

    function setToken(value: string) {
      token.value = value
    }

    function setUserInfo(value: typeof userInfo.value) {
      userInfo.value = value
    }

    return { token, setToken, userInfo, setUserInfo }
  },
  {
    persist: true
  }
)
