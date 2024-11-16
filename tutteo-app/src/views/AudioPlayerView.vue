<template>
  <div class="audio-player-view">
    <div class="player">
      <Player :selectedSongs="selectedSongs" />
    </div>
    <div class="playlist">
      <Playlist :musics="musics" @run-songs="handleRunSongs" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getMusics } from '../services/music.services';
import { ref, onMounted } from 'vue';
import Player from '../components/Player.vue';
import Playlist from '../components/Playlist.vue';
import type { Music } from '../types/music.types'

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
.audio-player-view {
  display: flex;
  /* Enable horizontal layout */
  height: 100vh;
  /* Full page height */
}

.player {
  flex: 1;
  /* Take up half the horizontal space */
  display: flex;
  justify-content: center;
  align-items: center;
  /* Example background color */
}

.playlist {
  flex: 1;
  /* Take up the other half */
  display: flex;
  justify-content: center;
  align-items: center;
  /* Example background color */
}

@media (max-width: 768px) {
  .audio-player-view {
    flex-direction: column;
  }

  .player,
  .playlist {
    flex: unset;
    width: 100%;
    height: 50vh;
    /* Split height in two */
  }
}
</style>
