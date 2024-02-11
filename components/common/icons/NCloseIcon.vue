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
      d="m18 18l-6-6m0 0L6 6m6 6l6-6m-6 6l-6 6"
    />
  </svg>
</template>
