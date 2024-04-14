<template>
  <div>
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
    icon: 'md',
    isMenuitem: true
  }
})

defineOptions({
  components: {
    'md-editor': MavonEditor.mavonEditor
  }
})

const editor = reactive({
  value: `
## 开启devtools
1. vue2
\`\`\`js
const vueApp = document.getElementById('app').__vue__

let Vue = vueApp.constructor
while (Vue.super) {
  Vue = Vue.super
}

Vue.config.devtools = true
window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = Vue

\`\`\`

2. vue3
\`\`\`js
const vueApp = document.getElementById('app').__vue_app__

window.__VUE_DEVTOOLS_GLOBAL_HOOK__.apps.push({
  app: vueApp,
  version: vueApp.version,
  types: {
    Comment: Symbol('Comment'),
    Fragment: Symbol('Fragment'),
    Static: Symbol('Static'),
    Text: Symbol('Text')
  }
})

window.__VUE_DEVTOOLS_GLOBAL_HOOK__.enabled = true
\`\`\`
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
