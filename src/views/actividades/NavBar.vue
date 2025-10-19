<template>
  <div>
    <!-- 🔹 Barra superior -->
    <header
      class="flex flex-col sm:flex-row items-center justify-between bg-white px-8 py-4 shadow-md border-b border-gray-200"
    >
      <!-- Logo y buscador -->
      <div class="flex items-center space-x-4">
        <div
          class="flex items-center space-x-2 cursor-pointer"
          @click="$router.push('/menu')"
        >
          <span class="text-3xl">🧩</span>
          <span class="text-2xl font-bold text-green-600 tracking-tight">
            EduPlay
          </span>
        </div>

        <div class="relative hidden sm:block">
          <input
            type="text"
            placeholder="Buscar temas o competencias..."
            class="border border-gray-300 rounded-full px-4 py-1.5 text-sm w-64 pl-8 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <span
            class="absolute left-2 top-1.5 text-gray-400 text-sm material-icons"
            style="font-size: 18px"
          >
            search
          </span>
        </div>
      </div>

      <!-- Botón de cerrar sesión -->
      <button
        @click="cerrarSesion"
        class="mt-3 sm:mt-0 bg-green-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-green-700 hover:shadow-lg transition duration-200"
      >
        🚪 Cerrar sesión
      </button>
    </header>

    <!-- 🔹 Barra de navegación -->
    <nav
      class="bg-green-500 text-white flex flex-wrap justify-center gap-8 py-4 text-lg font-semibold shadow-lg"
    >
      <!-- Opciones generales -->
      <button
        @click="$router.push('/perfil')"
        class="hover:bg-green-600 px-3 py-1.5 rounded-full transition duration-200"
      >
        👤 Perfil
      </button>

      <button
        @click="$router.push('/matematicas')"
        class="hover:bg-green-600 px-3 py-1.5 rounded-full transition duration-200"
      >
        🧮 Matemáticas
      </button>

      <button
        @click="$router.push('/juego-lenguaje')"
        class="hover:bg-green-600 px-3 py-1.5 rounded-full transition duration-200"
      >
        ✍️ Lenguaje
      </button>

      <!-- NUEVO: Aventura educativa -->
      <button
        @click="$router.push('/aventura/personaje')"
        class="bg-yellow-400 text-gray-900 hover:bg-yellow-500 px-4 py-1.5 rounded-full font-semibold shadow transition duration-200"
      >
        🎮 Misión del Conocimiento
      </button>

      <button
        @click="$router.push('/tienda')"
        class="hover:bg-green-600 px-3 py-1.5 rounded-full transition duration-200"
      >
        🐾 Tienda
      </button>

      <!-- Maestro -->
      <template v-if="rol === 'maestro'">
        <button
          @click="$router.push('/crear-aula')"
          class="hover:bg-green-600 px-3 py-1.5 rounded-full transition duration-200"
        >
          🏗️ Crear Aula
        </button>

        <button
          @click="$router.push('/aulas')"
          class="hover:bg-green-600 px-3 py-1.5 rounded-full transition duration-200"
        >
          🏫 Mis Aulas
        </button>


                <button
          @click="$router.push(`/actividad/${actividad.id}`)"
          class="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition"
        >
          🚀 Realizar Actividad
        </button>

      </template>

      <!-- Alumno -->
      <template v-if="rol === 'alumno'">
        <button
          @click="$router.push('/mi-aula-alumno')"
          class="hover:bg-green-600 px-3 py-1.5 rounded-full transition duration-200"
        >
          🎓 Mi Aula
        </button>
      </template>
    </nav>
  </div>
</template>

<script>
import { jwtDecode } from "jwt-decode";

export default {
  name: "NavBar",
  data() {
    return {
      rol: "",
    };
  },
  mounted() {
    const rolGuardado = localStorage.getItem("rol");
    if (rolGuardado) {
      this.rol = rolGuardado;
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          this.rol = decoded.rol || "";
        } catch (e) {
          console.error("Error al decodificar token:", e);
        }
      }
    }
  },
  methods: {
    cerrarSesion() {
      localStorage.removeItem("token");
      localStorage.removeItem("rol");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
@media (max-width: 640px) {
  nav {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
