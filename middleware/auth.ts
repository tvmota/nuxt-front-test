import { useStorage } from '@vueuse/core';

export default defineNuxtRouteMiddleware((to) => {
  const timestamp = useStorage('timestamp', '');
  const regex = new RegExp(/(\/home|\/user)/g);
  const timeout = timestamp.value
    ? new Date(timestamp.value) < new Date()
    : true;

  if (timeout && regex.test(to.path)) {
    process.client &&
      console.log('Timeout', new Date(timestamp.value) < new Date());
    return navigateTo('/');
  }
});
