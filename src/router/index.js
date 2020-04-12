import Vue from 'vue';
import Router from 'vue-router';

import mainPage from '@/views/main.vue';
import article from '@/views/article.vue';

Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: mainPage,
    },
    {
      path: '/article',
      component: article,
    },
  ],
});

export default router;
