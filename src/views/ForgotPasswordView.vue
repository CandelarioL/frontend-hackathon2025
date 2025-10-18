<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6">🔑 Recuperar Contraseña</h2>

      <form @submit.prevent="solicitarReset" class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Correo electrónico"
          class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Enviar enlace
        </button>
      </form>

      <p class="mt-4 text-center text-sm">
        <router-link to="/" class="text-blue-600 hover:underline">Regresar al inicio</router-link>
      </p>

      <p v-if="mensaje" class="mt-4 text-center" :class="color">{{ mensaje }}</p>
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
          error.response?.data?.msg || "Error al enviar solicitud de recuperación";
        this.color = "text-red-600";
      }
    },
  },
};
</script>
