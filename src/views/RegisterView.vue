<template>
  <div class="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md mt-20">
    <h2 class="text-2xl font-bold text-center mb-6">Crear Cuenta</h2>

    <form @submit.prevent="registrarUsuario" class="space-y-4">
      <input v-model="name" type="text" placeholder="Nombre completo"
        class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" required />

      <input v-model="email" type="email" placeholder="Correo electrónico"
        class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" required />

      <input v-model="password" type="password" placeholder="Contraseña"
        class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" required />

      <button type="submit"
        class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
        Registrarme
      </button>
    </form>

    <p class="mt-4 text-center text-sm text-gray-600">
      ¿Ya tienes cuenta?
      <a @click="$router.push('/')" class="text-green-600 hover:underline cursor-pointer">
        Inicia sesión
      </a>
    </p>

    <p v-if="mensaje" class="mt-3 text-center text-sm" :class="color">{{ mensaje }}</p>
  </div>
</template>

<script>
import { api } from "../api/api";

export default {
  name: "RegisterView",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      mensaje: "",
      color: "",
    };
  },
  methods: {
    async registrarUsuario() {
      try {
        await api.register({
          name: this.name,
          email: this.email,
          password: this.password,
        });
        this.mensaje = "Cuenta creada con éxito 🎉";
        this.color = "text-green-600";

        // Redirigir al login después de 1.5 segundos
        setTimeout(() => this.$router.push("/"), 1500);
      } catch (err) {
        this.mensaje = err.response?.data?.msg || "Error al registrarse";
        this.color = "text-red-600";
      }
    },
  },
};
</script>
