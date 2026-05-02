import tailwindcss from '@tailwindcss/vite'

const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    ordersSubmitUrl: env?.NUXT_ORDERS_SUBMIT_URL || '',
    public: {
      turnstileSiteKey: env?.NUXT_PUBLIC_TURNSTILE_SITE_KEY || '',
    },
  },
  app: {
    baseURL: env?.NUXT_APP_BASE_URL || '/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      titleTemplate: '%s | СВАИ+',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  css: ['~/assets/css/app.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  components: {
    dirs: [
      {
        path: '~/components',
        extensions: ['vue'],
      },
    ],
  },

  typescript: {
    strict: true,
  },
})
