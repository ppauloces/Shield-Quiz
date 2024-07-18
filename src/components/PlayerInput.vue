<script setup>
import { ref } from 'vue';
import ArrowRightThickIcon from './icons/ArrowRightThickIcon.vue';

const playerName = ref('');

const emit = defineEmits(['submitName']);

function submitName() {
  if (playerName.value.trim() !== '') {
    emit('submitName', playerName.value);
    playerName.value = '';
  } else {
    alert('Por favor, digite um nome');
  }
}
</script>

<template>
  <div class="player-input-container">
    <div class="flex items-center justify-center h-screen">
      <input v-model="playerName" type="text" placeholder="Digite seu nome"
        class="player-input p-2 border border-gray-300 rounded-md bg-gray-800 text-white mr-2" />
      <button @click="submitName"
        class="player-button">
        <ArrowRightThickIcon></ArrowRightThickIcon>
      </button>
    </div>
  </div>
</template>

<style scoped>
.player-input-container {
  background-color: #1B1B1B;
  @apply flex flex-col items-center justify-center h-screen text-white;
}

.player-input {
  @apply p-2 border border-gray-300 rounded-md bg-gray-800 text-white;
}

.player-button {
  @apply bg-indigo-500 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700;
}
</style>
