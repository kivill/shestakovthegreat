<template>
  <v-container>
    Список категорий
    <v-btn @click="createSection()">Добавить новую категорию</v-btn>
    <v-list>
      <!-- Перебор категорий -->
      <v-list-item v-for="section in sections" :key="section.id">
        <v-list-item-content>
          <v-list-item-title v-text="section.name" class="font-weight-black" />

          <!-- Перебор подкатегорий -->
          <v-list-item class="pl-10" v-for="subsection in section.subsections" :key="subsection.id">
            <v-list-item-content>
              <v-list-item-title v-text="subsection.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action class="d-inline">
              <v-btn icon @click="editSubsection(subsection)">
                <v-icon color="grey lighten-1">mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon @click="deleteSubsection(subsection, section)">
                <v-icon color="grey lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-list-item class="pl-10 pb-5">
            <v-btn @click="createSubsection(section)">+Подкатегория</v-btn>
          </v-list-item>
        </v-list-item-content>

        <v-list-item-action class="d-inline">
          <v-btn icon @click="editSection(section)">
            <v-icon color="grey lighten-1">mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="deleteSection(section)">
            <v-icon color="grey lighten-1">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-dialog v-model="overlay" persistent max-width="390">
      <editSection :mode="mode" v-on:exit="overlay=false" />
    </v-dialog>
  </v-container>
</template>

<script>
import editSection from "@/components/editSection";
export default {
  props: [],
  components: { editSection },
  created() {},
  mounted() {},
  data() {
    return {
      mes: "changeSections",
      overlay: false,
      mode: ""
    };
  },
  computed: {
    sections() {
      return this.$store.getters.SECTIONS;
    }
  },
  methods: {
    createSection(e) {
      console.log(e);
      this.mode = "CREATE";
      this.overlay = true;
    },
    editSection(e) {
      console.log(e);
      this.mode = "EDIT";
      this.$store.dispatch("EDIT_SECTION", e);
      this.overlay = true;
    },
    deleteSection(e) {
      console.log(e);
      this.mode = "DELETE";
      this.$store.dispatch("DELETE_SECTION", e);
    },
    createSubsection(e) {
      console.log(e);
      this.mode = "SUBCREATE";
      this.$store.dispatch("EDIT_SECTION", e);
      this.overlay = true;
    },
    editSubsection(e) {
      console.log(e);
      this.overlay = true;
    },
    deleteSubsection(subsection, section) {
      this.mode = "SUBDELETE";
      this.$store.dispatch("DELETE_SUBSECTION", { subsection, section });
    }
  }
};
</script>