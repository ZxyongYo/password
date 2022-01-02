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
    component: () => import('@/views/edit.vue')
  },
  {
    path: '/secret',
    name: 'Secret',
    component: () => import('@/views/secret.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const secret = localStorage.getItem('secret')
  if (to.path === '/') {
    if (secret && +secret + (1000 * 10) > new Date().getTime()) {
      next()
    } else {
      next({path: '/secret'})
    }
  } else {
    next()
  }
})

export default router
