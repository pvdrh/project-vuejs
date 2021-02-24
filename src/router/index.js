import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../layouts/AdminLayout'),
    children: [
      {
        path: 'home',
        component: () => import('../views/Home')
      },
      {
        path: '/profile',
        component: () => import('../views/UserSetting')
      },
    ]
  },
  {
    path: '/path',
    name: 'Login',
    component: () => import('../layouts/LoginLayout'),
    children: [
      {
        path: 'login',
        component: () => import('../views/LoginForm')
      },
      {
        path: 'forgot-password',
        component: () => import('../views/ForgotPasswordForm')
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
