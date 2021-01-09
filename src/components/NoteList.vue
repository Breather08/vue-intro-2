<template>
  <div class="note-list">
    <NoteForm
      :notes="notes"
      @addNote="updateNotes($event)"
      @sendNotes="sendNotes"
    />

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
import { eventBus } from "@/main";

export default {
  data() {
    return {
      notes: []
    };
  },
  methods: {
    updateNotes(data) {
      this.notes = data;
    },
    sendNotes() {
      eventBus.$emit("sendNotes", this.notes);
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
