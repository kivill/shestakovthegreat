import Vue from 'vue';
import Vuex from 'vuex';
import articles from './modules/articles';
import sections from './modules/sections';
import auth from './modules/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    articles,
    sections,
    auth,
  },
});
