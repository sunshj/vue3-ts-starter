<template>
  <div ref="editorForm" class="ace-editor"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watchEffect, reactive } from 'vue'
import { useVModel } from '@vueuse/core'
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
  modelValue?: string
  readonly?: boolean
  language?: 'javascript' | 'html' | 'css' | 'php'
}
const props = withDefaults(defineProps<IEditorProps>(), {
  id: 0,
  modelValue: '',
  readonly: false,
  language: 'javascript'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const localVal = useVModel(props, 'modelValue', emit)

const editor = ref<Ace.Editor | null>(null)
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
  if (editor.value) editor.value.destroy()

  editor.value = ace.edit(editorForm.value as HTMLDivElement, options)

  editor.value.setOptions({
    enableSnippets: true,
    enableLiveAutocompletion: true,
    enableBasicAutocompletion: true
  })
  editor.value.getSession().setUseWrapMode(true)
  editor.value.on('input', () => {
    emit('update:modelValue', editor.value!.getValue())
  })
  editor.value.setValue(localVal.value)
}

watchEffect(() => {
  const position = (editor.value as Ace.Editor).getCursorPosition()
  editor.value!.setValue(localVal.value)
  editor.value!.getSession().setMode(`ace/mode/${props.language}`)
  editor.value!.clearSelection()
  editor.value!.moveCursorToPosition(position)
})

onMounted(() => {
  initialize()
})

onBeforeUnmount(() => {
  editor.value!.destroy()
})
</script>

<style lang="scss" scoped>
.ace-editor {
  height: 100%;
  min-height: 400px;
}
</style>
