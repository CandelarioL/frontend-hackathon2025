<template>
  <div
    class="min-h-screen bg-gradient-to-b from-yellow-100 to-green-100 flex flex-col items-center py-10"
  >
    <h1 class="text-4xl font-bold text-indigo-700 mb-6">🐾 Tienda de Mascotas</h1>

    <div class="text-lg mb-8 font-semibold text-gray-700">
      Monedas disponibles: <span class="text-yellow-600 font-bold">{{ monedas }}</span> 💰
    </div>

    <!-- 🐾 Grid de personajes -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl w-full px-6"
    >
      <div
        v-for="p in personajes"
        :key="p.id"
        class="bg-white shadow-xl rounded-2xl p-6 text-center border-4"
        :class="{
          'border-green-500': p.id === seleccionado.id,
          'border-gray-200': p.id !== seleccionado.id,
        }"
      >
        <img
          :src="p.img"
          class="w-32 h-32 mx-auto mb-4 drop-shadow-lg"
          alt="personaje"
        />
        <h3 class="text-xl font-semibold text-indigo-700 mb-2">{{ p.nombre }}</h3>
        <p class="text-sm text-gray-600 mb-4">{{ p.descripcion }}</p>

        <div v-if="p.comprado">
          <button
            @click="seleccionar(p)"
            class="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full font-semibold transition"
          >
            ✅ Seleccionar
          </button>
        </div>

        <div v-else>
          <button
            @click="comprar(p)"
            :disabled="monedas < p.precio"
            class="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-full font-semibold disabled:bg-gray-400 transition"
          >
            💰 Comprar — {{ p.precio }}
          </button>
        </div>
      </div>
    </div>

    <!-- 🧠 Logros -->
    <div class="mt-10 bg-white shadow-xl p-8 rounded-2xl w-[90%] sm:w-[600px] text-center border-4 border-indigo-500">
      <h2 class="text-2xl font-bold text-indigo-700 mb-4">🏆 Logros del jugador</h2>
      <p>Nivel actual: <span class="font-semibold">{{ progreso.nivel }}</span></p>
      <p>Experiencia total: <span class="font-semibold">{{ progreso.experiencia }} XP</span></p>
      <p>Mascota actual: <span class="font-semibold">{{ seleccionado.nombre }}</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TiendaView",
  data() {
    return {
      monedas: 0,
      progreso: { nivel: 1, experiencia: 0 },
      seleccionado: {},
      personajes: [
        {
          id: 1,
          nombre: "Mochi 🐶",
          img: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
          descripcion: "Tu fiel compañero de aprendizaje.",
          precio: 0,
          comprado: true,
        },
        {
          id: 2,
          nombre: "Tigre 🐯",
          img: "https://cdn-icons-png.flaticon.com/512/1998/1998615.png",
          descripcion: "Fuerte y valiente para los desafíos difíciles.",
          precio: 30,
          comprado: false,
        },
        {
          id: 3,
          nombre: "Panda 🐼",
          img: "https://cdn-icons-png.flaticon.com/512/616/6164087.png",
          descripcion: "Tranquilo, sabio y paciente en tus misiones.",
          precio: 40,
          comprado: false,
        },
        {
          id: 4,
          nombre: "Búho 🦉",
          img: "https://cdn-icons-png.flaticon.com/512/616/6164086.png",
          descripcion: "Guía del conocimiento y la sabiduría.",
          precio: 50,
          comprado: false,
        },
      ],
    };
  },
  mounted() {
    const datos = JSON.parse(localStorage.getItem("aventura")) || {
      monedas: 0,
      nivel: 1,
      experiencia: 0,
    };
    const personaje = JSON.parse(localStorage.getItem("personaje")) || this.personajes[0];
    const compras = JSON.parse(localStorage.getItem("tiendaCompras")) || [];

    this.monedas = datos.monedas;
    this.progreso = datos;
    this.seleccionado = personaje;

    // marcar comprados
    this.personajes.forEach((p) => {
      if (compras.includes(p.id)) p.comprado = true;
    });
  },
  methods: {
    comprar(p) {
      if (this.monedas >= p.precio) {
        this.monedas -= p.precio;
        p.comprado = true;
        this.hablar(`Has comprado a ${p.nombre}!`);
        const compras = JSON.parse(localStorage.getItem("tiendaCompras")) || [];
        compras.push(p.id);
        localStorage.setItem("tiendaCompras", JSON.stringify(compras));
        localStorage.setItem(
          "aventura",
          JSON.stringify({
            ...this.progreso,
            monedas: this.monedas,
          })
        );
      } else {
        this.hablar("No tienes suficientes monedas aún.");
      }
    },
    seleccionar(p) {
      this.seleccionado = p;
      localStorage.setItem("personaje", JSON.stringify(p));
      this.hablar(`Has seleccionado a ${p.nombre} como tu compañero.`);
    },
    hablar(texto) {
      const voz = new SpeechSynthesisUtterance(texto);
      voz.lang = "es-ES";
      voz.rate = 0.9;
      voz.pitch = 1.1;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(voz);
    },
  },
};
</script>

<style scoped>
button {
  transition: all 0.3s ease;
}
button:disabled {
  cursor: not-allowed;
}
</style>
