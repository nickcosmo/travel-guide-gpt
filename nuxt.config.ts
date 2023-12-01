// https://nuxt.com/docs/api/configuration/nuxt-config
// eslint-disable-next-line no-undef
export default defineNuxtConfig({
  runtimeConfig: {
    openAPIKey: process.env.OPENAPI_API_KEY,
    public: {
      mapsKey: process.env.NUXT_PUBLIC_MAPS_KEY,
    }
  },
  vue: {
    compilerOptions: {
      // isCustomElement: (tag) => [ 'VueJsonPretty' ].includes(tag),
    },
  },
  css: [
    '@quasar/extras/material-icons/material-icons.css',
    '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css',
    'vue-json-pretty/lib/styles.css'
    // '/css/quasar.variables.sass'
  ],
  build: {
    transpile: [ "quasar" ]
  },
  modules: [ 'nuxt-quasar-ui' ],
  quasar: {
    config: {
      dark: true,
      brand: {
        primary: '#27b89b',
        secondary: '#885c9c',
        accent: '#9C27B0',
        dark: '#1d1d1d',
        'dark-page': '#121212',
        positive: '#21BA45',
        negative: '#C10015',
        info: '#31CCEC',
        warning: '#F2C037'
      }
    }
  },
})