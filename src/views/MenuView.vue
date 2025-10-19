ocup aqui hacer una sepacion en blanco, para que tpdp lo demas de abajo baje mas y quede bien conforme lo demas
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-lime-50 flex flex-col relative overflow-hidden"
  >
    <!-- 🌈 Fondo animado -->
    <div class="absolute inset-0 bg-gradient-to-br from-green-100 via-white to-emerald-50 animate-gradient"></div>

    <!-- 🧠 Contenido principal -->
    <main class="flex-1 relative z-10 px-6 py-10 flex flex-col items-center">
      <!-- 🎓 Encabezado -->
      <h2
        class="text-4xl sm:text-5xl font-extrabold text-green-700 mb-2 text-center drop-shadow-md"
      >
        ¡Hola de nuevo, <span class="text-emerald-500">explorador!</span> 🌟
      </h2>
      <p class="text-gray-600 text-lg sm:text-xl text-center max-w-2xl mb-10">
        Tu compañero de aventuras educativas te espera para seguir aprendiendo y jugando.
      </p>

  <!-- 🐶 Mascota -->
  <div class="flex flex-col items-center space-y-4 relative mb-16">
        <img
          src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
          alt="Mascota educativa"
          class="w-40 sm:w-48 drop-shadow-xl animate-bounce-slow"
        />
        <div
          class="bg-white border border-green-300 rounded-3xl shadow-md px-5 py-3 text-gray-800 text-base font-semibold italic max-w-sm text-center relative speech-bubble"
        >
          💬 ¡Bien hecho! Avanza en tus módulos para desbloquear nuevas actividades. 🚀
          <div
            class="absolute left-1/2 transform -translate-x-1/2 -bottom-3 w-5 h-5 bg-white border-b border-r border-green-300 rotate-45"
          ></div>
        </div>
      </div>

      <!-- 📊 Panel principal -->
      <section
        class="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 animate-fade"
      >
        <!-- 📘 Lenguaje -->
        <router-link
          to="/juego-lenguaje"
          class="bg-white p-6 rounded-2xl shadow-md border border-emerald-100 flex flex-col items-center justify-center hover:scale-105 transition"
        >
          <div class="text-4xl">📘</div>
          <h3 class="font-bold text-emerald-700 mt-2">Lenguaje</h3>
          <p class="text-gray-600 text-sm mt-1">Explora comprensión lectora y escritura.</p>
        </router-link>

        <!-- 🧮 Matemáticas -->
        <router-link
          to="/matematicas"
          class="bg-white p-6 rounded-2xl shadow-md border border-emerald-100 flex flex-col items-center justify-center hover:scale-105 transition"
        >
          <div class="text-4xl">🧮</div>
          <h3 class="font-bold text-emerald-700 mt-2">Matemáticas</h3>
          <p class="text-gray-600 text-sm mt-1">Suma, resta y resuelve problemas divertidos.</p>
        </router-link>

        <!-- 🎯 Mis Logros (Perfil) -->
        <router-link
          to="/perfil"
          class="bg-white p-6 rounded-2xl shadow-md border border-emerald-100 flex flex-col items-center justify-center hover:scale-105 transition"
        >
          <div class="text-4xl">🎯</div>
          <h3 class="font-bold text-emerald-700 mt-2">Mis Logros</h3>
          <p class="text-gray-600 text-sm mt-1">Consulta tu perfil y tus medallas obtenidas.</p>
        </router-link>
      </section>

      <!-- 📚 Actividades recientes -->
      <section
        class="bg-white/80 border border-emerald-100 rounded-2xl shadow-md p-6 w-full max-w-6xl mt-6"
      >
        <h2 class="text-xl font-bold text-emerald-700 mb-4 text-center sm:text-left">
          Actividades recientes
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- 📖 Comprensión lectora -->
          <router-link
            to="/juego-lenguaje"
            class="bg-emerald-50 p-4 rounded-xl hover:bg-emerald-100 transition block"
          >
            <h3 class="font-semibold text-emerald-700">📖 Comprensión lectora</h3>
            <p class="text-gray-600 text-sm">Avance: 75%</p>
            <button
              class="mt-2 bg-emerald-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-emerald-600"
            >
              Continuar
            </button>
          </router-link>

          <!-- ➕ Sumas y Restas -->
          <router-link
            to="/matematicas"
            class="bg-emerald-50 p-4 rounded-xl hover:bg-emerald-100 transition block"
          >
            <h3 class="font-semibold text-emerald-700">➕ Sumas y Restas</h3>
            <p class="text-gray-600 text-sm">Avance: 90%</p>
            <button
              class="mt-2 bg-emerald-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-emerald-600"
            >
              Reforzar
            </button>
          </router-link>

          <!-- 🎵 Palabras con ritmo -->
          <router-link
            to="/minijuegos"
            class="bg-emerald-50 p-4 rounded-xl hover:bg-emerald-100 transition block"
          >
            <h3 class="font-semibold text-emerald-700">🎵 Palabras con ritmo</h3>
            <p class="text-gray-600 text-sm">Avance: 40%</p>
            <button
              class="mt-2 bg-emerald-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-emerald-600"
            >
              Iniciar
            </button>
          </router-link>
        </div>
      </section>
    </main>

    <!-- 🔹 Pie -->
    <footer class="text-center py-5 text-sm text-gray-500 relative z-10">
      © 2025 DynamicsClass — Aprende jugando con tu amigo fiel 💚
    </footer>
  </div>
</template>

<script>
export default {
  name: "DashboardView",
};
</script>

<style scoped>
/* 🌈 Fondo animado */
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

/* 🐶 Burbuja y rebote */
.speech-bubble {
  animation: aparecer 1.2s ease forwards;
}

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

@keyframes bounceSlow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}
.animate-bounce-slow {
  animation: bounceSlow 3s ease-in-out infinite;
}

/* ✨ Aparición general */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade {
  animation: fadeIn 1s ease forwards;
}
</style>
