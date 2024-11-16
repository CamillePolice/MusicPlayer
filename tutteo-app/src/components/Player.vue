<template>
  <div class="player">
    <h1 class="text-lg font-semibold mb-4">Now Playing</h1>
    <div class="flex gap-4">
      <!-- Add type="button" to all buttons -->
      <button type="button" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Previous
      </button>
      <button type="button" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Lecture
      </button>
      <button type="button" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped></style>
