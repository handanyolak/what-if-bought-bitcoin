export default {
  // target property: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // dev property: https://nuxtjs.org/docs/configuration-glossary/configuration-dev
  dev: false,

  // telemetry property: https://nuxtjs.org/docs/configuration-glossary/configuration-telemetry
  telemetry: false,

  // loading property: https://nuxtjs.org/docs/configuration-glossary/configuration-loading
  loading: false,

  // use runtime config instead of env https://nuxtjs.org/docs/directory-structure/nuxt-config/#publicruntimeconfig
  publicRuntimeConfig: {
    ownerAddress: process.env.OWNER_ADDRESS,
  },

  // render property: https://nuxtjs.org/docs/configuration-glossary/configuration-render
  render: {
    // setting up cache for 'static' directory and  https://web.dev/uses-long-cache-ttl
    static: {
      maxAge: 1000 * 60 * 60 * 24 * 30 * 6, // six months
    },
  },

  // generate: https://nuxtjs.org/docs/configuration-glossary/configuration-generate/
  generate: {
    subFolders: false,
  },

  // router: https://nuxtjs.org/docs/configuration-glossary/configuration-router/
  router: {
    trailingSlash: false,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'What If Bought Bitcoin?',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vee-validate',
    { src: '~/plugins/vue-toastify', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/google-fonts',
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/recaptcha'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate/dist/rules'],
    devtools: false,
    extractCSS: {
      ignoreOrder: true,
    },
  },

  vuetify: {
    defaultAssets: false,
    icons: {
      iconfont: 'mdiSvg',
    },
    treeShake: true,
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#00BFA5',
          success: '#00BFA5',
        },
      },
    },
  },

  recaptcha: {
    hideBadge: false,
    version: 3,
    language: 'en',
    siteKey: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
  },

  googleFonts: {
    families: {
      'Baloo+Bhai+2': true,
    },
    display: 'swap',
    prefetch: false,
    preconnect: false,
    preload: false,
    download: true,
    overwriting: false,
    inject: true,
    base64: false,
  },

  // all options https://tailwindcss.nuxtjs.org/options/
  tailwindcss: {
    viewer: false,
  },

  // all options https://github.com/Developmint/nuxt-purgecss/blob/master/lib/utils.js#L10
  purgeCSS: {
    enabled: true,
    paths: ['./node_modules/vuetify/src/**/*.ts'],
    whitelist: ['v-app', 'v-app--wrap'],
    whitelistPatterns: [/^v-((?!app).)*$/, /^theme--*/, /^text--*/, /--text$/],
    whitelistPatternsChildren: [
      /^v-((?!app).)*$/,
      /^theme--*/,
      /^text--*/,
      /--text$/,
    ],
  },
}
