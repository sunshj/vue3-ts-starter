<template>
  <el-container class="layout_container">
    <!-- header -->
    <Header :dash-title="dashHeader.title" :user-avatar="dashHeader.userAvatarUrl"></Header>
    <!-- main container -->
    <el-container>
      <!-- left aside -->
      <el-aside :width="isCollapse ? '64px' : '200px'" class="layout_aside">
        <!-- 导航菜单 -->
        <Menu :is-collapse="isCollapse"></Menu>
        <!-- 底部控制侧边栏折叠区域 -->
        <div class="toggle_collapse" @click="toggleCollapse">
          <i
            :class="['iconfont', isCollapse ? 'icon-arrow-double-right' : 'icon-arrow-double-left']"
          ></i>
          <span>{{ isCollapse ? '' : '折叠边栏' }}</span>
        </div>
      </el-aside>
      <!-- main -->
      <el-main class="layout_main" :class="isMobileStore.isMobile ? 'mobile' : ''">
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
import { ref, reactive, onBeforeMount, computed, onMounted } from 'vue'
import Header from './Header.vue'
import Menu from './Menu.vue'
import { useIsMobileStore } from '@/stores/is-mobile'

const isMobileStore = useIsMobileStore()

const dashHeader = reactive({
  title: '这是网站的标题',
  userAvatarUrl:
    'https://kjimg10.360buyimg.com/ott/jfs/t1/158031/24/34052/15691/63c68488F1f6d0939/ceccba0c6a5dacb0.jpg'
})

const isCollapse = ref(false)

const collapseWidth = computed(() => {
  return isCollapse.value ? '64px' : '200px'
})

// 切换侧边栏折叠/展开
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
  sessionStorage.setItem('isCollapse', isCollapse.value.toString())
}

// 移动端默认设置
const mobileOptimization = () => {
  dashHeader.title = '短标题'
}

onBeforeMount(() => {
  isCollapse.value = sessionStorage.getItem('isCollapse') === 'true'
})

onMounted(() => {
  if (Reflect.has(window, 'ontouchstart')) {
    isMobileStore.update(true)
    mobileOptimization()
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';

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
    border-right: 1px solid rgb(217, 217, 217);
    background-color: white;

    .toggle_collapse {
      position: absolute;
      bottom: 0;
      z-index: 99;
      display: flex;
      align-items: center;
      width: inherit;
      padding: 4px 0 4px 20px;
      overflow: hidden;
      border-top: 1px solid rgb(217, 217, 217);
      background-color: #fff;
      line-height: 48px;
      cursor: pointer;

      &:hover i {
        transform: scale(1.15);
      }

      i {
        color: #0051c3;
        font-size: 20px;
        transition: transform 0.15s ease-in-out;
      }

      span {
        font-size: 14px;
      }
    }
  }

  .layout_main {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: v-bind(collapseWidth);
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
