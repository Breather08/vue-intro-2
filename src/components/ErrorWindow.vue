<template>
  <v-card :class="{ 'alert-msg': true, active: this.active }">
    <div class="warning-logo">
      <WarningIcon />
    </div>
    <div class="warning-msg">
      <span>{{ this.message }}</span>
    </div>
  </v-card>
</template>

<script>
import { eventBus } from "@/global/eventBus";
import WarningIcon from "@/components/Icons/WarningIcon.vue";

export default {
  data() {
    return {
      message: "",
      active: false
    };
  },
  components: {
    WarningIcon
  },
  created() {
    eventBus.$on("show-message", (msg) => {
      this.message = msg;
      this.active = true;
      setTimeout(() => {
        this.active = false;
      }, 2000);
    });
  }
};
</script>

<style lang="scss" scoped>
.alert-msg {
  position: fixed;

  width: 300px;
  height: 70px;

  display: flex;
  align-items: center;
  margin: 20px;

  bottom: 5vh;
  left: calc(100vw);
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

  &.active {
    transform: translate(-350px);
  }
}
</style>
