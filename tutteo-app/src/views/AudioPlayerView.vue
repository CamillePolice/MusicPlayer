<template>
    <div class="audio-player-view">
        <div class="player">
            <Player />
        </div>
        <div class="playlist">
            <Playlist />
        </div>
    </div>
</template>

<script setup lang="ts">
import Player from '../components/Player.vue';
import Playlist from '../components/Playlist.vue';

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
</style>