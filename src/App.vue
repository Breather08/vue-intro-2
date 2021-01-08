<template>
  <v-app class="blue-grey lighten-3">
    <v-main>
      <NoteList />
    </v-main>
  </v-app>
</template>

<script>
import NoteList from "@/components/NoteList.vue";

export default {
  name: "App",

  components: {
    NoteList
  },

  data: () => ({})
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

#app {
  background: #f1f3f8;
}
</style>
