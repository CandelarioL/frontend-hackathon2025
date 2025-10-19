<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-emerald-100 to-lime-100 px-4"
  >
    <!-- 🟢 Encabezado EduPlay -->
    <div class="text-center mb-8 animate-bounce">
      <h1 class="text-4xl font-extrabold text-green-700 tracking-tight">
        <span class="text-5xl">📧</span> Edu<span class="text-emerald-600">Play</span>
      </h1>
      <p class="text-green-700 mt-2 font-medium">
        ¿Olvidaste tu contraseña? ¡No te preocupes! 🌱
      </p>
    </div>

    <!-- 🧩 Tarjeta del formulario -->
    <div
      class="bg-white/90 backdrop-blur-md border border-green-200 p-8 rounded-2xl shadow-lg w-full max-w-md"
    >
      <h2 class="text-2xl font-bold text-center text-green-700 mb-6">
        Recuperar Contraseña
      </h2>

      <form @submit.prevent="solicitarReset" class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Correo electrónico"
          class="w-full px-4 py-2 border border-green-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none text-gray-700"
          required
        />

        <button
          type="submit"
          class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-xl shadow-md transition transform hover:scale-105"
        >
          Enviar enlace
        </button>
      </form>

      <!-- 🔹 Enlace de regreso -->
      <div class="text-center mt-5 text-sm text-gray-600">
        <p>
          <router-link
            to="/"
            class="text-green-700 font-semibold hover:underline cursor-pointer"
          >
            ← Regresar al inicio
          </router-link>
        </p>
      </div>

      <!-- 💬 Mensaje -->
      <p
        v-if="mensaje"
        class="mt-4 text-center text-sm font-semibold"
        :class="color"
      >
        {{ mensaje }}
      </p>
    </div>

    <!-- 🌿 Footer -->
    <div class="absolute bottom-4 text-green-600 text-sm">
      © 2025 EduPlay — Recupera tu acceso y sigue aprendiendo 💚
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ForgotPasswordView",
  data() {
    return {
      email: "",
      mensaje: "",
      color: "",
    };
  },
  methods: {
    async solicitarReset() {
      try {
        const res = await axios.post("http://localhost:3000/api/auth/solicitar-reset", {
          email: this.email,
        });
        this.mensaje = res.data.msg;
        this.color = "text-green-600";
      } catch (error) {
        this.mensaje =
          error.response?.data?.msg ||
          "Error al enviar solicitud de recuperación";
        this.color = "text-red-600";
      }
    },
  },
};
</script>

<style scoped>
/* 🌿 Animaciones y detalles visuales */
input,
button {
  transition: all 0.3s ease;
}

button:hover {
  transform: scale(1.05);
}

.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-4%);
  }
  50% {
    transform: translateY(0);
  }
}
</style>
