<template>
  <div>
    <custom-card :header="false">
      <el-row :gutter="20">
        <el-col :span="16" :xs="12" class="type-group">
          <el-button type="primary" :icon="Plus" @click="showAddDialog()"> 添加用户 </el-button>
          <el-tooltip effect="dark" content="刷新" placement="top">
            <el-button :icon="Refresh" circle @click="getUsersList" />
          </el-tooltip>
        </el-col>
        <el-col :span="8" :xs="12">
          <el-input
            v-model="inputVal"
            clearable
            placeholder="输入用户名进行查询"
            @change="handleSearchChange"
          >
            <template #prefix>
              <el-icon class="el-input__icon"><search /></el-icon> </template
          ></el-input>
        </el-col>
      </el-row>

      <el-table
        v-loading="tableLoading"
        row-key="id"
        :data="userList"
        border
        stripe
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" reserve-selection width="55" />
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="用户名" />

        <el-table-column label="用户头像" width="100">
          <template #default="scope">
            <el-avatar :size="35" :src="scope.row.avatar" />
          </template>
        </el-table-column>

        <el-table-column prop="email" label="邮箱" />
        <el-table-column label="用户角色">
          <template #default="scope">
            <el-tag :type="scope.row.role === 2 ? 'warning' : 'primary'">
              {{ scope.row.role === 2 ? '管理员' : '普通用户' }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="创建时间">
          <template #default="scope">
            <span>{{ timeFormat(scope.row.createdAt) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="更新时间">
          <template #default="scope">
            <span>{{ timeFormat(scope.row.updatedAt) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" :icon="Edit" @click="showEditDialog(scope.row.id)">
              编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
              :icon="Delete"
              @click="handleDelete(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        background
        :page-sizes="[5, 10, 15, 20]"
        :total="userTotal"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </custom-card>

    <!-- 添加/编辑 -->
    <el-dialog
      v-model="userDialog.show"
      :title="userDialog.isAdd ? '添加用户' : '编辑用户信息'"
      center
      draggable
      width="40%"
      @close="userDialogClosed()"
    >
      <!-- 表单 -->
      <el-form
        ref="userInfoRef"
        :model="userInfo"
        :rules="formRulesComputed"
        :validate-on-rule-change="false"
        label-width="80px"
        status-icon
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="userInfo.name" clearable />
        </el-form-item>
        <el-form-item v-if="userDialog.isAdd" label="登录密码" prop="pass">
          <el-input v-model="userInfo.pass" type="password" show-password clearable />
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="userInfo.email" type="email" clearable />
        </el-form-item>
        <el-form-item label="用户头像">
          <div :class="userDialog.isAdd ? '' : 'edit_img'">
            <el-image
              v-if="!userDialog.isAdd"
              style="width: 60px; height: 60px"
              :src="userInfo.avatar"
            />
            <single-image-upload
              :file="fileList"
              :action="UPLOAD_API_URL"
              @success="uploadSuccess"
              @failed="uploadFailed"
            />
          </div>
        </el-form-item>

        <el-form-item label="用户角色">
          <el-select v-model="userInfo.role" placeholder="选择角色">
            <el-option
              v-for="item in userRoleOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="userDialogClosed">取消</el-button>
          <el-button
            v-throttle
            :loading="submitLoading"
            type="primary"
            @click="userDialog.isAdd ? addDashUser() : editUser()"
          >
            提交
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Delete, Edit, Plus, Refresh, Search } from '@element-plus/icons-vue'
import { ApiGetUser, ApiGetUserList, type IUser } from '@/api/user'
import { isEmail, isPassword, isUserName } from '@/common/async-validators'
import { timeFormat } from '@/utils'
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
    if (!valid) return ElMessage.warning('请正确填写表单')
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
    if (!valid) return ElMessage.warning('请正确填写表单')
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
