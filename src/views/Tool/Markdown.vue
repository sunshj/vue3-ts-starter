<template>
  <div>
    <custom-breadcrumb :bread-list="breadList"></custom-breadcrumb>

    <h2>基础使用</h2>
    <mavon-editor v-model="editor.value" :boxShadow="false" defaultOpen="preview" />

    <h2>仅预览</h2>
    <mavon-editor
      v-model="editor.value"
      :boxShadow="false"
      :subfield="false"
      defaultOpen="preview"
      :toolbarsFlag="false"
    />
  </div>
</template>

<script></script>

<script setup lang="ts">
import { reactive } from 'vue'

const breadList = [
  {
    path: '/tool',
    title: '系统工具'
  },
  {
    path: '/markdown',
    title: 'Markdown'
  }
]

const editor = reactive({
  value: `
## 任务列表
  
  - [x] 已完成任务
  - [ ] 未完成任务

  ## 数学公式
  $$ 1+1=2 $$
  
## 引用
> 这是Markdown的简单语法
`
})
</script>

<style lang="scss" scoped>
h2 {
  margin: 10px 0;
}

.v-note-wrapper {
  z-index: auto;
}
</style>
