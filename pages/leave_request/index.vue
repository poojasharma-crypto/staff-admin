<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-6">Leave Requests</h1>

    <!-- 🔹 Counts Cards -->
    <div class="grid grid-cols-4 gap-4 mb-6">
    <div class="bg-blue-100 text-blue-800 p-4 rounded">
        <p class="text-sm">Casual</p>
        <p class="text-xl font-bold">{{ counts.Casual }}</p>
    </div>

    <div class="bg-green-100 text-green-800 p-4 rounded">
        <p class="text-sm">Sick</p>
        <p class="text-xl font-bold">{{ counts.Sick }}</p>
    </div>

    <div class="bg-purple-100 text-purple-800 p-4 rounded">
        <p class="text-sm">Paid</p>
        <p class="text-xl font-bold">{{ counts.Paid }}</p>
    </div>

    <!-- ✅ Updated -->
    <div class="bg-orange-100 text-orange-800 p-4 rounded">
        <p class="text-sm">Other</p>
        <p class="text-xl font-bold">{{ counts.Other }}</p>
    </div>
    </div>

    <!-- 🔹 Filter Tabs -->
    <div class="flex space-x-4 mb-4">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="selectedTab = tab"
        :class="[
          'px-4 py-2 rounded text-sm',
          selectedTab === tab
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200'
        ]"
      >
        {{ tab }}
      </button>
    </div>

    <!-- 🔹 Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <table class="w-full text-sm text-left">
        <thead class="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th class="px-4 py-3">ID</th>
            <th class="px-4 py-3">User</th>
            <th class="px-4 py-3">Type</th>
            <th class="px-4 py-3">Start</th>
            <th class="px-4 py-3">End</th>
            <th class="px-4 py-3">Reason</th>
            <th class="px-4 py-3">Status</th>
            <th class="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="leave in paginatedLeaves"
            :key="leave.id"
            class="border-b hover:bg-gray-50"
          >
            <td class="px-4 py-3">{{ leave.id }}</td>
            <td class="px-4 py-3">{{ leave.user_id }}</td>
            <td class="px-4 py-3">{{ leave.leave_type }}</td>
            <td class="px-4 py-3">{{ formatDate(leave.start_date) }}</td>
            <td class="px-4 py-3">{{ formatDate(leave.end_date) }}</td>
            <td class="px-4 py-3">{{ leave.reason }}</td>

            <td class="px-4 py-3">
              <span
                :class="[statusClass(leave.status), 'px-2 py-1 rounded text-xs']"
              >
                {{ leave.status }}
              </span>
            </td>

            <td class="px-4 py-3 text-center space-x-2">
              <button
                :disabled="leave.status === 'approved'"
                @click="updateStatus(leave.id, 'approved')"
                class="bg-green-500 text-white px-3 py-1 rounded text-xs disabled:opacity-50"
              >
                Approve
              </button>

              <button
                :disabled="leave.status === 'rejected'"
                @click="updateStatus(leave.id, 'rejected')"
                class="bg-red-500 text-white px-3 py-1 rounded text-xs disabled:opacity-50"
              >
                Reject
              </button>
            </td>
          </tr>

          <tr v-if="paginatedLeaves.length === 0">
            <td colspan="8" class="text-center py-4 text-gray-500">
              No leave requests found
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 🔹 Pagination -->
    <div class="flex justify-between items-center mt-6">
    
    <button
        @click="prevPage"
        :disabled="pagination.page === 1"
        class="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
    >
        Previous
    </button>

    <span class="text-sm">
        Page {{ pagination.page }} of {{ pagination.totalPages }}
    </span>

    <button
        @click="nextPage"
        :disabled="pagination.page === pagination.totalPages"
        class="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
    >
        Next
    </button>

    </div>


  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { watch } from "vue";

const leaves = ref([]);
const counts = ref({ Casual: 0, Sick: 0, Paid: 0, Other: 0 });

const tabs = ["All", "pending", "approved", "rejected"];
const selectedTab = ref("All");

// Pagination
const pagination = ref({
    page: 1,
    totalPages: 1
});

// Fetch API
const fetchLeaves = async () => {
  try {
    const res = await $fetch(
      `http://localhost:3001/api/leave_request?page=${pagination.value.page}&limit=5&status=${selectedTab.value}`
    );

    leaves.value = res.data;
    counts.value = res.counts;
    pagination.value.totalPages = res.pagination.totalPages;

  } catch (err) {
    console.error(err);
  }
};

onMounted(fetchLeaves);

const prevPage = () => {
  if (pagination.value.page > 1) {
    pagination.value.page--;
    fetchLeaves();
  }
};

const nextPage = () => {
  if (pagination.value.page < pagination.value.totalPages) {
    pagination.value.page++;
    fetchLeaves();
  }
};


// Pagination logic
const paginatedLeaves = computed(() => leaves.value);

watch(selectedTab, () => {
  pagination.value.page = 1;
  fetchLeaves();
});

// Helpers
const formatDate = (date) =>
  new Date(date).toLocaleDateString();

const statusClass = (status) => {
  if (status === "approved") return "bg-green-100 text-green-700";
  if (status === "rejected") return "bg-red-100 text-red-700";
  return "bg-yellow-100 text-yellow-700";
};

// Update
const updateStatus = async (id, status) => {
  try {
    await $fetch('/api/leave_request', {
    method: "POST",
    body: { id, status },
    });

    // ✅ Refresh everything (counts + pagination)
    fetchLeaves();

  } catch (err) {
    console.error(err);
  }
};
</script>