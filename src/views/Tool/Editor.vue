<template>
  <div class="editor-tool">
    <custom-breadcrumb :bread-list="breadList"></custom-breadcrumb>
    <div class="wrapper">
      <div class="select">
        <span>切换语言类型 > </span>
        <el-select v-model="optionValue" placeholder="选择语言类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <code-editor
        class="editor"
        :value="options.find(v => v.value === optionValue)?.code"
        :language="optionValue"
      ></code-editor>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { IEditorProps } from '@/components/CodeEditor.vue'

interface IOption {
  label: string
  value: string
  code: string
}
const breadList = [
  {
    path: '/tool',
    title: '系统工具'
  },
  {
    path: '/editor',
    title: '代码编辑'
  }
]

const optionValue = ref<IEditorProps['language']>('javascript')
const options: IOption[] = [
  {
    value: 'javascript',
    label: 'javascript',
    code: `function test(){
    console.log("test")
}`
  },
  {
    value: 'html',
    label: 'html',
    code: `<body>
  <div id="app"></div>
</body>`
  },
  {
    value: 'css',
    label: 'css',
    code: `#app {
  background-color: red;
}`
  },
  {
    value: 'php',
    label: 'php',
    code: `<?php
echo "Hello World!";
?>`
  }
]
</script>

<style lang="scss" scoped>
.editor-tool {
  display: flex;
  flex-direction: column;
  height: 100%;

  .wrapper {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 10px;

    .select {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .editor {
      flex: 1;
      margin-bottom: 20px;
    }
  }
}
</style>
