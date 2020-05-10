import Vue from 'vue';
import Router from 'vue-router';

import Guard from 'vue-router-multiguard';
import { Middlewares } from "./middlewares";

import mainPage from '@/views/main.vue';
import articles from '@/views/articles.vue';
import article from '@/views/article.vue';
import sections from '@/views/sections.vue';
import login from '@/views/login.vue';
import page404 from '@/views/404.vue';

Vue.use(Router);
const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: mainPage,
        },
        {
            path: '/login',
            component: login,
        },
        {
            path: '/articles',
            component: articles,
            beforeEnter: Guard([
                Middlewares.adminAccess,
            ]),
        },
        {
            path: '/articles/create',
            name: 'CreateArticle',
            component: article,            
            beforeEnter: Guard([
                Middlewares.adminAccess,
                Middlewares.articleIsEmpty,
            ]),
        },
        {
            path: '/articles/edit',
            name: 'EditArticle',
            component: article,         
            beforeEnter: Guard([
                Middlewares.adminAccess,
                Middlewares.articleIsEmpty,
            ]),
        },
        {
            path: '/sections',
            component: sections,         
            beforeEnter: Guard([
                Middlewares.adminAccess,
            ]),
        },
        {
            path: '/404',
            component: page404,  
        },
        {
            path: '*',
            redirect: '/404',
        },
    ],
});

export default router;
