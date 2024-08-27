<template>
  <ElUpload
    :file-list="props.file"
    :action="props.action"
    :limit="1"
    list-type="picture"
    :on-success="uploadSuccess"
    :on-error="uploadFailed"
  >
    <ElButton type="primary" :icon="Upload" size="small">上传</ElButton>
    <template #tip>
      <div class="el-upload__tip">仅支持jpg/png图片格式</div>
    </template>
  </ElUpload>
</template>

<script setup lang="ts">
import { Upload } from '@element-plus/icons-vue'

const props = defineProps<{
  file: File[]
  action: string
}>()

const emit = defineEmits<{
  (e: 'success', url: string): void
  (e: 'failed', err: any): void
}>()

// 上传事件
function uploadSuccess(res: { data: { url: string } }) {
  const { url } = res.data
  emit('success', url)
}

function uploadFailed(err: any) {
  emit('failed', err)
}
</script>

<style lang="scss" scoped></style>
