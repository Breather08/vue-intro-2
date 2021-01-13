<template>
  <div class="note-form">
    <v-card class="rounded-lg">
      <input type="text" v-model="title" placeholder="Your title" />
      <textarea v-model="textContent" placeholder="Your Content"></textarea>
    </v-card>
    <div
      :class="{
        'add-note': true,
        max: this.notes.length > 9 || title === '' || textContent === ''
      }"
      @click="clickAdd"
    >
      <span>add</span>
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/main";
import { addNote } from "@/utils/API";

export default {
  props: {
    notes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      id: this.notes.length,
      title: "",
      textContent: "",
      message: ""
    };
  },
  methods: {
    clickAdd() {
      if (this.title && this.textContent && this.notes.length < 10) {
        this.message = "";

        const note = {
          id: this.notes.length,
          title: this.title,
          textContent: this.textContent
        };

        this.title = "";
        this.textContent = "";

        addNote(note);

        eventBus.$emit("addNote", note);
        eventBus.$emit("sendNotes", this.notes.length);
      } else {
        if (!this.title || !this.textContent) {
          this.message = "No empty fields allowed";
        } else if (this.notes.length === 10) {
          this.message = "Notes limit exceeded";
        }
      }
      eventBus.$emit("message", this.message);
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
