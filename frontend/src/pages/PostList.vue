<template>
  <div class="page">
    <Navbar />
    <main class="container">
      <h1 class="title">Lista de Posts</h1>

      <!-- Se não houver posts -->
      <div v-if="posts.length === 0" class="empty-state">
        <p>Nenhum post no momento.</p>
        <button @click="goToCreatePost">Criar novo post</button>
      </div>

      <!-- Lista de posts -->
      <PostCard
        v-else
        v-for="post in posts"
        :key="post._id"
        :post="post"
        @delete="deletePost"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import Navbar from "../components/NavBar.vue"
import PostCard from "../components/PostCard.vue"

const posts = ref([])
const router = useRouter()

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

async function deletePost(postId) {
  const index = posts.value.findIndex(p => p._id === postId)
  if (index === -1) return
  const removedPost = posts.value.splice(index, 1)[0]

  try {
    const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("Falha ao excluir o post no servidor.")
    }
  } catch (error) {
    console.error(error)
    posts.value.splice(index, 0, removedPost)
    alert("Não foi possível excluir o post. Tente novamente.")
  }
}

// Redireciona para a página de criação de post
function goToCreatePost() {
  router.push("/new-post")
}
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

.empty-state {
  text-align: center;
  margin-top: 4rem;
}

.empty-state p {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.empty-state button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.50rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.empty-state button:hover {
  background-color: #2563eb;
}
</style>
