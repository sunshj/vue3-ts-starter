<template>
  <el-container class="layout_container">
    <!-- header -->
    <Header :dash-title="dashHeader.title" :user-avatar="dashHeader.userAvatarUrl" />
    <!-- main container -->
    <el-container>
      <!-- left aside -->
      <el-aside :width="collapseWidth" class="layout_aside">
        <!-- 导航菜单 -->
        <Menu />
        <!-- 底部控制侧边栏折叠区域 -->
        <div class="toggle_collapse" @click="configStore.toggleCollapse()">
          <SvgIconDoubleArrowRight v-if="configStore.isCollapse" />
          <SvgIconDoubleArrowLeft v-else />
          <span>{{ configStore.isCollapse ? '' : '折叠边栏' }}</span>
        </div>
      </el-aside>
      <!-- main -->
      <el-main class="layout_main" :class="configStore.isMobile ? 'mobile' : ''">
        <router-view v-slot="{ Component, route }">
          <transition name="fade-transform" mode="out-in">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores'

const configStore = useConfigStore()

const dashHeader = reactive({
  title: '这是网站的标题',
  userAvatarUrl:
    'https://kjimg10.360buyimg.com/ott/jfs/t1/158031/24/34052/15691/63c68488F1f6d0939/ceccba0c6a5dacb0.jpg'
})

const collapseWidth = computed(() => {
  return configStore.isCollapse ? '64px' : '200px'
})

// 移动端默认设置
const mobileOptimization = () => {
  dashHeader.title = '短标题'
}

onMounted(() => {
  if (Reflect.has(window, 'ontouchstart')) {
    configStore.setIsMobile(true)
    mobileOptimization()
  } else {
    configStore.setIsMobile(false)
  }
})
</script>

<style lang="scss" scoped>
.layout_container {
  height: 100%;

  .layout_aside {
    position: fixed;
    top: 60px;
    bottom: 0;
    left: 0;
    display: block;
    padding-bottom: 60px;
    overflow-x: hidden;
    background-color: white;
    border-right: 1px solid rgb(217 217 217);

    .toggle_collapse {
      position: absolute;
      bottom: 0;
      z-index: 99;
      display: flex;
      gap: 10px;
      align-items: center;
      width: inherit;
      padding: 18px 0 18px 20px;
      overflow: hidden;
      cursor: pointer;
      background-color: #ffffff;
      border-top: 1px solid rgb(217 217 217);

      &:hover svg {
        transform: scale(1.15);
      }

      svg {
        font-size: 20px;
        color: #0051c3;
        transition: transform 0.15s ease-in-out;
      }

      span {
        font-size: 14px;
        line-height: 20px;
      }
    }
  }

  .layout_main {
    position: absolute;
    inset: 0 0 0 v-bind(collapseWidth);
    padding: 10;
    padding-top: $layout-padding-top;
    overflow-y: auto;
    background-color: #e9edf1;

    &.mobile {
      left: 0;
      padding-top: calc($layout-padding-top + $mobile-menu-height);
      padding-right: 10px;
      padding-left: 10px;
    }
  }
}
</style>
