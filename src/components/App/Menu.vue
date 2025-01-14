<template>
  <ElMenu
    class="layout_menu"
    :collapse="configStore.isCollapse"
    :collapse-transition="false"
    active-text-color="var(--el-menu-text-color)"
    :default-active="configStore.currentPath"
  >
    <template v-for="item in menusList">
      <template v-if="!item.children?.length">
        <ElMenuItem :key="item.path" :index="item.path">
          <component :is="svgIconsMap.get(item.meta?.icon!)" />
          <template #title>
            <AppLink :to="item.path" prefetch prefetch-on="interaction">
              <span>{{ item.meta?.title }}</span>
            </AppLink>
          </template>
        </ElMenuItem>
      </template>

      <template v-else>
        <ElSubMenu :key="item.path" :index="item.path">
          <template #title>
            <ElIcon :size="20"> <component :is="svgIconsMap.get(item.meta?.icon!)" /></ElIcon>
            <span>{{ item.meta?.title }}</span>
          </template>
          <ElMenuItem
            v-for="subItem in item.children"
            :key="subItem.path"
            :index="`${item.path}/${subItem.path}`"
          >
            <template #title>
              <AppLink :to="`${item.path}/${subItem.path}`" prefetch prefetch-on="interaction">
                <component :is="svgIconsMap.get(subItem.meta?.icon!)" />
                <span>{{ subItem.meta?.title }}</span>
              </AppLink>
            </template>
          </ElMenuItem>
        </ElSubMenu>
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
  .app-link {
    display: flex;
    gap: 6px;
    align-items: center;
  }

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
