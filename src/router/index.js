import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import RoomList from '@/views/RoomList.vue'
import RoomDetail from '@/views/RoomDetail.vue'
import Post from '@/views/Post.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/rooms',
    name: 'RoomList',
    component: RoomList
  },
  {
    path: '/room/:id',
    name: 'RoomDetail',
    component: RoomDetail,
    props: true  // This allows passing route params as props
  },
  {
    path: '/post',
    name: 'Post',
    component: Post
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 