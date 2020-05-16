<template>
  <div class="container">
    {{articles}}
  </div>
</template>

<script>
import { db } from "@/plugins/firebase";
export default {
  data() {
    return {
    };
  },
  methods: {
  },
  computed: {
    id(){
      let id = this.$route.params.id
      this.$store.dispatch('GET_SUBSECTION_ARTICLES',id)
      return id
    },
    articles(){
      return this.$store.getters.ACTUAL_ARTICLES
    }
  },
  firestore() {
    return {};
  }
};
</script>