import { createRouter, createWebHistory } from "vue-router"
import PostList from "../pages/PostList.vue"
import PostForm from "../pages/PostForm.vue"
import PostNotificacion from "../pages/PostNotification.vue"

const routes = [
  { path: "/", name: "posts", component: PostList },
  { path: "/new-post", name: "new-post", component: PostForm },
  { path: "/notifications", name: "notifications", component: PostNotificacion },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
