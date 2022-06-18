import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        redirect: '/index',
        component: Home,
        children: [{
                path: '/athleteInfo',
                name: 'athleteInfo',
                component: () => import("../views/AthleteManagement/athleteInfo"),
                meta: {keepAlive: true }//判断是否缓存
                    
                
            },
            {
                path: '/applyInfo',
                name: 'applyInfo',
                component: () => import("../views/AthleteManagement/applyInfo"),
                meta: {keepAlive: true }//判断是否缓存
            },
            {
                path: '/sportEvent',
                name: 'sportEvent',
                component: () => import("../views/ProjectManagement/sportEvent"),
                meta: {keepAlive: true }//判断是否缓存
            },
            {
                path: '/announce',
                name: 'announce',
                component: () => import("../views/NoticeManagerment/announce"),
                meta: {keepAlive: true }//判断是否缓存
            },
            {
                path: '/administrator',
                name: 'administrator',
                component: () => import("../views/SystemManagement/administrator"),
                meta: {keepAlive: true }//判断是否缓存
            },
            {
                path: '/apply',
                name: 'apply',
                component: () => import("../views/AthleteRegistration/apply"),
                meta: {keepAlive: true }//判断是否缓存
            },
            {
                path: '/myApply',
                name: 'myApply',
                component: () => import("../views/AthleteRegistration/myApply"),
                meta: {keepAlive: true }//判断是否缓存
            },
            {
                path: '/addScore',
                name: 'addScore',
                component: () => import("../views/ScoreManagement/score.vue"),
                meta: {keepAlive: true }//判断是否缓存
            },
            {
                path: '/browse',
                name: 'browse',
                component: () => import("../views/NotificationAnnouncement/browse"),
                meta: {keepAlive: true }//判断是否缓存
            },
            {
                path: '/myInfo',
                name: 'myInfo',
                component: () => import("../views/InformationAuthentication/myInfo"),
                meta: {keepAlive: true }//判断是否缓存
            },
            {
                path: '/index',
                name: 'index',
                component: () => import("../views/index"),
            },

        ],

    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/login")
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../views/register")
    },
    {
        path: "/forget",
        name: "forget",
        component: () => import("../views/forget")
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router