<template>
  <div
    class="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white relative overflow-hidden"
  >
    <!-- 🎨 Formas decorativas -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        v-for="(shape, i) in shapes"
        :key="i"
        class="absolute rounded-full opacity-60 blur-2xl"
        :style="{
          width: shape.size,
          height: shape.size,
          top: shape.top,
          left: shape.left,
          background: shape.color,
          transform: shape.rotate,
        }"
      ></div>
    </div>

    <!-- 🟩 Sección de registro -->
    <div
      class="relative z-10 w-full md:w-[420px] bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-8 md:ml-20 mx-4"
    >
      <div class="flex flex-col items-center mb-6">
        <div
          class="bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold shadow-md mb-2"
        >
          🌱
        </div>
        <h2 class="text-2xl font-extrabold text-gray-800">Crear Cuenta</h2>
      </div>

      <!-- 🧾 Formulario -->
      <form @submit.prevent="registrarUsuario" class="space-y-4">
        <input
          v-model="name"
          type="text"
          placeholder="Nombre completo"
          class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-none text-gray-700"
          required
        />

        <input
          v-model="email"
          type="email"
          placeholder="Correo electrónico"
          class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-none text-gray-700"
          required
        />

        <input
          v-model="password"
          type="password"
          placeholder="Contraseña"
          class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-none text-gray-700"
          required
        />

        <button
          type="submit"
          class="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold py-2.5 rounded-xl shadow-md hover:opacity-90 transition transform hover:scale-105"
        >
          Registrarme
        </button>
      </form>

      <!-- 🔸 Enlaces inferiores -->
      <p class="text-center mt-5 text-sm text-gray-600">
        ¿Ya tienes cuenta?
        <a
          @click="$router.push('/')"
          class="text-emerald-600 font-semibold hover:underline cursor-pointer"
        >
          Inicia sesión
        </a>
      </p>

      <!-- 💬 Mensaje -->
      <p
        v-if="mensaje"
        class="mt-4 text-center text-sm font-semibold"
        :class="color"
      >
        {{ mensaje }}
      </p>
    </div>

    <!-- 🖋️ Texto decorativo lateral -->
    <div
      class="hidden md:flex flex-col justify-center items-start ml-12 z-10 max-w-md"
    >
      <h1 class="text-4xl font-extrabold text-gray-800 leading-snug">
        Aprende, juega y <br />
        <span class="text-emerald-500">crece con DynamicsClass</span>
      </h1>
      <p class="mt-4 text-gray-500 text-base">
        Crea tu cuenta y empieza tu viaje educativo interactivo 🌱💫
      </p>
    </div>
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
      shapes: [
        { size: "160px", top: "10%", left: "70%", color: "#A7F3D0", rotate: "rotate(25deg)" },
        { size: "120px", top: "60%", left: "80%", color: "#FBCFE8", rotate: "rotate(-30deg)" },
        { size: "140px", top: "75%", left: "10%", color: "#BFDBFE", rotate: "rotate(15deg)" },
        { size: "100px", top: "15%", left: "5%", color: "#FDE68A", rotate: "rotate(45deg)" },
      ],
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
        setTimeout(() => this.$router.push("/"), 1500);
      } catch (err) {
        this.mensaje = err.response?.data?.msg || "Error al registrarse";
        this.color = "text-red-600";
      }
    },
  },
};
</script>

<style scoped>
button,
input {
  transition: all 0.3s ease;
}

button:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .text-4xl {
    font-size: 1.8rem;
  }
  .max-w-md {
    text-align: center;
    margin: 2rem auto 0;
  }
}
</style>
