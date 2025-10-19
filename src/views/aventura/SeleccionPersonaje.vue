


<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-6">
  <h1 class="text-3xl sm:text-4xl font-extrabold text-center text-green-700 mb-2">🐾 ¡Elige a tu compañero de aventuras!</h1>
  <p class="text-sm text-center text-gray-600 mb-6">Selecciona una mascota para acompañarte en los minijuegos y gana recompensas</p>
    <!-- Lista de personajes -->
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8">
      <div
        v-for="(p, index) in personajes"
        :key="index"
        class="bg-white rounded-2xl shadow-lg p-4 hover:scale-105 transition cursor-pointer flex flex-col items-center"
        @click="seleccionar(p)"
        :style="{ border: personajeSeleccionado && personajeSeleccionado.nombre === p.nombre ? '3px solid #22c55e' : '' }"
      >
        <img :src="p.img" class="w-24 h-24 object-contain mb-2" />
        <p class="font-bold text-gray-700">{{ p.nombre }}</p>
      </div>
    </div>

    <!-- Nombre -->
    <div v-if="personajeSeleccionado" class="bg-white p-6 rounded-xl shadow-lg text-center">
      <h2 class="text-2xl font-semibold text-green-700 mb-2">
        Has elegido: <span class="text-green-800 font-bold">{{ personajeSeleccionado.nombre }}</span>
      </h2>
      <img :src="personajeSeleccionado.img" class="w-32 h-32 mx-auto mb-4" />
      <button
        @click="confirmarPersonaje"
        class="bg-green-600 text-white px-6 py-2 rounded-full font-bold hover:bg-green-700 transition"
      >
        🚀 Empezar aventura
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
        { nombre: "Dog ", img: "https://cdn-icons-png.flaticon.com/512/616/616408.png" },
        { nombre: "Cat ", img: "https://cdn-icons-png.flaticon.com/512/616/616430.png" },
        { nombre: "Max ", img: "https://cdn-icons-png.flaticon.com/512/616/616408.png" },
      ],
      personajeSeleccionado: null,
  // nombrePersonaje eliminado
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
    },
    confirmarPersonaje() {
      localStorage.setItem("personaje", JSON.stringify(this.personajeSeleccionado));
      this.$router.push("/minijuegos");
    },
    cerrarSesion() {
      localStorage.removeItem("token");
      localStorage.removeItem("rol");
      this.$router.push("/");
    },
  },
};
</script>
