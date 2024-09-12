<template>
  <div>
    <CustomCard :header="false">
      <ElRow :gutter="20">
        <ElCol :span="16" :xs="12" class="type-group">
          <ElButton type="primary" :icon="Plus" @click="openDialog(true)"> 添加用户 </ElButton>
          <ElTooltip effect="dark" content="刷新" placement="top">
            <ElButton :icon="Refresh" circle @click="refetch" />
          </ElTooltip>
        </ElCol>
        <ElCol :span="8" :xs="12">
          <ElInput
            v-model="inputVal"
            clearable
            placeholder="输入用户名进行查询"
            @change="handleSearchChange"
          >
            <template #prefix>
              <ElIcon><Search /></ElIcon>
            </template>
          </ElInput>
        </ElCol>
      </ElRow>

      <ElTable
        v-loading="isLoading"
        row-key="id"
        :data="tableData"
        border
        stripe
        @selection-change="handleSelectionChange"
      >
        <ElTableColumn type="selection" reserve-selection width="55" />
        <ElTableColumn prop="id" label="ID" />
        <ElTableColumn prop="name" label="用户名" />

        <ElTableColumn label="用户头像" width="100">
          <template #default="scope">
            <ElAvatar :size="35" :src="scope.row.avatar" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="email" label="邮箱" />
        <ElTableColumn label="用户角色">
          <template #default="scope">
            <ElTag :type="scope.row.role === 2 ? 'warning' : 'primary'">
              {{ scope.row.role === 2 ? '管理员' : '普通用户' }}
            </ElTag>
          </template>
        </ElTableColumn>

        <ElTableColumn label="创建时间">
          <template #default="scope">
            <span>{{ timeFormat(scope.row.createdAt) }}</span>
          </template>
        </ElTableColumn>

        <ElTableColumn label="更新时间">
          <template #default="scope">
            <span>{{ timeFormat(scope.row.updatedAt) }}</span>
          </template>
        </ElTableColumn>

        <ElTableColumn label="操作" width="200">
          <template #default="scope">
            <ElButton size="small" :icon="Edit" @click="showEditDialog(scope.row.id)">
              编辑
            </ElButton>
            <ElButton size="small" type="danger" :icon="Delete" @click="handleDelete(scope.row.id)">
              删除
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>

      <ElPagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        background
        :page-sizes="pageSizeOptions"
        :total="totalPages"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      />
    </CustomCard>

    <!-- 添加/编辑 -->
    <ElDialog
      v-model="dialogVisible"
      :title="dialogTitle"
      center
      draggable
      width="40%"
      @close="userDialogClosed()"
    >
      <!-- 表单 -->
      <ElForm
        ref="formRef"
        v-loading="formLoading"
        :model="form"
        :rules="formRules"
        :validate-on-rule-change="false"
        label-width="80px"
        status-icon
      >
        <ElFormItem label="用户名" prop="name">
          <ElInput v-model="form.name" clearable />
        </ElFormItem>
        <ElFormItem v-if="isAddForm" label="登录密码" prop="pass">
          <ElInput v-model="form.pass" type="password" show-password clearable />
        </ElFormItem>
        <ElFormItem label="用户邮箱" prop="email">
          <ElInput v-model="form.email" type="email" clearable />
        </ElFormItem>
        <ElFormItem label="用户头像">
          <div :class="isAddForm ? '' : 'edit_img'">
            <ElImage v-if="!isAddForm" style="width: 60px; height: 60px" :src="form.avatar" />
            <SingleImageUpload
              :file="fileList"
              :action="UPLOAD_API_URL"
              @success="uploadSuccess"
              @failed="uploadFailed"
            />
          </div>
        </ElFormItem>

        <ElFormItem label="用户角色" prop="role">
          <ElSelect v-model="form.role" placeholder="选择角色">
            <ElOption
              v-for="item in userRoleOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </ElFormItem>
      </ElForm>

      <template #footer>
        <span class="dialog-footer">
          <ElButton @click="userDialogClosed">取消</ElButton>
          <ElButton type="danger" @click="resetForm()">重置</ElButton>
          <ElButton
            v-throttle
            :loading="isSubmitting"
            type="primary"
            @click="isAddForm ? addDashUser() : editUser()"
          >
            提交
          </ElButton>
        </span>
      </template>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import { Delete, Edit, Plus, Refresh, Search } from '@element-plus/icons-vue'
import { objectOmit } from '@vueuse/core'
import { ApiGetUser, ApiGetUserList, type IUser } from '@/api/user'
import type { WithDate } from '@/api/types'

definePage({
  meta: {
    title: '用户管理',
    icon: 'customer',
    isMenuitem: true,
    menuitemOrder: 1
  }
})

const UPLOAD_API_URL = import.meta.env.VITE_API_UPLOAD_URL

const inputVal = ref('')

const {
  tableData,
  isLoading,
  totalPages,
  pageSize,
  currentPage,
  pageSizeOptions,
  onCurrentChange,
  onSizeChange,
  refetch
} = useTable({
  async fetchData() {
    const res = await ApiGetUserList(currentPage.value, pageSize.value, inputVal.value)
    totalPages.value = res.total
    return res.result
  }
})

// 输入框搜索
function handleSearchChange(val: string) {
  currentPage.value = 1
  inputVal.value = val
  refetch()
}

function handleSelectionChange(selection: IUser[]) {
  console.log('selection:', selection)
}

const fileList = ref([])

const {
  form,
  formRef,
  formRules,
  isSubmitting,
  submitForm,
  resetForm,
  isAddForm,
  openDialog,
  dialogTitle,
  dialogVisible,
  onDialogClose
} = useForm<WithDate<IUser>>(
  {
    id: 0,
    name: '',
    pass: '',
    email: '',
    avatar: '',
    role: 1,
    createdAt: undefined,
    updatedAt: undefined
  },
  {
    rules: {
      name: [{ validator: isUserName, trigger: 'blur' }],
      pass: [{ validator: isPassword, trigger: 'blur' }],
      email: [{ validator: isEmail, trigger: 'blur' }]
    },
    dialogFormTitles: ['编辑用户信息', '添加用户']
  }
)

const userRoleOption = [
  {
    label: '普通用户',
    value: 1
  },
  {
    label: '管理员',
    value: 2
  }
]

const formLoading = ref(false)

async function showEditDialog(id: number) {
  openDialog(false)
  formLoading.value = true
  const res = await ApiGetUser(id).finally(() => {
    formLoading.value = false
  })
  form.value = { ...res, pass: '' }
}

function userDialogClosed() {
  fileList.value = []
  onDialogClose()
}

// 添加用户
function addDashUser() {
  submitForm(async values => {
    await delay(1500)
    const info = objectOmit(values, ['id', 'createdAt', 'updatedAt'])
    console.log('添加用户信息：', info)
    ElMessage.warning('添加用户成功：（仅供演示）')
    userDialogClosed()
  })
}

// 提交编辑
function editUser() {
  submitForm(async values => {
    await delay(1500)
    const { id, ...info } = objectOmit(values, ['pass', 'createdAt', 'updatedAt'])
    console.log('更新用户信息：', id, info)
    ElMessage.warning('更新用户信息成功：（仅供演示）')
    userDialogClosed()
  })
}

// 删除用户
async function handleDelete(id: number) {
  const action = await ElMessageBox.confirm('此操作将删除该条记录，是否继续？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).catch(() => ElMessage.info('已取消删除'))
  if (action !== 'confirm') return false
  ElMessage.warning(`删除用户成功：${id}（仅供演示）`)
  tableData.value = tableData.value.filter(v => v.id !== id)
}

// 上传事件
function uploadSuccess(url: string) {
  form.value.avatar = url
}

function uploadFailed(err: any) {
  ElMessage.error(err.message)
}
</script>

<style lang="scss" scoped>
.type-group {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
}

.el-pagination {
  margin-top: 10px;
}

.edit_img {
  display: flex;
  flex-direction: row-reverse;
  align-items: stretch;
  justify-content: space-between;
  width: 100%;
}
</style>
