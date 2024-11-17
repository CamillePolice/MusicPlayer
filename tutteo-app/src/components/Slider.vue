<template>
  <div class="slider-container w-full max-w-md mx-auto px-4 mb-4">
    <Slider v-model="currentPosition" :min="0" :max="duration" :step="1" @update:modelValue="handleSliderChange"
      class="mb-2" />
    <div class="flex justify-between text-sm text-gray-400">
      <span>{{ formatTime(currentPosition) }}</span>
      <span>{{ formatTime(duration) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import Slider from 'primevue/slider';
import type { Howl } from 'howler';
import { formatTime } from '@/utils/date.util';

const { sound, isPlaying } = defineProps<{
  sound?: Howl | null;
  isPlaying?: boolean;
}>();

const currentPosition = ref(0);
const duration = ref(0);
let progressInterval: number | null = null;

onMounted(() => {
  if (sound && isPlaying) {
    startProgressTracking();
  }
});

onUnmounted(() => {
  stopProgressTracking();
});

/**
 * Catch the value of the slider to update the music
 *
 * @param value
 * @returns void
 */
const handleSliderChange = (value: number) => {
  if (sound) {
    sound.seek(value);
  }
};

/**
 * Start the progression of the slider.
 * Links the value to the music
 *
 * @returns void
 */
const startProgressTracking = () => {
  if (progressInterval) clearInterval(progressInterval);
  progressInterval = window.setInterval(() => {
    if (sound) {
      currentPosition.value = sound.seek();
      duration.value = sound.duration();
    }
  }, 100);
};

/**
 * Stop the progression of the slider.
 * Links the value to the music
 *
 * @returns void
 */
const stopProgressTracking = () => {
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
};

/**
 * Bind the slider to the music
 */
watch(() => sound, (newSound) => {
  if (newSound) {
    duration.value = newSound.duration();
    currentPosition.value = newSound.seek();
    if (isPlaying) {
      startProgressTracking();
    }
  } else {
    stopProgressTracking();
    currentPosition.value = 0;
    duration.value = 0;
  }
});

/**
 * Bind the slider to the lecture button
 */
watch(() => isPlaying, (newIsPlaying) => {
  if (newIsPlaying) {
    startProgressTracking();
  } else {
    stopProgressTracking();
  }
});
</script>
