<template>
  <el-header class="layout_header">
    <div class="left_wrapper">
      <div class="logo_title_wrap">
        <img src="@/assets/logo.svg" />
        <span>{{ props.dashTitle }}</span>
      </div>
    </div>
    <div class="right_wrapper">
      <el-tooltip
        v-if="!configStore.isMobile && errorLogsStore.logs.length"
        content="查看错误日志"
        effect="dark"
        placement="bottom"
      >
        <error-log></error-log>
      </el-tooltip>

      <el-tooltip content="切换夜间模式" effect="dark" placement="bottom">
        <dark-switch @change="darkModeSwitchChange"></dark-switch>
      </el-tooltip>

      <el-tooltip content="前往仓库" effect="dark" placement="bottom">
        <a href="https://github.com/sunshj/vue3-ts-starter" target="_blank">
          <font-awesome-icon class="github_icon" icon="fab fa-github" />
        </a>
      </el-tooltip>

      <el-dropdown trigger="click">
        <div class="avatar-wrapper">
          <el-avatar :src="props.userAvatar" class="user-avatar" />
          <el-icon><CaretBottom /></el-icon>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="linkToUserProfile">个人中心</el-dropdown-item>
          </el-dropdown-menu>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>

  <div v-if="configStore.isMobile" class="mobile">
    <span class="menu" @click="sideDrawerVisible = true">
      <font-awesome-icon icon="fas fa-bars"></font-awesome-icon>
      <span>菜单</span>
    </span>
  </div>
  <el-drawer v-model="sideDrawerVisible" :with-header="false" direction="ltr" size="200px">
    <Menu :is-collapse="false"></Menu>
  </el-drawer>
</template>

<script setup lang="ts">
import { CaretBottom } from '@element-plus/icons-vue'
import DarkSwitch from '@/components/DarkSwitch.vue'
import Menu from './Menu.vue'
import { useConfigStore, useErrorLogsStore } from '@/stores'

const router = useRouter()
const configStore = useConfigStore()
const errorLogsStore = useErrorLogsStore()

const props = defineProps<{
  dashTitle: string
  userAvatar: string
}>()

function darkModeSwitchChange(val: boolean) {
  ElMessage.success(`已${val ? '开启' : '关闭'}暗黑模式`)
}

function linkToUserProfile() {
  router.push('/profile')
}

function logout() {
  sessionStorage.clear()
  router.push('/login')
  ElMessage.info('已退出登录')
}

const sideDrawerVisible = ref(false)

onBeforeRouteUpdate(() => {
  sideDrawerVisible.value = false
})
</script>

<style lang="scss" scoped>
@import '../../styles/index.scss';

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.layout_header {
  position: fixed;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: $header-height;
  padding: 0 16px;

  @include backdrop;

  .left_wrapper {
    .logo_title_wrap {
      display: flex;
      align-items: center;

      img {
        width: 40px;
        height: 40px;
      }

      span {
        margin-left: 15px;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }

  .right_wrapper {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-right: 20px;
  }

  .github_icon {
    width: 24px;
    height: 24px;
    color: rgba(60, 60, 60, 0.7);
    transition: color 0.5s;
    fill: currentColor;

    &:hover {
      color: black;
    }
  }

  .avatar-wrapper {
    position: relative;
    margin-top: 5px;

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      cursor: pointer;
    }

    .el-icon {
      position: absolute;
      top: 25px;
      right: -20px;
      font-size: 12px;
      cursor: pointer;
    }
  }
}

.mobile {
  position: absolute;
  top: 60px;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  width: 100vw;
  height: $mobile-menu-height;
  padding: 0 18px;

  @include backdrop;

  .menu {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
}
</style>
@/stores/useErrorLogsStore
