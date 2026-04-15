<<<<<<< HEAD
=======
<<<<<<< HEAD
export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const user = localStorage.getItem('user')

    if (!user) {
      return navigateTo('/login')
    }
  }
=======
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const user = localStorage.getItem('user')

    if (!user) {
      return navigateTo('/login')
    }
  }
<<<<<<< HEAD
=======
>>>>>>> menu
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
})