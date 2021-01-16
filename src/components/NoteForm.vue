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
        max:
          this.notes.length >= MAX_NOTES ||
          noteData.title === '' ||
          noteData.textContent === ''
      }"
      @click="clickAdd"
    >
      <span>add</span>
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/eventBus";
import { editNote, getNotes, createNote } from "@/utils/API";

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
        id: 0,
        title: "",
        textContent: ""
      },
      message: "",
      API_ID: "",
      MAX_NOTES: 10
    };
  },
  methods: {
    async clickAdd() {
      if (
        this.noteData.title !== "" &&
        this.noteData.textContent !== "" &&
        this.notes.length < this.MAX_NOTES
      ) {
        this.noteData.id++;
        this.message = "";

        const note = {
          id: this.noteData.id,
          title: this.noteData.title,
          textContent: this.noteData.textContent
        };

        this.noteData.title = "";
        this.noteData.textContent = "";

        eventBus.$emit("add-note", note);
        eventBus.$emit("send-notes", this.notes.length);

        if (this.notes.length === 1) {
          await createNote([note]).then((resp) => (this.API_ID = resp));
        }

        await editNote([...this.notes], this.API_ID);
        await getNotes(this.API_ID);
        await eventBus.$emit("api-id", this.API_ID);
      } else {
        if (!this.noteData.title || !this.noteData.textContent) {
          this.message = "No empty fields allowed";
        } else if (this.notes.length === this.MAX_NOTES) {
          this.message = "Notes limit exceeded";
        }
        eventBus.$emit("show-message", this.message);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$transitionDuration: 0.5s;

@mixin addButton($color) {
  width: 36px;
  height: 72px;

  position: relative;
  display: flex;
  align-items: center;
  transform: translateY(18px);
  background: $color;
  border-radius: 0px 15px 15px 0px;

  transition: $transitionDuration;

  cursor: pointer;

  span {
    transform: rotate(-90deg);
  }

  &::before {
    content: "";
    position: absolute;
    width: 15px;
    height: 72px;
    background: $color;
    z-index: -10;
    transform: translate(-10px);
    transition: $transitionDuration;
  }

  &:hover {
    transform: translate(5px, 18px);
  }
}

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
    @include addButton(#84e0a9);
    &.max {
      filter: grayscale(100%);
    }
    span {
      user-select: none;
    }
  }
}
</style>
