<template>
  <div>
    <!-- 🧭 ENCABEZADO FIJO SIEMPRE -->
    <header
      class="fixed top-0 left-0 w-full flex items-center justify-between bg-white/95 backdrop-blur-md px-6 py-4 shadow-md border-b border-gray-200 z-50 transition-all duration-300"
    >
      <!-- Logo -->
      <div
        class="flex items-center space-x-2 cursor-pointer select-none"
        @click="$router.push('/menu')"
      >
        <span class="text-3xl">🎓</span>
        <span class="text-2xl font-bold text-green-600 tracking-tight"
          >DynamicsClass</span
        >
      </div>

      <!-- Botón hamburguesa (solo móviles) -->
      <button
        @click="menuAbierto = !menuAbierto"
        class="sm:hidden text-3xl text-green-600 focus:outline-none"
      >
        <span v-if="!menuAbierto">☰</span>
        <span v-else>✖</span>
      </button>

      <!-- Cerrar sesión (solo escritorio) -->
      <button
        @click="cerrarSesion"
        class="hidden sm:block bg-green-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-green-700 hover:shadow-lg transition duration-200"
      >
        🚪 Salir
      </button>
    </header>

    <!-- 📚 MENÚ PRINCIPAL (fijo debajo del header) -->
    <nav
      :class="[
        'fixed left-0 w-full text-white font-semibold shadow-lg bg-green-500 transition-all duration-300 z-40',
        menuAbierto
          ? 'top-[72px] max-h-screen opacity-100'
          : 'top-[72px] max-h-0 opacity-0 sm:opacity-100 sm:max-h-none',
      ]"
      class="overflow-hidden sm:overflow-visible sm:flex sm:justify-center sm:gap-6 sm:py-3 text-lg"
    >
      <div
        class="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 sm:gap-6 p-4 sm:p-0"
      >
        <!-- 🏠 Inicio -->
        <button
          @click="$router.push('/menu')"
          class="hover:bg-green-600 px-3 py-1.5 rounded-full flex items-center gap-2 transition duration-200"
        >
          🏠 <span>Inicio</span>
        </button>

        <button
          @click="$router.push('/perfil')"
          class="hover:bg-green-600 px-3 py-1.5 rounded-full flex items-center gap-2 transition duration-200"
        >
          👩‍🏫 <span>Perfil</span>
        </button>

        <button
          @click="$router.push('/matematicas')"
          class="hover:bg-green-600 px-3 py-1.5 rounded-full flex items-center gap-2 transition duration-200"
        >
          🔢 <span>Matemáticas</span>
        </button>

        <button
          @click="$router.push('/juego-lenguaje')"
          class="hover:bg-green-600 px-3 py-1.5 rounded-full flex items-center gap-2 transition duration-200"
        >
          ✏️ <span>Lenguaje</span>
        </button>

        <button
          @click="$router.push('/aventura/personaje')"
          class="bg-yellow-300 text-gray-900 hover:bg-yellow-400 px-4 py-1.5 rounded-full font-semibold shadow flex items-center gap-2 transition duration-200"
        >
          🧭 <span>Misión del Conocimiento</span>
        </button>

        <button
          @click="$router.push('/tienda')"
          class="hover:bg-green-600 px-3 py-1.5 rounded-full flex items-center gap-2 transition duration-200"
        >
          🛍️ <span>Tienda</span>
        </button>

        <template v-if="rol === 'maestro'">
          <button
            @click="$router.push('/crear-aula')"
            class="hover:bg-green-600 px-3 py-1.5 rounded-full flex items-center gap-2 transition duration-200"
          >
            🏗️ <span>Crear Aula</span>
          </button>
          <button
            @click="$router.push('/aulas')"
            class="hover:bg-green-600 px-3 py-1.5 rounded-full flex items-center gap-2 transition duration-200"
          >
            🏫 <span>Mis Aulas</span>
          </button>
        </template>

        <template v-if="rol === 'alumno'">
          <button
            @click="$router.push('/unirse')"
            class="hover:bg-green-600 px-3 py-1.5 rounded-full flex items-center gap-2 transition duration-200"
          >
            🎒 <span>Mi Aula</span>
          </button>
        </template>

        <!-- Cerrar sesión (solo móvil) -->
        <button
          @click="cerrarSesion"
          class="sm:hidden bg-green-700 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-green-800 transition duration-200 mt-2 flex items-center gap-2"
        >
          🚪 <span>Salir</span>
        </button>
      </div>
    </nav>

    <!-- 🧩 Espaciador para que el contenido no quede tapado -->
    <div class="pt-[125px]"></div>
  </div>
</template>

<script>
export default {
  name: "NavBarGlobal",
  data() {
    return {
      rol: "",
      menuAbierto: false,
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
          const payload = JSON.parse(atob(token.split(".")[1]));
          this.rol = payload.rol || "";
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
nav {
  transition: all 0.4s ease;
}
header {
  background-color: rgba(255, 255, 255, 0.95);
}
</style>
