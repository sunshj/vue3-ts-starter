<template>
  <el-switch
    v-model="darkModeState.isDark"
    active-color="#2F2F2F"
    inactive-color="#F1F1F1"
    @change="toggleDarkMode"
  ></el-switch>
</template>

<script setup lang="ts">
import { useDarkMode, darkModeState } from '@/common/composable'

const { toggleMode } = useDarkMode()

const emit = defineEmits<{
  (e: 'change', value: boolean): void
}>()

function toggleDarkMode() {
  toggleMode(darkModeState.isDark)
  emit('change', darkModeState.isDark)
}
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
