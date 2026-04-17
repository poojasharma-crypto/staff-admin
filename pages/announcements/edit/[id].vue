<template>
  <div class="p-6 w-full">

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Edit Announcement</h1>

      <button 
        @click="navigateTo('/announcements')" 
        class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>
    </div>

    <div v-if="loading">Loading...</div>

    <div v-else class="bg-white shadow rounded-lg p-8 space-y-5 w-full">

      <div>
        <label class="block text-sm mb-1">Title</label>
        <input v-model="form.title" class="input" />
      </div>

      <div>
        <label class="block text-sm mb-1">Description</label>
        <textarea v-model="form.description" class="input"></textarea>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <input type="date" v-model="form.start_date" class="input" />
        <input type="date" v-model="form.end_date" class="input" />
      </div>

        <input 
        v-model="form.announcement_type" 
        list="types"
        class="input"
        placeholder="Enter type"
        />

        <datalist id="types">
        <option value="General" />
        <option value="Holiday" />
        <option value="Meeting" />
        <option value="Reminder" />
        </datalist>

      <div class="flex justify-end">
        <button @click="update" class="btn-primary">
          Update
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>

import { useToast } from 'vue-toastification'

const toast = useToast()

const route = useRoute();
const id = route.params.id;

const loading = ref(true);

const form = ref({
  title: "",
  description: "",
  start_date: "",
  end_date: "",
  announcement_type: "",
});

const formatDate = (date) => {
  if (!date) return "";

  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

//  FETCH DATA
const fetchData = async () => {
  try {
    const res = await $fetch(`/api/announcements/${id}`);

    const data = res.data;

    form.value = {
      ...data,
        start_date: formatDate(data.start_date),
        end_date: formatDate(data.end_date),
    };

  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

// 🔥 UPDATE API
const update = async () => {
  try {
    await $fetch(`/api/announcements/${id}`, {
      method: "PUT",
      body: form.value,
    });

     toast.success("Announcement updated successfully ✨");

    navigateTo("/announcements");

  } catch (err) {
    console.error(err);
    toast.error("Update failed ❌");
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
  background: #16a34a;
  color: white;
  padding: 10px 18px;
  border-radius: 8px;
}
</style>