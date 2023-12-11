<template>
  <div class="editor-tool">
    <custom-breadcrumb :bread-list="breadList" />
    <div class="wrapper">
      <div class="select">
        <span>切换语言类型 > </span>
        <el-select v-model="language" placeholder="选择语言类型">
          <el-option
            v-for="item in cases"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <monaco-editor
        v-model="code"
        class="editor"
        theme="vs-dark"
        :language="language"
        @change="onEditorChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
definePage({
  meta: {
    title: '代码编辑',
    icon: 'i-menu-code',
    isMenuitem: true
  }
})

type LangType = 'javascript' | 'css' | 'html' | 'json'
interface ICase {
  label: string
  value: LangType
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

const language = ref<LangType>('javascript')
const cases: ICase[] = [
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
    value: 'json',
    label: 'json',
    code: `{"options": {
    "colorDecorators": true,
    "lineHeight": 24,
    "tabSize": 2
  }}
  `
  }
]

const code = computed({
  get: () => {
    return cases.find(v => v.value === language.value)!.code
  },
  set: (value: string) => {
    return value
  }
})

function onEditorChange(value: string) {
  console.log(value)
}
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

      :deep(.monaco-editor) {
        width: 100% !important;
      }
    }
  }
}
</style>
