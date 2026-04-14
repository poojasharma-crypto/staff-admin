<script setup>
if (process.client) {
  const user = localStorage.getItem('user')

  if (user) {
    navigateTo('/dashboard')
  } else {
    navigateTo('/login')
  }
}
</script>