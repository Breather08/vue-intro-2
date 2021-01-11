<template>
  <div class="alert-msg">
    <div class="warning-logo">
      <span>{{ this.message }}</span>
    </div>
    <div class="warning-msg"></div>
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
  created() {
    eventBus.$on("message", (msg) => {
      this.message = msg;
    });
  }
};
</script>

<style lang="scss" scoped>
.alert-msg {
  width: 25vw;
  height: 10vh;
  position: absolute;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e1cb7e;
  right: 5vw;
  bottom: 5vh;
}
</style>
