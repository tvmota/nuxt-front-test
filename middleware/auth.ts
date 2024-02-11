import { useStorage } from '@vueuse/core';

// eslint-disable-next-line no-undef
export default defineNuxtRouteMiddleware(() => {
  const timestamp = useStorage('timestamp', '');
  const timeout = new Date(timestamp.value) < new Date();

  if (timeout) {
    process.client && console.log('Timeout', new Date(timestamp.value));
    // eslint-disable-next-line no-undef
    return navigateTo('/');
  }
});
