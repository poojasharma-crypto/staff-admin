<<<<<<< HEAD
=======
<<<<<<< HEAD
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    position: 'top-right', // ✅ RIGHT SIDE
    timeout: 3000,
    transition: 'Vue-Toastification__slideBlurred', // 👉 smooth slide
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    hideProgressBar: false,
  })
=======
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    position: 'top-right', // ✅ RIGHT SIDE
    timeout: 3000,
    transition: 'Vue-Toastification__slideBlurred', // 👉 smooth slide
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    hideProgressBar: false,
  })
<<<<<<< HEAD
=======
>>>>>>> menu
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
})