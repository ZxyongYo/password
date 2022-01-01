<template>
  <div class="container">
    <div class="form">
      <Form label-width="45" @submit="onSubmit">
        <Field
          v-model="formData.title"
          label="标题"
          name="title"
          placeholder="标题"
          :rules="[{ required: !isEdit, message: '请填写标题' }]"
        />
        <Field
          v-model="formData.website"
          label="网址"
          name="website"
          placeholder="网址"
          :rules="[{ required: !isEdit, message: '请填写网址' }]"
        />
        <Field
          v-model="formData.account"
          label="账号"
          name="account"
          placeholder="账号"
          :rules="[{ required: !isEdit, message: '请填写账号' }]"
        />
        <Field
          v-model="formData.password"
          type="password"
          label="密码"
          name="password"
          placeholder="密码"
          :rules="[{ required: !isEdit, message: '请填写密码' }]"
        />
        <div class="btn">
          <Button style="width: 100%" round plain type="primary" native-type="submit">提交</Button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Form, Field, Button, Toast} from 'vant'
import { useRoute, useRouter } from 'vue-router'
import { insertOne, updateOne } from '../utils/leancloud'

const router = useRouter()
const formData = ref({
  title: '',
  website: '',
  account: '',
  password: ''
})
let isEdit = ref(true) // 是否编辑

onMounted(() => {
  const route = useRoute()
  const params = route.query
  if(params.id) {
    formData.value = params
    isEdit.value = true
  } else {
    isEdit.value = false
  }
})

/** 提交 */
const onSubmit = () => {
  const {id, title, website, account, password } = formData.value
  if (isEdit.value) {
    const params = {id}
    if(title) { params.title = title }
    if(website) { params.website = website }
    if(account) { params.account = account }
    if(password) { params.password = password }
    update(params)
  } else {
    insert({title, website, account, password})
  }
}

/** 编辑 */
const update = async (data) => {
  showLoading('更新中...')
  try {
    await updateOne(data)
    showSuccess('更新成功')
    back()
  } catch (e) {
    console.error(e)
  }
}

/** 新增 */
const insert = async (data) => {
  showLoading('新增中...')
  try {
    await insertOne(data)
    showSuccess('新增成功')
    back()
  } catch (e) {
    console.error(e)
  }
}

/** 返回 */
const back = () => {
  setTimeout(() => {
    router.push({ path: '/' })
  }, 1500);
}

/** toast loading */
const showLoading = (message) => {
  Toast.loading({
    message,
    forbidClick: true,
    position: 'top'
  })
}
/** toast success */
const showSuccess = (message) => {
  Toast.success({
    message,
    position: 'top'
  })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: dimgray;
  overflow: hidden;
  color: #333;
  .form{
    margin: 20px auto;
    padding: 20px;
    max-width: 680px;
    border-radius: 5px;
    background-color: #fff;
    .btn{
      margin: 10px auto;
      margin-top: 30px;
      width: 95%;
    }
  }
}

@media (max-width: 800px) {
  .container{
    background-color: #fff;
    .form{
      margin: 0;
      margin-top: 20px;
      padding: 0;
      min-width: 335px;
      border-radius: 0;
    }
  }
}
</style>
