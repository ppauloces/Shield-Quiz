<script setup>
import { ref } from 'vue';
import ArrowRightThickIcon from './icons/ArrowRightThickIcon.vue';
import Soccer from './icons/Soccer.vue';
import PixSVG from './icons/PixSVG.vue';

const playerName = ref('');
const isLoading = ref(false); // Novo estado para carregamento

const emit = defineEmits(['submitName']);

function submitName() {
  if (playerName.value.trim() !== '') {
    isLoading.value = true; // Inicia o carregamento
    setTimeout(() => {
      emit('submitName', playerName.value);
      playerName.value = '';
      isLoading.value = false; // Finaliza o carregamento após 1 segundo (ajuste conforme necessário)
    }, 1500); // Tempo de carregamento
  } else {
    alert('Por favor, digite um nome');
  }
}
</script>

<template>
  <div class="player-input-container">
    <h1 class="title animate-pulse">
      Futebol
      <Soccer class="icon" /> Quiz
    </h1>
    <div>
      <!-- Box de Tutorial -->
      <div class="tutorial-box">
        <p class="tutorial-text">
          O objetivo do jogo é encontrar a imagem do escudo correto. Você verá um escudo no centro da tela e 8 opções de botões abaixo. Clique no botão que corresponde ao escudo exibido. Se você acertar, ganhará 10 pontos! Boa sorte!
        </p>
      </div>
    </div>
    <div class="flex items-center justify-center h-screen mb-14">
      <input v-model="playerName" type="text" placeholder="Digite seu nome" class="player-input" />
      <button @click="submitName" class="player-button">
        <ArrowRightThickIcon class="icon" />
      </button>
    </div>

    <!-- Spinner de carregamento -->
    <div v-if="isLoading" class="spinner-overlay">
      <div class="spinner"></div>
    </div>

    <!-- Box de crédito -->
    <div class="credit-box">
      Criado por <a href="https://github.com/ppauloces" target="_blank" class="credit-link">Paulo Amaral</a><br>
      <span class="small-text">Quer me ajudar? Faça um donate!</span><br>
      <PixSVG class="inline-block icon-size" /> <span class="small-text">ppaulo.developer@gmail.com</span>
    </div>
  </div>
</template>

<style scoped>
.spinner-overlay {
  @apply fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75;
}

.spinner {
  @apply border-4 border-t-4 border-gray-300 border-t-blue-500 border-solid rounded-full w-16 h-16 animate-spin;
}

.title {
  @apply flex items-center text-5xl font-mono mb-8 pt-20;
}

.icon {
  @apply mx-2 text-lg;
}

.small-text {
  @apply text-sm;
}

.icon-size {
  width: 1.25rem;
  height: 1.25rem;
  vertical-align: middle;
}

.player-input-container {
  @apply flex flex-col items-center justify-center h-screen bg-gray-900 text-white;
  /* Garante que o container ocupe a tela inteira */
}

.input-button-container {
  @apply flex flex-col items-center justify-center mb-4;
  /* Adiciona uma margem inferior para o container do input e botão */
}

.player-input {
  @apply p-2 rounded-md bg-gray-800 mr-2;
  outline: none;
  max-width: 400px;
  width: 100%;
}

.player-button {
  @apply bg-indigo-500 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700;
}

.credit-box {
  @apply bg-gray-800 text-white p-4 rounded-md;
  /* Remove o posicionamento fixo para que a caixa de créditos fique abaixo do input */
  margin-top: 1rem; /* Adiciona uma margem superior para separar do input */
  width: 90%; /* Ajusta a largura da caixa de créditos */
  max-width: 500px; /* Define uma largura máxima */
  text-align: center;
}

.credit-link {
  @apply text-blue-400 hover:text-blue-600;
}

.tutorial-box {
  @apply bg-gray-800 text-white p-4 rounded-md ml-10 mr-10;
}

.tutorial-text {
  @apply text-base;
}

/* Responsividade */
@media (min-width: 640px) {
  .credit-box {
    @apply fixed bottom-4 left-1/2 transform -translate-x-1/2 opacity-75;
    /* Posiciona a caixa de créditos no fundo da tela em telas maiores */
    min-width: 200px;
  }
}
</style>

