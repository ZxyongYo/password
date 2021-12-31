<template>
  <div class="container">
    <div class="main">
      <div class="search-wrapper">
        <input class="ipt" type="text" placeholder="搜索 . . .">
        <div class="insert-btn" @click="insert()">新增</div>
      </div>

      <div class="list">
        <div v-for="item in list" :key="item.id" class="item" @click="deleteById(item.id)">
          <a class="title" :href="item.website" target="black">{{ item.title }}</a>
          <div class="account">
            <span class="username">1203123788@qq.com</span>
            <span class="password">***********</span>
          </div>
        </div>
      </div>
      <!-- <button @click="insert()">新增</button>
      <button @click="deleteById('61cc06fd2d0c8950a789c6e2')">删除</button>
      <button @click="update('61cc06fd2d0c8950a789c6e2')">更新</button> -->
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { deleteOne, fetchList, insertOne, updateOne } from '../utils/leancloud'

let list = ref([])

onMounted(() => {
  getList()
})

/** 查询数据 */
const getList = async () => {
  try {
    list.value = await fetchList()
    console.log(list.value)
  } catch (e) {
    alert(e.toString())
  }
}

/** 新增 */
const insert = async () => {
  try {
    await insertOne({
      title: '百度',
      website: 'https://www.baidu.com/',
      account: '账号',
      password: '密码'
    })
    console.log('新增成功')
    getList()
  } catch (e) {
    console.error(e)
  }
}

/** 删除 */
const deleteById = async id => {
  try {
    await deleteOne(id)
    console.log('删除成功')
    getList()
  } catch (e) {
    console.error(e)
  }
}

/** 更新一条 */
const update = async id => {
  try {
    await updateOne({
      id,
      title: '标题111',
      website: '网址111',
      account: '账号111',
      password: '密码111'
    })
    console.log('更新成功')
    getList()
  } catch (e) {
    console.error(e)
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: dimgray;
  overflow: hidden;
  color: #333;
  .main {
    margin: 20px auto;
    padding: 20px;
    max-width: 680px;
    min-height: 45vh;
    border-radius: 5px;
    background-color: #fff;
    .search-wrapper {
      display: flex;
      align-items: center;
      height: 45px;
      .ipt {
        padding: 0 20px;
        width: 84%;
        height: 100%;
        background-color: #eee;
        outline: none;
        border: none;
        border-radius: 45px;
        box-sizing: border-box;
        font-size: 16px;
        &:focus {
          border: 1px solid #ccc;
        }
        &::placeholder {
          color: #999;
        }
      }
      .insert-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 20px;
        width: 80px;
        height: 80%;
        border: 1px solid #999;
        border-radius: 5px;
        color: #333;
        cursor: pointer;
      }
    }
    .list {
      margin-top: 20px;
      .item {
        padding: 15px 10px;
        border-bottom: 1px solid #eee;
        &:last-child{
          border: none;
        }
        .title {
          color: #3090e4;
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }
        .account{
          margin-top: 15px;
          .password{
            margin-left: 20px;
          }
        }
      }
    }
  }
}
@media (max-width: 800px) {
  .container {
    background-color: #fff;
    .main {
      margin: 0 auto;
      min-width: 335px;
      border-radius: 0;
      .search-wrapper {
        height: 40px;
      }
    }
  }
}
</style>
