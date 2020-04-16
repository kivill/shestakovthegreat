<template>
  <div>
    <v-text-field v-model="subsection.name" label="Название категории" />
    <v-btn @click="saveArticle()">Сохранить</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    if (this.$route.name == "EditSubsection" && !!this.subsection) {
    }
  },
  computed: {
    
  }
};
</script>