import { createRouter, createWebHistory } from 'vue-router';
import AccountView from '@/views/AccountView.vue';
import TestView from '@/views/TestView.vue';
import AuthView from '@/views/AuthView.vue';
import HomeView from '@/views/HomeView.vue';
import SettingsView from "@/views/SettingsView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView
  },
  {
    path: '/account',
    name: 'account',
    component: AccountView
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView
  },
  {
    path: '/test',
    name: 'test',
    component: TestView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
