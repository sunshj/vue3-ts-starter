<template>
  <el-upload
    :file-list="props.file"
    :action="props.action"
    :limit="1"
    list-type="picture"
    :on-success="uploadSuccess"
    :on-error="uploadFailed"
  >
    <el-button type="primary" :icon="Upload" size="small">上传</el-button>
    <template #tip>
      <div class="el-upload__tip">仅支持jpg/png图片格式</div>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import { Upload } from '@element-plus/icons-vue'

const props = defineProps({
  file: {
    type: Array,
    required: true
  },
  action: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['success', 'failed'])

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
