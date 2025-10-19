<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-b from-sky-100 via-cyan-100 to-green-100 relative overflow-hidden"
  >
  <!-- NavBarGlobal is rendered globally in App.vue -->

    <!-- 🔹 Contenedor principal -->
    <main class="flex-1 flex flex-col items-center justify-center p-8">
      <h2 class="text-3xl font-bold text-indigo-700 mb-8">
        🧮 Actividades de Matemáticas
      </h2>

      <!-- 🔸 Tarjetas -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full relative"
      >
        <div
          v-for="actividad in actividades"
          :key="actividad.id"
          @click="$router.push(actividad.ruta)"
          class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all cursor-pointer p-6 flex flex-col items-center text-center"
        >
          <div class="text-5xl mb-3" :class="actividad.color">
            {{ actividad.icono }}
          </div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">
            {{ actividad.titulo }}
          </h3>
          <p class="text-gray-500 text-sm mb-4">
            {{ actividad.descripcion }}
          </p>
          <button
            class="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium shadow-md transition"
          >
            ¡Comenzar!
          </button>
        </div>
      </div>

      <!-- 🦉 Mascota flotante (responsiva) -->
      <div
        class="mascota-wrapper absolute bottom-4 right-4 sm:bottom-8 sm:right-8 flex flex-col items-end animate-flotar cursor-pointer"
        @click="tirarBrillitos"
        aria-label="Mascota educativa"
      >
        <!-- 💭 Burbuja -->
        <div class="relative mb-2 mascota-bubble-wrapper">
          <div
            class="bubble text-gray-700 leading-snug mascota-bubble"
          >
            💭 <strong class="break-words">{{ fraseActual }}</strong>
          </div>
          <div class="bubble-tail" aria-hidden="true"></div>
        </div>

        <!-- 🦉 Imagen de la mascota -->
        <img
          src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
          alt="Mascota educativa"
          class="mascota-img drop-shadow-xl transform hover:scale-105 transition-all duration-300"
        />
      </div>
    </main>

    <!-- 🔹 Pie -->
    <footer class="text-center py-4 text-sm text-gray-500">
      © 2025 Aprendizaje Interactivo — Inspirado en IXL
    </footer>
  </div>
</template>

<script>
import confetti from "canvas-confetti";

export default {
  name: "JuegoMatematicas",
  data() {
    return {
      fraseActual: "",
      frases: [
        "Yo te recomendaría empezar por las sumas, ¡eres muy inteligente!",
        "¡Cada reto te hace más fuerte! 💪",
        "¡Aprender es una aventura maravillosa! 🌈",
        "¡Eres capaz de todo lo que te propongas! ⭐",
        "¡Las matemáticas son tu superpoder! 🦸‍♀️",
        "¡Confía en ti y sigue adelante! 🚀",
        "¡Hoy aprenderás algo nuevo y genial! 🧠",
      ],
      actividades: [
        {
          id: 1,
          titulo: "Un Poco de todo",
          descripcion:
            "Practica sumas sencillas para fortalecer tus habilidades.",
          icono: "➕",
          color: "text-pink-500",
          ruta: "/juego-suma",
        },
        {
          id: 2,
          titulo: "Sumas y Restas",
          descripcion:
            "Aprende a restar con ejercicios divertidos y dinámicos.",
          icono: "➖",
          color: "text-green-500",
          ruta: "/juego-resta",
        },
        {
          id: 3,
          titulo: "Multiplicaciones",
          descripcion: "Domina las tablas con desafíos progresivos.",
          icono: "✖️",
          color: "text-yellow-500",
          ruta: "/juego-multiplicacion",
        },
        {
          id: 4,
          titulo: "Divisiones",
          descripcion:
            "Pon a prueba tu mente con divisiones exactas e interactivas.",
          icono: "➗",
          color: "text-blue-500",
          ruta: "/juego-division",
        },
        {
          id: 5,
          titulo: "Valor Posicional",
          descripcion:
            "Identifica centenas, decenas y unidades con modelos visuales.",
          icono: "🔢",
          color: "text-purple-500",
          ruta: "/valor-posicional",
        },
        {
          id: 6,
          titulo: "Problemas Matemáticos",
          descripcion:
            "Resuelve problemas reales y desarrolla tu razonamiento lógico.",
          icono: "🧠",
          color: "text-indigo-500",
          ruta: "/problemas",
        },
      ],
    };
  },
  mounted() {
    this.cambiarFrase();
    setInterval(this.cambiarFrase, 5000);
  },
  methods: {
    cambiarFrase() {
      const random = Math.floor(Math.random() * this.frases.length);
      this.fraseActual = this.frases[random];
    },
    tirarBrillitos() {
      const duration = 1000;
      const end = Date.now() + duration;
      const colors = ["#bbf7d0", "#fde68a", "#a5f3fc", "#f9a8d4", "#c7d2fe"];
      (function frame() {
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 55,
          origin: { x: 0.9, y: 0.8 },
          colors: colors,
        });
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 55,
          origin: { x: 0.9, y: 0.8 },
          colors: colors,
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    },
  },
};
</script>

<style scoped>
/* 🦉 Animación flotante */
@keyframes flotar {
  0%,
  100% {
    transform: translateY(0) rotate(1deg);
  }
  50% {
    transform: translateY(-10px) rotate(-1deg);
  }
}
.animate-flotar {
  animation: flotar 3.5s ease-in-out infinite;
}

/* 💭 Burbuja de pensamiento */
.bubble {
  border-radius: 1.5rem;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #bae6fd;
  transition: all 0.3s ease;
}

/* ----- Reglas responsivas para la mascota ----- */
.mascota-wrapper {
  /* permitir que la mascota no salga del viewport en pantallas pequeñas */
  max-width: 38vw;
  max-height: 48vh;
  z-index: 30;
}

.mascota-img {
  /* tamaño fluido: mínimo 56px, preferido 12vw, máximo 200px */
  width: clamp(56px, 12vw, 200px);
  height: auto;
  max-height: 40vh;
  object-fit: contain;
  display: block;
}

.mascota-bubble-wrapper {
  max-width: calc(clamp(56px, 12vw, 200px) * 1.8);
  /* evitar que la burbuja exceda el ancho de la pantalla */
  width: max-content;
  min-width: 120px;
}

.mascota-bubble {
  padding: 0.5rem 0.75rem;
  font-size: clamp(0.75rem, 1.3vw, 1rem);
  max-width: 46vw;
  word-wrap: break-word;
  word-break: break-word;
}

.bubble-tail {
  position: absolute;
  right: 1.7rem;
  bottom: -0.4rem;
  width: 0.9rem;
  height: 0.9rem;
  background: white;
  transform: rotate(45deg);
  border-bottom: 1px solid #bae6fd;
  border-right: 1px solid #bae6fd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
}

/* Ajustes para pantallas muy pequeñas */
@media (max-width: 420px) {
  .mascota-wrapper {
    right: 0.5rem;
    bottom: 0.5rem;
    max-width: 46vw;
  }
  .mascota-bubble-wrapper {
    min-width: 100px;
    max-width: 70vw;
  }
  .mascota-bubble {
    font-size: 0.72rem;
    padding: 0.45rem 0.6rem;
  }
}
</style>
