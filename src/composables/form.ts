import type { FormInstance, FormRules } from 'element-plus'
import type { MaybeRef } from 'vue'

interface Options<T extends object> {
  rules?: MaybeRef<FormRules<T>>
  /** [editTitle, addTitle] */
  dialogFormTitles?: [string, string]
  clone?: (val: T) => T
  validateFailed?: () => void | Promise<void>
}

const structuredCloneFn = <T>(val: T): T => structuredClone(val)

export function useForm<T extends object>(initialValues: T, options: Options<T> = {}) {
  const {
    rules = {},
    dialogFormTitles = ['编辑', '新增'],
    clone = structuredCloneFn,
    validateFailed
  } = options

  const { locale, t } = useI18n()

  const defaultForm = clone(initialValues)
  const form = ref(initialValues) as Ref<T>
  const formRef = ref<FormInstance | null>(null)
  const formRules = computed<FormRules>(() => unref(rules))
  const isSubmitting = ref(false)

  watch(locale, () => {
    formRef.value?.validate()
  })

  function resetForm(patches?: Partial<T>) {
    form.value = patches ? { ...form.value, ...patches } : clone(defaultForm)
  }

  function resetFields(props: Array<keyof T>) {
    props.forEach(prop => {
      form.value[prop] = clone(defaultForm)[prop]
    })
  }

  function submitForm(callback: (values: T) => Promise<void>) {
    if (!formRef.value) return
    formRef.value.validate(async valid => {
      if (!valid) {
        validateFailed ? await validateFailed() : ElMessage.error(t('validator.check_form'))
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
  const dialogTitle = computed(() => dialogFormTitles[Number(isAddForm.value)])

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
    resetFields,
    submitForm,

    dialogVisible,
    dialogTitle,
    isAddForm,
    openDialog,
    onDialogClose
  }
}
