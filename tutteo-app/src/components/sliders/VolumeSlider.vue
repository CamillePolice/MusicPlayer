<template>
  <div class="flex items-center w-full">
    <font-awesome-icon :icon="isMuted ? 'volume-mute' : 'volume-up'" class="text-gray-300 mr-4 text-lg cursor-pointer"
      @click="muteOrUnMute" />

    <!-- Volume Slider -->
    <Slider id="volume-slider" v-model="volume" :min="0" :max="100" :step="1" class="flex-1"
      @change="emitVolumeChange" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Slider from 'primevue/slider';

const { initialVolume } = defineProps<{
  initialVolume: number | number[]
}>();

const emit = defineEmits(['volume-change']);

const volume = ref(initialVolume);
const isMuted = ref(false);
const previousVolume = ref(initialVolume);

const muteOrUnMute = () => {
  if (isMuted.value) {
    volume.value = previousVolume.value;
  } else {
    previousVolume.value = volume.value;
    volume.value = 0;
  }
  isMuted.value = !isMuted.value;
  emitVolumeChange();
}

const emitVolumeChange = () => {
  emit('volume-change', volume.value);
};

</script>

<style scoped></style>
