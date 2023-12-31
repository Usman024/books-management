import { createRouter, createWebHistory } from 'vue-router'
import DashboardIndex from '@/views/dashboard/index.vue'

import defaultVue from '@/layouts/default.vue'

import Books from '@/views/dashboard/books/index.vue'
import BookDetail from '@/views/dashboard/books/[id].vue'

// import Categories from '@/views/dashboard/categories/index.vue'
// import Categories from '../views/dashboard/categories/index.vue'
import CategoryDetail from '@/views/dashboard/categories/[id].vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard/books' },
    {
      name: 'dashboard',
      component: DashboardIndex,
      path: '/dashboard',
      meta: { layout: defaultVue }
    },
    {
      name: 'books',
      path: '/dashboard/books',
      component: Books,
      meta: { layout: defaultVue }
    },
    {
      name: 'book',
      path: '/dashboard/books/:id',
      component: BookDetail,
      meta: { layout: defaultVue }
    },
    {
      name: 'categories',
      path: '/dashboard/categories',
      component: () => import('@/views/dashboard/categories/index.vue'),
      meta: { layout: defaultVue }
    },
    {
      name: 'category',
      path: '/dashboard/categories/:id',
      component: CategoryDetail,
      meta: { layout: defaultVue }
    }
  ]
})

export default router
