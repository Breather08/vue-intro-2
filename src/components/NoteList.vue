<template>
  <div class="note-list">
    <NoteForm :notes="notes" />

    <NoteItem
      v-for="(note, index) in notes"
      :key="index"
      :info="note"
      :notes="notes"
    />
  </div>
</template>

<script>
import NoteItem from "@/components/NoteItem.vue";
import NoteForm from "@/components/NoteForm.vue";
import { eventBus } from "@/main";

export default {
  data() {
    return {
      notes: []
    };
  },
  components: {
    NoteItem,
    NoteForm
  },
  created() {
    eventBus.$on("addNote", (note) => {
      this.notes.unshift(note);
    });

    eventBus.$on("deleteNote", (filteredNotes) => {
      this.notes = filteredNotes;
    });
  }
};
</script>

<style lang="scss" scoped>
.note-list {
  width: 100vw;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 310px));
  grid-gap: 40px;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
</style>
