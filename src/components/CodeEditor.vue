<template>
  <div ref="editorForm" class="ace-editor"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watchEffect, reactive } from 'vue'
import ace from 'ace-builds'
import type { Ace } from 'ace-builds'
// 代码语言
import 'ace-builds/src-min-noconflict/mode-html'
import 'ace-builds/src-min-noconflict/mode-css'
import 'ace-builds/src-min-noconflict/mode-javascript'
import 'ace-builds/src-min-noconflict/mode-php'
// 代码提示
import 'ace-builds/src-min-noconflict/snippets/html'
import 'ace-builds/src-min-noconflict/snippets/css'
import 'ace-builds/src-min-noconflict/snippets/javascript'
import 'ace-builds/src-min-noconflict/snippets/php'
// 主题
import 'ace-builds/src-min-noconflict/theme-monokai'
// 扩展
import 'ace-builds/src-min-noconflict/ext-language_tools'
import 'ace-builds/src-min-noconflict/ext-beautify'
import 'ace-builds/src-min-noconflict/ext-emmet'
import 'ace-builds/src-min-noconflict/ext-searchbox'
import 'ace-builds/src-min-noconflict/ext-error_marker'
import 'ace-builds/src-min-noconflict/ext-keybinding_menu'
import 'ace-builds/src-min-noconflict/ext-linking'
import 'ace-builds/src-min-noconflict/ext-modelist'
import 'ace-builds/src-min-noconflict/ext-settings_menu'
import 'ace-builds/src-min-noconflict/ext-spellcheck'
import 'ace-builds/src-min-noconflict/ext-split'
import 'ace-builds/src-min-noconflict/ext-static_highlight'
import 'ace-builds/src-min-noconflict/ext-statusbar'
import 'ace-builds/src-min-noconflict/ext-whitespace'
import 'ace-builds/src-min-noconflict/ext-textarea'
import 'ace-builds/src-min-noconflict/ext-themelist'

export interface IEditorProps {
  id?: number
  value?: string
  readonly?: boolean
  language?: 'javascript' | 'html' | 'css' | 'php'
}
const props = withDefaults(defineProps<IEditorProps>(), {
  id: 0,
  value: '',
  readonly: false,
  language: 'javascript'
})

const emit = defineEmits<{
  (e: 'update:value', value: string): void
}>()

let editor: Ace.Editor
const editorForm = ref<HTMLDivElement>()

const options = reactive({
  theme: `ace/theme/monokai`,
  mode: `ace/mode/${props.language}`,
  tabSize: 4, // 标签大小
  fontSize: 14, // 设置字号
  minLines: 33,
  maxLines: 33,
  showPrintMargin: false,
  readOnly: props.readonly,
  enableBasicAutocompletion: true, // 启用基本自动完成
  enableSnippets: true, // 启用代码段
  enableLiveAutocompletion: true, // 启用实时自动完成
  displayIndentGuides: true, // 显示参考线
  enableEmmet: true, // 启用Emmet
  useWorker: false, // 使用辅助对象
  enableMultiselect: true, //  选中多处
  showFoldWidgets: true, // 显示折叠部件
  fadeFoldWidgets: true, // 淡入折叠部件
  wrap: true, // 换行
  tooltipFollowsMouse: true
})

function initialize() {
  if (editor) {
    editor.destroy()
  }

  editor = ace.edit(editorForm.value as HTMLDivElement, options)

  editor.setOptions({
    enableSnippets: true,
    enableLiveAutocompletion: true,
    enableBasicAutocompletion: true
  })
  editor.getSession().setUseWrapMode(true)
  editor.on('change', () => {
    emit('update:value', editor.getValue())
  })
  editor.setValue(props.value || '')
}

watchEffect(() => {
  initialize()
  editor.getSession().setValue(props.value)
  editor.getSession().setMode(`ace/mode/${props.language}`)
  editor.clearSelection()
  editor.moveCursorToPosition(editor.getCursorPosition())
})

onMounted(() => {
  initialize()
})

onBeforeUnmount(() => {
  editor.destroy()
})
</script>

<style lang="scss" scoped></style>
