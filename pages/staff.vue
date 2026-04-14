<template>
  <div class="app">
    <main class="main">
      <header class="page-header">
        <div class="page-header-left">
          <span class="breadcrumb">Master Data</span>
          <span class="breadcrumb-sep">/</span>
          <h1 class="page-title">Staff</h1>
        </div>
        <div class="page-header-right">
          <div class="search-wrap">
            <svg class="search-icon" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input v-model="search" placeholder="Search staff..." class="search-input" />
          </div>
          <button @click="openCreate" class="btn-add">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
            Add Staff
          </button>
        </div>
      </header>

      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-label">Total Staff</div>
          <div class="stat-value">{{ rows.length }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Departments</div>
          <div class="stat-value">{{ uniqueDepartments }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Monthly Salary</div>
          <div class="stat-value">{{ countSalaryType('monthly') }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Weekly Salary</div>
          <div class="stat-value">{{ countSalaryType('weekly') }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Daily Salary</div>
          <div class="stat-value">{{ countSalaryType('daily') }}</div>
        </div>
      </div>

      <div class="table-card">
        <div class="table-meta">
          <span class="table-count">{{ filtered.length }} result{{ filtered.length !== 1 ? 's' : '' }}</span>
        </div>

        <div class="table-scroll">
          <table class="table">
            <thead>
              <tr>
                <th class="th-num">#</th>
                <th>Company</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Department</th>
                <th>Designation</th>
                <th class="th-action">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filtered.length === 0">
                <td colspan="8" class="empty-state">
                  <div class="empty-inner">
                    <p>No staff found</p>
                    <button @click="openCreate" class="btn-add-sm">+ Add your first staff</button>
                  </div>
                </td>
              </tr>

              <tr v-for="(r, i) in paginated" :key="r.id" class="tbody-row">
                <td class="td-num">{{ ((currentPage - 1) * pageSize) + i + 1 }}</td>
                <td>{{ r.company_name || '—' }}</td>
                <td><span class="company-name">{{ r.name }}</span></td>
                <td>{{ r.email }}</td>
                <td class="mono">{{ r.mobile || '—' }}</td>
               <td>{{ r.department_name || '—' }}</td>
                <td>{{ r.designation || '—' }}</td>
                <td>
                  <div class="action-group">
                      <!-- VIEW -->
                    <button @click="openView(r)" class="btn-icon btn-icon-view" title="View">
    <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  </button>

                    <button @click="openEdit(r)" class="btn-icon btn-icon-edit" title="Edit">
                      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button @click="deleteStaff(r.id)" class="btn-icon btn-icon-del" title="Delete">
                      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="filtered.length > 0" class="pagination-wrap">
          <span class="pagination-meta">Showing {{ startRow }}-{{ endRow }} of {{ filtered.length }}</span>
          <div class="pagination-controls">
            <button class="page-btn" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">Prev</button>
            <button
              v-for="p in totalPages"
              :key="p"
              class="page-btn"
              :class="{ 'page-btn-active': p === currentPage }"
              @click="goToPage(p)"
            >
              {{ p }}
            </button>
            <button class="page-btn" :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">Next</button>
          </div>
        </div>
      </div>
    </main>

    <Transition name="fade">
      <div v-if="showForm" class="overlay" @click.self="closeForm">
        <Transition name="slide-up">
          <div v-if="showForm" class="modal staff-modal">
            <div class="modal-header">
              <div>
                <p class="modal-sub">{{ form.id ? 'Editing record' : 'New entry' }}</p>
                <h2 class="modal-title">{{ form.id ? 'Edit Staff' : 'Add Staff' }}</h2>
              </div>
              <button @click="closeForm" class="btn-close">✕</button>
            </div>

            <form class="modal-body staff-grid" @submit.prevent="saveStaff">
              <div class="field">
                <label class="label">Company <span class="req">*</span></label>
                <select v-model="form.company_id" class="input" required>
                  <option value="" disabled>Select company...</option>
                  <option v-for="c in companies" :key="c.id" :value="c.id">{{ c.name }}</option>
                </select>
              </div>
              <div class="field">
                <label class="label">Name <span class="req">*</span></label>
                <input v-model="form.name" class="input" required />
              </div>
              <div class="field">
                <label class="label">Email <span class="req">*</span></label>
                <input v-model="form.email" type="email" class="input" required />
              </div>
              <div class="field">
                <label class="label">Mobile</label>
                <input v-model="form.mobile" class="input" />
              </div>
             <div class="field">
  <label class="label">Department</label>
 <select
  v-model="form.department_id"
  class="input"
  :disabled="!form.company_id"
>
  <option value="">
    {{ form.company_id ? 'Select department...' : 'Select company first' }}
  </option>

  <option
    v-for="d in filteredDepartments"
    :key="d.id"
    :value="d.id"
  >
    {{ d.department_name }}
  </option>
</select>
</div>
              <div class="field">
                <label class="label">Designation</label>
                <input v-model="form.designation" class="input" />
              </div>
              <div class="field">
                <label class="label">Join Date</label>
                <input v-model="form.join_date" type="date" class="input" />
              </div>
              <div class="field">
                <label class="label">Salary</label>
                <input v-model.number="form.salary" type="number" min="0" class="input" />
              </div>
              <div class="field">
                <label class="label">Salary Type</label>
                <select v-model="form.salary_type" class="input">
                  <option value="">Select type...</option>
                  <option value="monthly">Monthly</option>
                  <option value="weekly">Weekly</option>
                  <option value="daily">Daily</option>
                </select>
              </div>
              <div class="field">
                <label class="label">Username <span class="req">*</span></label>
                <input v-model="form.username" class="input" required />
              </div>
              <div class="field">
                <label class="label">{{ form.id ? 'Password (optional)' : 'Password *' }}</label>
             <div class="password-wrap">
  <input
    v-model="form.password"
    :type="showPassword ? 'text' : 'password'"
    class="input password-input"
    :required="!form.id"
  />

  <span class="toggle-eye" @click="showPassword = !showPassword">
    {{ showPassword ? '🙈' : '👁️' }}
  </span>
</div>
              </div>
              <div class="field">
                <label class="label">Last Login</label>
                <input v-model="form.last_login" type="datetime-local" class="input" />
              </div>
              <div class="field">
                <label class="label">Login IP</label>
                <input v-model="form.login_ip" class="input" />
              </div>
              <div class="field">
                <label class="label">Profile Image URL</label>
                <input v-model="form.profile_image" class="input" placeholder="https://..." />
              </div>
              <div class="field staff-full">
                <label class="label">Upload Profile Image</label>
                <div :class="['upload-area', { 'upload-area-has-image': !!form.profile_image }]" @click="triggerUpload" @dragover.prevent @drop.prevent="onDropUpload">
                  <img v-if="form.profile_image" :src="resolveImageUrl(form.profile_image)" class="upload-preview" alt="Profile image preview" />
                  <div v-else class="upload-placeholder">
                    <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" style="color:#94a3b8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    <span>{{ uploadingImage ? 'Uploading image...' : 'Click or drag image here' }}</span>
                  </div>
                  <input ref="fileInput" type="file" accept="image/*" @change="uploadProfileImage" style="display:none" />
                </div>
                <button v-if="form.profile_image" type="button" @click="form.profile_image = ''" class="remove-logo">Remove image</button>
              </div>
              <div class="modal-footer staff-full">
                <button type="button" class="btn-cancel" @click="closeForm">Cancel</button>
                <button type="submit" class="btn-save">{{ form.id ? 'Update Staff' : 'Save Staff' }}</button>
              </div>
            </form>
          </div>
        </Transition>
      </div>
    </Transition>
<Transition name="slide-right">
  <div v-if="showView" class="view-overlay" @click.self="showView=false">
    
    <div class="view-panel">
      
      <!-- Header -->
      <div class="view-header">
        <h2>Staff Details</h2>
        <button class="view-close" @click="showView=false">✕</button>
      </div>

      <!-- Body -->
      <div class="view-body">

        <div class="view-img">
          <img v-if="viewData.profile_image" :src="resolveImageUrl(viewData.profile_image)" alt="Staff image" />
          <div v-else class="view-img-empty">No image</div>
        </div>

        <div class="view-item"><b>Name:</b> {{ viewData.name || '—' }}</div>
        <div class="view-item"><b>Email:</b> {{ viewData.email || '—' }}</div>
        <div class="view-item"><b>Mobile:</b> {{ viewData.mobile || '—' }}</div>

        <div class="view-item"><b>Company:</b> {{ viewData.company_name || '—' }}</div>
      <div class="view-item"><b>Department:</b> {{ viewData.department_name || '—' }}</div>
        <div class="view-item"><b>Designation:</b> {{ viewData.designation || '—' }}</div>

        <div class="view-item"><b>Join Date:</b> {{ formatDate(viewData.join_date) }}</div>
        <div class="view-item"><b>Salary:</b> {{ viewData.salary ?? '—' }}</div>
        <div class="view-item"><b>Salary Type:</b> {{ viewData.salary_type || '—' }}</div>

        <div class="view-item"><b>Username:</b> {{ viewData.username || '—' }}</div>
        <div class="view-item"><b>Last Login:</b> {{ formatDateTime(viewData.last_login) }}</div>
        <div class="view-item"><b>Login IP:</b> {{ viewData.login_ip || '—' }}</div>

      </div>

    </div>
  </div>
</Transition>
    <Transition name="toast">
      <div v-if="toast.show" :class="['toast', 'toast-' + toast.type]">{{ toast.message }}</div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
const showPassword = ref(false)
definePageMeta({ middleware: 'auth' })
const showView = ref(false)
const viewData = ref({})
const rows = ref([])
const companies = ref([])
const search = ref('')
const showForm = ref(false)
const fileInput = ref(null)
const uploadingImage = ref(false)
const toast = reactive({ show: false, message: '', type: 'success' })
const departments = ref([])
const fetchDepartments = async () => {
  departments.value = await $fetch('/api/departments')
}
const pageSize = 10
const currentPage = ref(1)

const formDefault = {
  id: null, company_id: '', name: '', email: '', mobile: '', profile_image: '',
  department_id: '', designation: '', join_date: '', salary: null, salary_type: '',
  username: '', password: '', last_login: '', login_ip: ''
}
const form = reactive({ ...formDefault })

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return rows.value
  return rows.value.filter((r) =>
    [r.name, r.email, r.mobile, r.username, r.department, r.designation, r.company_name]
      .map((v) => String(v || '').toLowerCase())
      .some((v) => v.includes(q))
  )
})
const filteredDepartments = computed(() => {
  if (!form.company_id) return []
  return departments.value.filter(
    d => d.company_id == form.company_id
  )
})

const uniqueDepartments = computed(() =>
  new Set(
    rows.value.map((r) => String(r.department_name || '').trim()).filter(Boolean)
  ).size
)
const countSalaryType = (type) => rows.value.filter((r) => String(r.salary_type || '').toLowerCase() === type).length

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))
const paginated = computed(() => filtered.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize))
const startRow = computed(() => (filtered.value.length ? (currentPage.value - 1) * pageSize + 1 : 0))
const endRow = computed(() => Math.min(currentPage.value * pageSize, filtered.value.length))

watch(search, () => { currentPage.value = 1 })
watch(filtered, (value) => {
  const pages = Math.max(1, Math.ceil(value.length / pageSize))
  if (currentPage.value > pages) currentPage.value = pages
})

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page
}

const formatDate = (v) => (!v ? '—' : new Date(v).toISOString().slice(0, 10))
const formatDateTime = (v) => {
  if (!v) return '—'
  const d = new Date(v)
  return Number.isNaN(d.getTime()) ? '—' : d.toLocaleString()
}
const toDateInput = (v) => (v ? new Date(v).toISOString().slice(0, 10) : '')
const toDateTimeInput = (v) => (v ? new Date(v).toISOString().slice(0, 16) : '')
const resolveImageUrl = (value) => {
  if (!value) return ''
  const src = String(value).trim()
  if (/^https?:\/\//i.test(src)) return src
  if (src.startsWith('/')) return src
  return `/uploads/${src}`
}

const showToast = (message, type = 'success') => {
  Object.assign(toast, { show: true, message, type })
  setTimeout(() => { toast.show = false }, 2500)
}

const resetForm = () => Object.assign(form, { ...formDefault })
const fetchStaff = async () => { rows.value = await $fetch('/api/staff') }
const fetchCompanies = async () => { companies.value = await $fetch('/api/company') }

const openCreate = () => { resetForm(); showForm.value = true }
const openEdit = (row) => {
  Object.assign(form, {
    id: row.id, company_id: row.company_id || '', name: row.name || '', email: row.email || '',
    mobile: row.mobile || '', profile_image: row.profile_image || '', department_id: row.department_id || '',
    designation: row.designation || '', join_date: toDateInput(row.join_date), salary: row.salary ?? null,
    salary_type: row.salary_type || '', username: row.username || '', password: '',
    last_login: toDateTimeInput(row.last_login), login_ip: row.login_ip || ''
  })
  showForm.value = true
}

const closeForm = () => { showForm.value = false; resetForm() }
const triggerUpload = () => fileInput.value?.click()

const uploadProfileImage = async (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  try {
    uploadingImage.value = true
    const fd = new FormData()
    fd.append('file', file)
    const res = await $fetch('/api/upload', { method: 'POST', body: fd })
    form.profile_image = res.url || ''
    showToast(form.profile_image ? 'Image uploaded' : 'Upload failed', form.profile_image ? 'success' : 'error')
  } catch (err) {
    showToast(err?.data?.statusMessage || 'Upload failed', 'error')
  } finally {
    uploadingImage.value = false
    if (fileInput.value) fileInput.value.value = ''
  }
}

const onDropUpload = async (e) => {
  const file = e.dataTransfer?.files?.[0]
  if (!file) return
  try {
    uploadingImage.value = true
    const fd = new FormData()
    fd.append('file', file)
    const res = await $fetch('/api/upload', { method: 'POST', body: fd })
    form.profile_image = res.url || ''
    showToast(form.profile_image ? 'Image uploaded' : 'Upload failed', form.profile_image ? 'success' : 'error')
  } catch (err) {
    showToast(err?.data?.statusMessage || 'Upload failed', 'error')
  } finally {
    uploadingImage.value = false
  }
}
const saveStaff = async () => {
  try {
    const payload = {
      ...form,
      company_id: Number(form.company_id),
      department_id: Number(form.department_id),
      salary_type: form.salary_type || null,
      join_date: form.join_date || null,
      last_login: form.last_login || null,
      password: form.password   // ✅ FORCE ADD
    }

    console.log("PAYLOAD:", payload)  // 🔥 DEBUG

    if (form.id) {
      await $fetch(`/api/staff/${form.id}`, {
        method: 'PUT',
        body: payload
      })
    } else {
      await $fetch('/api/staff', {
        method: 'POST',
        body: payload
      })
    }

    closeForm()
    await fetchStaff()

  } catch (err) {
    console.log("ERROR:", err)
  }
}
const openView = (row) => {
  viewData.value = row
  showView.value = true
}
const deleteStaff = async (id) => {
  if (!confirm('Delete this staff?')) return
  try {
    await $fetch(`/api/staff/${id}`, { method: 'DELETE' })
    showToast('Staff deleted')
    await fetchStaff()
  } catch {
    showToast('Delete failed', 'error')
  }
}

onMounted(async () => {
  await Promise.all([
    fetchCompanies(),
    fetchDepartments(),
    fetchStaff()
  ])
})
watch(() => form.company_id, () => {
  form.department_id = ''
})
</script>

<style scoped>
.staff-modal { max-width: 980px; }
.staff-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.staff-full { grid-column: 1 / -1; }
.staff-preview {
  border: 1.5px dashed #e2e8f0; border-radius: 10px; height: 120px;
  display: flex; align-items: center; justify-content: center; overflow: hidden;
  background: #f8fafc;
}
.staff-preview-img { width: 100%; height: 100%; object-fit: contain; }
.staff-preview-empty { color: #94a3b8; font-size: 12px; }

@media (max-width: 900px) {
  .staff-grid { grid-template-columns: 1fr; }
}
.view-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15,23,42,0.4);
  display: flex;
  justify-content: flex-end;
  z-index: 120;
}

.view-panel {
  width: 430px;
  height: 100%;
  background: white;
  padding: 20px;
  overflow-y: auto;
  box-shadow: -10px 0 30px rgba(2,6,23,0.15);
}

.view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e2e8f0;
}
.view-header h2 {
  font-size: 18px;
  font-weight: 600;
  color: #0f172a;
}
.view-close {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #64748b;
  cursor: pointer;
}

.view-body {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.view-item {
  font-size: 13px;
  color: #334155;
  padding: 8px 10px;
  border: 1px solid #f1f5f9;
  border-radius: 8px;
  background: #f8fafc;
}

.view-img {
  width: 100%;
  height: 180px;
  border-radius: 10px;
  border: 1.5px dashed #e2e8f0;
  background: #f8fafc;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2px;
}
.view-img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.view-img-empty {
  color: #94a3b8;
  font-size: 12px;
}

.btn-icon-view { background: #eff6ff; border-color: #bfdbfe; color: #2563eb; }
.btn-icon-view:hover { background: #dbeafe; }

/* Animation */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}
.slide-right-enter-from {
  transform: translateX(100%);
}
.slide-right-leave-to {
  transform: translateX(100%);
}
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
.password-wrap {
  position: relative;
}

.password-input {
  padding-right: 35px;
}

.toggle-eye {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 16px;
  color: #64748b;
}

.toggle-eye:hover {
  color: #0f172a;
}
</style>
