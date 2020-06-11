<template>
  <v-container>
    <v-btn @click="createSection()" left>
      <v-icon color="green lighten-1">mdi-plus-circle</v-icon>Раздел
    </v-btn>
    <v-divider style="margin:20px"></v-divider>
    <v-treeview :items="sections" open-all item-children="subsections" transition hoverable>
      <template v-slot:append="{item}">
        <template v-if="(typeof item) == 'object'">
          <v-btn icon @click="editSection(item)">
            <v-icon color="blue lighten-1">mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="createSubsection(item)">
            <v-icon color="green lighten-1">mdi-plus-circle</v-icon>
          </v-btn>
          <v-btn icon @click="deleteSectionDialog(item)">
            <v-icon color="red lighten-1">mdi-minus-circle</v-icon>
          </v-btn>
        </template>
      </template>
    </v-treeview>

    <v-dialog v-model="overlay" persistent max-width="390">
      <editSection :mode="mode" v-on:exit="exit" />
    </v-dialog>

    <v-dialog v-model="deldialog" max-width="290">
      <v-card>
        <v-card-title class="headline">{{this.$store.getters.CURRENT_SECTION.name}}</v-card-title>
        <v-card-text>Вы действительно хотите удалить раздел?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="deldialog = false">Отмена</v-btn>
          <v-btn color="red darken-1" text @click="deleteSection(delsection)">Удалить</v-btn>
        </v-card-actions>
      </v-card>
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
      mode: "",
      deldialog: false
    };
  },
  computed: {
    sections() {
      return this.$store.getters.SECTIONS;
    }
  },
  methods: {
    exit(){
      this.overlay = false;
      setTimeout(()=>{
        this.$store.dispatch('SET_SECTIONS')
      },500)   
    },
    alr() {
      alert("ok");
    },
    createSection(e) {
      this.mode = "CREATE";
      this.$store.dispatch("EDIT_SECTION", { parent: true });
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
      this.deldialog = false;
      this.$store.dispatch("DELETE_SECTION", e);
      this.exit()
    },
    deleteSectionDialog(e) {
      this.delsection = e;
      this.$store.dispatch("EDIT_SECTION", e);
      this.deldialog = true;
    },
    createSubsection(e) {
      console.log(e);
      this.mode = "SUBCREATE";
      this.overlay = true;
      this.$store.dispatch("EDIT_SECTION", e);
    }
    // editSubsection(e) {
    //   console.log(e);
    //   this.mode = "SUBEDIT";
    //   this.$store.dispatch("EDIT_SUBSECTION", e);
    //   this.overlay = true;
    // },
    // deleteSubsection(subsection, section) {
    //   this.mode = "SUBDELETE";
    //   this.$store.dispatch("DELETE_SUBSECTION", { subsection, section });
    // }
  }
};
</script>