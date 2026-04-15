<<<<<<< HEAD
=======
<<<<<<< HEAD
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  css: ['@/assets/css/company.css'],

  // ✅ ADD THIS
  nitro: {
    routeRules: {
      '/api/**': {
        cors: true
      }
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 3001
  }
=======
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  css: ['@/assets/css/company.css'],

  // ✅ ADD THIS
  nitro: {
    routeRules: {
      '/api/**': {
        cors: true
      }
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 3001
  }
<<<<<<< HEAD
=======
>>>>>>> menu
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
})