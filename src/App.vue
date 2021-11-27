<template>
  <NavBar />
  <main class="px-7 py-10">
    <router-view />
    <Footer />
  </main>
</template>

<script setup lang="ts">
useHead({
  meta: [
    { property: 'og:title', content: 'Likid' },
    { property: 'og:image', content: 'https://jovial-almeida-738c2e.netlify.app/wechat.pngavatar.png' },
  ],
})
</script>

