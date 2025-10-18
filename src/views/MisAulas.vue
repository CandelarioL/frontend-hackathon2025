<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-emerald-100 to-lime-50"
  >
  <!-- NavBarGlobal is rendered globally in App.vue -->

    <!-- 🔹 Contenido principal -->
    <main
      class="flex-1 flex flex-col items-center justify-start px-6 sm:px-10 py-10"
    >
      <div
        class="w-full max-w-5xl bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-green-100"
      >
        <h2
          class="text-3xl font-extrabold text-center text-green-700 mb-8 drop-shadow-sm"
        >
          👩‍🏫 Panel de Mis Aulas
        </h2>

        <!-- 🔹 Seleccionar aula -->
        <div v-if="aulas.length > 0" class="mb-8">
          <label class="block font-semibold mb-2 text-gray-700 text-lg">
            Selecciona un aula:
          </label>
          <select
            v-model="aulaSeleccionada"
            @change="cargarAlumnos"
            class="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
          >
            <option :value="null">-- Selecciona un aula --</option>
            <option
              v-for="aula in aulas"
              :key="aula.id"
              :value="aula.id"
              class="text-gray-700"
            >
              {{ aula.nombre }} ({{ aula.total_alumnos || 0 }} alumnos)
            </option>
          </select>
        </div>

        <div v-else class="text-center text-gray-500 mb-8">
          Aún no has creado ninguna aula.
        </div>

        <!-- 🔹 Información del aula seleccionada -->
        <div
          v-if="aulaSeleccionada && aulaInfo"
          class="mb-8 p-5 bg-green-50 rounded-lg border border-green-100 shadow-sm"
        >
          <h3 class="text-lg font-bold text-gray-800 mb-1">
            {{ aulaInfo.nombre }}
          </h3>
          <p class="text-sm text-gray-600 mb-2">
            {{ aulaInfo.descripcion || "Sin descripción" }}
          </p>
          <p class="text-sm text-gray-800">
            Código de acceso:
            <span class="font-semibold text-green-700">
              {{ aulaInfo.codigo_acceso }}
            </span>
          </p>
        </div>

        <!-- 🔹 Lista de alumnos -->
        <div v-if="alumnos.length > 0" class="overflow-x-auto">
          <h3 class="text-lg font-semibold text-gray-700 mb-3">
            👥 Alumnos inscritos ({{ alumnos.length }})
          </h3>
          <table
            class="min-w-full border border-green-100 rounded-lg shadow-sm text-left"
          >
            <thead class="bg-green-100 text-green-800">
              <tr>
                <th class="px-4 py-2 text-sm font-semibold">#</th>
                <th class="px-4 py-2 text-sm font-semibold">Nombre</th>
                <th class="px-4 py-2 text-sm font-semibold">Correo</th>
                <th class="px-4 py-2 text-sm font-semibold">Progreso</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(alumno, index) in alumnos"
                :key="alumno.id"
                class="border-t hover:bg-green-50 transition"
              >
                <td class="px-4 py-2 text-gray-700">{{ index + 1 }}</td>
                <td class="px-4 py-2 font-medium text-gray-800">
                  {{ alumno.nombre }}
                </td>
                <td class="px-4 py-2 text-gray-600">{{ alumno.email }}</td>
                <td class="px-4 py-2 text-green-700 font-semibold">
                  {{ alumno.progreso_general || 0 }}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p
          v-else-if="aulaSeleccionada"
          class="text-center text-gray-500 mt-6"
        >
          No hay alumnos inscritos en este aula.
        </p>

        <!-- 🔹 Mensajes -->
        <transition name="fade">
          <p
            v-if="mensaje"
            class="mt-6 text-center text-sm font-medium"
            :class="color"
          >
            {{ mensaje }}
          </p>
        </transition>
      </div>

      <!-- 🦉 Mascota motivadora -->
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
          💬 ¡Revisa el progreso de tus estudiantes!
        </p>
      </div>
    </main>

    <!-- 🔹 Pie -->
    <footer class="text-center py-5 text-sm text-gray-500">
      © 2025 EduPlay — Enseñar también es inspirar 💚
    </footer>
  </div>
</template>

<script>
import { api } from "../api/api";

export default {
  name: "MisAulas",
  data() {
    return {
      aulas: [],
      aulaSeleccionada: null,
      aulaInfo: null,
      alumnos: [],
      mensaje: "",
      color: "",
      rol: "",
    };
  },
  mounted() {
    this.obtenerRol();
    this.cargarAulas();
  },
  methods: {
    obtenerRol() {
      const rolGuardado = localStorage.getItem("rol");
      if (rolGuardado) {
        this.rol = rolGuardado;
        return;
      }
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          this.rol = payload.rol || "";
        } catch (e) {
          console.error("Error al decodificar token en MisAulas:", e);
        }
      }
    },

    async cargarAulas() {
      try {
        const token = localStorage.getItem("token");
        const res = await api.misAulas(token);
        this.aulas = res.data || [];
      } catch (err) {
        console.error("❌ Error al cargar aulas:", err);
        this.mensaje = "Error al cargar tus aulas.";
        this.color = "text-red-600";
      }
    },

    async cargarAlumnos() {
      if (!this.aulaSeleccionada) {
        this.alumnos = [];
        this.aulaInfo = null;
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const res = await api.alumnosPorAula(this.aulaSeleccionada, token);
        this.alumnos = res.data.alumnos;
        this.aulaInfo = res.data.aula;
      } catch (err) {
        console.error("❌ Error al cargar alumnos:", err);
        this.mensaje =
          err.response?.data?.msg || "Error al obtener los alumnos.";
        this.color = "text-red-600";
      }
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 🦉 Animación suave de rebote */
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
