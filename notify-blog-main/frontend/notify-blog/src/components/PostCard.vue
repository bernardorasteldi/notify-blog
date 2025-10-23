<template>
  <div class="post-card">
    <h2>{{ post.title }}</h2>
    <p class="meta">Por {{ post.author }} em {{ formatDate(post.date) }}</p>
    <p>{{ post.content }}</p>
  </div>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  }
})

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString("pt-BR")
}
</script>

<style scoped>
.post-card {
  background: #ffffff; /* fundo branco */
  color: #1e293b;      /* texto escuro */
  border: 1px solid #e2e8f0;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.post-card h2 {
  margin-bottom: 0.5rem;
}

.meta {
  font-size: 0.9rem;
  color: #64748b; /* cinza médio */
  margin-bottom: 1rem;
}
</style>
