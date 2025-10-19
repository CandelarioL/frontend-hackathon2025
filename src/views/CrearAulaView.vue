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
        class="w-full max-w-lg bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-green-100"
      >
        <h2
          class="text-3xl font-extrabold text-center text-green-700 mb-6 drop-shadow-sm"
        >
          🏗️ Crear Nueva Aula
        </h2>

        <p class="text-gray-600 text-center mb-6">
          Crea un aula para tus alumnos. Recibirás un
          <strong class="text-green-700">código de acceso</strong>
          que ellos usarán para unirse.
        </p>

        <!-- 🔸 Formulario -->
        <form @submit.prevent="crearAula" class="space-y-5">
          <div>
            <label class="block font-semibold text-gray-700 mb-1"
              >Nombre del aula</label
            >
            <input
              v-model="nombre"
              type="text"
              maxlength="100"
              placeholder="Ejemplo: Aula 5°A"
              class="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
              required
            />
          </div>

          <div>
            <label class="block font-semibold text-gray-700 mb-1"
              >Descripción (opcional)</label
            >
            <textarea
              v-model="descripcion"
              rows="3"
              placeholder="Describe brevemente tu aula..."
              class="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 resize-none transition"
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold shadow-md transition"
          >
            ➕ Crear Aula
          </button>
        </form>

        <!-- 🔹 Mensaje de estado -->
        <transition name="fade">
          <p
            v-if="mensaje"
            class="mt-6 text-center text-sm font-medium"
            :class="color"
          >
            {{ mensaje }}
          </p>
        </transition>

        <!-- 🔹 Resultado -->
        <div
          v-if="aulaCreada"
          class="mt-6 p-5 border border-green-100 rounded-lg bg-green-50 text-center shadow-sm"
        >
          <h3 class="text-lg font-bold text-green-700 mb-2">
            ✅ Aula creada correctamente
          </h3>
          <p class="text-gray-700 font-medium">{{ aulaCreada.nombre }}</p>
          <p class="text-sm text-gray-700 mt-2">
            Código de acceso:
            <span
              class="font-bold text-green-700 text-lg bg-green-100 px-2 py-1 rounded-lg"
              >{{ aulaCreada.codigo_acceso }}</span
            >
          </p>
        </div>
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
          💬 ¡Crea tu aula y empieza a guiar a tus alumnos!
        </p>
      </div>
    </main>

    <!-- 🔹 Pie -->
    <footer class="text-center py-5 text-sm text-gray-500">
      © 2025 DynamicsClass — Enseñar también es inspirar 💚
    </footer>
  </div>
</template>

<script>
import { api } from "../api/api";

export default {
  name: "CrearAulaView",
  data() {
    return {
      nombre: "",
      descripcion: "",
      mensaje: "",
      color: "",
      aulaCreada: null,
      rol: "",
    };
  },
  mounted() {
    this.obtenerRol();
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
          console.error("Error al decodificar token en CrearAulaView:", e);
        }
      }
    },

    async crearAula() {
      if (!this.nombre.trim()) {
        this.mensaje = "⚠️ El nombre del aula es obligatorio.";
        this.color = "text-yellow-600";
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const data = {
          nombre: this.nombre.trim(),
          descripcion: this.descripcion.trim() || null,
        };

        const res = await api.crearAula(data, token);
        this.mensaje = res.data.msg || "✅ Aula creada correctamente.";
        this.color = "text-green-600";
        this.aulaCreada = res.data.aula;

        // 🔁 Limpiar formulario
        this.nombre = "";
        this.descripcion = "";
      } catch (err) {
        console.error("❌ Error al crear aula:", err);
        this.mensaje =
          err.response?.data?.msg || "❌ Error al crear el aula.";
        this.color = "text-red-600";
      } finally {
        setTimeout(() => (this.mensaje = ""), 4000);
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
