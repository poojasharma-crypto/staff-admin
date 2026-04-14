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
})