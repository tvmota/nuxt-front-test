<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import HomeHeader from '@/components/custom/HomeHeader.vue';
import HomeFooter from '@/components/custom/HomeFooter.vue';

onActivated(async () => {
  const timestamp = useStorage('timestamp', '');
  const timeout = timestamp.value
    ? new Date(timestamp.value) < new Date()
    : true;
  if (timeout) {
    process.client &&
      console.log('Timeout', new Date(timestamp.value) < new Date());
    await navigateTo('/');
  }
});
</script>

<template>
  <section class="home__container">
    <HomeHeader />
    <main class="home__main">
      <slot />
    </main>
    <HomeFooter footer-title="@Tiago Mota / nuxt-front-test" />
  </section>
</template>

<style>
.home {
  &__container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: var(--headerHeight) 1fr var(--footerHeight);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    height: 100%;
  }

  &__main {
    @apply p-4;
    grid-area: 2 / 1 / 3 / 2;
  }

  &__footer {
    @apply p-3 flex justify-center;
    background-color: var(--color-tertiary);
    grid-area: 3 / 1 / 4 / 2;
  }
}
</style>
