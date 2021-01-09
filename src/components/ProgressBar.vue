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
        :style="{ left: `calc(${(this.amount + 1) * 10}vw - 90px)` }"
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
      this.amount = data.length + 1;
    });
  }
};
</script>

<style lang="scss" scoped>
.progress {
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  .chart {
    position: relative;
    display: flex;
    width: 100%;
    justify-content: space-around;
    .checkpoints {
      width: 50px;
      height: 50px;

      background: #d6e0f0;
      border-radius: 50%;
    }
    .main-circle {
      position: absolute;

      width: 50px;
      height: 50px;

      border-radius: 50%;
      background: #84e0a9;
    }
  }
}
</style>
