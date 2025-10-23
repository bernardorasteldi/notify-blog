<template>
  <div class="page">
    <Navbar />
    <main class="container">
      <h1 class="title">Notificações</h1>

      <div v-if="notifications.length > 0">
        <div
          v-for="(n, index) in notifications"
          :key="index"
          class="notification-card"
        >
          <p>{{ n.message }}</p>
          <span class="time">{{ formatDate(n.date) }}</span>
        </div>
      </div>
      <p v-else class="empty">Nenhuma notificação no momento.</p>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import Navbar from "../components/NavBar.vue"

const notifications = ref([])

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })
}

async function loadNotifications() {
  try {
    const response = await fetch("http://localhost:3000/api/notifications")
    if (!response.ok) {
      throw new Error("Falha ao carregar notificações")
    }
    notifications.value = await response.json() 
  } catch (error) {
    console.error("Erro ao buscar notificações:", error)
  }
}

onMounted(() => {
  loadNotifications()
})
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
}

.title {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #0f172a;
}

.notification-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notification-card p {
  margin: 0;
  color: #1e293b;
  font-weight: 500;
}

.time {
  font-size: 0.85rem;
  color: #64748b;
}

.empty {
  text-align: center;
  color: #475569;
}
</style>