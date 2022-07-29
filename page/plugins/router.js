import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: to => {
            return { path: '/home' }
        },
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/home.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router