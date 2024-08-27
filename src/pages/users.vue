<template>
  <div>
    <CustomCard :header="false">
      <ElRow :gutter="20">
        <ElCol :span="16" :xs="12" class="type-group">
          <ElButton type="primary" :icon="Plus" @click="showAddDialog()"> 添加用户 </ElButton>
          <ElTooltip effect="dark" content="刷新" placement="top">
            <ElButton :icon="Refresh" circle @click="getUsersList" />
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
              <ElIcon class="el-input__icon"><Search /></ElIcon> </template
          ></ElInput>
        </ElCol>
      </ElRow>

      <ElTable
        v-loading="tableLoading"
        row-key="id"
        :data="userList"
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
        :page-sizes="[5, 10, 15, 20]"
        :total="userTotal"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </CustomCard>

    <!-- 添加/编辑 -->
    <ElDialog
      v-model="userDialog.show"
      :title="userDialog.isAdd ? '添加用户' : '编辑用户信息'"
      center
      draggable
      width="40%"
      @close="userDialogClosed()"
    >
      <!-- 表单 -->
      <ElForm
        ref="userInfoRef"
        :model="userInfo"
        :rules="formRulesComputed"
        :validate-on-rule-change="false"
        label-width="80px"
        status-icon
      >
        <ElFormItem label="用户名" prop="name">
          <ElInput v-model="userInfo.name" clearable />
        </ElFormItem>
        <ElFormItem v-if="userDialog.isAdd" label="登录密码" prop="pass">
          <ElInput v-model="userInfo.pass" type="password" show-password clearable />
        </ElFormItem>
        <ElFormItem label="用户邮箱" prop="email">
          <ElInput v-model="userInfo.email" type="email" clearable />
        </ElFormItem>
        <ElFormItem label="用户头像">
          <div :class="userDialog.isAdd ? '' : 'edit_img'">
            <ElImage
              v-if="!userDialog.isAdd"
              style="width: 60px; height: 60px"
              :src="userInfo.avatar"
            />
            <SingleImageUpload
              :file="fileList"
              :action="UPLOAD_API_URL"
              @success="uploadSuccess"
              @failed="uploadFailed"
            />
          </div>
        </ElFormItem>

        <ElFormItem label="用户角色">
          <ElSelect v-model="userInfo.role" placeholder="选择角色">
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
          <ElButton
            v-throttle
            :loading="submitLoading"
            type="primary"
            @click="userDialog.isAdd ? addDashUser() : editUser()"
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
import { ApiGetUser, ApiGetUserList, type IUser } from '@/api/user'
import { isEmail, isPassword, isUserName } from '@/common/async-validators'
import type { WithDate } from '@/api/types'
import type { FormInstance } from 'element-plus'

definePage({
  meta: {
    title: '用户管理',
    icon: 'customer',
    isMenuitem: true,
    menuitemOrder: 1
  }
})

const UPLOAD_API_URL = import.meta.env.VITE_API_UPLOAD_URL

const userTotal = ref(0)
const tableLoading = ref(true)
const userList = ref<IUser[]>([])
const currentPage = ref(1)
const pageSize = ref(5)
const inputVal = ref('')

async function getUsersList() {
  tableLoading.value = true
  const res = await ApiGetUserList(currentPage.value, pageSize.value, inputVal.value).finally(
    () => {
      tableLoading.value = false
    }
  )
  userList.value = res.result
  userTotal.value = res.total
}

function handleSelectionChange(selection: IUser[]) {
  console.log('selection:', selection)
}

const userInfoRef = ref<FormInstance>()
const submitLoading = ref(false)

const userDialog = reactive({
  show: false,
  isAdd: false
})

const fileList = ref([])

const initialUserInfo: Omit<IUser, 'id'> = {
  name: '',
  pass: '',
  email: '',
  avatar: '',
  role: 1
}
const userInfo = ref<Omit<WithDate<IUser>, 'id'>>({ ...initialUserInfo })

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

const userFormRules = reactive({
  name: [{ validator: isUserName, trigger: 'blur' }],
  pass: [{ validator: isPassword, trigger: 'blur' }],
  email: [{ validator: isEmail, trigger: 'blur' }]
})

const formRulesComputed = computed(() => {
  if (userDialog.isAdd) {
    return userFormRules
  }
  return { name: userFormRules.name, email: userFormRules.email }
})

function showAddDialog() {
  userDialog.show = true
  userDialog.isAdd = true
}

async function showEditDialog(id: number) {
  userDialog.show = true
  userDialog.isAdd = false
  const res = await ApiGetUser(id)
  userInfo.value = { ...res, pass: '' }
}

function userDialogClosed() {
  userDialog.show = false
  userInfoRef.value?.resetFields()
  userInfo.value = { ...initialUserInfo }
  fileList.value = []
}

// 添加用户
function addDashUser() {
  if (!userInfoRef.value) return
  userInfoRef.value.validate(valid => {
    if (!valid) {
      ElMessage.warning('请正确填写表单')
      return
    }
    submitLoading.value = true
    setTimeout(() => {
      console.log('添加用户信息：', JSON.parse(JSON.stringify(userInfo)))
      ElMessage.warning('添加用户成功：（仅供演示）')
      submitLoading.value = false
      userDialogClosed()
    }, 1500)
  })
}

// 提交编辑
function editUser() {
  if (!userInfoRef.value) return
  userInfoRef.value.validate(valid => {
    if (!valid) {
      ElMessage.warning('请正确填写表单')
      return
    }
    submitLoading.value = true
    setTimeout(() => {
      console.log('更新用户信息：', JSON.parse(JSON.stringify(userInfo)))
      ElMessage.warning('更新用户信息成功：（仅供演示）')
      submitLoading.value = false
      userDialogClosed()
    }, 1500)
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
  userList.value = userList.value.filter(v => v.id !== id)
}

// 上传事件
function uploadSuccess(url: string) {
  userInfo.value.avatar = url
}

function uploadFailed(err: any) {
  ElMessage.error(err.message)
}

// 输入框搜索
function handleSearchChange(val: string) {
  currentPage.value = 1
  inputVal.value = val
  getUsersList()
}

// 页面切换方法
function handleCurrentChange(val: number) {
  currentPage.value = val
  getUsersList()
}

// pageSize
function handleSizeChange(val: number) {
  pageSize.value = val
  getUsersList()
}

onMounted(() => {
  getUsersList()
})
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
