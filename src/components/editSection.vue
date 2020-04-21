<template>
  <v-card>
    <v-card-title class="headline">{{message()}}</v-card-title>
    <v-card-text>
      <v-text-field v-model="section.name" label="Название" />
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="red" text @click="exit()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-btn
        color="green"
        class="white--text"
        :disabled="section.name == ''"
        @click="saveArticle()"
      >
        <v-icon>mdi-check</v-icon>
      </v-btn>
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
      if (this.mode == "SUBCREATE") {
        return this.$store.getters.CURRENT_SUBSECTION;
      }
      return this.$store.getters.CURRENT_SECTION;
    }
  },
  methods: {
    message() {
      return (
        (this.mode.includes("CREATE") ? "Создание " : "Редактирование ") +
        (this.mode.includes("SUB") ? "под" : "") +
        "категории"
      );
    },
    saveArticle() {
      if (this.mode == "CREATE") {
        this.$store.dispatch("SAVE_SECTION");
      }
      if (this.mode == "EDIT") {
        this.$store.dispatch("UPDATE_SECTION");
      }
      if (this.mode == "SUBCREATE") {
        this.$store.dispatch("SAVE_SUBSECTION");
      }
      this.exit();
    },
    exit() {
      //this.$store.dispatch('SET_DEFAULT')
      this.$emit("exit");
    }
  }
};
</script>