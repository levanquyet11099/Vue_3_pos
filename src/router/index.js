import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/pos/subindex',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'pos/listorder',
          name: 'pos/listorder',
          component: () => import('../views/home/ListOrder.vue'),
          props: true,
        },
        {
          path: 'pos/shift',
          name: 'shift',
          component: () => import('../views/home/AboutView.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/pos/subindex',
    },
  ],
})

export default router
