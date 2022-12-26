import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Index.vue'

const router = createRouter({
history: createWebHistory(),
routes: [
{
  path: '/',
  name: 'home',
  component: Home,
},
{
  path: '/users',
  name: 'users',
  component: () => import('../components/Users.vue')
},
{
  path: '/login',
  name: 'login',
  component: () => import('../views/Login.vue')
},
{
  path: '/register',
  name: 'register',
  component: () => import('../views/Register.vue')
},
],

})

export default router
