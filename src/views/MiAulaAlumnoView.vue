<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-emerald-100 to-lime-50"
  >
    <!-- 🔹 Contenido principal -->
    <main
      class="flex-1 flex flex-col items-center justify-start px-6 sm:px-10 py-10"
    >
      <div
        class="w-full max-w-4xl bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-green-100"
      >
        <h2
          class="text-3xl font-extrabold text-center text-green-700 mb-8 drop-shadow-sm"
        >
          🎓 Mi Aula — {{ aula?.nombre || "Sin nombre" }}
        </h2>

        <!-- 🔹 Lista de actividades -->
        <div v-if="actividades.length > 0" class="space-y-5">
          <div
            v-for="actividad in actividades"
            :key="actividad.id"
            class="border border-green-100 bg-gray-50 rounded-xl p-6 shadow-sm hover:bg-green-50 transition"
          >
            <h3 class="text-lg font-bold text-gray-800 mb-1">
              {{ actividad.titulo }}
            </h3>
            <p class="text-sm text-gray-600 mb-2">
              {{ actividad.descripcion || "Sin descripción" }}
            </p>
            <p class="text-xs text-gray-500 mb-4">
              Tipo:
              <span class="font-semibold text-green-700">
                {{ actividad.tipo }}
              </span>
              | Nivel {{ actividad.nivel }}
            </p>

            <!-- ✅ Si ya está completada -->
            <div v-if="actividad.completado" class="text-green-700 font-semibold">
              ✅ Completado — Puntaje: {{ actividad.puntaje }}%
            </div>

            <!-- 🚀 Si no está completada -->
            <div v-else>
              <button
                @click="abrirActividad(actividad)"
                class="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition"
              >
                🎯 Realizar Actividad
              </button>
            </div>
          </div>
        </div>

        <p v-else class="text-center text-gray-500">
          Aún no hay actividades en esta aula.
        </p>

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
          💬 ¡Completa tus actividades y gana experiencia!
        </p>
      </div>
    </main>

    <footer class="text-center py-5 text-sm text-gray-500">
      © 2025 EduPlay — Aprender también es un juego 💚
    </footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MiAulaAlumnoView",
  data() {
    return {
      aula: null,
      actividades: [],
      mensaje: "",
      color: "",
    };
  },
  async mounted() {
    const aulaGuardada = localStorage.getItem("aulaSeleccionada");
    if (aulaGuardada) this.aula = JSON.parse(aulaGuardada);
    if (this.aula) await this.cargarActividades();
  },
  methods: {
    async cargarActividades() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:3000/api/aulas/${this.aula.id}/actividades/listar`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // 🔹 Traer también progreso del alumno
        const progresoRes = await axios.get(
          `http://localhost:3000/api/aulas/${this.aula.id}/progreso`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const actividades = res.data || [];
        const progreso = progresoRes.data || [];

        // 🔹 Vincular progreso con actividades
        const usuarioEmail = JSON.parse(atob(token.split(".")[1])).email;
        this.actividades = actividades.map((a) => {
          const prog = progreso.find((p) => p.email === usuarioEmail);
          if (prog && prog.promedio > 0)
            return { ...a, completado: true, puntaje: prog.promedio };
          return a;
        });
      } catch (err) {
        console.error("❌ Error al cargar actividades:", err);
        this.mensaje = "Error al cargar tus actividades.";
        this.color = "text-red-600";
      }
    },

    // 🚀 Redirigir al tipo de juego o actividad personalizada
    abrirActividad(actividad) {
      const tipo = actividad.tipo?.toLowerCase();
      switch (tipo) {
        case "matematicas":
          this.$router.push("/matematicas");
          break;
        case "suma":
          this.$router.push("/juego-suma");
          break;
        case "resta":
          this.$router.push("/juego-resta");
          break;
        case "multiplicacion":
          this.$router.push("/juego-multiplicacion");
          break;
        case "division":
          this.$router.push("/juego-division");
          break;
        case "lenguaje":
          this.$router.push("/juego-lenguaje");
          break;
        case "lectura":
          this.$router.push("/lectura-comprensiva");
          break;
        default:
          // Si es una actividad personalizada creada por el maestro
          this.$router.push(`/actividad/${actividad.id}`);
          break;
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

/* 🦉 Animación */
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
