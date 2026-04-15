<<<<<<< HEAD
=======
<<<<<<< HEAD
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Dashboard 🎉</h1>

    <button
      @click="logout"
      class="bg-red-500 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('user')
  router.push('/login')
}
=======
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Dashboard 🎉</h1>

    <button
      @click="logout"
      class="bg-red-500 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('user')
  router.push('/login')
}
<<<<<<< HEAD
=======
>>>>>>> menu
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
</script>