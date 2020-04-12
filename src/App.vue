<template>
  <div id="app">
    <v-app>
      <v-app-bar app color="teal lighten-1">
        <v-toolbar-title>Название сайта</v-toolbar-title>
		
		{{menu}}
      </v-app-bar>
      <v-content >
        <v-container fluid>
          <vue-page-transition name="fade-in-left">
            <router-view />
          </vue-page-transition>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>

import { db } from '@/plugins/firebase'
export default {
	name: "App",
	components: {
	},
	data() {
		return {
			menu: [],
		};
	},
	created() {  

	},
	computed: {

	},
	methods: {

	},
	watch: {
		
	},
	firestore() {
		return {
				menu: db.collection('menu')
			}
		},
};
</script>

<style>
</style>
