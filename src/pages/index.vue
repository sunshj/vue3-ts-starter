<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12" :xs="24">
        <custom-card :title="title">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias unde perspiciatis
            eligendi, debitis esse dolor velit aliquam mollitia vitae magni quos sequi in tempora
            adipisci doloribus accusamus, consequatur animi id?
          </p>
          <el-divider />
          <el-button type="success" @click="showMessage('success')">success</el-button>
          <el-button type="warning" @click="showMessage('warning')">warning</el-button>
          <el-button type="danger" @click="showMessage('error')">error</el-button>
          <el-button type="info" @click="showMessage('info')">info</el-button>
        </custom-card>
      </el-col>

      <el-col :span="12" :xs="24">
        <custom-card>
          <!-- 使用具名插槽 -->
          <template #title>
            <p>{{ title }}</p>
          </template>
          <template #content>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias unde perspiciatis
              eligendi, debitis esse dolor velit aliquam mollitia vitae magni quos sequi in tempora
              adipisci doloribus accusamus, consequatur animi id?
            </p>
            <el-divider />
            <el-button type="success" @click="showMessage('success')">success</el-button>
            <el-button type="warning" @click="showMessage('warning')">warning</el-button>
            <el-button type="danger" @click="showMessage('error')">error</el-button>
            <el-button type="info" @click="showMessage('info')">info</el-button>
          </template>
        </custom-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12" :xs="24">
        <custom-card :title="title" align-mode="center">
          <b>align="center"</b>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias unde perspiciatis
            eligendi, debitis esse dolor velit aliquam mollitia vitae magni quos sequi in tempora
            adipisci doloribus accusamus, consequatur animi id?
          </p>
          <el-divider />
          <el-button type="success" @click="showMessage('success')">success</el-button>
          <el-button type="warning" @click="showMessage('warning')">warning</el-button>
          <el-button type="danger" @click="showMessage('error')">error</el-button>
          <el-button type="info" @click="showMessage('info')">info</el-button>
        </custom-card>
      </el-col>

      <el-col :span="12" :xs="24">
        <custom-card :title="title" :padding="20" align-mode="center">
          <b>align="center" padding="20px"</b>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias unde perspiciatis
            eligendi, debitis esse dolor velit aliquam mollitia vitae magni quos sequi in tempora
            adipisci doloribus accusamus, consequatur animi id?
          </p>
          <el-divider />
          <el-button type="success" @click="showMessage('success')">success</el-button>
          <el-button type="warning" @click="showMessage('warning')">warning</el-button>
          <el-button type="danger" @click="showMessage('error')">error</el-button>
          <el-button type="info" @click="showMessage('info')">info</el-button>
        </custom-card>
      </el-col>
    </el-row>

    <auto-complete v-model="suggest" trigger :suggestions="suggestionsList" />
  </div>
</template>

<script setup lang="ts">
definePage({
  meta: {
    title: '首页',
    icon: 'home',
    isMenuitem: true,
    menuitemOrder: 0
  }
})

const title = ref('这是卡片')
const suggest = ref('')
const suggestionsList = [
  { value: 'https://api.sunshj.top/api' },
  { value: 'http://localhost:3000/api' }
]

watchEffect(() => {
  console.log(suggest.value)
})

const showMessage = (value: any) => {
  ElMessage({
    type: value,
    message: value,
    grouping: true
  })
}
</script>
