<template>
  <div class="page">
    <Navbar />
    <main class="container">
      <h1 class="title">Lista de Posts</h1>
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import Navbar from "../components/Navbar.vue"
import PostCard from "../components/PostCard.vue"

const posts = ref([])

function loadPosts() {
  const stored = localStorage.getItem("posts")
  return stored ? JSON.parse(stored) : []
}

onMounted(() => {
  posts.value = loadPosts()
})
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f1f5f9;
}

.container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #0f172a;
  margin-bottom: 2rem;
  text-align: center;
}
</style>
