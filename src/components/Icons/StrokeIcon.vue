<template>
  <svg
    :class="{ path: true, editing: isEditing }"
    width="34"
    height="8"
    viewBox="0 0 34 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {{ this.isEditing }}
    <path
      d="M1 5.5L2.40424 3.12635C3.85291 0.677616 7.4962 1.01304 8.47341 3.68511L8.61187 4.06371C9.62772 6.84141 13.5375 6.89345 14.6269 4.14376V4.14376C15.6785 1.48937 19.409 1.41683 20.563 4.02834L20.9353 4.87074C22.0787 7.45833 25.7911 7.33671 26.7628 4.67983V4.67983C27.7517 1.97584 31.5533 1.91349 32.6304 4.5836L33 5.5"
      stroke="black"
    />
  </svg>
</template>

<script>
export default {
  props: {
    isEditing: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.path:not(.editing) {
  display: none;
}
</style>
