import { ToastProgrammatic as Toast } from 'buefy';

const Toaster = {};

Toaster.install = (Vue) => {
  Vue.prototype.$toaster = {
    success(message, duration = 3000, position = 'is-bottom') {
      Toast.open({
        duration,
        message,
        position,
        type: 'is-success',
      });
    },
    error(message, duration = 3000, position = 'is-bottom') {
      Toast.open({
        duration,
        message,
        position,
        type: 'is-danger',
      });
    },
  };
};

export default Toaster;
