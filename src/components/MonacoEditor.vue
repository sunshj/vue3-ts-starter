<template>
  <div ref="codeEditorRef" id="codeEditorBox"></div>
</template>

<script setup lang="ts">
import { editor, languages } from 'monaco-editor'

interface EditorProps {
  modelValue: string
  width: string | number
  height: string | number
  language: 'javascript' | 'css' | 'html' | 'typescript' | 'json'
  theme: editor.BuiltinTheme
  options: editor.IEditorOptions
}

defineOptions({
  name: 'MonacoEditor'
})

const props = withDefaults(defineProps<EditorProps>(), {
  height: '100%',
  width: '100%',
  theme: 'vs-dark',
  language: 'javascript',
  options: () => ({
    automaticLayout: true,
    foldingStrategy: 'indentation',
    renderLineHighlight: 'all',
    selectOnLineNumbers: true,
    minimap: {
      enabled: true
    },
    readOnly: false,
    contextmenu: true,
    fontSize: 16,
    colorDecorators: true,
    lineHeight: 24,
    tabIndex: 2,
    scrollBeyondLastLine: false,
    overviewRulerBorder: false
  })
})

const emit = defineEmits<{
  change: [value: string]
  'update:modelValue': [value: string]
  editorMounted: [editor: editor.IStandaloneCodeEditor]
}>()

const localVal = useVModel(props, 'modelValue', emit)
let codeEditor: editor.IStandaloneCodeEditor
const codeEditorRef = ref<HTMLDivElement>()

function init() {
  languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: false
  })
  languages.typescript.javascriptDefaults.setCompilerOptions({
    target: languages.typescript.ScriptTarget.ES2020,
    allowNonTsExtensions: true
  })
  codeEditor = editor.create(codeEditorRef.value!, {
    value: props.modelValue,
    language: props.language,
    theme: props.theme,
    ...props.options
  })

  codeEditor.onDidChangeModelContent(() => {
    const value = codeEditor.getValue()
    localVal.value = value
    emit('change', value)
  })

  emit('editorMounted', codeEditor)
}

watchEffect(() => {
  const newVal = localVal.value
  if (codeEditor) {
    const value = codeEditor.getValue()
    if (newVal !== value) {
      codeEditor.setValue(newVal)
    }
  }
})

watchPostEffect(() => {
  const { options } = props
  if (codeEditor) {
    codeEditor.updateOptions(options)
  }
})

watchEffect(() => {
  const { language } = props
  if (codeEditor) {
    editor.setModelLanguage(codeEditor.getModel()!, language)
  }
})

onMounted(() => {
  init()
})

onBeforeUnmount(() => {
  codeEditor.dispose()
})
</script>

<style lang="scss" scoped>
#codeEditorBox {
  width: v-bind(width);
  height: v-bind(height);
}
</style>
