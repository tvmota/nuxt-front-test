import { useStorage } from '@vueuse/core';

/*eslint-disable*/
export default defineNuxtRouteMiddleware(() => {
  const timestamp = useStorage('timestamp');
  const timeout = new Date(timestamp.value) < new Date();

  if (timeout) {
    process.client && console.log('Timeout', new Date(timestamp.value));
    return navigateTo('/');
  }
});
