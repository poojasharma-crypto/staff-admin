<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">

    <!-- Card -->
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

      <!-- Title -->
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Staff Admin</h1>
        <p class="text-sm text-gray-500">Login to your account</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin">

        <!-- Email -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            v-model="form.email"
            type="email"
            placeholder="Enter your email"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <!-- Password -->
        <div class="mb-5">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>

          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="form.password"
              placeholder="Enter your password"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 pr-10"
            />

            <!-- Eye Toggle -->
            <span
              @click="showPassword = !showPassword"
              class="absolute right-3 top-2.5 cursor-pointer text-gray-500"
            >
              {{ showPassword ? '🙈' : '👁️' }}
            </span>
          </div>
        </div>

        <!-- Button -->
        <button
          type="submit"
          class="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>

      </form>

    </div>

  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// form data
const form = reactive({
  email: '',
  password: ''
})

// states
const loading = ref(false)
const showPassword = ref(false)

// auto redirect if already logged in
onMounted(() => {
  const user = localStorage.getItem('user')
  if (user) {
    router.push('/dashboard')
  }
})

// login function
const handleLogin = async () => {
  if (!form.email || !form.password) {
    alert('Please fill all fields ⚠️')
    return
  }

  loading.value = true

  try {
    const res = await $fetch('/api/login', {
      method: 'POST',
      body: form
    })

    if (res.success) {
      localStorage.setItem('user', JSON.stringify(res.user))
      router.push('/dashboard')
    } else {
      alert(res.message || 'Invalid credentials ❌')
    }

  } catch (error) {
    console.error(error)
    alert('Server error ❌')
  } finally {
    loading.value = false
  }
}
definePageMeta({
  layout: 'auth'
})
</script>