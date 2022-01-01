import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/views/index.vue' 

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/edit',
    name: 'Edit',
    component: () => import('@//views/edit.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
