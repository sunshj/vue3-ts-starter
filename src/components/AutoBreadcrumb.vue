<template>
  <el-breadcrumb separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbList"
        :key="index"
        :to="item.isLink ? { path: item.path } : ''"
      >
        {{ item.title }}
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
const route = useRoute()

interface IBreadList {
  title: string
  path: string
  isLink?: boolean
}

const breadcrumbList = ref<IBreadList[]>([])

function getBreadcrumbs() {
  const breadcrumbs: IBreadList[] = []
  const matched = route.matched.filter(v => v.meta.isMenuitem && v.meta.title)
  if (route.path !== '/') breadcrumbs.push({ path: '/', title: '首页', isLink: true })

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
</script>
