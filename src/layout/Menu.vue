<template>
  <el-menu
    class="layout_menu"
    :collapse="props.isCollapse"
    :collapse-transition="false"
    router
    text-color="#000"
    active-text-color="#000"
    :default-active="activePathStore.currentPath"
  >
    <!-- 菜单项 -->
    <template v-for="item in menusList">
      <!-- 有子菜单时渲染submenu -->
      <template v-if="item.children && item.children.length > 0">
        <el-sub-menu :index="item.path" :key="item.path">
          <template #title>
            <i class="iconfont" :class="item.meta.icon"></i>
            <span>{{ item.meta.title }}</span>
          </template>
          <el-menu-item
            :index="item.path + '/' + subItem.path"
            v-for="subItem in item.children"
            :key="subItem.path"
          >
            <template #title>
              <i class="iconfont" :class="subItem.meta.icon"></i>
              <span>{{ subItem.meta.title }}</span>
            </template>
          </el-menu-item>
        </el-sub-menu>
      </template>
      <!-- 没有子菜单直接作为一级菜单 -->
      <template v-else>
        <el-menu-item :index="item.path" :key="item.path">
          <i class="iconfont" :class="item.meta?.icon"></i>
          <template #title>
            <span>{{ item.meta?.title }}</span>
          </template>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { useActivePathStore } from '../stores/active-path'
import { routes } from '@/router'

const activePathStore = useActivePathStore()

const props = defineProps<{ isCollapse: boolean }>()

const menusList = routes[1].children?.filter(r => !r.hidden)

onBeforeMount(() => {
  activePathStore.update(sessionStorage.getItem('activePath') as string)
})
</script>

<style lang="scss" scoped>
.layout_menu {
  border-right: none;

  i {
    color: #0051c3;
  }
}

.el-menu-item {
  i {
    color: #0051c3;
  }

  &.is-active {
    background-color: #f2f2f2 !important;

    i {
      color: #0051c3;
    }
  }
}
</style>
