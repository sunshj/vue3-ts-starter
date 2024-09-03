import type { FormInstance, FormRules } from 'element-plus'
import type { MaybeRef } from 'vue'

interface Options<T extends object> {
  rules?: MaybeRef<FormRules<T>>
  /** [editTitle, addTitle] */
  formTitles?: [string, string]
  clone?: (val: T) => T
  validateFailed?: () => void | Promise<void>
}

const structuredCloneFn = <T>(val: T): T => structuredClone(val)

export function useForm<T extends object>(initialValues: T, options: Options<T> = {}) {
  const {
    rules = {},
    formTitles = ['新增', '编辑'],
    clone = structuredCloneFn,
    validateFailed
  } = options

  const defaultForm = clone(initialValues)
  const form = ref(initialValues) as Ref<T>
  const formRef = ref<FormInstance | null>(null)
  const formRules = computed(() => unref(rules))
  const isSubmitting = ref(false)

  function resetForm() {
    form.value = clone(defaultForm)
  }

  function submitForm(callback: (values: T) => Promise<void>) {
    if (!formRef.value) return
    formRef.value.validate(async valid => {
      if (!valid) {
        validateFailed ? await validateFailed() : ElMessage.error('请检查表单是否填写正确')
        return
      }
      isSubmitting.value = true

      await callback(toRaw(form.value)).finally(() => {
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
