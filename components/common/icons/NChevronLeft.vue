<script setup lang="ts">
defineProps({
  h: {
    type: String,
    default: '1rem',
  },
  w: {
    type: String,
    default: '1rem',
  },
});
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="w"
    :height="h"
    viewBox="0 0 24 24"
  >
    <path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m14 16l-4-4l4-4"
    />
  </svg>
</template>
