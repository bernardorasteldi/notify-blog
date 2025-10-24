<template>
  <div class="post-card" :class="{ deleting: isDeleting }">
    <!-- Botão flutuante com ícone de lixeira -->
    <button class="delete-btn" @click="confirmDelete" aria-label="Excluir post">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M3 6h18v2H3V6zm2 3h14v13H5V9zm3 3v7h2v-7H8zm4 0v7h2v-7h-2zm4 0v7h2v-7h-2z"/>
      </svg>
    </button>

    <h2>{{ post.title }}</h2>
    <p class="meta">Por {{ post.author }} em {{ formatDate(post.date) }}</p>
    <p>{{ post.content }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Desestruturando a prop para usar 'post'
const { post } = defineProps({
  post: { type: Object, required: true }
})

// Cria a referência ao emit
const emit = defineEmits(['delete'])

const isDeleting = ref(false)

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString("pt-BR")
}

// Função que confirma e inicia animação de exclusão
function confirmDelete() {
  if (confirm('Tem certeza que deseja excluir este post?')) {
    // Inicia animação de fade out
    isDeleting.value = true

    // Aguarda a animação antes de emitir evento
    setTimeout(() => {
      emit('delete', post._id)
    }, 300) // tempo da animação
  }
}
</script>

<style scoped>
.post-card {
  position: relative;
  background: #ffffff;
  color: #1e293b;
  border: 1px solid #e2e8f0;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s, opacity 0.3s, height 0.3s, margin-bottom 0.3s, padding 0.3s;
}

.post-card.deleting {
  opacity: 0;
  height: 0;
  margin-bottom: 0;
  padding: 0;
  border: 0;
  overflow: hidden;
}

.post-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.post-card h2 {
  margin-bottom: 0.5rem;
}

.meta {
  font-size: 0.9rem;
  color: #64748b;
  margin-bottom: 1rem;
}

.delete-btn {
  position: absolute;
  top: 40%;
  right: 10px;
  background: #e26969;
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  transform-origin: center;
}

.delete-btn:hover {
  background: #dc2626;
}

.delete-btn svg {
  pointer-events: none;
}
</style>
