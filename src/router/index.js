import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Login from '@/components/Login.vue'
import RoomList from '@/pages/RoomList.vue'
import RoomDetail from '@/pages/RoomDetail.vue'
import Post from '@/pages/Post.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import DashboardOverview from '@/pages/dashboard/DashboardOverview.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/Login.vue')
  },
  {
    path: '/rooms',
    name: 'RoomList',
    component: () => import('@/pages/RoomList.vue')
  },
  {
    path: '/room/:id',
    name: 'RoomDetail',
    component: () => import('@/pages/RoomDetail.vue'),
    props: true
  },
  {
    path: '/post',
    name: 'Post',
    component: () => import('@/pages/Post.vue')
  },
  // Dashboard routes
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'DashboardOverview',
        component: () => import('@/pages/dashboard/DashboardOverview.vue')
      },
      {
        path: 'post',
        name: 'PostRoom',
        component: () => import('@/pages/dashboard/PostRoom.vue')
      },
      {
        path: 'rooms',
        name: 'RoomManagement',
        component: () => import('@/pages/dashboard/RoomManagement.vue')
      },
      {
        path: 'analytics',
        name: 'Analytics',
        component: () => import('@/pages/dashboard/Analytics.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 
