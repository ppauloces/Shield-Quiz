<script setup>
import { ref, onMounted } from 'vue';
import PlayerInput from './components/PlayerInput.vue';
import Game from './components/Game.vue';
// Cria uma referência para armazenar o nome do jogador
const playerName = ref('');

// Tempo de expiração em milissegundos (exemplo: 1 hora)
const EXPIRATION_TIME = 60 * 60 * 1000;

// Função para salvar o nome do jogador no localStorage com um timestamp
function setPlayerName(name) {
  const now = new Date().getTime();
  const data = {
    name: name,
    timestamp: now
  };
  localStorage.setItem('playerName', JSON.stringify(data));
  playerName.value = name;
}

// Função para carregar o nome do jogador do localStorage
function loadPlayerName() {
  const data = JSON.parse(localStorage.getItem('playerName'));
  if (data) {
    const now = new Date().getTime();
    // Verifica se o dado está expirado
    if (now - data.timestamp < EXPIRATION_TIME) {
      playerName.value = data.name;
    } else {
      // Remove o dado expirado
      localStorage.removeItem('playerName');
    }
  }
}

// Carrega o nome do jogador ao montar o componente
onMounted(() => {
  loadPlayerName();
});
</script>

<template>
  <div id="app">
    <div v-if="!playerName">
      <PlayerInput @submitName="setPlayerName" />
    </div>
    <div v-else>
      <Game :playerName="playerName" />
    </div>
  </div>
</template>


