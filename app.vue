<script setup>
useHead({
  title: 'Front Text',
  meta: [
    { name: 'description', content: 'site front test' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
  ],
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import url('~/assets/css/main.css');
</style>
