<template>
  <div class="playlist">
    <ul>
      <li v-for="(music, index) in musics" :key="music.musicPath"
        class="playlist-item flex items-center gap-4 p-2 rounded-lg">
        <input type="checkbox"
          class="playlist-checkbox w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          v-model="selectedMusics" :value="index" />
        <img v-if="music.coverPath" :src="music.coverPath" alt="Cover for {{ music.songName }}"
          class="playlist-cover w-20 h-20 rounded-lg object-cover shadow-md" />
        <div class="playlist-info">
          <strong class="block text-lg font-semibold">{{ music.songName }}</strong>
          <p class="text-sm text-gray-500">{{ music.artist }}</p>
        </div>
      </li>
    </ul>
    <!-- Center the button -->
    <div class="flex justify-center mt-4">
      <button
        class="validate-button px-4 py-2 bg-gray-400 text-white rounded shadow hover:bg-gray-700 focus:ring-2 focus:ring-blue-500"
        @click="validatePlaylist">
        Listen the Playlist
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Music } from '../types/music.types';

const { musics } = defineProps<{
  musics: Music[];
}>();

const selectedMusics = ref<number[]>([]);
const emit = defineEmits(['run-songs']);

const validatePlaylist = () => {
  const selectedSongs = selectedMusics.value.map((index) => musics[index]);
  emit('run-songs', selectedSongs);
};
</script>

<style scoped>
/* Playlist container */
.playlist {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Playlist items */
.playlist-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* Cover image styling */
.playlist-cover {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

/* Text info styling */
.playlist-info {
  display: flex;
  flex-direction: column;
}

.playlist-info strong {
  font-size: 16px;
  line-height: 1.2;
}

.playlist-info p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

/* Button styling */
.validate-button {
  align-self: center;
}
</style>
