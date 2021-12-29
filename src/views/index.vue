<template>
  <button @click="insertOne()">新增</button>
  <button @click="deleteOne('61cac1f22d0c8950a7893d91')">删除</button>
  <button @click="updateOne('61cac1f22d0c8950a7893d91')">更新</button>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import AV from '../utils/leancloud'

let list = reactive([])

onMounted(() => {
  getList()
})

/** 查询全部 */
const getList = async () => {
  const query = new AV.Query('password')
  const res = await query.find()
  list = res.map(item => ({
      id: item.id,
      createTime: item.createdAt,
      updateTime: item.updatedAt,
      account: item.attributes.account,
      password: item.attributes.password,
      title: item.attributes.title,
      website: item.attributes.website
    })
  )
  console.log(list)
}

/** 新增 */
const insertOne = async () => {
  // 声明 class
  const Container = AV.Object.extend('password')
  // 构建对象
  const pwd = new Container()
  // 为属性赋值
  pwd.set('title', '标题')
  pwd.set('website', '网址')
  pwd.set('account', '账号')
  pwd.set('password', '密码')

  // 将对象保存到云端
  try {
    await pwd.save()
    console.log('新增成功')
  } catch (e) {
    console.log(e)
    alert('新增失败')
  }
}

/** 删除一条 */
const deleteOne = async (id) => {
  const pwd = AV.Object.createWithoutData('password', id)
  try {
    await pwd.destroy()
    console.log('删除成功')
  } catch (e) {
    console.log(e)
  }
}

/** 更新一条 */
const updateOne = async (id) => {
  const pwd = AV.Object.createWithoutData('password', id)
  pwd.set('title', '标题111')
  pwd.set('website', '网址111')
  pwd.set('account', '账号111')
  pwd.set('password', '密码111')
  try {
    await pwd.save()
    console.log('更新成功')
  } catch (e) {
    console.log(e)
  }
}
</script>

<style lang="scss" scoped>
</style>
