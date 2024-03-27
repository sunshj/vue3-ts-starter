<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="(item, index) in props.breadList ?? autoBreadList"
      :key="index"
      :to="item.isLink ? { path: item.path } : ''"
    >
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores'
import type { RouteRecordRaw } from 'vue-router'

interface IBreadList {
  title: string
  path: string
  isLink?: boolean
}

const props = defineProps<{
  breadList?: IBreadList[]
  path?: string
}>()

const route = useRoute()

const autoBreadList = ref<IBreadList[]>([])

const configStore = useConfigStore()

function findMenuItemByPath(currentPath: string) {
  function findMenuItem(menus: RouteRecordRaw[], currentPath: string) {
    for (const menu of menus) {
      if (menu.name === currentPath) {
        return menu
      }
      if (menu.children) {
        const result = findMenuItem(menu.children, currentPath) as RouteRecordRaw
        if (result) return result
      }
      continue
    }
  }
  return findMenuItem(configStore.routes, currentPath)
}

function splitPathToLevels(path: string) {
  return path
    .split('/')
    .filter(Boolean)
    .reduce<string[]>((acc, part) => {
      acc.push(`${acc.length > 0 ? acc.at(-1) : ''}/${part}`)
      return acc
    }, [])
}

function generateBreadcrumb(path: string) {
  const breadcrumb: IBreadList[] = []
  const currentPathArr = splitPathToLevels(path)

  currentPathArr.forEach(item => {
    const menuItem = findMenuItemByPath(item)

    if (menuItem?.meta?.title) {
      breadcrumb.push({
        title: menuItem.meta.title,
        path: `${breadcrumb.length > 0 ? `${breadcrumb.at(-1)?.path ?? ''}/` : ''}${menuItem.path}`,
        isLink: menuItem.meta?.isLink ?? false
      })
    }
  })

  return breadcrumb
}

onMounted(() => {
  autoBreadList.value = generateBreadcrumb(props.path ?? route.name)
})
</script>

<style lang="scss" scoped>
* {
  margin-bottom: 12px;
}
</style>
