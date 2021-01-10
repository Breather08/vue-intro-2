<template>
  <div class="note-item">
    <v-card class="rounded-lg z-index-10">
      <v-card-title> {{ info.title }} </v-card-title>
      <v-card-text style="max-height: 100px" class="overflow-y-auto">
        {{ info.textContent }}
      </v-card-text>
    </v-card>
    <div class="side-options">
      <div class="edit">
        <svg
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
      </div>
      <div class="delete" @click="deleteNote">
        <svg
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
  methods: {
    deleteNote() {
      const filtered = this.notes.filter((note) => note.id !== this.info.id);
      eventBus.$emit("deleteNote", filtered);
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

  svg {
    transform: translate(9px);
    pointer-events: none;
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
}

.note-item {
  position: relative;
  display: flex;

  .v-card {
    width: 300px;
    height: 180px;
    z-index: 10;
    &::before {
      content: "";
      position: absolute;
      top: 43px;
      height: 30px;
      width: 95%;
      background: rgb(255, 255, 255);
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 1) 64%,
        rgba(255, 255, 255, 0.1166666495699843) 100%
      );
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
