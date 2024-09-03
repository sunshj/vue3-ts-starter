import type { FormInstance, FormRules } from 'element-plus'
import type { MaybeRef } from 'vue'

interface Options<T extends object> {
  rules?: MaybeRef<FormRules<T>>
  /** [editTitle, addTitle] */
  formTitles?: [string, string]
  clone?: (val: T) => T
  validateFailed?: () => void | Promise<void>
}

const cloneFnJSON = <T>(obj: T): T => JSON.parse(JSON.stringify(obj))

export function useInitForm<T extends object>(initialValues: T, options: Options<T> = {}) {
  const { rules = {}, clone = cloneFnJSON, validateFailed, formTitles = ['新增', '编辑'] } = options

  const defaultForm = clone(initialValues)
  const form = ref<T>(initialValues)
  const formRef = ref<FormInstance | null>(null)
  const formRules = computed(() => unref(rules))
  const isSubmitting = ref(false)

  function resetForm() {
    formRef.value?.resetFields()
  }

  function submitForm(callback: () => Promise<void>) {
    if (!formRef.value) return
    formRef.value.validate(async valid => {
      if (!valid) {
        validateFailed ? await validateFailed() : ElMessage.error('请检查表单是否填写正确')
        return
      }
      isSubmitting.value = true

      await callback().finally(() => {
        isSubmitting.value = false
      })
    })
  }

  const dialogVisible = ref(false)
  const isAddForm = ref(true)
  const dialogTitle = computed(() => formTitles[Number(isAddForm.value)])

  function openDialog(isAdd = true) {
    dialogVisible.value = true
    isAddForm.value = isAdd
  }

  function onDialogClose() {
    dialogVisible.value = false
    resetForm()
  }

  return {
    form,
    defaultForm,
    formRules,
    formRef,
    isSubmitting,
    resetForm,
    submitForm,

    dialogVisible,
    dialogTitle,
    isAddForm,
    openDialog,
    onDialogClose
  }
}
