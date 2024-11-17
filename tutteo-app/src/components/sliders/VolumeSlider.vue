<template>
  <div class="flex items-center w-full">
    <!-- Sound Icon -->
    <font-awesome-icon icon="volume-up" class="text-gray-300 mr-4 text-lg" />

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

const emitVolumeChange = () => {
  emit('volume-change', volume.value);
};
</script>

<style scoped></style>
