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
import Navbar from "../components/NavBar.vue"
import PostCard from "../components/PostCard.vue"

const posts = ref([])

async function loadPosts() {
  try {
    const response = await fetch("http://localhost:3000/api/posts")
    if (!response.ok) {
      throw new Error("Falha ao carregar posts. Verifique se o backend está rodando em http://localhost:3000.")
    }
    posts.value = await response.json()
  } catch (error) {
    console.error("Erro ao buscar posts:", error)

  }
}

onMounted(() => {
  loadPosts()
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