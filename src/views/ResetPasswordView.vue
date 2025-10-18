<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6">🔒 Restablecer Contraseña</h2>

      <form @submit.prevent="cambiarPassword" class="space-y-4">
        <input
          v-model="nuevaPassword"
          type="password"
          placeholder="Nueva contraseña"
          class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          required
        />

        <button
          type="submit"
          class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Cambiar Contraseña
        </button>
      </form>

      <p class="mt-4 text-center text-sm">
        <router-link to="/" class="text-blue-600 hover:underline">Volver al inicio</router-link>
      </p>

      <p v-if="mensaje" class="mt-4 text-center" :class="color">{{ mensaje }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ResetPasswordView",
  data() {
    return {
      nuevaPassword: "",
      mensaje: "",
      color: "",
    };
  },
  methods: {
    async cambiarPassword() {
      try {
        const token = this.$route.params.token;
        const res = await axios.post("http://localhost:3000/api/auth/cambiar-password", {
          token,
          nuevaPassword: this.nuevaPassword,
        });
        this.mensaje = res.data.msg;
        this.color = "text-green-600";
      } catch (error) {
        this.mensaje =
          error.response?.data?.msg || "Error al actualizar contraseña";
        this.color = "text-red-600";
      }
    },
  },
};
</script>
