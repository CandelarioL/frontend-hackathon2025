<template>
  <div>
    <!-- Main content -->
    <div class="min-h-screen bg-gradient-to-b from-sky-200 to-green-100 flex flex-col items-center justify-center p-6">
      <h2 class="text-3xl font-bold text-indigo-700 mb-8 text-center">🐾 ¡Elige tu Compañero de Aventura!</h2>

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-8">
        <div
          v-for="(personaje, index) in personajes"
          :key="index"
          @click="seleccionar(personaje)"
          class="cursor-pointer text-center transition transform hover:scale-105"
        >
          <img
            :src="personaje.img"
            :alt="personaje.nombre"
            class="w-40 h-40 mx-auto rounded-xl shadow-lg border-4"
            :class="personajeSeleccionado === personaje ? 'border-green-500' : 'border-transparent'"
          />
          <p class="mt-3 font-semibold text-gray-800">{{ personaje.nombre }}</p>
        </div>
      </div>

      <button
        v-if="personajeSeleccionado"
        @click="empezar"
        class="mt-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg"
      >
        🚀 Comenzar Aventura
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SeleccionPersonaje",
  data() {
    return {
      personajes: [
        { nombre: "Mochi 🐶", img: "https://cdn-icons-png.flaticon.com/512/616/616408.png" },
        { nombre: "Luna 🐱", img: "https://cdn-icons-png.flaticon.com/512/616/616430.png" },
        { nombre: "Búho 🦉", img: "https://cdn-icons-png.flaticon.com/512/616/616408.png" },
      ],
      personajeSeleccionado: null,
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
          // jwtDecode may not be available globally here; try to decode minimal if present
          const payload = JSON.parse(atob(token.split(".")[1]));
          this.rol = payload.rol || "";
        } catch (e) {
          console.error("Error al decodificar token en SeleccionPersonaje:", e);
        }
      }
    }
  },
  methods: {
    seleccionar(p) {
      this.personajeSeleccionado = p;
      localStorage.setItem("personaje", JSON.stringify(p));
    },
    empezar() {
      this.$router.push("/aventura/mision");
    },
    cerrarSesion() {
      localStorage.removeItem("token");
      localStorage.removeItem("rol");
      this.$router.push("/");
    },
  },
};
</script>
