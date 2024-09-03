interface Options<T> {
  fetchData?: () => Promise<T>
  pageSizeOptions?: number[]
}

export function useTable<T>(options: Options<T[]> = {}) {
  const { fetchData, pageSizeOptions = [10, 15, 20] } = options

  const tableData = ref([]) as Ref<T[]>

  const isLoading = ref(false)
  const totalPages = ref(0)
  const currentPage = ref(1)
  const pageSize = ref(10)

  async function refetch() {
    isLoading.value = true
    if (fetchData) {
      tableData.value = await fetchData()
    }
    isLoading.value = false
  }

  async function onCurrentChange(val: number) {
    currentPage.value = val
    await refetch()
  }

  async function onSizeChange(val: number) {
    pageSize.value = val
    await refetch()
  }

  onBeforeMount(refetch)

  return {
    tableData,
    isLoading,
    totalPages,
    currentPage,
    pageSize,
    pageSizeOptions,
    onCurrentChange,
    onSizeChange,
    refetch
  }
}
