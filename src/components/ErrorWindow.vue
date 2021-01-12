<template>
  <div
    class="alert-msg"
    :style="{ transform: `translate(${this.message ? show() : 320}px)` }"
    ref="alert"
  >
    <div class="warning-logo">
      <svg
        width="37"
        height="37"
        viewBox="0 0 37 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.21533 3.40342C10.523 2.12655 12.2781 1.41174 14.1058 1.41174H22.8942C24.7219 1.41174 26.477 2.12655 27.7847 3.40342L33.8905 9.36556C35.2394 10.6828 36 12.4885 36 14.3739V22.6261C36 24.5115 35.2394 26.3172 33.8905 27.6344L27.7847 33.5965C26.477 34.8734 24.7219 35.5882 22.8942 35.5882H14.1058C12.2781 35.5882 10.523 34.8734 9.21533 33.5965L3.10952 27.6344C1.76056 26.3172 1 24.5115 1 22.6261V14.3739C1 12.4885 1.76056 10.6828 3.10952 9.36556L9.21533 3.40342Z"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18.5 11.6647V18.5"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18.5 25.3353H18.5175"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <div class="warning-msg">
      <span>{{ this.message }}</span>
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/main";

export default {
  data() {
    return {
      message: ""
    };
  },
  methods: {
    show() {
      setTimeout(() => {
        this.message = "";
      }, 2000);
      return 0;
    }
  },
  created() {
    eventBus.$on("message", (msg) => {
      this.message = msg;
    });
  }
};
</script>

<style lang="scss" scoped>
.alert-msg {
  position: sticky;

  width: 300px;
  height: 70px;

  display: flex;
  align-items: center;
  margin: 20px;

  bottom: 5vh;
  left: 100%;
  z-index: 50;

  border-radius: 7px;
  background: #e1cb7e;

  transition: 0.2s ease-out;
  .warning-logo {
    position: relative;
    margin: 20px;

    height: 37px;
  }
  .warning-msg {
    user-select: none;
  }
}
</style>
