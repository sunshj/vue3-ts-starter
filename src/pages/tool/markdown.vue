<template>
  <div>
    <custom-breadcrumb :bread-list="breadList" />

    <h2>基础使用</h2>
    <md-editor v-model="editor.value" :box-shadow="false" default-open="preview" />

    <h2>仅预览</h2>
    <md-editor
      v-model="editor.value"
      :box-shadow="false"
      :subfield="false"
      default-open="preview"
      :toolbars-flag="false"
    />
  </div>
</template>

<script setup lang="ts">
import MavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

definePage({
  meta: {
    title: 'Markdown',
    icon: 'i-menu-md',
    isMenuitem: true
  }
})

defineOptions({
  components: {
    'md-editor': MavonEditor.mavonEditor
  }
})

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
