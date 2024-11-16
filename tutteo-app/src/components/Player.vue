<template>
  <div class="flex flex-col items-center justify-center h-screen text-white">
    <!-- Music Cover -->
    <div v-if="currentSong" class="mb-6">
      <img :src="currentSong.coverPath" alt="Cover for {{ currentSong.songName }}"
        class="w-48 h-48 rounded-md shadow-lg object-cover" />
    </div>
    <div v-else class="mb-6">
      <div class="w-48 h-48 rounded-md shadow-lg bg-gray-800 flex items-center justify-center">
        <p class="text-gray-400">No Song Selected</p>
      </div>
    </div>

    <!-- Song Info -->
    <h1 class="text-lg font-semibold mb-2 text-center">
      {{ currentSong?.songName || 'No Song Selected' }}
    </h1>
    <p class="text-sm text-gray-400 mb-4">
      {{ currentSong?.artist || '' }}
    </p>

    <!-- Playback Controls -->
    <div class="flex items-center gap-6">
      <!-- Previous Button -->
      <button type="button"
        class="bg-gray-700 text-white w-12 h-12 flex items-center justify-center rounded-full hover:bg-blue-500 transition"
        @click="playPrevious">
        <font-awesome-icon icon="backward" size="lg" />
      </button>

      <!-- Play/Pause Toggle Button -->
      <button type="button"
        class="bg-gray-700 text-white w-16 h-16 flex items-center justify-center rounded-full hover:bg-blue-500 transition"
        @click="togglePlayPause" :disabled="!currentSong">
        <font-awesome-icon :icon="isPlaying ? 'pause' : 'play'" size="lg" />
      </button>

      <!-- Next Button -->
      <button type="button"
        class="bg-gray-700 text-white w-12 h-12 flex items-center justify-center rounded-full hover:bg-blue-500 transition"
        @click="playNext">
        <font-awesome-icon icon="forward" size="lg" />
      </button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue';
import { Howl } from 'howler';
import type { Music } from '../types/music.types'

// Props: Receive selected songs from the parent
const { selectedSongs } = defineProps<{
  selectedSongs: Music[];
}>();

// Reactive state
const isPlaying = ref(false);
const currentIndex = ref(0);
const currentSong = ref<Music | null>(null);

let sound: Howl | null = null;

// Watch for changes in selectedSongs and reset the player
watch(
  () => selectedSongs,
  (newSongs) => {

    if (newSongs.length > 0) {
      currentIndex.value = 0;
      currentSong.value = newSongs[0];
      loadSong(currentSong.value);
    } else if (sound) {
      stopPlayback();
    }
  },
  { immediate: true }
);

// Function to load a new song into the Howl instance
function loadSong(song: Music | null) {
  if (sound) {
    sound.unload(); // Unload the current sound
  }
  if (song) {
    sound = new Howl({
      src: [song.musicPath],
      onload: () => {
        console.log(`Loaded: ${song.songName}`);
      },
      onloaderror: (id, error) => {
        console.error('Failed to load audio:', error);
      },
    });
  }
}

// Toggle play/pause
const togglePlayPause = () => {
  if (!sound) return;

  if (isPlaying.value) {
    sound.pause();
    console.log('Paused');
  } else {
    sound.play();
    console.log('Playing');
  }
  isPlaying.value = !isPlaying.value;
};

const playNext = () => {
  if (currentIndex.value < selectedSongs.length - 1) {
    currentIndex.value++;
    currentSong.value = selectedSongs[currentIndex.value];
    loadSong(currentSong.value);
  } else {
    currentIndex.value = 0;
    currentSong.value = selectedSongs[0];
    loadSong(currentSong.value);
  }

  if (isPlaying.value) sound?.play();
};

// Play the previous song
const playPrevious = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    currentSong.value = selectedSongs[currentIndex.value];
    loadSong(currentSong.value);
  } else {
    currentIndex.value = selectedSongs.length - 1;
    currentSong.value = selectedSongs[selectedSongs.length - 1];
    loadSong(currentSong.value);
  }

  if (isPlaying.value) sound?.play();
};

// Stop playback and reset the player
const stopPlayback = () => {
  if (sound) {
    sound.stop();
    sound.unload();
    sound = null;
  }
  isPlaying.value = false;
  currentIndex.value = 0;
  currentSong.value = null;
};
</script>


<style scoped></style>
