import Vue from 'vue';
import Vuetify, { VSnackbar, VBtn, VIcon } from 'vuetify/lib'
import ru from 'vuetify/es5/locale/ru';
import en from 'vuetify/es5/locale/en';
import es from 'vuetify/es5/locale/es';
import VuetifyToast from 'vuetify-toast-snackbar'

Vue.use(Vuetify, {
  components: {
    VSnackbar,
    VBtn,
    VIcon
  }
});
Vue.use(VuetifyToast, {
  x: 'right',
  y: 'top',
  color: 'info',
  classes: 'color-white', // default
  timeout: 3000, // default
  dismissable: true, // default
  multiLine: true, // default
  vertical: false, // default
  showClose: true, // default
  closeIcon: 'mdi-close', // default
  slot: [],
  property: '$toast',
})

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
