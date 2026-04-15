<<<<<<< HEAD
=======
<<<<<<< HEAD
<script setup>
if (process.client) {
  const user = localStorage.getItem('user')

  if (user) {
    navigateTo('/dashboard')
  } else {
    navigateTo('/login')
  }
}
=======
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
<script setup>
if (process.client) {
  const user = localStorage.getItem('user')

  if (user) {
    navigateTo('/dashboard')
  } else {
    navigateTo('/login')
  }
}
<<<<<<< HEAD
=======
>>>>>>> menu
>>>>>>> 07d11d8f2525a4b7acbde2b15c0d57ac579f96fd
</script>