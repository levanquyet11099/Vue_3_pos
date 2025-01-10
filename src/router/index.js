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
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/home/AboutView.vue'),
        },
      ],
    },

    // {
    //   path: '/listorder',
    //   name: 'listorder',
    //   component: () => import('../views/home/ListOrder.vue'),
    // },
  ],
})

export default router
