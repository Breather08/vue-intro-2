<template>
  <div class="note-list">
    <NoteForm :notes="notes" @addNote="updateNotes($event)" />

    <NoteItem
      v-for="(note, index) in notes"
      :key="index"
      :info="note"
      :notes="notes"
      @deleteNote="updateNotes($event)"
    />
  </div>
</template>

<script>
import NoteItem from "@/components/NoteItem.vue";
import NoteForm from "@/components/NoteForm.vue";

export default {
  data() {
    return {
      notes: [
        {
          id: 0,
          title: "Title",
          textContent: "Lorem ipsum dolar sit amet"
        },
        {
          id: 1,
          title: "Title",
          textContent: "Lorem ipsum dolar sit amet"
        },
        {
          id: 2,
          title: "Title",
          textContent: "Lorem ipsum dolar sit amet"
        },
        {
          id: 3,
          title: "Title",
          textContent: "Lorem ipsum dolar sit amet"
        }
      ]
    };
  },
  methods: {
    updateNotes(data) {
      this.notes = data;
    }
  },
  components: {
    NoteItem,
    NoteForm
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
