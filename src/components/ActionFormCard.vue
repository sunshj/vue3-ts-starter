<template>
  <div class="container">
    <div class="card">
      <div class="card_content">
        <header v-if="props.header" class="card_title">
          <div class="title">
            <slot name="title">
              <div>{{ props.title }}</div>
              <p class="subtitle">{{ props.subtitle }}</p>
            </slot>
          </div>
        </header>
        <div class="form_container">
          <slot />
          <slot name="form" />
        </div>
      </div>
      <div class="card_footer">
        <slot name="action" />
        <div v-if="clearable" class="clear_form_popover">
          <el-popover v-model:visible="popoverVisible" placement="top" :width="160" trigger="hover">
            <p>确认清空输入框？</p>
            <div style="margin: 0; text-align: right">
              <el-button size="small" text @click="popoverVisible = false">取消</el-button>
              <el-button type="primary" size="small" @click="resetForm">确定</el-button>
            </div>
            <template #reference>
              <span class="popover_reference">
                <el-icon :size="18"><RefreshLeft /></el-icon>
                <p>清空</p>
              </span>
            </template>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RefreshLeft } from '@element-plus/icons-vue'

interface Props {
  title?: string
  subtitle?: string
  header?: boolean
  clearable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  header: true,
  clearable: true
})

const emit = defineEmits<{
  reset: []
}>()

const popoverVisible = ref(false)

function resetForm() {
  emit('reset')
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #e8eaf2;

  .card {
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    max-width: 450px;
    margin: auto;
    box-shadow: 0 4px 4px #b1bdd4;

    .card_content {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      padding: 24px 20px;
      background: white;
      border-radius: 5px 5px 0 0;

      .card_title {
        margin-bottom: 15px;
        text-align: center;

        .title {
          font-size: 36px;
        }

        .subtitle {
          margin-top: 5px;
          font-size: 14px;
          color: #6c757d;
        }
      }

      .form_container {
        width: 100%;

        :deep(button[type='submit']) {
          width: 100%;
          background-color: #0665d0;

          &:hover {
            background: #0553ab;
          }
        }
      }
    }

    .card_footer {
      display: flex;
      align-items: center;
      height: 50px;
      padding: 16px 24px;
      background: #f8f9fa;
      border-radius: 0 0 5px 5px;

      .clear_form_popover {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        color: #909399;
        cursor: pointer;

        .popover_reference {
          display: flex;
          gap: 2px;
          align-items: center;
          font-size: 14px;
        }
      }
    }
  }
}

@media screen and (width <= 450px) {
  .container {
    .card {
      width: 95%;
      transition: all 0.2s;
      transform: translateY(-15px);
    }
  }
}
</style>
