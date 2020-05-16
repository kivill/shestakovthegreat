<template>
  <div class="container">
    <template v-for="(article) of articles">
      <div :key="article.id">
        <v-card color="white" style="margin: 20px auto">
          <v-card-title class="headline">{{article.name}}</v-card-title>
          <v-card-subtitle>{{article.subtitle}}</v-card-subtitle>
          <v-card-actions>
            <v-btn text color="blue darken-1" :to="'/article/'">Читать</v-btn>

            <v-btn v-if="isAdmin" text color="blue darken-1" @click="editArticle(article)">Редактировать</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </template>
  </div>
</template>

<script>
import { db } from "@/plugins/firebase";
export default {
  data() {
    return {};
  },
  created() {
    this.updateData();
  },
  methods: {
    updateData() {
      this.$store.dispatch("GET_SUBSECTION_ARTICLES", this.id);
    },
    editArticle(article) {
      this.$store.dispatch("EDIT_ARTICLE", article);
      this.$router.push({ path: "/articles/edit" });
    }
  },
  computed: {
    isAdmin() {
      return this.$store.getters.IS_ADMIN;
    },
    id() {
      return this.$route.params.id;
    },
    articles() {
      return this.$store.getters.ACTUAL_ARTICLES;
    }
  },
  watch: {
    id() {
      this.updateData();
    }
  },
  firestore() {
    return {};
  }
};
</script>