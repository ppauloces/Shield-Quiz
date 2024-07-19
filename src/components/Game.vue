<script setup>
import { defineProps, ref, onMounted } from 'vue';

// Define as propriedades esperadas
const props = defineProps({
  playerName: String
});

// Importa o JSON com as imagens em Base64
import base64Images from '../encoded_images.json'; // ajuste o caminho conforme necessário

const selectedImage = ref(null);
const buttonData = ref([]);
const score = ref(0);
const buttonsDisabled = ref(false);

function loadScore() {
  const savedScore = localStorage.getItem('score');
  if (savedScore) {
    score.value = parseInt(savedScore, 10);
  }
}

function saveScore() {
  localStorage.setItem('score', score.value.toString());
}

function clearGameData() {
  localStorage.removeItem('score');
  localStorage.removeItem('playerName');
  score.value = 0;
}

function prepareGameData() {
  const imageKeys = Object.keys(base64Images);
  const randomIndex = Math.floor(Math.random() * imageKeys.length);
  const selectedImageName = imageKeys[randomIndex];
  selectedImage.value = {
    name: selectedImageName.split('.').shift().replace('-', ' ').toUpperCase(),
    path: base64Images[selectedImageName]
  };

  // Embaralhar as imagens
  const shuffledImageNames = imageKeys.sort(() => Math.random() - 0.5);
  const randomButtonImages = shuffledImageNames.filter(img => img !== selectedImageName).slice(0, 7);

  // Adicionar a imagem selecionada aleatoriamente nos botões
  randomButtonImages.push(selectedImageName);

  buttonData.value = randomButtonImages.sort(() => Math.random() - 0.5).map(button => ({
    name: button.split('.').shift().replace('-', ' ').toUpperCase(),
    path: base64Images[button],
    isCorrect: button === selectedImageName,
    isClicked: false
  }));

  buttonsDisabled.value = false;
}

onMounted(() => {
  loadScore();
  prepareGameData();
});

function handleButtonClick(button) {
  if (buttonsDisabled.value) return;

  buttonsDisabled.value = true;
  button.isClicked = true;

  if (button.isCorrect) {
    score.value += 10;
    saveScore();
  } else {
    // Marcar o botão correto se o usuário errar
    buttonData.value.forEach(btn => {
      if (btn.isCorrect) {
        btn.isClicked = true;
      }
    });
  }

  // Esperar 1 segundo para mostrar a resposta e iniciar um novo jogo
  setTimeout(() => {
    prepareGameData();
  }, 1000);
}

function handleRestart() {
  clearGameData();
  location.reload(); // Recarrega a página para voltar à tela inicial
}
</script>

<template>
  <div class="game-container">
    <button @click="handleRestart" class="restart-button">
      Reiniciar
    </button>
    <div class="score-box">
      <p class="player-name">Jogador: {{ props.playerName }}</p>
      <p class="score">Pontuação: {{ score }}</p>
    </div>
    <div class="shield-box">
      <!-- Imagem do escudo aleatório -->
      <img :src="selectedImage?.path" alt="Escudo" class="shield-image" />
    </div>

    <div class="button-grid">
      <button
        v-for="button in buttonData"
        :key="button.name"
        :class="{
          'bg-green-500 text-white font-bold py-4 px-4 rounded': button.isClicked && button.isCorrect,
          'bg-red-500 text-white font-bold py-4 px-4 rounded': button.isClicked && !button.isCorrect,
          'bg-indigo-500 text-white font-bold py-4 px-4 rounded': !button.isClicked
        }"
        :disabled="buttonsDisabled"
        @click="handleButtonClick(button)"
      >
        {{ button.name }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.game-container {
  @apply flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 text-white;
  position: relative; /* Adiciona posição relativa para posicionar o botão de reinício */
}

.shield-box {
  @apply mb-8;
}

.shield-image {
  @apply w-64 h-64;
  filter: blur(10px); /* Ajuste o valor do desfoque conforme necessário */
  cursor: default;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
}

.button-grid {
  @apply grid grid-cols-4 gap-4;
}

/* Media query para telas menores */
@media (max-width: 640px) {
  .button-grid {
    @apply grid-cols-2; /* Exibir 2 botões por linha em telas menores */
  }
}

.game-button {
  @apply bg-indigo-500 text-white font-bold py-4 px-4 rounded hover:bg-indigo-700;
}

.score-box {
  @apply mb-14 p-3 rounded text-center opacity-75;
  border: 1px solid #ffffff;
}
@media (max-width: 768px) { /* Para telas menores que 768px */
  .score-box {
    @apply mr-16;
    /* Ajuste a margem esquerda conforme necessário */
  }
}

@media (min-width: 769px) { /* Para telas maiores ou iguais a 769px */
  .score-box {
    @apply mr-0;
  }
}
.player-name, .score {
  @apply text-xl font-semibold;
}

.player-name {
  @apply mb-2;
}

.score {
  @apply text-2xl;
}

/* Estilo para o botão de reinício */
.restart-button {
  @apply absolute top-4 right-4 bg-red-400 text-white font-bold py-2 px-4 rounded hover:bg-red-600;
}
</style>
