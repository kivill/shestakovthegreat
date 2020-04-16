import Vue from 'vue';
import Router from 'vue-router';

import mainPage from '@/views/main.vue';
import articles from '@/views/articles.vue';
import article from '@/views/article.vue';
import sections from '@/views/sections.vue';

Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: mainPage,
    },
    {
      path: '/articles',
      component: articles,
    },
    {
      path: '/articles/create',
      name: 'CreateArticle',
      component: article,
    },
    {
      path: '/articles/edit',
      name: 'EditArticle',
      component: article,
    },
    {
      path: '/sections',
      component: sections
    }
  ],
});

export default router;
