<script setup lang="ts">
defineProps({
  footerTitle: {
    type: String,
    default: 'Teste',
  },
});
</script>

<template>
  <footer class="home__footer" role="contentinfo">
    <div class="home__footer__content">
      <a
        class="home__footer__content--title"
        href="https://github.com/tvmota/nuxt-front-test"
        target="blank"
        title="{footerTitle}"
      >
        {{ footerTitle }}
      </a>
    </div>
  </footer>
</template>

<style>
.home {
  &__footer {
    @apply p-3 flex justify-center;
    background-color: var(--color-tertiary);
    grid-area: 3 / 1 / 4 / 2;

    &__content {
      @apply flex items-center;

      &--title {
        @apply text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl font-semibold hover:underline align-middle;
        color: var(--color-primary);
        &:hover {
          color: var(--color-secondary);
        }
      }
    }
  }
}
</style>
