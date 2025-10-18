<template>
  <div class="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md mt-20">
    <h2 class="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>

    <form @submit.prevent="iniciarSesion" class="space-y-4">
      <input
        v-model="email"
        type="email"
        placeholder="Correo electrónico"
        class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        v-model="password"
        type="password"
        placeholder="Contraseña"
        class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        required
      />

      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Entrar
      </button>
    </form>

    <p class="mt-4 text-center text-sm text-gray-600">
      ¿No tienes cuenta?
      <a @click="$router.push('/register')" class="text-blue-600 hover:underline cursor-pointer">
        Regístrate
      </a>
    </p>

    <p class="mt-2 text-center text-sm text-gray-600">
      ¿Olvidaste tu contraseña?
      <a @click="$router.push('/forgot')" class="text-blue-600 hover:underline cursor-pointer">
        Recuperar
      </a>
    </p>

    <p v-if="mensaje" class="mt-3 text-center text-sm" :class="color">{{ mensaje }}</p>
  </div>
</template>

<script>
import { api } from "../api/api";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      mensaje: "",
      color: "",
    };
  },
  methods: {
    async iniciarSesion() {
      try {
        const res = await api.login({ email: this.email, password: this.password });

        // ✅ Guardar token y rol del usuario
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("rol", res.data.user.rol);

        this.mensaje = "Inicio de sesión exitoso ✅";
        this.color = "text-green-600";

        setTimeout(() => this.$router.push("/menu"), 1000);
      } catch (err) {
        this.mensaje = err.response?.data?.msg || "Error al iniciar sesión";
        this.color = "text-red-600";
      }
    },
  },
};
</script>
