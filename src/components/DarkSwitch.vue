<template>
  <el-switch
    v-model="isDark"
    active-color="#2F2F2F"
    inactive-color="#F1F1F1"
    @change="toggleDarkMode"
    @click="darkSwitchClick"
  ></el-switch>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import { disableDark, enableDark } from '@/utils/dark'

const emit = defineEmits<{
  (e: 'change', value: boolean): void
}>()

const isDark = ref(false)

const toggleDarkMode = () => {
  if (isDark.value) {
    enableDark()
  } else {
    disableDark()
  }
  sessionStorage.setItem('darkMode', isDark.value.toString())
}

const darkSwitchClick = () => {
  emit('change', isDark.value)
}

onBeforeMount(() => {
  isDark.value = sessionStorage.getItem('darkMode') === 'true'
})

onMounted(() => {
  toggleDarkMode()
})
</script>

<style lang="scss" scoped>
:deep(.el-switch__core .el-switch__action) {
  background-image: url('../assets/icons/sun.png');
  background-position: center center;
  background-size: 75%;
  background-repeat: no-repeat;
}

.el-switch.is-checked {
  :deep(.el-switch__core .el-switch__action) {
    background-image: url('../assets/icons/moon.png');
  }
}
</style>
