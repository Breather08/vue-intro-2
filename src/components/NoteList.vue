<template>
  <div class="loading" v-if="isLoading">
    <div
      v-for="(block, index) in 4"
      class="loading-block"
      :id="`block-${index}`"
      :key="`block-${index}`"
    ></div>
  </div>
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
import { getNotes, updateNotes, createAPI } from "@/utils/API";

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
  methods: {
    async mountAPI() {
      await getNotes().then((resp) => {
        this.notes = resp.data.notes;
        this.isLoading = false;
      });
      eventBus.$emit("send-notes", this.notes.length - 1);
    }
  },
  async created() {
    if (localStorage.getItem("api_key")) {
      this.mountAPI();
    } else {
      const api_key = await createAPI({
        notes: [],
        notes_max: 10,
        api_key: "pending"
      });
      localStorage.setItem("api_key", api_key);
      this.isLoading = false;
    }

    eventBus.$on("add-note", async (newNote) => {
      await updateNotes({
        notes: [newNote, ...this.notes],
        notes_max: 10,
        api_key: localStorage.getItem("api_key")
      });
      this.notes.unshift(newNote);
      eventBus.$emit("send-notes", this.notes.length - 1);
    });

    eventBus.$on("delete-note", async (id) => {
      const filtered = this.notes.filter((note) => note.id !== id);
      await updateNotes({
        notes: [...filtered],
        notes_max: 10,
        api_key: localStorage.getItem("api_key")
      });
      this.notes = filtered;
      eventBus.$emit("send-notes", this.notes.length - 1);
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70px;
  height: 100px;

  @for $i from 0 through 4 {
    #block-#{$i} {
      width: 10px;
      height: 30px;
      border-radius: 10px;
      background: #394867;
      animation: up-down 0.6s infinite #{0.1 * $i}s ease-in-out;
    }
  }
}

@keyframes up-down {
  50% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
