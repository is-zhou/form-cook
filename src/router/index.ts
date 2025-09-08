import { createRouter, createWebHistory } from 'vue-router'
import cook from '@/views/cook/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: cook,
    },
  ],
})

export default router
