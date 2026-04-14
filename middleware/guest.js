export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const user = localStorage.getItem('user')

    if (user) {
      return navigateTo('/dashboard')
    }
  }
})