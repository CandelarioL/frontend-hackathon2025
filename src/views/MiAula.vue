<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-emerald-100 to-lime-50"
  >
  <!-- NavBarGlobal is rendered globally in App.vue -->

    <!-- 🔹 Contenedor principal -->
    <main
      class="flex-1 flex flex-col items-center justify-start px-6 sm:px-10 py-10"
    >
      <div
        class="w-full max-w-3xl bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-green-100"
      >
        <h2
          class="text-3xl font-extrabold text-center text-green-700 mb-6 drop-shadow-sm"
        >
          🏠 Mi Aula
        </h2>

        <!-- 🔹 Si el alumno tiene aula -->
        <div v-if="aula">
          <div class="mb-6 p-5 bg-green-50 rounded-lg border border-green-100 shadow-sm">
            <h3 class="text-xl font-bold text-gray-800 mb-1">
              {{ aula.nombre }}
            </h3>
            <p class="text-sm text-gray-600 mb-2">
              {{ aula.descripcion || "Sin descripción" }}
            </p>
            <p class="text-sm text-gray-800">
              👨‍🏫 Profesor:
              <span class="font-semibold text-green-700">{{ aula.maestro }}</span>
            </p>
          </div>

          <!-- 🔹 Progreso del alumno -->
          <div class="mb-8 text-center">
            <h4 class="font-semibold text-gray-700 mb-3">📊 Tu Progreso</h4>
            <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                class="bg-green-500 h-4 text-xs text-white text-center transition-all duration-500 ease-out"
                :style="{ width: progreso + '%' }"
              >
                {{ progreso }}%
              </div>
            </div>
          </div>

          <!-- 🔹 Compañeros -->
          <div v-if="compañeros.length > 0">
            <h4 class="font-semibold text-gray-700 mb-3">
              👥 Compañeros de clase ({{ compañeros.length }})
            </h4>
            <ul class="divide-y divide-gray-200 bg-gray-50 rounded-lg shadow-sm">
              <li
                v-for="comp in compañeros"
                :key="comp.id"
                class="py-2 px-3 flex justify-between hover:bg-green-50 transition"
              >
                <span class="text-gray-800 font-medium">{{ comp.nombre }}</span>
                <span class="text-gray-500 text-sm">{{ comp.email }}</span>
              </li>
            </ul>
          </div>
          <p v-else class="text-center text-gray-500 mt-4">
            Aún no hay compañeros inscritos.
          </p>
        </div>

        <!-- 🔹 Si no pertenece a ningún aula -->
        <div v-else class="text-center text-gray-500 py-10">
          <p class="mb-4 text-lg">No estás inscrito en ninguna aula todavía.</p>
          <button
            @click="$router.push('/unirse')"
            class="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition font-semibold"
          >
            🎓 Unirse a un aula
          </button>
        </div>
      </div>

      <!-- 🦉 Mascota educativa -->
      <div
        class="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 flex flex-col items-center animate-bounce-slow"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
          alt="Mascota EduPlay"
          class="w-24 sm:w-32 drop-shadow-xl"
        />
        <p
          class="bg-white/80 text-gray-700 font-semibold px-4 py-1 mt-2 rounded-full shadow-sm text-sm"
        >
          💬 ¡Aprende junto a tus compañeros!
        </p>
      </div>
    </main>

    <!-- 🔹 Pie -->
    <footer class="text-center py-5 text-sm text-gray-500">
      © 2025 EduPlay — Compartir el aprendizaje es crecer 💚
    </footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MiAulaView",
  data() {
    return {
      aula: null,
      compañeros: [],
      progreso: 0,
    };
  },
  async mounted() {
    await this.cargarMiAula();
  },
  methods: {
    async cargarMiAula() {
      try {
        const token = localStorage.getItem("token");
        let decoded = {};
        if (token) {
          try {
            decoded = JSON.parse(atob(token.split(".")[1]));
          } catch (e) {
            console.error("Error al decodificar token en MiAula:", e);
          }
        }

        const res = await axios.get("http://localhost:3000/api/aulas/listar", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const misAulas = res.data || [];
        if (misAulas.length === 0) return;

        const aula = misAulas[0]; // La primera aula
        this.aula = aula;

        const alumnosRes = await axios.get(
          `http://localhost:3000/api/aulas/${aula.id}/alumnos`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        this.compañeros = alumnosRes.data.alumnos || [];

        const miProgreso = this.compañeros.find((a) => a.id === decoded.id);
        this.progreso = miProgreso?.progreso_general || 0;
      } catch (err) {
        console.error("Error al cargar aula:", err);
      }
    },
  },
};
</script>

<style scoped>
ul li {
  transition: background-color 0.2s;
}

/* 🐶 Rebote suave de la mascota */
@keyframes bounceSlow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.animate-bounce-slow {
  animation: bounceSlow 3s ease-in-out infinite;
}
</style>
