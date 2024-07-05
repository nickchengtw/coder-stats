// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import MyFriends from '../pages/MyFriends.vue';
import PublicScoreboard from '../pages/PublicScoreboard.vue';

const routes = [
  {path: '/', component: MyFriends},
  {path: '/my-friends', component: MyFriends},
  {path: '/public/:id', component: PublicScoreboard},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
