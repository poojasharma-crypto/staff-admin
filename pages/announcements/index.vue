<template>
  <div class="p-6">
    <div class="flex justify-between mb-6">
      <h1 class="text-2xl font-semibold">Announcements</h1>

      <!-- ADD BUTTON -->
      <button
        class="bg-blue-600 text-white px-4 py-2 rounded"
        @click="$router.push('/announcements/add')"
      >
        + Add
      </button>
    </div>

    <!-- TABLE -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <table class="w-full text-sm text-left">
        <thead class="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th class="px-4 py-3">ID</th>
            <th class="px-4 py-3">Title</th>
            <th class="px-4 py-3">Description</th>
            <th class="px-4 py-3">Start Date</th>
            <th class="px-4 py-3">End Date</th>
            <th class="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in announcements" :key="item.id" class="border-t">
            <td class="px-4 py-3">{{ item.id }}</td>
            <td class="px-4 py-3">{{ item.title }}</td>
            <td class="px-4 py-3">{{ item.description }}</td>
            <td class="px-4 py-3">{{ formatDate(item.start_date) }}</td>
            <td class="px-4 py-3">{{ formatDate(item.end_date) }}</td>

            <td class="px-4 py-3 text-center space-x-2">
              <!-- EDIT -->
              <button
                class="text-blue-600"
                @click="$router.push(`/announcements/edit/${item.id}`)"
              >
                Edit
              </button>

              <!-- DELETE -->
              <button
                class="text-red-600"
                @click="confirmDelete(item.id)"
              >
                Delete
              </button>
            </td>
          </tr>

          <tr v-if="announcements.length === 0">
            <td colspan="6" class="text-center py-4 text-gray-500">
              No data found
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- DELETE MODAL -->
        <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">

        <div class="bg-white rounded-lg shadow-lg p-6 w-96">

            <h2 class="text-lg font-semibold mb-4">Confirm Delete</h2>

            <p class="text-sm text-gray-600 mb-6">
            Are you sure you want to delete this announcement?
            </p>

            <div class="flex justify-end gap-3">
            <button 
                @click="cancelDelete"
                class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
                Cancel
            </button>

            <button 
                @click="confirmDelete"
                class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                Delete
            </button>
            </div>

        </div>

        </div>

    <!-- PAGINATION -->
            <div class="mt-6 flex justify-between items-center">

            <!-- Previous -->
            <button
                class="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
                :disabled="currentPage === 1"
                @click="currentPage--; fetchAnnouncements()"
            >
                Previous
            </button>

            <!-- Page Info -->
            <div class="text-sm text-gray-600">
                Page {{ currentPage }} of {{ totalPages }}
            </div>

            <!-- Next -->
            <button
                class="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
                :disabled="currentPage === totalPages"
                @click="currentPage++; fetchAnnouncements()"
            >
                Next
            </button>

            </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

import { useToast } from 'vue-toastification'

const toast = useToast()

const showModal = ref(false);
const deleteId = ref(null);

const announcements = ref([]);
const currentPage = ref(1);
const perPage = 5;
const total = ref(0);


const totalPages = computed(() => Math.ceil(total.value / perPage));

const formatDate = (date) => {
  if (!date) return "";

  const d = new Date(date);

  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const fetchAnnouncements = async () => {
    const res = await $fetch("/api/announcements", {
        query:{
            page: currentPage.value,
            limit: perPage,
        },
    });

    if (res.success){
        announcements.value = res.data;
        total.value = res.total;
    }
};

onMounted(fetchAnnouncements);

// Delete
const confirmDelete = async () => {
  try {
    await $fetch(`/api/announcements/${deleteId.value}`, {
      method: "DELETE",
    });

    showModal.value = false;

    toast.success("Announcement deleted successfully 🎉");

    fetchAnnouncements();

  } catch (err) {
    console.error(err);
    toast.error("Delete failed ❌");
  }
};

const cancelDelete = () => {
  showModal.value = false;
};

</script>