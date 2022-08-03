import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/auth',
        name: 'auth',
        component: () => import('../views/auth.vue')
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