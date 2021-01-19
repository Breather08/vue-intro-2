<template>
  <div class="loading" v-if="isLoading">LOADING...</div>
  <div class="note-list" v-else>
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
import { eventBus } from "@/global/eventBus";
import { getNotes, updateNotes, clearAPI } from "@/utils/API";

export default {
  data() {
    return {
      notes: [],
      isLoading: true
    };
  },
  components: {
    NoteItem,
    NoteForm
  },
  async created() {
    if (localStorage.getItem("api_key")) {
      await getNotes().then((resp) => {
        this.notes = resp.data;
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }

    eventBus.$on("add-note", async (newNote) => {
      await updateNotes([newNote, ...this.notes]);
      await this.notes.unshift(newNote);
      await eventBus.$emit("send-notes", this.notes.length - 1);
    });

    eventBus.$on("delete-note", async (id) => {
      const filtered = this.notes.filter((note) => note.id !== id);
      if (filtered.length === 0) {
        await clearAPI();
      } else {
        await updateNotes([...filtered]);
      }
      this.notes = filtered;
      await eventBus.$emit("send-notes", this.notes.length - 1);
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

.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
