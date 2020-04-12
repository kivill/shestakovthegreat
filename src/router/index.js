import Vue from 'vue';
import Router from 'vue-router';

import mainPage from '@/views/main.vue';

Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: mainPage,
    },
  ],
});

export default router;
