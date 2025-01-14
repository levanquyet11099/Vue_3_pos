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
          path: '/pos/subindex/listorder',
          name: 'pos/listorder',
          component: () => import('../views/home/ListOrder.vue'),
          props: true,
        },
        {
          path: '/pos/subindex/shift',
          name: 'shift',
          component: () => import('../views/home/ShiftView.vue'),
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
