<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-emerald-100 to-lime-50"
  >
  <!-- NavBarGlobal is rendered globally in App.vue -->

    <!-- 🔹 Contenedor principal -->
    <main class="flex-1 px-6 sm:px-12 py-10">
      <div class="max-w-5xl mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-green-100">
        <h2 class="text-3xl font-extrabold text-center text-green-700 mb-6">
          🏫 Mis Aulas Creadas
        </h2>

        <!-- 🔹 Botón para crear nueva aula -->
        <div class="text-center mb-6">
          <button
            @click="$router.push('/crear-aula')"
            class="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition"
          >
            ➕ Crear nueva aula
          </button>
        </div>

        <!-- 🔹 Lista de aulas -->
        <div v-if="aulas.length > 0" class="space-y-4">
          <div
            v-for="aula in aulas"
            :key="aula.id"
            class="p-5 border border-green-100 rounded-xl shadow-sm bg-gray-50 hover:bg-green-50 transition"
          >
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div class="mb-3 sm:mb-0">
                <h3 class="text-xl font-bold text-gray-800">
                  {{ aula.nombre }}
                </h3>
                <p class="text-sm text-gray-600 mb-1">
                  {{ aula.descripcion || "Sin descripción" }}
                </p>
                <p class="text-sm text-gray-700">
                  <strong>Código:</strong>
                  <span class="text-green-700 font-semibold">
                    {{ aula.codigo_acceso }}
                  </span>
                  <button
                    @click="copiarCodigo(aula.codigo_acceso)"
                    class="text-green-500 text-xs ml-2 hover:underline"
                  >
                    Copiar
                  </button>
                </p>
                <p class="text-sm text-gray-500">
                  👥 {{ aula.total_alumnos || 0 }} alumnos
                </p>
              </div>

              <!-- 🔹 Botones de acción -->
              <div class="flex justify-end space-x-3">
                <button
                  @click="verAlumnos(aula.id)"
                  class="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
                >
                  👀 Ver alumnos
                </button>
                <button
                  @click="eliminarAula(aula.id)"
                  class="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 🔹 Si no hay aulas -->
        <p v-else class="text-center text-gray-500 mt-8 text-lg">
          Aún no has creado ninguna aula.
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
          💬 ¡Organiza tus aulas y motiva a tus alumnos!
        </p>
      </div>
    </main>

    <!-- 🔹 Pie -->
    <footer class="text-center py-5 text-sm text-gray-500">
      © 2025 EduPlay — Enseñar también es aprender 💚
    </footer>
  </div>
</template>

<script>
import { api } from "../api/api";

export default {
  name: "AulasView",
  data() {
    return {
      aulas: [],
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
          console.error("Error al decodificar token en AulasView:", e);
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
        this.mensaje = "Error al cargar las aulas.";
        this.color = "text-red-600";
      }
    },

    verAlumnos(idAula) {
      this.$router.push(`/aulas/${idAula}`);
    },

    copiarCodigo(codigo) {
      navigator.clipboard.writeText(codigo);
      this.mensaje = "📋 Código copiado al portapapeles.";
      this.color = "text-green-600";
      setTimeout(() => (this.mensaje = ""), 2000);
    },

    async eliminarAula(id) {
      if (!confirm("¿Seguro que deseas eliminar este aula?")) return;

      try {
        const token = localStorage.getItem("token");
        await api.eliminarAula(id, token);
        this.mensaje = "🗑️ Aula eliminada correctamente.";
        this.color = "text-green-600";
        this.cargarAulas();
      } catch (err) {
        console.error("❌ Error al eliminar aula:", err);
        this.mensaje =
          err.response?.data?.msg || "Error al eliminar el aula.";
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

/* 🐶 Rebote suave */
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
