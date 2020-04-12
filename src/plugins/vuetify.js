import Vue from 'vue';
import Vuetify from 'vuetify/lib'
import 'vuetify/dist/vuetify.min.css'
import ru from 'vuetify/es5/locale/ru';
import en from 'vuetify/es5/locale/en';
import es from 'vuetify/es5/locale/es';
import VuetifyToast from 'vuetify-toast-snackbar'

Vue.use(Vuetify);


export default new Vuetify({
  lang: {
    locales: { ru, en, es },
    current: 'ru',
  },
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#009688',
        secondary: '#009688',
        anchor: '#2196F3',
      },
    },
  },
});
