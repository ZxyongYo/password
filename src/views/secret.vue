<template>
  <div class="container">
    <div class="wrapper">
      <div 
        :style="{background: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})` }" 
        v-for="item in s" 
        :key="item"
        @click="handleClick(item)"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"

const router = useRouter()
let s = '123456789*0#'
let secret = ''

const handleClick = (i) => {
  if (i === '*') { 
    secret = ''
    return
   }
  const h = new Date().getHours()
  const m = new Date().getMinutes()
  if (i === '#' && secret === '120305' + h + m) {
    setStorage()
    secret = ''
    router.push({path: '/'})
    return
  }
  secret += i
}

const setStorage = () => {
  localStorage.setItem('secret', new Date().getTime())
}
</script>

<style lang="scss" scoped>
.container{
  background-color: dimgray;
  height: 100vh;
  overflow: hidden;
  .wrapper{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: 0 auto;
    max-width: 680px;
    height: 100%;
    box-sizing: border-box;
  }
}
</style>
