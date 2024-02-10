<template>
  <footer class="home__footer" role="content-info">
    <h2>Footer</h2>
  </footer>
</template>

<style>
.home {
  &__footer {
    @apply p-3 flex justify-center;
    background-color: var(--color-tertiary);
    grid-area: 3 / 1 / 4 / 2;
  }
}
</style>
