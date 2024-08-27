<template>
  <div>
    <ElBadge
      :is-dot="errorLogsStore.logs.length > 0"
      style="line-height: 25px"
      @click="dialogTableVisible = true"
    >
      <ElButton style="padding: 8px 10px" type="danger">
        <SvgIconBug />
      </ElButton>
    </ElBadge>

    <ElDialog v-model="dialogTableVisible" width="80%" append-to-body>
      <template #header>
        <span style="padding-right: 10px">错误日志</span>
        <ElButton type="primary" size="small" :icon="Delete" @click="clearAll"> 清除日志 </ElButton>
      </template>

      <ElTable :data="errorLogsStore.logs" border>
        <ElTableColumn label="Message">
          <template #default="{ row }">
            <div>
              <span class="message-title">Msg:</span>
              <ElTag type="danger">
                {{ row.err.message }}
              </ElTag>
            </div>
            <br />
            <div>
              <span class="message-title" style="padding-right: 10px">Info: </span>
              <ElTag type="warning">
                {{ row.instance.$options.name }} error in {{ row.info }}
              </ElTag>
            </div>
            <br />
            <div>
              <span class="message-title" style="padding-right: 16px">Url: </span>
              <ElTag type="success">
                {{ row.url }}
              </ElTag>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="Stack">
          <template #default="{ row }">
            {{ row.err.stack }}
          </template>
        </ElTableColumn>
      </ElTable>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue'

const errorLogsStore = useErrorLogsStore()

const dialogTableVisible = ref(false)

function clearAll() {
  dialogTableVisible.value = false
  errorLogsStore.clear()
}
</script>

<style lang="scss" scoped>
.message-title {
  padding-right: 8px;
  font-size: 16px;
  font-weight: bold;
  color: #333333;
}
</style>
