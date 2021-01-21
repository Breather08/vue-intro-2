<template>
  <svg
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
