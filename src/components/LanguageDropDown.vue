<template>
  <ElDropdown trigger="click">
    <div class="cursor-pointer">
      <SvgIconI18n />
    </div>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem
          v-for="(item, index) in languages"
          :key="index"
          :disabled="locale === item.value"
          @click="configStore.setLanguage(item.value)"
        >
          <ElIcon v-if="locale === item.value"><Check /></ElIcon>
          <ElIcon v-else />
          <span> {{ item.label }}</span>
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<script setup lang="ts">
import { Check } from '@element-plus/icons-vue'
import { languages } from '@/i18n'

const configStore = useConfigStore()
const { locale } = useI18n()

onMounted(() => {
  configStore.setLanguage(configStore.language)
})
</script>

<style lang="scss" scoped>
:deep(.el-dropdown-menu__item.is-disabled) {
  color: #409eff;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
