<<<<<<< HEAD
export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const user = localStorage.getItem('user')

    if (!user) {
      return navigateTo('/login')
    }
  }
=======
export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const user = localStorage.getItem('user')

    if (!user) {
      return navigateTo('/login')
    }
  }
>>>>>>> menu
})