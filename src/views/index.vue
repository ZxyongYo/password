<template>
  <div class="container">
    <div class="main">
      <div class="search-wrapper">
        <input class="ipt" v-model="searchVal" type="text" placeholder="搜索 . . .">
        <VanButton class="insert-btn" icon="plus" plain type="primary" @click="toInsert()">新增</VanButton>
      </div>

      <div class="list">
        <div v-for="item in list" :key="item.id" class="item">
          <div class="handler">
            <a class="title" :href="item.website" target="_blank">{{ item.title }}</a>
            <div class="handle-btn">
              <Icon class="btn" name="edit" color="#E6A23C" size="20" @click="toEdit(item)" title="编辑" />
              <Icon class="btn" name="delete-o" color="#ee0a24" size="20" @click.stop="deleteById(item.id)" title="删除" />
            </div>
          </div>
          <div class="account">
            <div class="info">
              <span class="username">{{ item.account }}&nbsp;</span>
              <span class="password">
                {{ item.showPwd ? item.password : item.password.replace(/./g, '*') }}
              </span>
            </div>
            <Icon 
              class="pwd-btn" 
              :name="item.showPwd ? 'eye-o' : 'closed-eye'" 
              size="20"
              @click.stop="viewPwd(item)" 
            />
          </div>
        </div>
      </div>

      <Loading style="margin-top: 100px" v-show="isLoading && list.length < 1" vertical>加载中...</Loading>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { deleteOne, fetchList, insertOne, updateOne } from '../utils/leancloud'
import { Button as VanButton, Icon, Loading, Toast, Overlay, Dialog } from 'vant'
import { useRouter } from 'vue-router'
import { showLoading, showSuccess } from './toast'

const router = useRouter()
let originList = []
let list = ref([])
let isLoading = ref(true)
let searchVal = ref('')

/** 搜索 */
watch(searchVal, val => {
  list.value = originList
    .map(item => {
      if (item.title.includes(val)) {
        return item
      }
    })
    .filter(item => item)
})

onMounted(() => {
  getList()
})

/** 查询数据 */
const getList = async () => {
  isLoading.value = true
  try {
    const res = await fetchList()
    list.value = res
    originList = res
    // console.log(list.value)
  } catch (e) {
    alert(e.toString())
  }
  isLoading.value = false
}

/** 去新增 */
const toInsert = async () => {
  router.push({
    path: '/edit'
  })
}

/** 删除 */
const deleteById = async id => {
  await Dialog.confirm({
    title: '提示',
    message: '确认要删除？'
  })

  showLoading('删除中...')
  try {
    await deleteOne(id)
    showSuccess('删除成功')
    getList()
  } catch (e) {
    console.error(e)
  }
}

/** 去编辑 */
const toEdit = item => {
  const { id, title, website, account } = item
  router.push({
    path: '/edit',
    query: { id, title, website, account }
  })
}

/** 查看密码 */
const viewPwd = item => {
  item.showPwd = !item.showPwd
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
        &:last-child {
          border: none;
        }
        .handler {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .title {
            font-size: 18px;
            font-weight: 500;
            color: #3090e4;
            text-decoration: none;
            &:hover {
              text-decoration: underline;
            }
          }
          .handle-btn {
            display: flex;
            .btn{
              display: flex;
              align-items: center;
              justify-content: center;
              margin-left: 10px;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              cursor: pointer;
              &:hover {
                background: #eee;
              }
              &:active {
                background: rgb(232, 232, 232);
              }
            }
          }
        }
        .account {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 10px;
          .password {
            margin-left: 20px;
          }
          .pwd-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            &:hover {
              background: #eee;
            }
            &:active {
              background: rgb(232, 232, 232);
            }
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

      .list {
        .item {
          .account {
            align-items: flex-end;
            .info {
              display: flex;
              flex-direction: column;
              .password {
                margin: 0;
                margin-top: 10px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
