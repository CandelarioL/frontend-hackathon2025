<template>
  <div class="juego-pares">
    <!-- 🔙 Botón de regreso -->
    <div class="back-btn-container">
      <button
        @click="goBack"
        class="back-btn"
      >
        ⬅️ Regresar
      </button>
    </div>

    <!-- 🎯 Título -->
    <h1 class="titulo">🍎 Juego de Pares — ¡Encuentra las Frutas! 🍌</h1>

    <!-- 🧭 Encabezado HUD -->
    <header class="hud">
      <div class="hud-item">⏱️ {{ formattedTime }}</div>
      <div class="hud-item">⭐ {{ matchedCount }} / {{ pairCount }}</div>
      <div class="hud-item">🎯 {{ attempts }} intentos</div>
      <div class="hud-actions">
        <button @click="startGame">🔁</button>
        <button @click="togglePause">{{ paused ? "▶️" : "⏸️" }}</button>
      </div>
    </header>

    <!-- 🧩 Tablero de juego -->
    <div class="tablero">
      <div
        v-for="card in cards"
        :key="card.id"
        class="card"
        :class="{ flipped: isFlipped(card.id), matched: isMatched(card.key) }"
        @click="onCardClick(card)"
      >
        <div class="card-inner">
          <div class="card-front"></div>
          <div class="card-back">
            <div v-if="card.type === 'word'" class="word">{{ card.content }}</div>
            <div v-else class="img">{{ card.content }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 🏆 Resultado final -->
    <div v-if="matchedCount === pairCount" class="win-box">
      🎉 ¡Completaste el juego en {{ attempts }} intentos!  
      <br /><span class="wixarika">🌿 Wixárika: ¡Rikiari! Ne kuxi {{ pairCount }} pa’arie.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "JuegoParesFinal",
  data() {
    return {
      samplePairs: [
        { key: "🍎", word: "manzana", img: "🍎" },
        { key: "🍌", word: "plátano", img: "🍌" },
        { key: "🍇", word: "uva", img: "🍇" },
        { key: "🍓", word: "fresa", img: "🍓" },
        { key: "🍊", word: "naranja", img: "🍊" },
        { key: "🍉", word: "sandía", img: "🍉" },
        { key: "🍐", word: "pera", img: "🍐" },
        { key: "🥝", word: "kiwi", img: "🥝" },
        { key: "🍒", word: "cereza", img: "🍒" },
        { key: "🥭", word: "mango", img: "🥭" },
        { key: "🍍", word: "piña", img: "🍍" },
        { key: "🍈", word: "melón", img: "🍈" },
        { key: "🍋", word: "limón", img: "🍋" },
        { key: "🍑", word: "durazno", img: "🍑" },
        { key: "🍅", word: "tomate", img: "🍅" },
        { key: "🌽", word: "elote", img: "🌽" },
        { key: "🥕", word: "zanahoria", img: "🥕" },
        { key: "🍄", word: "hongo", img: "🍄" },
      ],
      cards: [],
      flipped: [],
      matchedKeys: new Set(),
      attempts: 0,
      timeLeft: 90,
      timerId: null,
      paused: false,
      revealDelay: 700,
    };
  },
  computed: {
    pairCount() {
      return this.samplePairs.length;
    },
    matchedCount() {
      return this.matchedKeys.size;
    },
    formattedTime() {
      const s = this.timeLeft % 60;
      const m = Math.floor(this.timeLeft / 60);
      return `${m}:${s.toString().padStart(2, "0")}`;
    },
  },
  created() {
    this.startGame();
  },
  beforeUnmount() {
    this.clearTimer();
  },
  methods: {
    goBack() {
      // 👇 Puedes cambiar esta línea por: this.$router.push('/menu')
      window.history.back();
    },
    createCards() {
      let id = 1;
      const cards = [];
      this.samplePairs.forEach((pair) => {
        cards.push({ id: id++, type: "word", key: pair.key, content: pair.word });
        cards.push({ id: id++, type: "img", key: pair.key, content: pair.img });
      });
      return this.shuffle(cards);
    },
    shuffle(array) {
      const a = array.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
    startGame() {
      this.clearTimer();
      this.cards = this.createCards();
      this.flipped = [];
      this.matchedKeys = new Set();
      this.attempts = 0;
      this.timeLeft = 90;
      this.paused = false;
      this.startTimer();
    },
    startTimer() {
      this.clearTimer();
      this.timerId = setInterval(() => {
        if (!this.paused && this.timeLeft > 0) this.timeLeft--;
      }, 1000);
    },
    clearTimer() {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
    },
    togglePause() {
      this.paused = !this.paused;
    },
    isFlipped(id) {
      return this.flipped.includes(id);
    },
    isMatched(key) {
      return this.matchedKeys.has(key);
    },
    onCardClick(card) {
      if (this.paused || this.isMatched(card.key) || this.isFlipped(card.id)) return;
      if (this.flipped.length >= 2) return;

      this.flipped.push(card.id);

      if (this.flipped.length === 2) {
        this.attempts++;
        const c1 = this.cards.find((c) => c.id === this.flipped[0]);
        const c2 = this.cards.find((c) => c.id === this.flipped[1]);

        if (c1 && c2) {
          if (c1.key === c2.key && c1.type !== c2.type) {
            this.matchedKeys.add(c1.key);
            this.flipped = [];
          } else {
            const toFlip = this.flipped.slice();
            setTimeout(() => {
              this.flipped = this.flipped.filter((id) => !toFlip.includes(id));
            }, this.revealDelay);
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.juego-pares {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom right, #dcfce7, #dbeafe);
  padding: 1rem;
  font-family: "Poppins", sans-serif;
  color: #1e293b;
}

/* 🔙 Botón de regreso */
.back-btn-container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 0.5rem;
}
.back-btn {
  background: white;
  border: 2px solid #f472b6;
  color: #be185d;
  font-weight: bold;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.back-btn:hover {
  background: #fdf2f8;
  transform: scale(1.05);
}

/* 🔹 Título */
.titulo {
  font-size: 2rem;
  font-weight: 800;
  color: #065f46;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  margin-bottom: 1rem;
  text-align: center;
}

/* 🔹 HUD */
.hud {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}
.hud-item {
  background: #fff;
  border-radius: 8px;
  padding: 0.3rem 0.8rem;
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}
.hud-actions button {
  background: #22c55e;
  border: none;
  color: white;
  border-radius: 8px;
  padding: 0.3rem 0.7rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}
.hud-actions button:hover {
  background: #16a34a;
}

/* 🔹 Tablero */
.tablero {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  max-width: 600px;
  justify-items: center;
}
.card {
  width: 90px;
  height: 90px;
  position: relative;
  perspective: 600px;
  cursor: pointer;
}
.card-inner {
  position: absolute;
  inset: 0;
  transition: transform 0.4s;
  transform-style: preserve-3d;
}
.card.flipped .card-inner {
  transform: rotateY(180deg);
}
.card-front,
.card-back {
  position: absolute;
  inset: 0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
}
.card-front {
  background: #0f766e;
}
.card-back {
  background: #fff;
  border: 2px solid #10b981;
  transform: rotateY(180deg);
}
.word {
  font-size: 14px;
  font-weight: 600;
}
.img {
  font-size: 32px;
}
.card.matched {
  opacity: 0.75;
  transform: scale(0.95);
}

/* 🔹 Resultado final */
.win-box {
  margin-top: 1.5rem;
  text-align: center;
  background: #ffffffb0;
  padding: 1rem;
  border-radius: 1rem;
  font-weight: bold;
}
.wixarika {
  display: block;
  margin-top: 6px;
  font-style: italic;
  color: #0f766e;
}
</style>
