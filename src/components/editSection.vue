<template>
  <v-card>
    <v-card-title class="headline">Изменение категории</v-card-title>
    <v-card-text>
      <v-text-field v-model="section.name" label="Название" />
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" text @click="exit()">Отмена</v-btn>
      <v-btn color="green darken-1" text @click="saveArticle()">Сохранить</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["mode"],
  data() {
    return {};
  },
  created() {
    console.log("cS:", this.section);
  },
  computed: {
    section() {
      return this.$store.getters.CURRENT_SECTION;
    }
  },
  methods: {
    saveArticle() {
      if (this.mode == "CREATE") {
        this.$store.dispatch("SAVE_SECTION");
      }
      if (this.mode == "EDIT") {
        this.$store.dispatch("UPDATE_SECTION");
      }
      this.exit()
    },
    exit(){
      this.$emit('exit')
    }
  }
};
</script>