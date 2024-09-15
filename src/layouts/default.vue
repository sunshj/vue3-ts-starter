<template>
  <ElContainer class="layout_container">
    <TopHeader />
    <ElContainer>
      <ElAside :width="collapseWidth" class="layout_aside">
        <LayoutMenu />
        <div class="toggle_collapse" @click="configStore.toggleCollapse()">
          <SvgIconDoubleArrowRight v-if="configStore.isCollapse" />
          <SvgIconDoubleArrowLeft v-else />
          <span>{{ configStore.isCollapse ? '' : '折叠边栏' }}</span>
        </div>
      </ElAside>
      <ElMain class="layout_main" :class="configStore.isMobile ? 'mobile' : ''">
        <RouterView v-slot="{ Component, route }">
          <Transition name="fade-transform" mode="out-in">
            <component :is="Component" :key="route.path" />
          </Transition>
        </RouterView>
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<script setup lang="ts">
const configStore = useConfigStore()

const collapseWidth = computed(() => {
  return configStore.isCollapse ? '64px' : '200px'
})

onMounted(() => {
  if (Reflect.has(window, 'ontouchstart')) {
    configStore.setIsMobile(true)
    configStore.setAppTitleKey('short_title')
    configStore.setIsCollapse(false)
  } else {
    configStore.setIsMobile(false)
    configStore.setAppTitleKey('title')
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
    border-right: 1px solid var(--menu-border-color);

    .toggle_collapse {
      position: fixed;
      bottom: 0;
      z-index: 99;
      display: flex;
      gap: 10px;
      align-items: center;
      width: inherit;
      padding: 18px 0 18px 20px;
      overflow: hidden;
      cursor: pointer;
      border-top: 1px solid var(--menu-border-color);

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
    background-color: var(--layout-bg-color);

    &.mobile {
      left: 0;
      padding-top: calc($layout-padding-top + $mobile-menu-height);
      padding-right: 10px;
      padding-left: 10px;
    }
  }
}
</style>
