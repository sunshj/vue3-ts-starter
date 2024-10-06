export interface BreadList {
  title: string
  path: string
  isLink?: boolean
}

export function useBreadcrumb() {
  const route = useRoute()
  const breadcrumbList = ref<BreadList[]>([])

  function getBreadcrumbs() {
    const breadcrumbs: BreadList[] = []
    const matched = route.matched.filter(v => v.meta.isMenuitem && v.meta.title)
    if (route.path !== '/') breadcrumbs.push({ path: '/', title: 'menus.home', isLink: true })

    matched.forEach(item => {
      breadcrumbs.push({
        path: item.path,
        title: item.meta.title!,
        isLink: item.meta.isLink
      })
    })

    return breadcrumbs
  }

  onMounted(() => {
    breadcrumbList.value = getBreadcrumbs()
  })

  watch(route, () => {
    breadcrumbList.value = getBreadcrumbs()
  })

  return breadcrumbList
}
