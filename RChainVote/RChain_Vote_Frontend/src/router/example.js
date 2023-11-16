// Composables
import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'

const routes = [
    {
        path: '/',
        redirect: '/identify',
    },
    {
        path: '/identify',
        component: () => import('@/views/register&login/IdentifyIndex.vue'),
        children: [
            {
                path:'',
                redirect: '/identify/login',
            },
            {
                path: 'login',
                component: () => import('@/views/register&login/Login.vue'),
            },
            {
                path: 'register',
                component: () => import('@/views/register&login/Register.vue'),
            },
        ]
    },
    {
        path: '/index',
        component: () => import('@/views/Index.vue'),
        children: [
            {
                path:'',
                redirect: 'home',
            },
            {
                path: 'home',
                component: Home,
            },
            {
                path: 'Trade',
                component: () => import('@/views/trade/TradeIndex.vue'),
                children: [
                    {
                        path: 'exchange',
                        component: () => import('@/views/trade/Exchange.vue'),
                    },
                    {
                        path: 'REV',
                        component: () => import('@/views/trade/REV.vue'),
                    },
                ]
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router