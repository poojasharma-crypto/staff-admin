<template>
  <div class="app">

    <main class="main">

      <!-- Header -->
      <header class="page-header">
        <div class="page-header-left">
          <span class="breadcrumb">Master Data</span>
          <span class="breadcrumb-sep">/</span>
          <h1 class="page-title">Departments</h1>
        </div>

        <div class="page-header-right">
          <div class="search-wrap">
            <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/>
            </svg>
            <input v-model="search" placeholder="Search departments…" class="search-input" />
          </div>

          <button @click="openForm" class="btn-add">
            + Add Department
          </button>
        </div>
      </header>

      <!-- Stats -->
      <div class="stats-row">
        
        <div class="stat-card">
          <div class="stat-label">Total Departments</div>
          <div class="stat-value">{{ departments.length }}</div>
        </div>

        <div class="stat-card">
          <div class="stat-label">Active</div>
          <div class="stat-value">{{ activeCount }}</div>
        </div>

        <div class="stat-card">
          <div class="stat-label">Inactive</div>
          <div class="stat-value">{{ inactiveCount }}</div>
        </div>

        <div class="stat-card">
          <div class="stat-label">Companies</div>
        <div class="stat-value">{{ companies.length }}</div>
        </div>
      </div>

      <!-- Table -->
      <div class="table-card">

        <div class="table-meta">
          <span class="table-count">{{ filtered.length }} results</span>
        </div>

        <div class="table-scroll">
          <table class="table">
            <thead>
              <tr>
                <th class="th-num">#</th>
                <th>Company</th>
                <th>Department</th>
                <th>Description</th>
                <th>Status</th>
                <th class="th-action">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-if="filtered.length === 0">
                <td colspan="6" class="empty-state">
                  No departments found
                </td>
              </tr>

              <tr v-for="(d, i) in paginated" :key="d.id" class="tbody-row">
                <td class="td-num">{{ i + 1 }}</td>
             <td>
  {{ companies.find(c => c.id === d.company_id)?.name || '-' }}
</td>
                <td><strong>{{ d.department_name }}</strong></td>
                <td class="desc-cell">{{ d.description }}</td>

                <td>
                  <span :class="d.status === 1 ? 'type-badge type-seller' : 'type-badge type-distributor'">
                    {{ d.status === 1 ? 'Active' : 'Inactive' }}
                  </span>
                </td>

                <td>
                  <div class="action-group">
                    <button @click="editDept(d)" class="btn-icon btn-icon-edit"> <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                    <button @click="deleteDept(d.id)" class="btn-icon btn-icon-del"> <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>
                  </div>
                </td>
              </tr>
            </tbody>

          </table>
        </div>
        <div v-if="filtered.length > 0" class="pagination-wrap">

  <span class="pagination-meta">
    Showing {{ startRow }} - {{ endRow }} of {{ filtered.length }}
  </span>

  <div class="pagination-controls">

    <button
      class="page-btn"
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      Prev
    </button>

    <button
      v-for="p in totalPages"
      :key="p"
      class="page-btn"
      :class="{ 'page-btn-active': p === currentPage }"
      @click="goToPage(p)"
    >
      {{ p }}
    </button>

    <button
      class="page-btn"
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    >
      Next
    </button>

  </div>
</div>

      </div>

    </main>

    <!-- Modal -->
    <div v-if="showForm" class="overlay">
      <div class="modal">

        <div class="modal-header">
          <h2 class="modal-title">
            {{ form.id ? 'Edit Department' : 'Add Department' }}
          </h2>
        </div>

        <form @submit.prevent="saveDept" class="modal-body">
<div class="field">
  <label class="label">Company</label>
  <select v-model="form.company_id" class="input" required>
    <option value="">Select Company</option>
    <option
      v-for="c in companies"
      :key="c.id"
      :value="c.id"
    >
      {{ c.name }}
    </option>
  </select>
</div>
          <div class="field">
            <label class="label">Department Name</label>
            <input v-model="form.department_name" class="input" required />
          </div>

          <div class="field">
            <label class="label">Description</label>
            <textarea v-model="form.description" class="input textarea"></textarea>
          </div>

          <div class="field">
            <label class="label">Status</label>
            <select v-model="form.status" class="input">
              <option :value="1">Active</option>
              <option :value="0">Inactive</option>
            </select>
          </div>

          <div class="modal-footer">
            <button type="button" @click="closeForm" class="btn-cancel">Cancel</button>
            <button type="submit" class="btn-save">Save</button>
          </div>

        </form>

      </div>
    </div>

  </div>
  
</template>

<script setup>
import { ref, computed, onMounted } from "vue"

const departments = ref([])
const fetchDepartments = async () => {
  departments.value = await $fetch('/api/departments')
}

onMounted(() => {
  fetchDepartments()
})
const companies = ref([])

const fetchCompanies = async () => {
  companies.value = await $fetch('/api/company')
}

onMounted(() => {
  fetchCompanies()
})
const search = ref("")
const showForm = ref(false)

const form = ref({
  id: null,
  company_id: "",
  department_name: "",
  description: "",
  status: 1
})

const filtered = computed(() =>
  departments.value.filter(d =>
    d.department_name.toLowerCase().includes(search.value.toLowerCase())
  )
)

const activeCount = computed(() =>
  departments.value.filter(d => d.status === 1).length
)

const inactiveCount = computed(() =>
  departments.value.filter(d => d.status === 0).length
)

const openForm = () => {
  showForm.value = true
 form.value = {
  company_id: "",
  department_name: "",
  description: "",
  status: 1
}
}

const closeForm = () => showForm.value = false

const saveDept = async () => {
  if (form.value.id) {
    await $fetch(`/api/departments/${form.value.id}`, {
      method: 'PUT',
      body: form.value
    })
  } else {
    await $fetch('/api/departments', {
      method: 'POST',
      body: form.value
    })
  }

  closeForm()
  fetchDepartments()
}

const editDept = (d) => {
  form.value = { ...d }
  showForm.value = true
}

const deleteDept = async (id) => {
  await $fetch(`/api/departments/${id}`, {
    method: 'DELETE'
  })
  fetchDepartments()
}
const pageSize = 10
const currentPage = ref(1)

// total pages
const totalPages = computed(() =>
  Math.max(1, Math.ceil(filtered.value.length / pageSize))
)

// paginated data
const paginated = computed(() =>
  filtered.value.slice(
    (currentPage.value - 1) * pageSize,
    currentPage.value * pageSize
  )
)

// row count
const startRow = computed(() =>
  filtered.value.length ? (currentPage.value - 1) * pageSize + 1 : 0
)

const endRow = computed(() =>
  Math.min(currentPage.value * pageSize, filtered.value.length)
)

// change page
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>
<style scoped>

/* Pagination Container */
.pagination-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

/* Buttons */
.page-btn {
  padding: 6px 12px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  border-radius: 6px;
  cursor: pointer;
  margin: 0 3px;
  font-size: 13px;
  transition: all 0.2s ease;
}

/* 🔥 HOVER EFFECT */
.page-btn:hover {
  background: #0d9488;   /* teal */
  color: white;
  border-color: #0d9488;
}

/* Active Page */
.page-btn-active {
  background: #0d9488;
  color: white;
  border-color: #0d9488;
}

/* Disabled */
.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}


</style>