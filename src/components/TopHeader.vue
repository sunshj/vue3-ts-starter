<template>
  <el-header class="layout_header">
    <div class="left_wrapper">
      <div class="logo_title_wrap">
        <img src="@/assets/logo.svg" />
        <span>{{ configStore.appTitle }}</span>
      </div>
    </div>
    <div class="right_wrapper">
      <el-tooltip
        v-if="!configStore.isMobile && errorLogsStore.logs.length > 0"
        content="查看错误日志"
        effect="dark"
        placement="bottom"
      >
        <error-log />
      </el-tooltip>

      <el-tooltip content="切换夜间模式" effect="dark" placement="bottom">
        <dark-switch @change="darkModeSwitchChange" />
      </el-tooltip>

      <el-tooltip content="前往仓库" effect="dark" placement="bottom">
        <a href="https://github.com/sunshj/vue3-ts-starter" target="_blank">
          <SvgIconGithub class="github_icon" />
        </a>
      </el-tooltip>

      <el-dropdown trigger="click">
        <div class="avatar-wrapper">
          <el-avatar :src="userStore.userInfo.avatar" class="user-avatar" />
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
      <SvgIconBars />
      <span>菜单</span>
    </span>
  </div>
  <el-drawer v-model="sideDrawerVisible" :with-header="false" direction="ltr" size="200px">
    <LayoutMenu :is-collapse="false" />
  </el-drawer>
</template>

<script setup lang="ts">
import { CaretBottom } from '@element-plus/icons-vue'

const router = useRouter()
const configStore = useConfigStore()
const userStore = useUserStore()
const errorLogsStore = useErrorLogsStore()

function darkModeSwitchChange(val: boolean) {
  ElMessage.success(`已${val ? '开启' : '关闭'}暗黑模式`)
}

function linkToUserProfile() {
  router.push('/profile')
}

function logout() {
  userStore.logout()
}

const sideDrawerVisible = ref(false)

onBeforeRouteLeave(() => {
  sideDrawerVisible.value = false
})

onBeforeRouteUpdate(() => {
  sideDrawerVisible.value = false
})
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
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
    gap: 20px;
    align-items: center;
    margin-right: 20px;
  }

  .github_icon {
    width: 24px !important;
    height: 24px !important;
    color: rgb(60 60 60 / 70%);
    fill: currentColor;
    transition: color 0.5s;

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
      cursor: pointer;
      border-radius: 10px;
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
    gap: 8px;
    align-items: center;
    cursor: pointer;
  }
}
</style>
