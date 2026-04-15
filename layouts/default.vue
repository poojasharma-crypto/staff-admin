<<<<<<< HEAD
=======
<<<<<<< HEAD
<template>
  <div class="flex">

    <!-- Sidebar -->
    <aside
      class="bg-gray-900 text-white h-screen fixed left-0 top-0 p-3 z-40 overflow-hidden transition-all duration-200"
      :class="isSidebarOpen ? 'w-64' : 'w-20'"
    >

      <div class="flex items-center justify-between mb-6 px-1">
        <h2 v-if="isSidebarOpen" class="text-xl font-bold">Admin Panel</h2>
        <!-- Sidebar Search -->

        <button
          @click="toggleSidebar"
          class="p-1.5 rounded hover:bg-gray-700 text-gray-200"
          :class="!isSidebarOpen ? 'mx-auto' : ''"
          :aria-label="isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
            <path v-if="isSidebarOpen" d="M15 18l-6-6 6-6" />
            <path v-else d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
<div v-if="isSidebarOpen" class="mt-3 px-1 relative">
  
  <!-- Input -->
  <input
    v-model="menuSearch"
    type="text"
    placeholder="Search menu..."
    class="w-full px-3 py-2 pr-8 rounded bg-gray-800 text-sm text-white border border-gray-700 focus:outline-none focus:border-teal-500"
  />

  <!-- Clear (X) Button -->
  <button
    v-if="menuSearch"
    @click="menuSearch = ''"
    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
  >
    ✕
  </button>

</div>
      <nav class="space-y-3">

        <NuxtLink
         v-if="!menuSearch || 'dashboard'.includes(menuSearch.toLowerCase())"
          to="/dashboard"
          class="!flex !flex-row items-center p-2 rounded whitespace-nowrap gap-3 px-3"
          :title="!isSidebarOpen ? 'Dashboard' : ''"
          :class="[!isSidebarOpen ? 'justify-center' : '', isActive('/dashboard')]"
        >
          <svg class="shrink-0" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="3" width="8" height="8" rx="1" />
            <rect x="13" y="3" width="8" height="5" rx="1" />
            <rect x="13" y="10" width="8" height="11" rx="1" />
            <rect x="3" y="13" width="8" height="8" rx="1" />
          </svg>
          <span v-if="isSidebarOpen">Dashboard</span>
        </NuxtLink>

        <NuxtLink
          v-if="!menuSearch || 'company'.includes(menuSearch.toLowerCase())"
          to="/company"
          class="!flex !flex-row items-center p-2 rounded whitespace-nowrap gap-3 px-3"
          :title="!isSidebarOpen ? 'Company' : ''"
          :class="[!isSidebarOpen ? 'justify-center' : '', isActive('/company')]"
        >
          <svg class="shrink-0" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 21h18" />
            <path d="M5 21V8l7-4 7 4v13" />
            <path d="M9 13h6" />
            <path d="M9 17h6" />
          </svg>
          <span v-if="isSidebarOpen">Company</span>
        </NuxtLink>

        <NuxtLink
        v-if="!menuSearch || 'staff'.includes(menuSearch.toLowerCase())"
          to="/staff"
          class="!flex !flex-row items-center p-2 rounded whitespace-nowrap gap-3 px-3"
          :title="!isSidebarOpen ? 'Staff' : ''"
          :class="[!isSidebarOpen ? 'justify-center' : '', isActive('/staff')]"
        >
          <svg class="shrink-0" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span v-if="isSidebarOpen">Staff</span>
        </NuxtLink>
<NuxtLink
 v-if="!menuSearch || 'departments'.includes(menuSearch.toLowerCase())"
  to="/departments"
  class="!flex !flex-row items-center p-2 rounded whitespace-nowrap gap-3 px-3"
  :title="!isSidebarOpen ? 'Departments' : ''"
  :class="[!isSidebarOpen ? 'justify-center' : '', isActive('/departments')]"
>
  <svg class="shrink-0" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
    <path d="M3 3h18v6H3z" />
    <path d="M3 15h18v6H3z" />
    <path d="M3 9h18v6H3z" />
  </svg>

  <span v-if="isSidebarOpen">Departments</span>
</NuxtLink>
        <NuxtLink
        v-if="!menuSearch || 'settings'.includes(menuSearch.toLowerCase())"
          to="/settings"
          class="!flex !flex-row items-center p-2 rounded whitespace-nowrap gap-3 px-3"
          :title="!isSidebarOpen ? 'Settings' : ''"
          :class="[!isSidebarOpen ? 'justify-center' : '', isActive('/settings')]"
        >
          <svg class="shrink-0" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          <span v-if="isSidebarOpen">Settings</span>
        </NuxtLink>

      </nav>

    </aside>

    <!-- Main Content -->
    <div
      class="flex-1 min-h-screen bg-gray-100 transition-all duration-200"
      :class="isSidebarOpen ? 'ml-64' : 'ml-20'"
    >

      <!-- Header -->
      <header class="bg-white shadow px-6 py-4 flex justify-between items-center">

        <div class="flex items-center gap-3">
      
        </div>

        <!-- Profile -->
        <div class="relative">

          <!-- Profile Button -->
          <div
            @click="toggleDropdown"
            class="flex items-center gap-2 cursor-pointer"
          >
            <div
              class="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center"
            >
              {{ user?.name?.charAt(0) || 'A' }}
            </div>

            <span class="text-sm font-medium">
              {{ user?.name || 'Admin' }}
            </span>
          </div>

          <!-- Dropdown -->
          <div
            v-if="showDropdown"
            class="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50"
          >
            <ul class="text-sm">

              <li
                class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                @click="goProfile"
              >
                Edit Profile
              </li>

              <li
                class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                @click="logout"
              >
                Logout
              </li>

            </ul>
          </div>

        </div>

      </header>

      <!-- Page Content -->
      <main class="p-6">
        <slot />
      </main>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const isSidebarOpen = ref(true)
const router = useRouter()
const route = useRoute()
const menuSearch = ref("")
const showDropdown = ref(false)
const user = ref(null)

// active menu
const isActive = (path) => {
  return route.path.startsWith(path)
    ? 'bg-gray-700 text-white'
    : 'hover:bg-gray-700 text-gray-300'
}

// toggle dropdown
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
// logout
const logout = () => {
  localStorage.removeItem('user')
  router.push('/login')
}

// go profile
const goProfile = () => {
  router.push('/profile')
}

// load user
onMounted(() => {
  // load sidebar state
  const savedSidebar = localStorage.getItem('sidebar')
  if (savedSidebar !== null) {
    isSidebarOpen.value = savedSidebar === 'true'
  }

  // existing user code
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
  }
})

// close dropdown outside click
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
=======
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
<template>
  <div class="flex">

    <!-- Sidebar -->
    <aside
      class="bg-gray-900 text-white h-screen fixed left-0 top-0 p-3 z-40 overflow-hidden transition-all duration-200"
      :class="isSidebarOpen ? 'w-64' : 'w-20'"
    >

      <div class="flex items-center justify-between mb-6 px-1">
        <h2 v-if="isSidebarOpen" class="text-xl font-bold">Admin Panel</h2>
        <!-- Sidebar Search -->

        <button
          @click="toggleSidebar"
          class="p-1.5 rounded hover:bg-gray-700 text-gray-200"
          :class="!isSidebarOpen ? 'mx-auto' : ''"
          :aria-label="isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
            <path v-if="isSidebarOpen" d="M15 18l-6-6 6-6" />
            <path v-else d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
<div v-if="isSidebarOpen" class="mt-3 px-1 relative">
  
  <!-- Input -->
  <input
    v-model="menuSearch"
    type="text"
    placeholder="Search menu..."
    class="w-full px-3 py-2 pr-8 rounded bg-gray-800 text-sm text-white border border-gray-700 focus:outline-none focus:border-teal-500"
  />

  <!-- Clear (X) Button -->
  <button
    v-if="menuSearch"
    @click="menuSearch = ''"
    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
  >
    ✕
  </button>

</div>
      <nav class="space-y-3">

        <NuxtLink
         v-if="!menuSearch || 'dashboard'.includes(menuSearch.toLowerCase())"
          to="/dashboard"
          class="!flex !flex-row items-center p-2 rounded whitespace-nowrap gap-3 px-3"
          :title="!isSidebarOpen ? 'Dashboard' : ''"
          :class="[!isSidebarOpen ? 'justify-center' : '', isActive('/dashboard')]"
        >
          <svg class="shrink-0" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="3" width="8" height="8" rx="1" />
            <rect x="13" y="3" width="8" height="5" rx="1" />
            <rect x="13" y="10" width="8" height="11" rx="1" />
            <rect x="3" y="13" width="8" height="8" rx="1" />
          </svg>
          <span v-if="isSidebarOpen">Dashboard</span>
        </NuxtLink>

        <NuxtLink
          v-if="!menuSearch || 'company'.includes(menuSearch.toLowerCase())"
          to="/company"
          class="!flex !flex-row items-center p-2 rounded whitespace-nowrap gap-3 px-3"
          :title="!isSidebarOpen ? 'Company' : ''"
          :class="[!isSidebarOpen ? 'justify-center' : '', isActive('/company')]"
        >
          <svg class="shrink-0" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 21h18" />
            <path d="M5 21V8l7-4 7 4v13" />
            <path d="M9 13h6" />
            <path d="M9 17h6" />
          </svg>
          <span v-if="isSidebarOpen">Company</span>
        </NuxtLink>

        <NuxtLink
        v-if="!menuSearch || 'staff'.includes(menuSearch.toLowerCase())"
          to="/staff"
          class="!flex !flex-row items-center p-2 rounded whitespace-nowrap gap-3 px-3"
          :title="!isSidebarOpen ? 'Staff' : ''"
          :class="[!isSidebarOpen ? 'justify-center' : '', isActive('/staff')]"
        >
          <svg class="shrink-0" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span v-if="isSidebarOpen">Staff</span>
        </NuxtLink>
<NuxtLink
 v-if="!menuSearch || 'departments'.includes(menuSearch.toLowerCase())"
  to="/departments"
  class="!flex !flex-row items-center p-2 rounded whitespace-nowrap gap-3 px-3"
  :title="!isSidebarOpen ? 'Departments' : ''"
  :class="[!isSidebarOpen ? 'justify-center' : '', isActive('/departments')]"
>
  <svg class="shrink-0" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
    <path d="M3 3h18v6H3z" />
    <path d="M3 15h18v6H3z" />
    <path d="M3 9h18v6H3z" />
  </svg>

  <span v-if="isSidebarOpen">Departments</span>
</NuxtLink>
        <NuxtLink
        v-if="!menuSearch || 'settings'.includes(menuSearch.toLowerCase())"
          to="/settings"
          class="!flex !flex-row items-center p-2 rounded whitespace-nowrap gap-3 px-3"
          :title="!isSidebarOpen ? 'Settings' : ''"
          :class="[!isSidebarOpen ? 'justify-center' : '', isActive('/settings')]"
        >
          <svg class="shrink-0" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          <span v-if="isSidebarOpen">Settings</span>
        </NuxtLink>

      </nav>

    </aside>

    <!-- Main Content -->
    <div
      class="flex-1 min-h-screen bg-gray-100 transition-all duration-200"
      :class="isSidebarOpen ? 'ml-64' : 'ml-20'"
    >

      <!-- Header -->
      <header class="bg-white shadow px-6 py-4 flex justify-between items-center">

        <div class="flex items-center gap-3">
      
        </div>

        <!-- Profile -->
        <div class="relative">

          <!-- Profile Button -->
          <div
            @click="toggleDropdown"
            class="flex items-center gap-2 cursor-pointer"
          >
            <div
              class="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center"
            >
              {{ user?.name?.charAt(0) || 'A' }}
            </div>

            <span class="text-sm font-medium">
              {{ user?.name || 'Admin' }}
            </span>
          </div>

          <!-- Dropdown -->
          <div
            v-if="showDropdown"
            class="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50"
          >
            <ul class="text-sm">

              <li
                class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                @click="goProfile"
              >
                Edit Profile
              </li>

              <li
                class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                @click="logout"
              >
                Logout
              </li>

            </ul>
          </div>

        </div>

      </header>

      <!-- Page Content -->
      <main class="p-6">
        <slot />
      </main>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const isSidebarOpen = ref(true)
const router = useRouter()
const route = useRoute()
const menuSearch = ref("")
const showDropdown = ref(false)
const user = ref(null)

// active menu
const isActive = (path) => {
  return route.path.startsWith(path)
    ? 'bg-gray-700 text-white'
    : 'hover:bg-gray-700 text-gray-300'
}

// toggle dropdown
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
// logout
const logout = () => {
  localStorage.removeItem('user')
  router.push('/login')
}

// go profile
const goProfile = () => {
  router.push('/profile')
}

// load user
onMounted(() => {
  // load sidebar state
  const savedSidebar = localStorage.getItem('sidebar')
  if (savedSidebar !== null) {
    isSidebarOpen.value = savedSidebar === 'true'
  }

  // existing user code
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
  }
})

// close dropdown outside click
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
<<<<<<< HEAD
=======
>>>>>>> menu
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
</script>