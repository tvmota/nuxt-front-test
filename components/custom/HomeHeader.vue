<template>
  <header class="home__header" role="banner">
    <h3>head</h3>
  </header>
</template>

<style>
.home {
  &__header {
    @apply flex items-center justify-center w-full relative;
    background-color: var(--color-primary);
    grid-area: 1 / 1 / 2 / 2;
  }
}
</style>
