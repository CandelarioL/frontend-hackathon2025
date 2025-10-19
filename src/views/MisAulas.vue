<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-emerald-100 to-lime-50"
  >
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
            @change="cargarDatosAula"
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

        <!-- 🔹 Información del aula -->
        <div
          v-if="aulaInfo"
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

        <!-- 🧩 Crear nueva actividad -->
        <div v-if="aulaSeleccionada" class="mb-10">
          <h3 class="text-lg font-semibold text-gray-700 mb-3">
            ➕ Crear nueva actividad
          </h3>
          <form @submit.prevent="crearActividad" class="space-y-3">
            <input
              v-model="nuevaActividad.titulo"
              type="text"
              placeholder="Título de la actividad"
              class="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
            <textarea
              v-model="nuevaActividad.descripcion"
              placeholder="Descripción (opcional)"
              class="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500"
              rows="2"
            ></textarea>
            <div class="grid grid-cols-2 gap-3">
              <select
                v-model="nuevaActividad.tipo"
                class="border border-green-200 rounded-lg px-3 py-2"
              >
                <option value="matematicas">Matemáticas</option>
                <option value="espanol">Español</option>
                <option value="lectura">Lectura</option>
              </select>
              <select
                v-model="nuevaActividad.nivel"
                class="border border-green-200 rounded-lg px-3 py-2"
              >
                <option v-for="n in 5" :key="n" :value="n">Nivel {{ n }}</option>
              </select>
            </div>
            <button
              type="submit"
              class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
            >
              🚀 Crear Actividad
            </button>
          </form>
        </div>

        <!-- 🔹 Actividades del aula -->
        <div v-if="actividades.length > 0" class="mb-10">
          <h3 class="text-lg font-semibold text-gray-700 mb-3">
            🧩 Actividades del Aula
          </h3>
          <div class="space-y-3">
            <div
              v-for="actividad in actividades"
              :key="actividad.id"
              class="p-4 border border-green-100 rounded-lg bg-gray-50 hover:bg-green-50 transition"
            >
              <h4 class="font-bold text-gray-800">{{ actividad.titulo }}</h4>
              <p class="text-sm text-gray-600">
                {{ actividad.descripcion || "Sin descripción" }}
              </p>
              <p class="text-xs text-gray-500 mt-1">
                Tipo: <span class="text-green-700">{{ actividad.tipo }}</span> |
                Nivel: {{ actividad.nivel }}
              </p>
            </div>
          </div>
        </div>
        <p v-else-if="aulaSeleccionada" class="text-gray-500 text-center mb-10">
          No hay actividades creadas todavía.
        </p>

        <!-- 🔹 Tabla de progreso -->
        <div v-if="progreso.length > 0" class="overflow-x-auto">
          <h3 class="text-lg font-semibold text-gray-700 mb-3">
            📊 Progreso de los alumnos
          </h3>
          <table
            class="min-w-full border border-green-100 rounded-lg shadow-sm text-left"
          >
            <thead class="bg-green-100 text-green-800">
              <tr>
                <th class="px-4 py-2 text-sm font-semibold">Alumno</th>
                <th class="px-4 py-2 text-sm font-semibold">Correo</th>
                <th class="px-4 py-2 text-sm font-semibold">Promedio</th>
                <th class="px-4 py-2 text-sm font-semibold">Completadas</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(alumno, index) in progreso"
                :key="index"
                class="border-t hover:bg-green-50 transition"
              >
                <td class="px-4 py-2 font-medium text-gray-800">
                  {{ alumno.nombre }}
                </td>
                <td class="px-4 py-2 text-gray-600">{{ alumno.email }}</td>
                <td class="px-4 py-2 text-green-700 font-semibold">
                  {{ alumno.promedio }}%
                </td>
                <td class="px-4 py-2 text-gray-800">
                  {{ alumno.completadas }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p v-else-if="aulaSeleccionada" class="text-center text-gray-500 mt-6">
          No hay progreso registrado aún.
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

      <!-- 🦉 Mascota -->
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

    <footer class="text-center py-5 text-sm text-gray-500">
      © 2025 DynamicsClass — Enseñar también es inspirar 💚
    </footer>
  </div>
</template>

<script>
import axios from "axios";
import { api } from "../api/api";

export default {
  name: "MisAulas",
  data() {
    return {
      aulas: [],
      aulaSeleccionada: null,
      aulaInfo: null,
      actividades: [],
      progreso: [],
      mensaje: "",
      color: "",
      rol: "",
      nuevaActividad: {
        titulo: "",
        descripcion: "",
        tipo: "matematicas",
        nivel: 1,
      },
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

    async cargarDatosAula() {
      if (!this.aulaSeleccionada) return;

      try {
        const token = localStorage.getItem("token");

        const aulaRes = await axios.get(
          `http://localhost:3000/api/aulas/${this.aulaSeleccionada}/alumnos`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        this.aulaInfo = aulaRes.data.aula;

        const actRes = await axios.get(
          `http://localhost:3000/api/aulas/${this.aulaSeleccionada}/actividades/listar`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        this.actividades = actRes.data || [];

        const progRes = await axios.get(
          `http://localhost:3000/api/aulas/${this.aulaSeleccionada}/progreso`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        this.progreso = progRes.data || [];
      } catch (err) {
        console.error("❌ Error al cargar datos del aula:", err);
        this.mensaje =
          err.response?.data?.msg || "Error al obtener información del aula.";
        this.color = "text-red-600";
      }
    },

    async crearActividad() {
      if (!this.aulaSeleccionada) return;
      try {
        const token = localStorage.getItem("token");
        const payload = {
          ...this.nuevaActividad,
          id_aula: this.aulaSeleccionada,
        };

        await axios.post(
          `http://localhost:3000/api/aulas/${this.aulaSeleccionada}/actividades`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        this.mensaje = "✅ Actividad creada correctamente.";
        this.color = "text-green-600";
        this.nuevaActividad = { titulo: "", descripcion: "", tipo: "matematicas", nivel: 1 };
        this.cargarDatosAula();
      } catch (err) {
        console.error("❌ Error al crear actividad:", err);
        this.mensaje = "❌ No se pudo crear la actividad.";
        this.color = "text-red-600";
      } finally {
        setTimeout(() => (this.mensaje = ""), 3000);
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
