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
        <!-- Letras y números flotantes -->
        <div
          v-for="(item, i) in floatingItems"
          :key="'float-'+i"
          class="absolute text-4xl font-bold opacity-10 select-none animate-float"
          :style="{
            top: item.top + '%',
            left: item.left + '%',
            color: item.color,
            animationDelay: item.delay + 's',
            transform: item.rotate,
          }"
        >
          {{ item.char }}
        </div>
      </div>

    <!-- 🟩 Sección de Login -->
    <div
      class="relative z-10 w-full md:w-[420px] bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-8 md:ml-20 mx-4"
    >
      <div class="flex flex-col items-center mb-6">
        <div
          class="bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold shadow-md mb-2"
        >
          C
        </div>
        <h2 class="text-2xl font-extrabold text-gray-800">Login</h2>
      </div>

      <!-- 🧾 Formulario -->
      <form @submit.prevent="iniciarSesion" class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-none text-gray-700"
          required
        />

        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-none text-gray-700"
          required
        />

        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center space-x-2 text-gray-600">
            <input type="checkbox" class="rounded text-emerald-500" />
            <span>Keep me logged in</span>
          </label>
          <a
            @click="$router.push('/forgot')"
            class="text-emerald-600 hover:underline cursor-pointer"
          >
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          class="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold py-2.5 rounded-xl shadow-md hover:opacity-90 transition transform hover:scale-105"
        >
          Login
        </button>
      </form>

      <p class="text-center mt-5 text-sm text-gray-600">
        Don’t have an account?
        <a
          @click="$router.push('/register')"
          class="text-emerald-600 font-semibold hover:underline cursor-pointer"
        >
          Sign up
        </a>
      </p>

      <!-- 🔸 Mensaje -->
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
        Transformando la forma <br />
        <span class="text-emerald-500">en que el mundo aprende</span>
      </h1>
      <p class="mt-4 text-gray-500 text-base">
        Aprende jugando con DynamicsClass y descubre una nueva forma de
        educación divertida 🌱
      </p>
    </div>
  </div>
</template>

<script>
import { api } from "../api/api";

export default {
  name: "LoginView",
    mounted() {
      this.generateFloatingItems();
    },
  data() {
    return {
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
        floatingItems: [],
    };
  },
  methods: {
      generateFloatingItems() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const colors = ["#059669", "#0284C7", "#7C3AED", "#D97706", "#059669"];
        this.floatingItems = Array.from({ length: 30 }, () => ({
          char: chars[Math.floor(Math.random() * chars.length)],
          top: Math.random() * 100,
          left: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 5,
          rotate: `rotate(${Math.random() * 360}deg)`,
        }));
      },
    async iniciarSesion() {
      try {
        const res = await api.login({ email: this.email, password: this.password });
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

<style scoped>
/* 🎨 Animaciones sutiles */
button,
input {
  transition: all 0.3s ease;
}

button:hover {
  transform: scale(1.05);
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.1; }
  50% { transform: translateY(-20px) rotate(5deg); opacity: 0.15; }
}

.animate-float {
  animation: float 8s ease-in-out infinite;
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
