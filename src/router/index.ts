import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from '../utils/nprogress'
import { checkToken } from "../api/user"
import { changeTitle } from "../utils/title";
import store from "../store";
import { setUserInfo } from "../utils/userInfo"

// 引入路由分发
import Layout from '@/layout/indev.vue'
import constants from "../utils/constants";

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
                component: () => import("@/views/home/index.vue"),
                meta: {
                    title: "首页"
                },
            },
            {
                path: "login",
                component: () => import("@/views/login/index.vue"),
                meta: {
                    title: "登录"
                },
            },
            {
                path: "register",
                component: () => import("@/views/register/index.vue"),
                meta: {
                    title: "注册"
                },
            },
            {
                path: "forgot",
                component: () => import("@/views/forgot/index.vue"),
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

router.beforeEach((to, _from, next) => {
    NProgress.start();
    to.meta.title ? changeTitle(to.meta.title) : ""
    // 除类修改密码的界面，都会去检查是否有登录
    // 检查是否登录成功，通过vux是否存在userInfo
    // 只要路由变化，我们就监听是否登录
    const userInfo = store.getters["user/userInfo"]
    if (userInfo !== null) {
        next()
    } else {
        if (to.path === '/forgot') {
            next('/forgot')
        } else {
            next()
        }
        // store.dispatch("user/chenkLogin");
        console.log(store.dispatch("user/chenkLogin"))
        next()
    }
})

router.afterEach((to, from) => {
    NProgress.done();
})

export default router