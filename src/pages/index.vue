<template>
  <div>
    <ElRow :gutter="20">
      <ElCol :span="12" :xs="24">
        <CustomCard :title="title">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias unde perspiciatis
            eligendi, debitis esse dolor velit aliquam mollitia vitae magni quos sequi in tempora
            adipisci doloribus accusamus, consequatur animi id?
          </p>
          <ElDivider />
          <ElButton type="success" @click="showMessage('success')">success</ElButton>
          <ElButton type="warning" @click="showMessage('warning')">warning</ElButton>
          <ElButton type="danger" @click="showMessage('error')">error</ElButton>
          <ElButton type="info" @click="showMessage('info')">info</ElButton>
        </CustomCard>
      </ElCol>

      <ElCol :span="12" :xs="24">
        <CustomCard>
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
            <ElDivider />
            <ElButton type="success" @click="showMessage('success')">success</ElButton>
            <ElButton type="warning" @click="showMessage('warning')">warning</ElButton>
            <ElButton type="danger" @click="showMessage('error')">error</ElButton>
            <ElButton type="info" @click="showMessage('info')">info</ElButton>
          </template>
        </CustomCard>
      </ElCol>
    </ElRow>

    <ElRow :gutter="20">
      <ElCol :span="12" :xs="24">
        <CustomCard :title="title" align-mode="center">
          <b>align="center"</b>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias unde perspiciatis
            eligendi, debitis esse dolor velit aliquam mollitia vitae magni quos sequi in tempora
            adipisci doloribus accusamus, consequatur animi id?
          </p>
          <ElDivider />
          <ElButton type="success" @click="showMessage('success')">success</ElButton>
          <ElButton type="warning" @click="showMessage('warning')">warning</ElButton>
          <ElButton type="danger" @click="showMessage('error')">error</ElButton>
          <ElButton type="info" @click="showMessage('info')">info</ElButton>
        </CustomCard>
      </ElCol>

      <ElCol :span="12" :xs="24">
        <CustomCard :title="title" :padding="20" align-mode="center">
          <b>align="center" padding="20px"</b>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias unde perspiciatis
            eligendi, debitis esse dolor velit aliquam mollitia vitae magni quos sequi in tempora
            adipisci doloribus accusamus, consequatur animi id?
          </p>
          <ElDivider />
          <ElButton type="success" @click="showMessage('success')">success</ElButton>
          <ElButton type="warning" @click="showMessage('warning')">warning</ElButton>
          <ElButton type="danger" @click="showMessage('error')">error</ElButton>
          <ElButton type="info" @click="showMessage('info')">info</ElButton>
        </CustomCard>
      </ElCol>
    </ElRow>

    <AutoComplete v-model="suggest" trigger :suggestions="suggestionsList" />
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
