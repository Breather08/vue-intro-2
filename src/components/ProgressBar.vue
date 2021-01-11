<template>
  <div class="progress">
    <div class="chart">
      <div
        class="checkpoints"
        v-for="(circle, i) in 10"
        :key="`${circle}-${i}`"
        :id="`${circle}-${i}`"
      ></div>
      <div
        class="main-circle"
        :style="{
          left: `calc(${amount * 10}vw)`
        }"
      ></div>
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/main";

export default {
  data() {
    return {
      amount: 0
    };
  },
  created() {
    eventBus.$on("sendNotes", (data) => {
      this.amount = data;
    });
  }
};
</script>

<style lang="scss" scoped>
$circle-radius: 50;

.progress {
  position: relative;
  width: 90vw;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 50%;
  transform: translate(-50%);
  .chart {
    position: relative;
    display: flex;
    width: 100%;
    justify-content: space-between;
    .checkpoints {
      width: #{$circle-radius}px;
      height: #{$circle-radius}px;

      background: #d6e0f0;
      border-radius: 50%;
    }
    .main-circle {
      position: absolute;

      width: #{$circle-radius}px;
      height: #{$circle-radius}px;

      border-radius: 50%;
      background: #84e0a9;

      transition: 1s ease-out;
    }

    filter: url(#gooey);
  }
}
</style>
