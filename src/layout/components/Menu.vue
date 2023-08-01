<template>
  <el-menu
    class="layout_menu"
    :collapse="props.isCollapse"
    :collapse-transition="false"
    router
    text-color="#000"
    active-text-color="#000"
    :default-active="configStore.currentPath"
  >
    <!-- 菜单项 -->
    <template v-for="item in menusList">
      <!-- 有子菜单时渲染submenu -->
      <template v-if="item.children && item.children.length > 0">
        <el-sub-menu :index="item.path" :key="item.path">
          <template #title>
            <el-icon :size="24">
              <component :is="svgIconsMap.get(item.meta?.icon)"></component
            ></el-icon>
            <span>{{ item.meta?.title }}</span>
          </template>
          <el-menu-item
            :index="item.path + '/' + subItem.path"
            v-for="subItem in item.children"
            :key="subItem.path"
          >
            <template #title>
              <component :is="svgIconsMap.get(subItem.meta?.icon)"></component>
              <span>{{ subItem.meta?.title }}</span>
            </template>
          </el-menu-item>
        </el-sub-menu>
      </template>
      <!-- 没有子菜单直接作为一级菜单 -->
      <template v-else>
        <el-menu-item :index="item.path" :key="item.path">
          <component :is="svgIconsMap.get(item.meta?.icon)"></component>
          <template #title>
            <span>{{ item.meta?.title }}</span>
          </template>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores'
import { routes } from '@/router'
import { svgIconsMap } from '@/common/svgIcons'

const configStore = useConfigStore()

const props = defineProps<{ isCollapse: boolean }>()

const menusList = routes[0].children?.filter(r => !r.meta?.hidden)

onBeforeMount(() => {
  configStore.setCurrentPath(sessionStorage.getItem('activePath') as string)
})
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
@/assets/icons/svgIconsMap @/common/svgIconsMap
