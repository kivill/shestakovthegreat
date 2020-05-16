<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list flat>
        <v-list-item v-for="item in sections" :key="item.id">
          <v-list-item-content>
            <v-list-item-title>
              <strong>{{item.name}}</strong>
            </v-list-item-title>

            <template v-if="item.subsections.length > 0">
              <v-list-item v-for="(child, childId) in item.subsections" :key="childId" link :to="`/subsection/${child.id}`" color="blue darken-1">
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
      <div v-if="isAdmin">
        <v-btn :to="{path:'/sections'}">Разделы</v-btn>
        <v-btn :to="{path:'/articles'}">Статьи</v-btn>
        <v-btn @click="signOut()">Выход</v-btn>
      </div>
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
</template>

<script>
import { db, auth } from "@/plugins/firebase";
export default {
  name: "App",
  components: {},
  data() {
    return {
      sections: [],
      dialog: false,
      drawer: true
    };
  },
  created() {
    this.$store.dispatch("SET_SECTIONS", this.sections);
    //AUTH Listener
    // auth.onAuthStateChanged(function(user) {
    //     if (user) {
    //       // User is signed in.
    //       console.log("signed in")
    //     } else {
    //       // User is signed out.
    //       console.log("signed out")
    //     }
    // });
  },
  mounted() {
    console.log("STORE.GETTERS.SECTIONS", this.$store.getters.SECTIONS);
  },
  computed: {
    bg() {
      return this.background
        ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-3.jpg"
        : undefined;
    },
    isAdmin() {
      return this.$store.getters.IS_ADMIN;
    }
  },
  methods: {
    signOut() {
      var _this = this;
      auth
        .signOut()
        .then(() => {
          _this.$router.push({ path: "/" });
          _this.$toast.success("Вы вышли");
          _this.$store.dispatch("ADMIN_SIGN_OUT");
        })
        .catch(error => {
          // An error happened.
        });
    },
  },
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
