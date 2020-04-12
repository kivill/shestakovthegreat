import vuetify from './vuetify'
import Vue from 'vue'
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'

const iconsGroup = localStorage.getItem('current_icons_group') || 'mdi'

Vue.use(TiptapVuetifyPlugin, {
  vuetify,  
  iconsGroup
})