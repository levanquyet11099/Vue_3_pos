import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import config from '@/config'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: config.BASE_ROUTER,
      name: 'home',
      component: HomeView,
      children: [
        {
          path: config.BASE_ROUTER + '/listorder',
          name: 'pos/listorder',
          component: () => import('../views/home/ListOrder.vue'),
          props: true,
        },
        {
          path: config.BASE_ROUTER + '/shift',
          name: 'shift',
          component: () => import('../views/home/ShiftView.vue'),
        },
        {
          path: config.BASE_ROUTER + '/order',
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
