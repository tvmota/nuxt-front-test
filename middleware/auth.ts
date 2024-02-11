import { useStorage } from '@vueuse/core';

export default defineNuxtRouteMiddleware((to) => {
  const timestamp = useStorage('timestamp', '');
  const timeout = timestamp.value
    ? new Date(timestamp.value) < new Date()
    : true;

  if (timeout && to.path === '/home') {
    process.client &&
      console.log('Timeout', new Date(timestamp.value) < new Date());
    return navigateTo('/');
  }
});
