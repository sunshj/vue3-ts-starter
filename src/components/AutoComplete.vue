<template>
  <ElAutocomplete
    v-model="localValue"
    :fetch-suggestions="querySearch"
    placeholder="请输入"
    :trigger-on-focus="props.trigger"
    clearable
  />
</template>

<script setup lang="ts">
interface IProps {
  modelValue: string
  trigger?: boolean
  suggestions: Array<{
    value: string
  }>
}
const props = defineProps<IProps>()

const emit = defineEmits(['update:modelValue'])

const localValue = useVModel(props, 'modelValue', emit)

const datalist = ref(props.suggestions)

function querySearch(queryString: string, cb: Function) {
  const results = queryString
    ? datalist.value.filter(item => item.value.toLowerCase().includes(queryString.toLowerCase()))
    : datalist.value
  cb(results)
}

watchEffect(() => {
  datalist.value = props.suggestions
})
</script>

<style lang="scss" scoped></style>
