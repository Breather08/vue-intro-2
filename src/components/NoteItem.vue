<template>
  <div class="note-item">
    <v-card class="rounded-lg z-index-10" v-if="!isEditing">
      <v-card-title> {{ this.info.title }} </v-card-title>
      <v-card-text style="max-height: 100px" class="overflow-y-auto">
        {{ this.info.textContent }}
      </v-card-text>
    </v-card>
    <v-card class="rounded-lg" v-else>
      <input
        v-model="info.title"
        type="text"
        placeholder="Your title"
        :style="{
          'padding-left': '10px',
          height: '30px'
        }"
      />
      <textarea
        v-model="info.textContent"
        placeholder="Your Content"
        :style="{
          'padding-left': '10px',
          'padding-top': '5px',
          height: '95px'
        }"
      ></textarea>
    </v-card>
    <div class="side-options">
      <div class="edit" @click="editNote">
        <svg
          :class="['pencil', isEditing ? 'animate' : '']"
          width="15"
          height="15"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.82855 6C1.56591 5.73735 1.35756 5.42555 1.21542 5.08239C1.07328 4.73923 1.00012 4.37143 1.00012 4C1.00012 3.62856 1.07328 3.26077 1.21542 2.91761C1.35756 2.57445 1.56591 2.26264 1.82855 2C2.09119 1.73735 2.403 1.52901 2.74616 1.38687C3.08932 1.24473 3.45712 1.17157 3.82855 1.17157C4.19998 1.17157 4.56778 1.24473 4.91094 1.38687C5.2541 1.52901 5.56591 1.73735 5.82855 2L19.3286 15.5L20.8286 21L15.3286 19.5L1.82855 6Z"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg
          class="path"
          width="34"
          height="8"
          viewBox="0 0 34 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          v-if="isEditing"
        >
          <path
            d="M1 5.5L2.40424 3.12635C3.85291 0.677616 7.4962 1.01304 8.47341 3.68511L8.61187 4.06371C9.62772 6.84141 13.5375 6.89345 14.6269 4.14376V4.14376C15.6785 1.48937 19.409 1.41683 20.563 4.02834L20.9353 4.87074C22.0787 7.45833 25.7911 7.33671 26.7628 4.67983V4.67983C27.7517 1.97584 31.5533 1.91349 32.6304 4.5836L33 5.5"
            stroke="black"
          />
        </svg>
      </div>
      <div class="delete" @click="deleteNote">
        <svg
          class="destroy"
          width="15"
          height="15"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 11.0001C1 16.523 5.47715 21.0001 11 21.0001C16.5228 21.0001 21 16.523 21 11.0001C21 5.47727 16.5228 1.00012 11 1.00012C5.47715 1.00012 1 5.47727 1 11.0001Z"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14 14.0001L8 8.00012"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14 8.00012L8 14.0001"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/main";
import { editNote, getNotes } from "@/utils/API";

export default {
  props: {
    info: {
      type: Object,
      required: true
    },
    notes: {
      type: Array,
      required: true
    },
    API_ID: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isEditing: false
    };
  },
  methods: {
    async deleteNote() {
      this.isEditing = false;
      const filtered = this.notes.filter((note) => note.id !== this.info.id);
      eventBus.$emit("deleteNote", filtered);
      eventBus.$emit("sendNotes", this.notes.length - 1);
      if (filtered.length > 0) {
        await editNote(filtered, this.API_ID);
      }
      await getNotes(this.API_ID);
    },
    editNote() {
      if (this.info.textContent !== "" && this.info.title !== "") {
        this.isEditing = !this.isEditing;
      } else {
        eventBus.$emit("message", "No empty fields allowed!");
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
    }

    input {
      position: relative;
      height: 30px;
      font-size: 18px;
      &:focus {
        border: "1px solid #98A2FF";
      }
    }

    textarea {
      height: 100px;
      resize: none;
      color: #666666;
      font-size: 14px;
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
