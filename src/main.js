import Vue from 'vue';
import VuePageTransition from 'vue-page-transition';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import '@/plugins/tiptap-vuetify';
import '@mdi/font/css/materialdesignicons.css';
import { firestorePlugin } from 'vuefire'

Vue.config.productionTip = false;


Vue.use(VuePageTransition);
Vue.use(firestorePlugin);



new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
