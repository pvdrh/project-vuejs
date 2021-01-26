import Vue from 'vue'
import VueRouter from 'vue-router'
// import Admin from '../views/Admin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../components/admin/Admin')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/auth/Login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/auth/Register')
  },
  // {
  //   path: '/forgot-password',
  //   name: 'Forgot',
  //   component: () => import('../components/Buoi5/auth/ForgotPassword')
  // },
  // {
  //   path: '/logout',
  //   redirect: 'login'
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
