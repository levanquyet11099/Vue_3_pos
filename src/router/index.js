import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'listorder',
          name: 'listorder',
          component: () => import('../views/home/ListOrder.vue'),
          props: true,
        },
        {
          path: '/shift',
          name: 'shift',
          component: () => import('../views/home/AboutView.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
