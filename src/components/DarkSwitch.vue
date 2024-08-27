<template>
  <ElSwitch
    v-model="isDark"
    class="dark-switch"
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
.el-switch :deep(.el-switch__core .el-switch__action) {
  background-image: url('../assets/icons/sun.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 75%;
}

.el-switch.is-checked :deep(.el-switch__core) {
  background-color: #65758529;
  border-color: #3c3f44;

  .el-switch__action {
    color: #d5d3d0;
    background-color: currentColor;
    background-image: url('../assets/icons/moon.png');
    filter: invert(100%);
    border-color: #d5d3d0;
  }
}
</style>
