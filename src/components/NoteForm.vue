<template>
  <div class="note-form">
    <v-card class="rounded-lg">
      <input type="text" v-model="noteData.title" placeholder="Your title" />
      <textarea
        v-model="noteData.textContent"
        placeholder="Your Content"
      ></textarea>
    </v-card>
    <div
      :class="{
        'add-note': true,
        clickable: isClickable()
      }"
      @click="clickAdd"
    >
      <button>add</button>
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/global/eventBus";

export default {
  props: {
    notes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      noteData: {
        id: "",
        title: "",
        textContent: ""
      },
      message: "",
      max_notes: 10
    };
  },
  methods: {
    isClickable() {
      return (
        this.noteData.title !== "" &&
        this.noteData.textContent !== "" &&
        this.notes.length < this.max_notes
      );
    },
    randomID() {
      return Math.random()
        .toString(36)
        .substr(2, 9);
    },
    createNote() {
      this.message = "";

      const note = {
        id: this.randomID(),
        title: this.noteData.title,
        textContent: this.noteData.textContent
      };

      this.noteData.title = "";
      this.noteData.textContent = "";

      return note;
    },
    sendMessage() {
      if (!this.noteData.title || !this.noteData.textContent) {
        this.message = "No empty fields allowed";
      }
      if (this.notes.length === this.max_notes) {
        this.message = "Notes limit exceeded";
      }
      eventBus.$emit("show-message", this.message);
    },
    clickAdd() {
      if (this.isClickable()) {
        const note = this.createNote();
        eventBus.$emit("add-note", note);
      } else {
        this.sendMessage();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.note-form {
  position: relative;
  display: flex;
  .v-card {
    padding: 10px;
    background: #fff;
    width: 274px;
    height: 180px;
    z-index: 10;
    input,
    textarea {
      width: 80%;
      margin: 5px;
      outline: none;
      transition: 0.4s;
    }

    input {
      height: 30px;
      margin-bottom: 10px;
      font-size: 18px;
    }

    textarea {
      height: 100px;
      resize: none;
      color: #666666;
      font-size: 14px;
    }
  }
  .add-note {
    width: 36px;
    height: 72px;

    position: relative;
    display: flex;
    align-items: center;
    transform: translateY(18px);
    background: #84e0a9;
    border-radius: 0px 15px 15px 0px;

    transition: 0.5s;

    cursor: pointer;

    button {
      transform: rotate(-90deg);
      outline: none;
    }

    &::before {
      content: "";
      position: absolute;
      width: 15px;
      height: 72px;
      background: #84e0a9;
      z-index: -10;
      transform: translate(-10px);
      transition: 0.5s;
    }

    &:hover {
      transform: translate(5px, 18px);
    }
    &:not(.clickable) {
      filter: grayscale(100%);
    }
    span {
      user-select: none;
    }
  }
}
</style>
