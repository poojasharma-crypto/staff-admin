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
>>>>>>> menu
})