import Vue from 'vue'
import VueRouter from 'vue-router'
// import Admin from '../views/Admin.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/home',
        name: 'Home',
        component: () =>
            import ('../components/admin/Admin')
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () =>
            import ('../components/admin/Profile')
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../components/auth/Login')
    },
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import ('../components/auth/Register')
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