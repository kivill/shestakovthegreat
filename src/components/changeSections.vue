<template>
  <div>its {{this.menu}}</div>
</template>

<script>
import { db } from "@/plugins/firebase";
export default {
  props: ["menu"],
  mounted() {
    console.log(this.menu2);
  },
  data() {
    return {
      mes: "changeSections"
    };
  },
  firestore() {
    return {
      menu2: db.collection("sections")
    };
  }
};
</script>