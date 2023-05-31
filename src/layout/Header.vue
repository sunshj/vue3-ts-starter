<template>
  <el-header class="layout_header">
    <div class="left_wrapper">
      <div class="logo_title_wrap">
        <img src="@/assets/logo.svg" />
        <span>{{ props.dashTitle }}</span>
      </div>
    </div>
    <div class="right_wrapper">
      <el-tooltip content="查看错误日志" effect="dark" placement="bottom">
        <error-log></error-log>
      </el-tooltip>

      <el-tooltip content="切换夜间模式" effect="dark" placement="bottom">
        <dark-switch @change="darkModeSwitchChange"></dark-switch>
      </el-tooltip>

      <el-tooltip content="前往仓库" effect="dark" placement="bottom">
        <a href="https://github.com/sunshj/vue3-starter" target="_blank">
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
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { CaretBottom } from '@element-plus/icons-vue'
import DarkSwitch from '../components/DarkSwitch.vue'

const router = useRouter()

const props = defineProps({
  dashTitle: {
    type: String,
    required: true
  },
  userAvatar: {
    type: String
  }
})

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
</script>

<style lang="scss" scoped>
.layout_header {
  position: fixed;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  padding-left: 10px;
  border-bottom: 1px solid rgb(217, 217, 217);
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: saturate(50%) blur(8px);

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
</style>
