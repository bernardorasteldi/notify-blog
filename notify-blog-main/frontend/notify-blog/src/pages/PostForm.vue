<template>
  <div class="page">
    <Navbar />
    <main class="container">
      <h1 class="title">Criar Novo Post</h1>

      <form @submit.prevent="handleSubmit" class="form">
        <div class="form-group">
          <label for="title">Título</label>
          <input v-model="form.title" type="text" id="title" required />
        </div>

        <div class="form-group">
          <label for="author">Autor</label>
          <input v-model="form.author" type="text" id="author" required />
        </div>

        <div class="form-group">
          <label for="content">Conteúdo</label>
          <textarea v-model="form.content" id="content" rows="6" required></textarea>
        </div>

        <button type="submit" class="btn">Publicar</button>
      </form>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import Navbar from "../components/NavBar.vue"

const router = useRouter()

const form = ref({
  title: "",
  author: "",
  content: ""
})

async function handleSubmit() {
  try {
    const response = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form.value) 
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Falha ao criar o post. Tente novamente.")
    }

    form.value = { title: "", author: "", content: "" }

    router.push("/")

  } catch (error) {
    console.error("Erro ao publicar o post:", error)
    alert(error.message)
  }
}
</script>


<style scoped>
.page {
  min-height: 100vh;
  background: #f1f5f9;
}

.container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.title {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #0f172a;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.3rem;
  font-weight: 500;
  color: #334155;
}

input, textarea {
  padding: 0.6rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 1rem;
}

input:focus, textarea:focus {
  border-color: #38bdf8;
  outline: none;
}

.btn {
  padding: 0.8rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

.btn:hover {
  background: #1d4ed8;
}
</style>