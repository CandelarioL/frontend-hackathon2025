<template>
  <div
    class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-lime-50 flex flex-col relative overflow-hidden"
  >
  <!-- NavBarGlobal is rendered globally in App.vue -->

    <!-- 🧠 Contenido principal -->
    <main
      class="flex-1 flex flex-col items-center justify-center text-center p-8 relative z-10"
    >
      <!-- 🌈 Fondo animado -->
      <div class="absolute inset-0 bg-gradient-to-br from-green-100 via-white to-emerald-50 animate-gradient"></div>

      <!-- 🎓 Bienvenida -->
      <h2
        class="text-4xl sm:text-5xl font-extrabold text-green-700 mb-4 drop-shadow-md"
      >
        ¡Bienvenido a <span class="text-emerald-500">EduPlay</span>! 🧩
      </h2>
      <p class="text-gray-600 text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed">
        Una plataforma interactiva para aprender <strong>Matemáticas</strong> y
        <strong>Lenguaje</strong> jugando, explorando y desarrollando tus
        habilidades con actividades divertidas y visuales.
      </p>

      <!-- 🐶 Guía animada -->
      <div class="flex flex-col items-center space-y-4 relative">
        <img
          src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
          alt="Guía educativa"
          class="w-44 sm:w-52 drop-shadow-lg animate-bounce-slow"
        />
        <div
          class="bg-white border border-green-300 rounded-3xl shadow-md px-5 py-3 text-gray-800 text-base font-semibold italic max-w-sm relative speech-bubble"
        >
          💬 ¡Hola! Soy tu compañero de aprendizaje.
          <br />
          Te guiaré por todas las actividades para que aprendas jugando 🌟
          <div
            class="absolute left-1/2 transform -translate-x-1/2 -bottom-3 w-5 h-5 bg-white border-b border-r border-green-300 rotate-45"
          ></div>
        </div>
      </div>

      <!-- ✨ Pequeña animación decorativa -->
      <div
        class="absolute top-10 right-10 text-4xl animate-spin-slow select-none"
      >
        🌟
      </div>
      <div
        class="absolute bottom-8 left-8 text-4xl animate-pulse select-none"
      >
        📚
      </div>
    </main>

    <!-- 🔹 Pie de página -->
    <footer class="text-center py-5 text-sm text-gray-500 z-10">
      © 2025 EduPlay — Aprender es divertido cuando juegas 💚
    </footer>
  </div>
</template>

<script>
export default {
  name: "MenuView",
};
</script>

<style scoped>
/* 🌈 Fondo en movimiento */
@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.animate-gradient {
  background-size: 200% 200%;
  animation: gradientMove 10s ease infinite;
}

/* 🐶 Burbuja de diálogo */
.speech-bubble {
  position: relative;
  animation: aparecer 1.2s ease forwards;
}

/* ✨ Aparición suave */
@keyframes aparecer {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 🐾 Rebote suave de la mascota */
@keyframes bounceSlow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}
.animate-bounce-slow {
  animation: bounceSlow 3s ease-in-out infinite;
}

/* ✨ Rotación lenta */
@keyframes spinSlow {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.animate-spin-slow {
  animation: spinSlow 10s linear infinite;
}
</style>
