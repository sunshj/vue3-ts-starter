<template>
  <ElMenu
    class="layout_menu"
    :collapse="configStore.isCollapse"
    :collapse-transition="false"
    router
    active-text-color="var(--el-menu-text-color)"
    :default-active="configStore.currentPath"
  >
    <template v-for="item in menusList">
      <template v-if="item.children?.length">
        <ElSubMenu :key="item.path" :index="item.path">
          <template #title>
            <ElIcon :size="20"> <component :is="svgIconsMap.get(item.meta?.icon!)" /></ElIcon>
            <span>{{ $t(item.meta!.title!) }}</span>
          </template>
          <ElMenuItem
            v-for="subItem in item.children"
            :key="subItem.path"
            :index="`${item.path}/${subItem.path}`"
          >
            <template #title>
              <component :is="svgIconsMap.get(subItem.meta?.icon!)" />
              <span>{{ $t(subItem.meta!.title!) }}</span>
            </template>
          </ElMenuItem>
        </ElSubMenu>
      </template>

      <template v-else>
        <ElMenuItem :key="item.path" :index="item.path">
          <component :is="svgIconsMap.get(item.meta?.icon!)" />
          <template #title>
            <span>{{ $t(item.meta!.title!) }}</span>
          </template>
        </ElMenuItem>
      </template>
    </template>
  </ElMenu>
</template>

<script setup lang="ts">
import { svgIconsMap } from 'virtual:icons-helper'
import { routes } from 'vue-router/auto-routes'
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
    background-color: var(--menu-bg-color);

    svg {
      color: #0051c3;
    }
  }
}
</style>
