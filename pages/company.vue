<template>
  <div class="app">

    <main class="main">

      <!-- Header -->
      <header class="page-header">
        <div class="page-header-left">
          <span class="breadcrumb">Master Data</span>
          <span class="breadcrumb-sep">/</span>
          <h1 class="page-title">Companies</h1>
        </div>
        <div class="page-header-right">
          <div class="search-wrap">
            <svg class="search-icon" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input v-model="search" placeholder="Search companies…" class="search-input" />
          </div>
          <button @click="openForm" class="btn-add">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
            Add Company
          </button>
        </div>
      </header>

      <!-- Stats row -->
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-label">Total Companies</div>
          <div class="stat-value">{{ companies.length }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Manufacturers</div>
          <div class="stat-value">{{ countType('Manufacturer') }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Sellers</div>
          <div class="stat-value">{{ countType('Seller') }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Vendors</div>
          <div class="stat-value">{{ countType('Vendor') }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Distributors</div>
          <div class="stat-value">{{ countType('Distributor') }}</div>
        </div>
      </div>

      <!-- Table Card -->
      <div class="table-card">
        <div class="table-meta">
          <span class="table-count">{{ filtered.length }} result{{ filtered.length !== 1 ? 's' : '' }}</span>
        </div>

        <div class="table-scroll">
          <table class="table">
            <thead>
              <tr>
                <th class="th-num">#</th>
                <th>Logo</th>
                <th>Company Name</th>
                <th>Type</th>
                <th>GST No.</th>
                <th>PAN</th>
                <th>Reg. No.</th>
                <th>Description</th>
                <th class="th-action">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filtered.length === 0">
                <td colspan="9" class="empty-state">
                  <div class="empty-inner">
                    <svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24" style="color:#cbd5e1"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M16 10v11M12 10v11"/></svg>
                    <p>No companies found</p>
                    <button @click="openForm" class="btn-add-sm">+ Add your first company</button>
                  </div>
                </td>
              </tr>

              <tr v-for="(c, i) in paginated" :key="c.id" class="tbody-row">
                <td class="td-num">{{ ((currentPage - 1) * pageSize) + i + 1 }}</td>
                <td>
                  <div class="logo-wrap">
                    <img v-if="c.logo" :src="c.logo" class="company-logo" :alt="c.name" />
                    <div v-else class="logo-fallback">{{ c.name?.charAt(0)?.toUpperCase() || '?' }}</div>
                  </div>
                </td>
                <td><span class="company-name">{{ c.name }}</span></td>
                <td>
                  <span :class="['type-badge', 'type-' + (c.type || '').toLowerCase()]">{{ c.type }}</span>
                </td>
                <td class="mono">{{ c.gst || '—' }}</td>
                <td class="mono">{{ c.pan || '—' }}</td>
                <td class="mono">{{ c.registration_number || '—' }}</td>
                <td><span class="desc-cell">{{ c.description || '—' }}</span></td>
                <td>
                  <div class="action-group">
                    <button @click="editCompany(c)" class="btn-icon btn-icon-edit" title="Edit">
                      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button @click="deleteCompany(c.id)" class="btn-icon btn-icon-del" title="Delete">
                      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="filtered.length > 0" class="pagination-wrap">
          <span class="pagination-meta">
            Showing {{ paginationStart }}-{{ paginationEnd }} of {{ filtered.length }}
          </span>
          <div class="pagination-controls">
            <button class="page-btn" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">Previous</button>
            <button
              v-for="page in totalPages"
              :key="page"
              class="page-btn"
              :class="{ 'page-btn-active': page === currentPage }"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>
            <button class="page-btn" :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">Next</button>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal -->
    <Transition name="fade">
      <div v-if="showForm" class="overlay" @click.self="closeForm">
        <Transition name="slide-up">
          <div v-if="showForm" class="modal">
            <div class="modal-header">
              <div>
                <p class="modal-sub">{{ form.id ? 'Editing record' : 'New entry' }}</p>
                <h2 class="modal-title">{{ form.id ? 'Edit Company' : 'Add Company' }}</h2>
              </div>
              <button @click="closeForm" class="btn-close">
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>

            <form @submit.prevent="saveCompany" class="modal-body">
              <div class="field-row">
                <div class="field">
                  <label class="label">Company Name <span class="req">*</span></label>
                  <input v-model="form.name" class="input" placeholder="e.g. Acme Pvt Ltd" required />
                </div>
                <div class="field">
                  <label class="label">Company Type <span class="req">*</span></label>
                  <select v-model="form.type" class="input" required>
                    <option value="" disabled>Select type…</option>
                    <option>Manufacturer</option>
                    <option>Seller</option>
                    <option>Vendor</option>
                    <option>Distributor</option>
                  </select>
                </div>
              </div>

              <div class="field-row">
                <div class="field">
                  <label class="label">GST Number</label>
                  <input v-model="form.gst" class="input mono" placeholder="e.g. 22AAAAA0000A1Z5" />
                </div>
                <div class="field">
                  <label class="label">PAN</label>
                  <input v-model="form.pan" class="input mono" placeholder="e.g. AAAPL1234C" />
                </div>
              </div>

              <div class="field">
                <label class="label">Registration Number</label>
                <input v-model="form.registration_number" class="input mono" placeholder="e.g. U72200MH2010PTC123456" />
              </div>

              <div class="field">
                <label class="label">Description</label>
                <textarea v-model="form.description" class="input textarea" placeholder="Brief description of the company…" rows="3"></textarea>
              </div>

              <div class="field">
                <label class="label">Company Logo</label>
                <div :class="['upload-area', { 'upload-area-has-image': !!form.logo }]" @click="triggerUpload" @dragover.prevent @drop.prevent="onDrop">
                  <img v-if="form.logo" :src="form.logo" class="upload-preview" alt="Company logo preview" />
                  <div v-else class="upload-placeholder">
                    <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" style="color:#94a3b8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    <span>Click or drag image here</span>
                  </div>
                  <input ref="fileInput" type="file" accept="image/*" @change="uploadFile" style="display:none" />
                </div>
                <button v-if="form.logo" type="button" @click="form.logo = ''" class="remove-logo">Remove logo</button>
              </div>

              <div class="modal-footer">
                <button type="button" @click="closeForm" class="btn-cancel">Cancel</button>
                <button type="submit" class="btn-save">{{ form.id ? 'Update Company' : 'Save Company' }}</button>
              </div>
            </form>
          </div>
        </Transition>
      </div>
    </Transition>

    <!-- Toast -->
    <Transition name="toast">
      <div v-if="toast.show" :class="['toast', 'toast-' + toast.type]">{{ toast.message }}</div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'

const companies = ref([])
const showForm  = ref(false)
const search    = ref('')
const fileInput = ref(null)
const toast     = reactive({ show: false, message: '', type: 'success' })
const pageSize = 5
const currentPage = ref(1)

const form = reactive({
  id: null, name: '', logo: '', type: '',
  description: '', gst: '', pan: '', registration_number: ''
})

// ── API ──────────────────────────────────────────────────
const fetchCompanies = async () => {
  companies.value = await $fetch('/api/company')
}
onMounted(fetchCompanies)

// ── Computed ─────────────────────────────────────────────
const filtered = computed(() =>
  companies.value.filter(c =>
    c.name?.toLowerCase().includes(search.value.toLowerCase())
  )
)
const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))
const paginated = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filtered.value.slice(start, start + pageSize)
})
const paginationStart = computed(() => (filtered.value.length ? ((currentPage.value - 1) * pageSize) + 1 : 0))
const paginationEnd = computed(() => Math.min(currentPage.value * pageSize, filtered.value.length))
const countType = (type) => companies.value.filter(c => c.type === type).length

watch(search, () => {
  currentPage.value = 1
})

watch(filtered, (rows) => {
  const pages = Math.max(1, Math.ceil(rows.length / pageSize))
  if (currentPage.value > pages) currentPage.value = pages
})

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

// ── Form helpers ──────────────────────────────────────────
const resetForm = () =>
  Object.assign(form, { id: null, name: '', logo: '', type: '', description: '', gst: '', pan: '', registration_number: '' })

const openForm  = () => { resetForm(); showForm.value = true }
const closeForm = () => { showForm.value = false; resetForm() }

const editCompany = (data) => { Object.assign(form, data); showForm.value = true }

// ── Save ──────────────────────────────────────────────────
const saveCompany = async () => {
  try {
    if (form.id) {
      await $fetch(`/api/company/${form.id}`, { method: 'PUT', body: form })
      showToast('Company updated successfully')
    } else {
      await $fetch('/api/company', { method: 'POST', body: form })
      showToast('Company added successfully')
    }
    closeForm()
    fetchCompanies()
  } catch { showToast('Something went wrong', 'error') }
}

// ── Delete ────────────────────────────────────────────────
const deleteCompany = async (id) => {
  if (!confirm('Delete this company? This action cannot be undone.')) return
  try {
    await $fetch(`/api/company/${id}`, { method: 'DELETE' })
    showToast('Company deleted')
    fetchCompanies()
  } catch { showToast('Delete failed', 'error') }
}

// ── Upload ────────────────────────────────────────────────
const triggerUpload = () => fileInput.value?.click()

const uploadFile = async (e) => {
  const file = e.target.files[0]; if (!file) return
  const fd = new FormData(); fd.append('file', file)
  try {
    const res = await $fetch('/api/upload', { method: 'POST', body: fd })
    form.logo = res.url || ''
    if (form.logo) {
      showToast('Logo uploaded successfully')
    } else {
      showToast('Upload failed', 'error')
    }
  } catch {
    showToast('Upload failed', 'error')
  } finally {
    e.target.value = ''
  }
}

const onDrop = (e) => {
  const file = e.dataTransfer.files[0]; if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => { form.logo = ev.target.result }
  reader.readAsDataURL(file)
}

// ── Toast ─────────────────────────────────────────────────
const showToast = (message, type = 'success') => {
  Object.assign(toast, { show: true, message, type })
  setTimeout(() => { toast.show = false }, 3000)
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