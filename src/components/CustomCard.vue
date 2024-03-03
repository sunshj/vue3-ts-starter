<template>
  <el-card shadow="hover" class="custom-card">
    <div v-if="header" class="custom-card__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="custom-card__content">
      <slot />
      <slot name="content" />
    </div>
  </el-card>
</template>

<script setup lang="ts">
interface IProps {
  title?: string
  header?: boolean
  padding?: number
  alignMode?: 'left' | 'right' | 'center'
}

withDefaults(defineProps<IProps>(), {
  title: '',
  header: true,
  padding: 10,
  alignMode: 'left'
})
</script>

<style lang="scss" scoped>
:deep(.el-card__body) {
  padding: 0 !important;
}

.custom-card {
  margin-bottom: 15px;
  text-align: v-bind(alignMode);

  &__title {
    padding: 15px;
    font-size: 24px;
    font-weight: bold;
    background-color: #f7f9fb;
  }

  &__content {
    padding: calc(v-bind(padding) * 1px);
  }
}
</style>
