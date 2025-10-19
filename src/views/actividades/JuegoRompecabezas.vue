<template>
  <div class="min-h-screen bg-gradient-to-br from-yellow-100 via-blue-100 to-pink-100 p-6">
    <!-- 🔙 Botón de regreso -->
    <div class="mb-4">
      <button
        @click="goBack"
        class="flex items-center gap-2 bg-white border-2 border-pink-400 text-pink-600 px-4 py-2 rounded-full shadow hover:bg-pink-100 transition"
      >
        ⬅️ Regresar
      </button>
    </div>

    <!-- 🧠 Encabezado -->
    <div class="text-center mb-6">
      <h1 class="text-5xl font-extrabold text-pink-600 drop-shadow mb-2 animate-bounce">
        🧩 Rompecabezas Educativo
      </h1>
      <p class="text-lg text-blue-700 mb-4 font-semibold">
        ¡Arrastra y suelta las piezas para completar la imagen educativa!
      </p>

      <!-- 🔹 Botones de dificultad -->
      <div class="flex justify-center gap-4 mb-6">
        <button
          v-for="level in levels"
          :key="level"
          @click="setDifficulty(level)"
          :class="[
            'px-6 py-2 rounded-full shadow-lg border-2 text-lg font-semibold transition-all',
            currentLevel === level
              ? 'bg-pink-500 text-white border-pink-700 scale-110'
              : 'bg-white text-pink-600 border-pink-300 hover:bg-pink-100'
          ]"
        >
          {{ level }}×{{ level }}
        </button>
      </div>
    </div>

    <!-- 🎮 Contenedor del juego -->
    <div class="flex justify-center gap-12 flex-wrap items-center">
      <!-- 📸 Imagen de vista previa -->
      <div
        class="w-72 h-72 bg-white rounded-3xl shadow-2xl p-2 flex flex-col items-center justify-center border-4 border-pink-200"
      >
        <img
          :src="currentImage"
          alt="Imagen objetivo"
          class="w-full h-full object-contain rounded-xl drop-shadow-lg"
        />
        <span class="block mt-2 text-sm text-gray-500 font-medium">Vista previa</span>
      </div>

      <!-- 🧩 Área del rompecabezas -->
      <div
        class="relative bg-gradient-to-br from-pink-100 via-blue-100 to-yellow-100 rounded-3xl shadow-2xl border-4 border-blue-200 flex items-center justify-center"
        :style="{
          width: `${gridSize + 20}px`,
          height: `${gridSize + 20}px`
        }"
      >
        <div
          class="absolute inset-2 grid gap-2"
          :style="{ gridTemplateColumns: `repeat(${currentLevel}, 1fr)` }"
        >
          <div
            v-for="piece in puzzlePieces"
            :key="piece.id"
            class="piece transition-transform duration-200 hover:scale-105"
            :style="{
              backgroundImage: `url(${currentImage})`,
              backgroundSize: `${gridSize}px ${gridSize}px`,
              backgroundPosition: piece.backgroundPosition,
              width: `${pieceSize}px`,
              height: `${pieceSize}px`,
            }"
            draggable="true"
            @dragstart="dragStart($event, piece)"
            @dragover.prevent
            @drop="drop($event, piece)"
          ></div>
        </div>
      </div>
    </div>

    <!-- 🎉 Modal de éxito -->
    <div
      v-if="showSuccess"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white rounded-3xl p-8 max-w-md text-center transform animate-bounce shadow-2xl"
      >
        <h2 class="text-3xl font-bold text-green-600 mb-4">¡Felicitaciones! 🎉</h2>
        <p class="text-lg mb-6">¡Has completado el rompecabezas!</p>
        <button
          @click="nextPuzzle"
          class="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors"
        >
          Siguiente Nivel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "JuegoRompecabezasGrande",
  data() {
    return {
      levels: [2, 3, 4],
      currentLevel: 2,
      gridSize: 400, // 🔹 Más grande
      currentImageIndex: 0,
      showSuccess: false,
      images: [
        "https://img.freepik.com/free-vector/cute-student-cartoon-character-holding-books_70172-576.jpg",
        "https://img.freepik.com/free-vector/cute-happy-smiling-robot-chat-bot_92289-559.jpg",
        "https://img.freepik.com/free-vector/hand-drawn-colorful-science-education-wallpaper_23-2148489183.jpg",
        "https://img.freepik.com/free-vector/hand-drawn-cartoon-mathematics-background_23-2148167861.jpg",
        "https://img.freepik.com/free-vector/flat-children-s-day-background_23-2149436182.jpg",
        "https://img.freepik.com/free-vector/hand-drawn-back-school-background_23-2149464866.jpg",
        "https://img.freepik.com/free-vector/flat-design-children-education-background_23-2149482017.jpg",
        "https://img.freepik.com/free-vector/hand-drawn-science-education-background_23-2148489181.jpg",
        "https://img.freepik.com/free-vector/hand-drawn-english-subject-background_23-2149482021.jpg",
        "https://img.freepik.com/free-vector/hand-drawn-music-education-background_23-2149482023.jpg"
      ],
      puzzlePieces: [],
      draggedPiece: null
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentImageIndex];
    },
    pieceSize() {
      return (this.gridSize - (this.currentLevel + 1) * 4) / this.currentLevel;
    }
  },
  methods: {
    setDifficulty(level) {
      this.currentLevel = level;
      this.initializePuzzle();
    },
    initializePuzzle() {
      this.puzzlePieces = [];
      const positions = [];

      for (let row = 0; row < this.currentLevel; row++) {
        for (let col = 0; col < this.currentLevel; col++) {
          positions.push({
            row,
            col,
            backgroundPosition: `-${col * this.pieceSize}px -${row * this.pieceSize}px`
          });
        }
      }

      // Barajar
      for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]];
      }

      this.puzzlePieces = positions.map((pos, index) => ({
        id: index,
        currentPos: index,
        correctPos: index,
        backgroundPosition: pos.backgroundPosition
      }));
    },
    dragStart(event, piece) {
      this.draggedPiece = piece;
      event.dataTransfer.effectAllowed = "move";
    },
    drop(event, targetPiece) {
      event.preventDefault();
      if (!this.draggedPiece || this.draggedPiece === targetPiece) return;

      const draggedIndex = this.puzzlePieces.indexOf(this.draggedPiece);
      const targetIndex = this.puzzlePieces.indexOf(targetPiece);

      // Intercambiar piezas
      this.puzzlePieces[draggedIndex] = targetPiece;
      this.puzzlePieces[targetIndex] = this.draggedPiece;

      this.checkWin();
    },
    checkWin() {
      const isWin = this.puzzlePieces.every((piece, index) => piece.correctPos === index);
      if (isWin) {
        this.showSuccess = true;
        this.playWinSound();
      }
    },
    nextPuzzle() {
      this.showSuccess = false;
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      this.initializePuzzle();
    },
    playWinSound() {
      const audio = new Audio("/sounds/win.mp3");
      audio.play();
    },
    goBack() {
      window.history.back();
    }
  },
  mounted() {
    this.initializePuzzle();
  }
};
</script>

<style scoped>
.piece {
  cursor: grab;
  background-color: #fffbe7;
  border-radius: 16px;
  border: 2px solid #fbbf24;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s, transform 0.2s;
}
.piece:active {
  cursor: grabbing;
  box-shadow: 0 0 0 4px #f472b6;
}

/* ✨ Animación del título */
.animate-bounce {
  animation: bounce 1s infinite;
}
@keyframes bounce {
  0%, 100% {
    transform: translateY(-5%);
  }
  50% {
    transform: translateY(0);
  }
}
</style>
