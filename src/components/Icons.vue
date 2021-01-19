<template>
  <svg
    v-if="icon === 'warning'"
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
  <svg
    v-else-if="icon === 'delete'"
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
  <svg
    v-else-if="icon === 'pencil'"
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
    v-else-if="icon === 'stroke'"
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
    icon: {
      type: String,
      required: true
    },
    isEditing: {
      type: Boolean,
      default: false,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
.path:not(.editing) {
  display: none;
}
</style>
