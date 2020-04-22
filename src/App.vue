<template>
<div id="app">
  <head>
    <link
      href="https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css"
      rel="stylesheet"
    />
  </head>
  <v-app>
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list flat>
        <v-list-item v-for="item in sections" :key="item.id">
          <v-list-item-content>
            <v-list-item-title>
              <strong>{{item.name}}</strong>
            </v-list-item-title>

            <template v-if="item.subsections.length > 0">
              <v-list-item v-for="(child, childId) in item.subsections" :key="childId" link>
                <v-list-item-content>
                  <v-list-item-title>{{child.name}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="gray darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="pl-3">
        <span class="hidden-sm-and-down">Shestakov the great</span>
      </v-toolbar-title>

      <v-spacer />
      <v-btn @click="$router.push({path:'/sections'})">Разделы</v-btn>
      <v-btn @click="$router.push({path:'/articles'})">Статьи</v-btn>
      <!-- <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" item>
          <v-img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify" />
        </v-avatar>
      </v-btn>-->
    </v-app-bar>

    <v-content>
      <v-container>
        <vue-page-transition name="fade-in-left">
          <router-view />
        </vue-page-transition>
      </v-container>
    </v-content>
  </v-app>
</div>
</template>

<script>
import { db } from "@/plugins/firebase";
export default {
  name: "App",
  components: {},
  data() {
    return {
      sections: [],
      dialog: false,
      drawer: true,
      items: [
        { icon: "mdi-contacts", name: "Contacts" },
        { icon: "mdi-history", name: "Frequently contacted" },
        { icon: "mdi-content-copy", name: "Duplicates" },
        {
          icon: "mdi-chevron-up",
          "icon-alt": "mdi-chevron-down",
          text: "Labels",
          model: false,
          subsections: [{ icon: "mdi-plus", name: "Create label" }]
        },
        {
          icon: "mdi-chevron-up",
          "icon-alt": "mdi-chevron-down",
          text: "More",
          model: false,
          subsections: [
            { name: "Import" },
            { name: "Export" },
            { name: "Print" },
            { name: "Undo changes" },
            { name: "Other contacts" }
          ]
        },
        { icon: "mdi-settings", name: "Settings" },
        { icon: "mdi-message", name: "Send feedback" },
        { icon: "mdi-help-circle", name: "Help" },
        { icon: "mdi-cellphone-link", name: "App downloads" },
        { icon: "mdi-keyboard", name: "Go to the old version" }
      ]
    };
  },
  created() {
    this.$store.dispatch("SET_SECTIONS", this.sections);
  },
  mounted() {
    console.log("STORE.GETTERS.SECTIONS", this.$store.getters.SECTIONS);
  },
  computed: {
    bg() {
      return this.background
        ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-3.jpg"
        : undefined;
    }
  },
  methods: {},
  watch: {},
  firestore() {
    return { sections: db.collection("sections") };
  }
};
</script>

<style>
.iconSection {
  font-weight: bold;
  justify-content: center;
}
</style>
