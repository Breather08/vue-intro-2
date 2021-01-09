<template>
  <v-app class="blue-grey lighten-3">
    <v-main>
      <ProgressBar />
      <NoteList />
    </v-main>
  </v-app>
</template>

<script>
import NoteList from "@/components/NoteList.vue";
import ProgressBar from "@/components/ProgressBar.vue";

export default {
  name: "App",

  components: {
    NoteList,
    ProgressBar
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
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
