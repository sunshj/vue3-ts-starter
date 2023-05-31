import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useActivePathStore = defineStore('activePath', () => {
  const currentPath = ref('')

  function update(path: string) {
    currentPath.value = path
    sessionStorage.setItem('activePath', path)
  }

  return { currentPath, update }
})
