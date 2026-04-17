<template>
  <div class="p-6 w-full">

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Add Announcement</h1>

      <button 
        @click="navigateTo('/announcements')" 
        class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>
    </div>

    <div class="bg-white shadow rounded-lg p-8 space-y-5 w-full">

      <!-- Title -->
      <div>
        <label class="block text-sm mb-1">Title</label>
        <input v-model="form.title" class="input" placeholder="Enter title" />
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm mb-1">Description</label>
        <textarea v-model="form.description" class="input" rows="3"
          placeholder="Enter description"></textarea>
      </div>

      <!-- Dates -->
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-sm mb-1">Start Date</label>
          <input type="date" v-model="form.start_date" class="input" />
        </div>

        <div>
          <label class="block text-sm mb-1">End Date</label>
          <input type="date" v-model="form.end_date" class="input" />
        </div>
      </div>

      <!-- Type (INPUT now) -->
      <div>
        <label class="block text-sm mb-1">Type</label>
        <input 
          v-model="form.announcement_type" 
          class="input" 
          placeholder="Enter type (e.g. Holiday, Meeting)" 
        />
      </div>

      <!-- Button -->
      <div class="flex justify-end">
        <button @click="submit" class="btn-primary">
          Submit
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>

import { useToast } from 'vue-toastification'

const toast = useToast()

const form = ref({
  title: "",
  description: "",
  start_date: "",
  end_date: "",
  announcement_type: "",
});

const submit = async () => {
  try {
    await $fetch("/api/announcements", {
      method: "POST",
      body: form.value,
    });

    toast.success("Announcement added successfully 🎉"); 

    navigateTo("/announcements");

  } catch (err) {
    console.error(err);
    toast.error("Failed to add announcement ❌"); 
  }
};
</script>

<style>
.input {
  width: 100%;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
}

.btn-primary {
  background: #2563eb;
  color: white;
  padding: 10px 18px;
  border-radius: 8px;
}
</style>