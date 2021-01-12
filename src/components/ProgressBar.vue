<template>
  <div class="progress">
    <div class="chart">
      <div
        v-for="(circle, i) in 10"
        :key="`circle-${i}`"
        :id="`circle-${i}`"
      ></div>
      <div
        class="main-circle"
        :style="{
          transform: `translate(${amount * 10 - 45}vw)`
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
      amount: -1
    };
  },
  created() {
    eventBus.$on("sendNotes", (data) => {
      this.amount = data - 1;
    });
  }
};
</script>

<style lang="scss" scoped>
$circle-radius: 3vw;

.progress {
  position: relative;
  width: 100vw;
  height: 150px;
  display: flex;
  align-items: center;
  left: 50%;
  transform: translate(-50%);
  .chart {
    width: 100%;
    display: flex;
    justify-content: center;
    @for $i from 0 through 10 {
      #circle-#{$i} {
        position: absolute;

        width: #{$circle-radius};
        height: #{$circle-radius};

        transform: translate($i * 10vw - 45vw);

        background: #d6e0f0;
        border-radius: 50%;
      }
    }

    .main-circle {
      position: absolute;

      width: #{$circle-radius};
      height: #{$circle-radius};

      background: #84e0a9;
      border-radius: 50%;

      transition: 1s ease-out;
    }

    filter: url(#gooey);
  }
}
</style>
