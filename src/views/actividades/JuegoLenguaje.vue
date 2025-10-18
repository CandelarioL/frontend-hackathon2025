<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-100 relative overflow-hidden"
  >
  <!-- NavBarGlobal is rendered globally in App.vue -->

    <!-- 🔹 Contenedor principal -->
    <main class="flex-1 flex flex-col items-center justify-center p-8">
      <h2 class="text-3xl font-bold text-green-700 mb-8">
        ✍️ Actividades de Lenguaje
      </h2>

      <!-- 🔸 Tarjetas dinámicas -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full relative"
      >
        <div
          v-for="actividad in actividades"
          :key="actividad.id"
          @click="$router.push(actividad.ruta)"
          class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all cursor-pointer p-6 flex flex-col items-center text-center"
        >
          <div :class="actividad.color" class="text-5xl mb-3">
            {{ actividad.icono }}
          </div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">
            {{ actividad.titulo }}
          </h3>
          <p class="text-gray-500 text-sm mb-4">
            {{ actividad.descripcion }}
          </p>
          <button
            class="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-medium shadow-md transition"
          >
            ¡Comenzar!
          </button>
        </div>
      </div>

      <!-- 🦉 Mascota Búho educativa -->
      <div
        class="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 flex flex-col items-center cursor-pointer animate-flotar"
        @click="tirarBrillitos"
      >
        <!-- 💭 Burbuja -->
        <div
          class="bg-white border-2 border-yellow-300 shadow-md rounded-2xl px-4 py-3 text-gray-800 text-sm font-semibold mb-3 relative text-center max-w-xs"
        >
          💭 {{ fraseActual }}
          <div
            class="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-4 h-4 bg-white border-b-2 border-r-2 border-yellow-300 rotate-45"
          ></div>
        </div>

        <!-- 🦉 Imagen del búho (centrada y animada) -->
        <img
          src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
          alt="Búho sabio"
          class="w-32 h-32 sm:w-40 sm:h-40 drop-shadow-md hover:scale-110 transition-all duration-300"
        />
      </div>
    </main>

    <!-- 🔹 Pie de página -->
    <footer class="text-center py-4 text-sm text-gray-500">
      © 2025 EduPlay — Lenguaje Interactivo con el Búho 🦉
    </footer>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue"; // ✅ NavBar está en la misma carpeta
import confetti from "canvas-confetti";

export default {
  name: "JuegoLenguaje",
  components: { NavBar },
  data() {
    return {
      fraseActual: "",
      frases: [
        "¡Hola! Soy tu amigo el Búho 🦉",
        "Te recomiendo empezar con lectura, ¡es la base del conocimiento! 📖",
        "¡Cada palabra nueva te hace más sabio! 🧠",
        "¡Las historias te ayudarán a soñar más grande! 🌙",
        "¡Lee, imagina y aprende cada día más! 💫",
        "¡Eres increíble, tus palabras tienen poder! 💚",
      ],
      actividades: [
        {
          id: 1,
          titulo: "Lectura Comprensiva",
          descripcion:
            "Lee textos cortos y responde preguntas de comprensión.",
          icono: "📖",
          color: "text-orange-500",
          ruta: "/lectura-comprensiva",
        },
        {
          id: 2,
          titulo: "Ortografía",
          descripcion:
            "Aprende las reglas básicas del lenguaje de forma divertida.",
          icono: "✏️",
          color: "text-blue-500",
          ruta: "/ortografia",
        },
        {
          id: 3,
          titulo: "Vocabulario",
          descripcion: "Descubre nuevas palabras, sinónimos y antónimos.",
          icono: "🗣️",
          color: "text-green-500",
          ruta: "/vocabulario",
        },
        {
          id: 4,
          titulo: "Formar Oraciones",
          descripcion:
            "Ordena palabras para construir oraciones correctas.",
          icono: "🧩",
          color: "text-yellow-500",
          ruta: "/formar-oraciones",
        },
        {
          id: 5,
          titulo: "Acentuación",
          descripcion: "Aprende cuándo usar tildes de forma sencilla.",
          icono: "🔡",
          color: "text-purple-500",
          ruta: "/acentuacion",
        },
        {
          id: 6,
          titulo: "Historias Interactivas",
          descripcion: "Crea tus propias historias y elige los finales.",
          icono: "📜",
          color: "text-pink-500",
          ruta: "/historias-interactivas",
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
      const colors = ["#fde68a", "#fbbf24", "#fcd34d", "#facc15", "#fef3c7"];
      (function frame() {
        confetti({
          particleCount: 8,
          angle: 60,
          spread: 55,
          origin: { x: 0.9, y: 0.8 },
          colors,
        });
        confetti({
          particleCount: 8,
          angle: 120,
          spread: 55,
          origin: { x: 0.9, y: 0.8 },
          colors,
        });
        if (Date.now() < end) requestAnimationFrame(frame);
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

/* 💭 Burbuja */
.bubble {
  border-radius: 1.5rem;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #fcd34d;
  transition: all 0.3s ease;
}

/* ✨ Aparición de tarjetas */
@keyframes aparecer {
  0% {
    opacity: 0;
    transform: translateY(15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
div[v-for] {
  animation: aparecer 0.6s ease;
}
</style>
