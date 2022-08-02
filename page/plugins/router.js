import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect:() => {
            return { path: '/home' }
        },
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/home.vue')
    },
    {
        path: '/setting',
        name: 'setting',
        component: () => import('../views/setting.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router