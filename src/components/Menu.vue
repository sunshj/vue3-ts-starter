<template>
  <el-menu
    class="layout_menu"
    :collapse="configStore.isCollapse"
    :collapse-transition="false"
    router
    text-color="#000"
    active-text-color="#000"
    :default-active="configStore.currentPath"
  >
    <!-- 菜单项 -->
    <template v-for="item in menusList">
      <!-- 有子菜单时渲染submenu -->
      <template v-if="item.children?.length">
        <el-sub-menu :key="item.path" :index="item.path">
          <template #title>
            <el-icon :size="20"> <component :is="menuIconsMap.get(item.meta?.icon!)" /></el-icon>
            <span>{{ item.meta?.title }}</span>
          </template>
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.path"
            :index="`${item.path}/${subItem.path}`"
          >
            <template #title>
              <component :is="menuIconsMap.get(subItem.meta?.icon!)" />
              <span>{{ subItem.meta?.title }}</span>
            </template>
          </el-menu-item>
        </el-sub-menu>
      </template>
      <!-- 没有子菜单直接作为一级菜单 -->
      <template v-else>
        <el-menu-item :key="item.path" :index="item.path">
          <component :is="menuIconsMap.get(item.meta?.icon!)" />
          <template #title>
            <span>{{ item.meta?.title }}</span>
          </template>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { routes } from 'vue-router/auto/routes'
import { menuIconsMap } from '@/common/menu-icons'
import type { RouteRecordRaw } from 'vue-router'

const configStore = useConfigStore()

function getMenus(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  return routes
    .filter(r => r.meta?.isMenuitem)
    .sort((a, b) => (a.meta?.menuitemOrder as number) - (b.meta?.menuitemOrder as number))
    .map(item => {
      const { children, ...rest } = item
      return {
        ...rest,
        children: children ? getMenus(children) : []
      }
    })
}

const menusList = getMenus(routes)

configStore.setRoutes(routes)
configStore.setMenus(menusList)
</script>

<style lang="scss" scoped>
.layout_menu {
  border-right: none;

  svg {
    color: #0051c3;
  }
}

.el-menu-item {
  svg {
    color: #0051c3;
  }

  &.is-active {
    background-color: #f2f2f2 !important;

    svg {
      color: #0051c3;
    }
  }
}
</style>
