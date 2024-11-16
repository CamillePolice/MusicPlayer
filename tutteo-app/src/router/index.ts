import AudioPlayerView from '@/views/AudioPlayerView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'AudioPlayerView',
      component: AudioPlayerView,
    },
  ],
})

export default router
