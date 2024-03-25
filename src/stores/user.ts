import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const userInfo = ref({})

    function setToken(value: string) {
      token.value = value
    }

    function setUserInfo(value: any) {
      userInfo.value = value
    }

    return { token, setToken, userInfo, setUserInfo }
  },
  {
    persist: true
  }
)
