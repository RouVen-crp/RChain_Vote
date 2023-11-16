// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/LogandReg',
    component: () => import('@/layouts/default/Default.vue'),
  },
  {
    path: '/LogandReg',
    component: () => import('@/views/LogAndReg.vue'),
  },
  {
    path: '/MainPage',
    component: () => import('@/views/Home.vue'),
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
