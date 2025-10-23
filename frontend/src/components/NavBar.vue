<template>
  <nav class="navbar">
    <h1>Notify Blog</h1>
    <ul>
      <li><RouterLink to="/">Posts</RouterLink></li>
      <li><RouterLink to="/new-post">Novo Post</RouterLink></li>
      <li><RouterLink to="/notifications">Notificações</RouterLink></li>
    </ul>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router"
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #1e293b;
  color: #f8fafc;
}

.navbar h1 {
  font-size: 1.5rem;
  font-weight: bold;
}

.navbar ul {
  list-style: none;
  display: flex;
  gap: 1.5rem;
}

.navbar a {
  color: #f8fafc;
  text-decoration: none;
  font-weight: 500;
}

.navbar a:hover {
  color: #38bdf8;
}
</style>
