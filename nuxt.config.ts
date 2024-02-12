// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    '/': { prerender: true },
    '/home': { prerender: true },
    '/user': { prerender: true },
  },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'in-out',
    },
  },
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    '@vueuse/nuxt',
  ],
  googleFonts: {
    families: {
      Roboto: true,
    },
  },
  postcss: {
    plugins: {
      'postcss-nested': {},
      'postcss-pxtorem': {
        rootValue: 16,
        unitPrecision: 5,
        propList: ['*'],
        selectorBlackList: [],
        replace: true,
        mediaQuery: false,
        minPixelValue: 0,
      },
    },
  },
});
