<template>
  <div class="container">
    <template v-for="(article) of articles">
      <div :key="article.id">
        <v-card color="white" style="margin: 20px 100px; max-width: 700px">
          <v-card-title class="headline">{{article.name}}</v-card-title>
          <v-card-subtitle>{{article.subtitle}}</v-card-subtitle>
          <v-card-actions>
            <v-btn text color="blue darken-1">Читать</v-btn>
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
    updateData: function() {
      this.$store.dispatch("GET_SUBSECTION_ARTICLES", this.id);
    }
  },
  computed: {
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