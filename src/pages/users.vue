<template>
  <div>
    <custom-breadcrumb :bread-list="breadList"></custom-breadcrumb>

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
            clearable
            v-model="inputVal"
            placeholder="输入用户名进行查询"
            @change="handleSearchChange"
          >
            <template #prefix>
              <el-icon class="el-input__icon"><search /></el-icon> </template
          ></el-input>
        </el-col>
      </el-row>

      <el-table :data="userList" border stripe v-loading="tableLoading">
        <el-table-column type="index" label="#" />
        <el-table-column prop="userName" label="用户名" />

        <el-table-column label="用户头像" width="100">
          <template #default="scope">
            <el-avatar :size="35" :src="scope.row.userAvatar" />
          </template>
        </el-table-column>

        <el-table-column prop="userEmail" label="邮箱" />
        <el-table-column label="用户角色">
          <template #default="scope">
            <el-tag :type="scope.row.userRole === 2 ? 'warning' : ''">
              {{ scope.row.userRole === 2 ? '管理员' : '普通用户' }}
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
            <el-button size="small" :icon="Edit" @click="showEditDialog(scope.row.userId)">
              编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
              :icon="Delete"
              @click="handleDelete(scope.row.userId)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        :total="userTotal"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </custom-card>

    <!-- 添加 -->
    <el-dialog
      :title="userDialog.isAdd ? '添加用户' : '编辑用户信息'"
      v-model="userDialog.show"
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
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userInfo.userName" clearable />
        </el-form-item>
        <el-form-item label="登录密码" prop="userPass" v-if="userDialog.isAdd">
          <el-input v-model="userInfo.userPass" type="password" show-password clearable />
        </el-form-item>
        <el-form-item label="用户邮箱" prop="userEmail">
          <el-input v-model="userInfo.userEmail" type="email" clearable />
        </el-form-item>
        <el-form-item label="用户头像">
          <div :class="userDialog.isAdd ? '' : 'edit_img'">
            <el-image
              v-if="!userDialog.isAdd"
              style="width: 60px; height: 60px"
              :src="userInfo.userAvatar"
            />
            <single-image-upload
              :file="fileList"
              :action="UPLOAD_API_URL"
              @success="uploadSuccess"
              @failed="uploadFailed"
            ></single-image-upload>
          </div>
        </el-form-item>

        <el-form-item label="用户角色">
          <el-select v-model="userInfo.userRole" placeholder="选择角色">
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
import { Search, Refresh, Edit, Delete, Plus } from '@element-plus/icons-vue'
import { type FormInstance } from 'element-plus'
import { findAll, findOne, type IUser } from '@/api/user'
import { timeFormat } from '@/utils'
import { validateName, validatePass, validateEmail } from '@/common/validateRules'
import { vThrottle } from '@/common/directives'

const breadList = [
  {
    path: '/users',
    title: '用户管理'
  }
]

const UPLOAD_API_URL = import.meta.env.VITE_API_UPLOAD_URL

const userTotal = ref(0)
const tableLoading = ref(true)
const userList = ref<IUser[]>([])
const currentPage = ref(1)
const pageSize = ref(5)
const inputVal = ref('')

async function getUsersList() {
  tableLoading.value = true
  const res = await findAll(currentPage.value, pageSize.value, inputVal.value).finally(() => {
    tableLoading.value = false
  })
  userList.value = res.result
  userTotal.value = res.total
}

const userInfoRef = ref<FormInstance>()
const submitLoading = ref(false)

const userDialog = reactive({
  show: false,
  isAdd: false
})

const fileList = ref([])
const userInfo = reactive<Omit<IUser, 'userId'>>({
  userName: '',
  userPass: '',
  userEmail: '',
  userAvatar: '',
  userRole: 1
})

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
  userName: [{ validator: validateName, trigger: 'blur' }],
  userPass: [{ validator: validatePass, trigger: 'blur' }],
  userEmail: [{ validator: validateEmail, trigger: 'blur' }]
})

const formRulesComputed = computed(() => {
  if (userDialog.isAdd) {
    return userFormRules
  }
  return { userName: userFormRules.userName, userEmail: userFormRules.userEmail }
})

function showAddDialog() {
  userDialog.show = true
  userDialog.isAdd = true
}

async function showEditDialog(id: number) {
  userDialog.show = true
  userDialog.isAdd = false
  const res = await findOne(id)
  userInfo.userName = res.userName
  userInfo.userEmail = res.userEmail
  userInfo.userAvatar = res.userAvatar
  userInfo.userRole = res.userRole
}

function userDialogClosed() {
  userDialog.show = false
  userDialog.isAdd = false
  userInfoRef.value?.resetFields()
  fileList.value = []
}

// 添加用户
async function addDashUser() {
  if (!userInfoRef.value) return
  await userInfoRef.value.validate(async valid => {
    if (!valid) return ElMessage.warning('请正确填写表单')
    submitLoading.value = true
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log('添加用户信息：', JSON.parse(JSON.stringify(userInfo)))
      ElMessage.warning('添加用户成功：（仅供演示）')
      submitLoading.value = false
      userDialogClosed()
    }, 1500)
  })
}

// 提交编辑
async function editUser() {
  if (!userInfoRef.value) return
  await userInfoRef.value.validate(async valid => {
    if (!valid) return ElMessage.warning('请正确填写表单')
    submitLoading.value = true
    setTimeout(() => {
      // eslint-disable-next-line no-console
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
  userList.value = userList.value.filter(v => v.userId !== id)
}

// 上传事件
function uploadSuccess(url: string) {
  userInfo.userAvatar = url
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
  align-items: center;
  gap: 10px;
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

<route lang="yaml">
meta:
  title: '用户管理'
  icon: 'i-menu-customer'
  isMenuitem: true
  menuitemOrder: 1
</route>
