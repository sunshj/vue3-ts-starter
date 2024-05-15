<template>
  <el-switch
    v-model="isDark"
    active-color="#2F2F2F"
    inactive-color="#F1F1F1"
    @change="toggleDarkMode"
  />
</template>

<script setup lang="ts">
const isDark = useDark()
const toggle = useToggle(isDark)

const emit = defineEmits<{
  (e: 'change', value: boolean): void
}>()

function toggleDarkMode(val: boolean | string | number) {
  toggle(!!val)
  emit('change', !!val)
}
</script>

<style lang="scss" scoped>
:deep(.el-switch__core .el-switch__action) {
  background-image: url('../assets/icons/sun.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 75%;
}

.el-switch.is-checked {
  :deep(.el-switch__core .el-switch__action) {
    color: #d5d3d0;
    background-color: #636363;
    background-image: url('../assets/icons/moon.png');
  }
}
</style>
