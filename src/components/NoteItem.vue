<template>
  <div class="note-item">
    <v-card class="rounded-lg">
      <input
        v-model="info.title"
        type="text"
        placeholder="Your title"
        :disabled="!isEditing"
      />
      <textarea
        v-model="info.textContent"
        placeholder="Your Content"
        :disabled="!isEditing"
      ></textarea>
    </v-card>
    <div class="side-options">
      <button class="edit" @click="editNote">
        <Icons :icon="'pencil'" :isEditing="isEditing" />
        <Icons :icon="'stroke'" :isEditing="isEditing" />
      </button>
      <button class="delete" @click="deleteNote">
        <Icons :icon="'delete'" />
      </button>
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/global/eventBus";
import { updateNotes } from "@/utils/API";
import Icons from "@/components/Icons.vue";

export default {
  props: {
    info: {
      type: Object,
      required: true
    },
    notes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isEditing: false,
      message: ""
    };
  },
  components: {
    Icons
  },
  methods: {
    deleteNote() {
      this.isEditing = false;
      eventBus.$emit("delete-note", this.info.id);
    },
    async editNote() {
      if (this.info.textContent && this.info.title) {
        this.message = "";

        const currentNote = {
          id: this.info.id,
          title: this.info.title,
          textContent: this.info.textContent
        };

        const edited = this.notes.map((note) =>
          note.id !== this.info.id ? note : currentNote
        );

        if (this.isEditing) {
          await updateNotes({
            notes: edited,
            notes_max: 10,
            api_key: localStorage.getItem("api_key")
          });
        }
        this.isEditing = !this.isEditing;
      } else {
        this.message = "No empty fields allowed";
        eventBus.$emit("show-message", this.message);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin sideOption($topRight, $botRight, $color) {
  width: 36px;
  height: 36px;

  position: relative;
  display: flex;
  align-items: center;
  z-index: -10;

  background: #{$color};
  border-radius: 0px #{$topRight}px #{$botRight}px 0px;

  transition: 0.5s;
  outline: none;

  cursor: pointer;

  .pencil,
  .destroy {
    transform: translate(9px);
    pointer-events: none;
  }

  .pencil.animate {
    animation: write 1s infinite linear;
  }

  .path {
    position: absolute;
    width: 20px;
    height: 15px;
    bottom: 2%;
    left: 50%;
    transform: translate(-50%);
    stroke-dashoffset: 43.1;
    stroke-dasharray: 43.1;
    animation: stroke 1s infinite linear;
  }

  &::before {
    content: "";
    position: absolute;
    width: 15px;
    height: 36px;
    background: $color;
    transform: translate(-10px);
  }

  &:hover {
    transform: translate(5px);
  }

  @keyframes write {
    0% {
      transform: translate(-8px, 3px);
    }
    20% {
      transform: translate(-4px, 0px);
    }
    40% {
      transform: translate(0px, 3px);
    }
    60% {
      transform: translate(4px, 0px);
    }
    80% {
      transform: translate(8px, 3px);
    }
    100% {
      transform: translate(12px, 0px);
    }
  }

  @keyframes stroke {
    100% {
      stroke-dashoffset: 0;
    }
  }
}

.note-item {
  position: relative;
  display: flex;

  &.editing {
    background: grey;
    border: 1px solid black;
  }

  .v-card {
    width: 300px;
    height: 180px;
    z-index: 10;

    input,
    textarea {
      width: 80%;
      margin-top: 15px;
      margin-left: 15px;
      outline: none;
      transition: 0.4s;
      border-radius: 7px;
      color: black;
    }

    input {
      position: relative;
      height: 30px;
      font-size: 18px;
      padding-left: 10px;
    }

    textarea {
      height: 100px;
      resize: none;
      color: #666666;
      font-size: 14px;
      padding-left: 10px;
      padding-top: 5px;
    }
  }

  .side-options {
    transform: translateY(18px);
    .edit {
      @include sideOption(15, 0, #e1cb7e);
    }

    .delete {
      @include sideOption(0, 15, #d99a9a);
    }
  }
}
</style>
