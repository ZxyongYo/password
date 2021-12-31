<template>
  <div class="container">
    <div class="main">
      <div class="search-wrapper">
        <input class="ipt" type="text" placeholder="搜索 . . .">
        <Button class="insert-btn" icon="plus" plain type="primary" @click="insert()">新增</Button>
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

      <Loading style="margin-top: 100px" v-show="isLoading && list.length < 1" vertical>加载中...</Loading>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { deleteOne, fetchList, insertOne, updateOne } from '../utils/leancloud'
import { Button, Icon, Loading, Toast } from 'vant';


let list = ref([])
let isLoading = ref(true)
let isMini = ref(false) // 是否小屏 < 800px

onMounted(() => {
  window.addEventListener('resize', () => {
    isMini.value = document.body.clientWidth < 800
  })
  getList()
})

/** 查询数据 */
const getList = async () => {
  isLoading.value = true
  try {
    list.value = await fetchList()
    console.log(list.value)
  } catch (e) {
    alert(e.toString())
  }
  isLoading.value = false
}

/** 新增 */
const insert = async () => {
  showLoading('新增中...')
  try {
    await insertOne({
      title: '百度',
      website: 'https://www.baidu.com/',
      account: '账号',
      password: '密码'
    })
    showSuccess('新增成功')
    getList()
  } catch (e) {
    console.error(e)
  }
}

/** 删除 */
const deleteById = async id => {
  showLoading('删除中...')
  try {
    await deleteOne(id)
    showSuccess('删除成功')
    getList()
  } catch (e) {
    console.error(e)
  }
}

/** 更新一条 */
const update = async id => {
  showLoading('更新中...')
  try {
    await updateOne({
      id,
      title: '标题111',
      website: '网址111',
      account: '账号111',
      password: '密码111'
    })
    showSuccess('更新成功')
    getList()
  } catch (e) {
    console.error(e)
  }
}

/** toast loading */
const showLoading = (message) => {
  Toast.loading({
    message,
    forbidClick: true,
    position: isMini.value ? 'middle' : 'top'
  })
}
/** toast success */
const showSuccess = (message) => {
  Toast.loading({
    message,
    position: isMini.value ? 'middle' : 'top'
  })
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
        background-color: #f7f8fa;
        outline: none;
        border: none;
        border-radius: 45px;
        box-sizing: border-box;
        font-size: 16px;
        &:focus {
          border: 1px solid #eee;
        }
        &::placeholder {
          color: #999;
        }
      }
      .insert-btn {
        margin-left: 20px;
        width: 95px;
        height: 90%;
        border-radius: 5px;
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
