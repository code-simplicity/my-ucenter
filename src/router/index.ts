import { createRouter, createWebHashHistory } from "vue-router";

// 引入路由分发
import Layout from '@/layout/indev.vue'

const routes: any[] = [
    {
        path: '/',
        component: Layout,
        redirect: "/home",
        meta: {
            title: "首页"
        },
        children: [
            {
                path: "home",
                component: import("@/views/home/index.vue"),
                meta: {
                    title: "首页"
                },
            },
            {
                path: "login",
                component: import("@/views/login/index.vue"),
                meta: {
                    title: "登录"
                },
            },
            {
                path: "register",
                component: import("@/views/register/index.vue"),
                meta: {
                    title: "注册"
                },
            },
            {
                path: "forgot",
                component: import("@/views/forgot/index.vue"),
                meta: {
                    title: "忘记密码"
                },
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router