<template>
  <ElHeader class="layout_header">
    <div class="left_wrapper">
      <div class="logo_title_wrap">
        <img src="@/assets/logo.svg" />
        <span v-if="!configStore.isCollapse">{{ $t(configStore.appTitleKey) }}</span>
      </div>
      <AutoBreadcrumb
        v-if="configStore.isCollapse && !configStore.isMobile && $route.meta.isMenuitem"
      />
    </div>
    <div class="right_wrapper">
      <ElTooltip
        v-if="!configStore.isMobile && errorLogsStore.logs.length > 0"
        :content="$t('view_error_log')"
        effect="dark"
        placement="bottom"
      >
        <ErrorLog />
      </ElTooltip>

      <ElButton
        v-if="!configStore.isMobile"
        size="small"
        :icon="Refresh"
        @click="refreshToken().finally(refreshToken.reset)"
      >
        Refresh Token
      </ElButton>

      <ElTooltip :content="$t('dark_mode.toggle')" effect="dark" placement="bottom">
        <DarkSwitch @change="darkModeSwitchChange" />
      </ElTooltip>

      <LanguageDropDown />

      <ElTooltip :content="$t('github_repo')" effect="dark" placement="bottom">
        <a href="https://github.com/sunshj/vue3-ts-starter" target="_blank">
          <SvgIconGithub class="github_icon" />
        </a>
      </ElTooltip>

      <ElDropdown trigger="click">
        <div class="avatar-wrapper">
          <ElAvatar :src="userStore.userInfo.avatar" class="user-avatar" />
          <ElIcon><CaretBottom /></ElIcon>
        </div>

        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem @click="linkToUserProfile">{{ $t('user_profile') }}</ElDropdownItem>
          </ElDropdownMenu>
          <ElDropdownMenu>
            <ElDropdownItem @click="logout">{{ $t('auth.logout') }}</ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </div>
  </ElHeader>

  <div v-if="configStore.isMobile" class="mobile">
    <span class="menu" @click="sideDrawerVisible = true">
      <SvgIconBars />
      <span>{{ $t('menus._name') }}</span>
    </span>
  </div>
  <ElDrawer v-model="sideDrawerVisible" :with-header="false" direction="ltr" size="200px">
    <LayoutMenu />
  </ElDrawer>
</template>

<script setup lang="ts">
import { CaretBottom, Refresh } from '@element-plus/icons-vue'

const router = useRouter()
const configStore = useConfigStore()
const userStore = useUserStore()
const errorLogsStore = useErrorLogsStore()
const { t } = useI18n()

function darkModeSwitchChange(val: boolean) {
  ElMessage.success(val ? t('dark_mode.enabled') : t('dark_mode.disabled'))
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
    display: flex;
    gap: 10px;
    align-items: center;

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
