<template>
  <div>
    <el-badge
      :is-dot="errorLogsStore.logs.length > 0"
      style="line-height: 25px"
      @click="dialogTableVisible = true"
    >
      <el-button style="padding: 8px 10px" type="danger">
        <font-awesome-icon icon="fas fa-bug"></font-awesome-icon>
      </el-button>
    </el-badge>

    <el-dialog v-model="dialogTableVisible" width="80%" append-to-body>
      <template #header>
        <span style="padding-right: 10px">错误日志</span>
        <el-button type="primary" size="small" :icon="Delete" @click="clearAll">
          清除日志
        </el-button>
      </template>

      <el-table :data="errorLogsStore.logs" border>
        <el-table-column label="Message">
          <template v-slot="{ row }">
            <div>
              <span class="message-title">Msg:</span>
              <el-tag type="danger">
                {{ row.err.message }}
              </el-tag>
            </div>
            <br />
            <div>
              <span class="message-title" style="padding-right: 10px">Info: </span>
              <el-tag type="warning">
                {{ row.instance.$options.name }} error in {{ row.info }}
              </el-tag>
            </div>
            <br />
            <div>
              <span class="message-title" style="padding-right: 16px">Url: </span>
              <el-tag type="success">
                {{ row.url }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Stack">
          <template v-slot="{ row }">
            {{ row.err.stack }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue'
import { useErrorLogsStore } from '@/stores/error-logs'

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
  color: #333;
  font-size: 16px;
  font-weight: bold;
}
</style>
