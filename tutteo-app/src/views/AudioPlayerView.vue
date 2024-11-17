<template>
  <div class="audio-player-view flex flex-col md:flex-row h-screen">
    <!-- Player Section -->
    <div class="player flex-1 md:w-2/3 lg:w-3/4 p-4">
      <Player :selectedSongs="selectedSongs" />
    </div>

    <!-- Playlist Section -->
    <div class="playlist flex-1 md:w-1/3 lg:w-1/4 p-4 flex items-center justify-center">
      <Playlist :musics="musics" @run-songs="handleRunSongs" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getMusics } from '@/services/music.services';
import type { Music } from '@/types/music.types'
import Player from '@/components/Player.vue';
import Playlist from '@/components/Playlist.vue';

const musics = ref<Music[]>([]);
const selectedSongs = ref<Music[]>([]);

onMounted(async () => {
  musics.value = await getMusics();
});

const handleRunSongs = (songs: Music[]) => {
  selectedSongs.value = songs;
};

</script>

<style scoped>
/* Custom styles for the component */
.audio-player-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* Small screens: stack the player and playlist */
@media (max-width: 768px) {
  .audio-player-view {
    flex-direction: column;
  }
}

/* Medium and larger screens: player and playlist side-by-side */
@media (min-width: 768px) {
  .audio-player-view {
    flex-direction: row;
  }

  .player {
    width: 66.67%;
    /* 2/3 width */
  }

  .playlist {
    width: 33.33%;
    /* 1/3 width */
  }
}

/* Large screens: adjust proportions */
@media (min-width: 1024px) {
  .player {
    width: 75%;
    /* 3/4 width */
  }

  .playlist {
    width: 25%;
    /* 1/4 width */
  }
}
</style>
