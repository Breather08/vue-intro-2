<template>
  <v-app class="blue-grey lighten-3">
    <v-main>
      <ProgressBar />
      <NoteList />
      <svg>
        <filter id="gooey">
          <feGaussianBlur in="SourceGrafic" stdDeviation="10" />
          <feColorMatrix
            values="
        1 0 0 0 0
        0 1 0 0 0
        0 0 1 0 0
        0 0 0 20 -10
        "
          />
        </filter>
      </svg>
      <ErrorWindow />
    </v-main>
  </v-app>
</template>

<script>
import NoteList from "@/components/NoteList.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import ErrorWindow from "@/components/ErrorWindow.vue";

export default {
  name: "App",

  components: {
    NoteList,
    ProgressBar,
    ErrorWindow
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
  position: relative;
  background: #f1f3f8;
  width: 100vw;
  overflow: hidden;
}
</style>
