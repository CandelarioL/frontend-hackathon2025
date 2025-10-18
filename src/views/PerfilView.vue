<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-emerald-100 to-lime-50"
  >
  <!-- NavBarGlobal is rendered globally in App.vue -->

    <!-- 🔹 Contenido del perfil -->
    <main
      class="flex-1 flex flex-col items-center justify-center text-center px-6 py-12"
    >
      <h2 class="text-3xl font-bold text-green-700 mb-6">
        👋 Bienvenido a tu Perfil
      </h2>

      <div
        class="bg-white/90 backdrop-blur-sm border border-green-200 rounded-2xl shadow-lg px-8 py-6 max-w-md text-left"
      >
        <p class="text-gray-700 text-lg mb-2">
          <strong>📧 Correo:</strong> {{ usuario.email }}
        </p>
        <p class="text-gray-700 text-lg mb-4">
          <strong>🆔 ID de usuario:</strong> {{ usuario.id }}
        </p>

        <div class="flex flex-wrap justify-center gap-4 mt-6">
          <button
            @click="cerrarSesion"
            class="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition font-semibold"
          >
            🚪 Cerrar sesión
          </button>

          <button
            @click="verificarToken"
            class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            🔍 Verificar token
          </button>
        </div>

        <p
          v-if="mensaje"
          class="mt-4 text-center text-sm font-medium"
          :class="color"
        >
          {{ mensaje }}
        </p>
      </div>

      <!-- 🐾 Mascota motivadora -->
      <div
        class="absolute bottom-6 right-6 flex flex-col items-center text-center animate-bounce-slow"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
          alt="Mascota EduPlay"
          class="w-32 sm:w-40 drop-shadow-xl"
        />
        <p
          class="text-gray-700 font-semibold bg-white/80 px-4 py-1 rounded-full shadow-sm mt-2"
        >
          💬 ¡Sigue aprendiendo, {{ usuario.email?.split('@')[0] || 'genio' }}!
        </p>
      </div>
    </main>

    <!-- 🔹 Pie -->
    <footer class="text-center py-4 text-sm text-gray-500">
      © 2025 EduPlay — Aprende a tu ritmo 💚
    </footer>
  </div>
</template>

<script>
import { api } from "../api/api";

export default {
  name: "PerfilView",
  data() {
    return {
      usuario: {},
      mensaje: "",
      color: "",
    };
  },
  async mounted() {
    await this.obtenerPerfil();
  },
  methods: {
    async obtenerPerfil() {
      try {
        const token = localStorage.getItem("token");
        const res = await api.perfil(token);
        this.usuario = res.data.usuario;
      } catch {
        this.mensaje = "⚠️ Token inválido o expirado.";
        this.color = "text-red-600";
        setTimeout(() => this.cerrarSesion(), 2000);
      }
    },
    async verificarToken() {
      try {
        const token = localStorage.getItem("token");
        const res = await api.perfil(token);
        this.mensaje = res.data.msg || "Token válido ✅";
        this.color = "text-green-600";
      } catch {
        this.mensaje = "Token inválido ❌";
        this.color = "text-red-600";
      }
    },
    cerrarSesion() {
      localStorage.removeItem("token");
      localStorage.removeItem("rol");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
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
