import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: () =>
            import ('../layouts/AdminLayout'),
        children: [{
                path: 'home',
                name: 'Home',
                component: () =>
                    import ('../views/Home')
            },
            {
                path: '/password',
                component: () =>
                    import ('../views/PasswordSetting')
            },
            {
                path: '/profile',
                name: 'Profile',
                component: () =>
                    import ('../views/Profile')
            },

        ]
    },
    {
        path: '/path',
        component: () =>
            import ('../layouts/LoginLayout'),
        children: [{
                path: 'login',
                name: 'Login',
                component: () =>
                    import ('../views/LoginForm')
            }, {
                path: 'register',
                component: () =>
                    import ('../views/Register')
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