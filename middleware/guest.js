<<<<<<< HEAD
=======
<<<<<<< HEAD
export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const user = localStorage.getItem('user')

    if (user) {
      return navigateTo('/dashboard')
    }
  }
=======
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const user = localStorage.getItem('user')

    if (user) {
      return navigateTo('/dashboard')
    }
  }
<<<<<<< HEAD
=======
>>>>>>> menu
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
})