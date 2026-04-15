<<<<<<< HEAD
<template>
  <div class="bg-gray-100 min-h-screen p-6">

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Edit Profile</h1>

      <button
        @click="goBack"
        class="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
      >
        Go Back
      </button>
    </div>

    <!-- Card -->
    <div class="bg-white p-6 rounded-lg shadow w-full">

      <form @submit.prevent="updateProfile">

        <!-- Name -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Name</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <!-- Email -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <!-- Password -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">
            New Password (optional)
          </label>

          <div class="relative">
         <input
  :type="showPassword ? 'text' : 'password'"
  v-model="form.password"
  placeholder="Enter new password"
  autocomplete="new-password"  
  class="w-full border px-3 py-2 rounded pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
/>

            <span
              @click="togglePassword"
              class="absolute right-3 top-2.5 cursor-pointer text-gray-500"
            >
              {{ showPassword ? '🙈' : '👁️' }}
            </span>
          </div>
        </div>

        <!-- Button -->
        <button
          type="submit"
          :disabled="loading"
          class="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600 transition"
        >
          {{ loading ? 'Updating...' : 'Update Profile' }}
        </button>

      </form>

    </div>

  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

definePageMeta({
  middleware: 'auth'
})

const toast = useToast()
const router = useRouter()

const showPassword = ref(false)
const loading = ref(false)

const form = reactive({
  id: '',
  name: '',
  email: '',
  password: ''
})

// load user data
onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (user) {
    form.id = user.id
    form.name = user.name
    form.email = user.email
  }

  form.password = ''   // ✅ ADD THIS (IMPORTANT)
})

// toggle password
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// go back
const goBack = () => {
  router.push('/dashboard')
}

// update profile
const updateProfile = async () => {
  if (!form.name || !form.email) {
    toast.error('Name and Email required ⚠️')
    return
  }

  loading.value = true

  try {
    const res = await $fetch('/api/update-profile', {
      method: 'POST',
      body: form
    })

    if (res.success) {
      toast.success('Profile updated successfully 🎉')

      // update localStorage
      localStorage.setItem('user', JSON.stringify(res.user))

      // smooth delay
      await new Promise(resolve => setTimeout(resolve, 800))

    

    } else {
      toast.error(res.message || 'Update failed ❌')
    }

  } catch (error) {
    toast.error('Server error ❌')
  } finally {
    loading.value = false
  }
}
=======
<template>
  <div class="bg-gray-100 min-h-screen p-6">

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Edit Profile</h1>

      <button
        @click="goBack"
        class="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
      >
        Go Back
      </button>
    </div>

    <!-- Card -->
    <div class="bg-white p-6 rounded-lg shadow w-full">

      <form @submit.prevent="updateProfile">

        <!-- Name -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Name</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <!-- Email -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <!-- Password -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">
            New Password (optional)
          </label>

          <div class="relative">
         <input
  :type="showPassword ? 'text' : 'password'"
  v-model="form.password"
  placeholder="Enter new password"
  autocomplete="new-password"  
  class="w-full border px-3 py-2 rounded pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
/>

            <span
              @click="togglePassword"
              class="absolute right-3 top-2.5 cursor-pointer text-gray-500"
            >
              {{ showPassword ? '🙈' : '👁️' }}
            </span>
          </div>
        </div>

        <!-- Button -->
        <button
          type="submit"
          :disabled="loading"
          class="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600 transition"
        >
          {{ loading ? 'Updating...' : 'Update Profile' }}
        </button>

      </form>

    </div>

  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

definePageMeta({
  middleware: 'auth'
})

const toast = useToast()
const router = useRouter()

const showPassword = ref(false)
const loading = ref(false)

const form = reactive({
  id: '',
  name: '',
  email: '',
  password: ''
})

// load user data
onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (user) {
    form.id = user.id
    form.name = user.name
    form.email = user.email
  }

  form.password = ''   // ✅ ADD THIS (IMPORTANT)
})

// toggle password
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// go back
const goBack = () => {
  router.push('/dashboard')
}

// update profile
const updateProfile = async () => {
  if (!form.name || !form.email) {
    toast.error('Name and Email required ⚠️')
    return
  }

  loading.value = true

  try {
    const res = await $fetch('/api/update-profile', {
      method: 'POST',
      body: form
    })

    if (res.success) {
      toast.success('Profile updated successfully 🎉')

      // update localStorage
      localStorage.setItem('user', JSON.stringify(res.user))

      // smooth delay
      await new Promise(resolve => setTimeout(resolve, 800))

    

    } else {
      toast.error(res.message || 'Update failed ❌')
    }

  } catch (error) {
    toast.error('Server error ❌')
  } finally {
    loading.value = false
  }
}
>>>>>>> menu
</script>