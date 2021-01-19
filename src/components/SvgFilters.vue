<template>
  <svg v-if="name === 'gooey'">
    <filter id="gooey">
      <feGaussianBlur in="SourceGrafic" stdDeviation="10" />
      <feColorMatrix
        values="
        1 0 0 0 0
        0 1 0 0 0
        0 0 1 0 0
        0 0 0 20 -10
        "
      />
    </filter>
  </svg>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
};
</script>
