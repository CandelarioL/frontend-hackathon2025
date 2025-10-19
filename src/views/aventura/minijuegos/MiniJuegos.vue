<template>
  <div class="min-h-screen bg-gradient-to-tr from-green-100 to-blue-100 flex flex-col items-center py-10 px-4">
    <h1 class="text-3xl font-extrabold text-indigo-700 mb-4">🎮 Zona de Juegos Educativos</h1>

    <div v-if="mascota" class="flex flex-col items-center mb-8">
      <img :src="mascota.img" class="w-24 h-24 mb-2" />
  <p class="text-xl font-semibold text-gray-700">Tu mascota: {{ mascota.nombre }}</p>
    </div>

    <!-- Fichas de minijuegos -->
    <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 w-full max-w-5xl">
      <div
        v-for="(juego, i) in juegos"
        :key="i"
        class="bg-white rounded-2xl p-6 shadow-lg hover:scale-105 transition flex flex-col items-center cursor-pointer"
        @click="abrirJuego(juego)"
      >
        <img :src="juego.img" class="w-20 h-20 mb-3" />
        <h2 class="text-lg font-bold text-indigo-700 mb-2">{{ juego.nombre }}</h2>
        <p class="text-gray-600 text-sm text-center">{{ juego.descripcion }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MiniJuegos",
  data() {
    return {
      mascota: null,
      juegos: [
        {
          nombre: "🔢 Pares de Números",
          img: "https://cdn-icons-png.flaticon.com/512/1048/1048941.png",
          descripcion: "Encuentra los números iguales antes de que se acabe el tiempo.",
          ruta: "/juego-pares",
        },
        {
          nombre: "🧩 Rompecabezas",
          img: "https://cdn-icons-png.flaticon.com/512/2721/2721296.png",
          descripcion: "Une las piezas para formar la imagen correcta.",
          ruta: "/juego-rompecabezas",
        },
        {
          nombre: "🎨 Colores y Formas",
          img: "https://cdn-icons-png.flaticon.com/512/2917/2917990.png",
          descripcion: "Asocia las formas con su color correcto.",
          ruta: "/juego-colores",
        },
        {
          nombre: "📖 Palabra Correcta",
          img: "https://cdn-icons-png.flaticon.com/512/3233/3233479.png",
          descripcion: "Selecciona la palabra bien escrita o el significado correcto.",
          ruta: "/juego-palabra",
        },
        {
          nombre: "🧠 Secuencia Lógica",
          img: "https://cdn-icons-png.flaticon.com/512/1674/1674291.png",
          descripcion: "Adivina qué elemento sigue en la secuencia.",
          ruta: "/juego-logica",
        },
        {
          nombre: "🎵 Juego de Valores",
          img: "https://cdn-icons-png.flaticon.com/512/727/727269.png",
          descripcion: "Escucha y adivina qué sonido es.",
          ruta: "/juego-sonido",
        },
      ],
    };
  },
  mounted() {
    const mascotaGuardada = localStorage.getItem("mascota");
    if (mascotaGuardada) this.mascota = JSON.parse(mascotaGuardada);
  },
  methods: {
    abrirJuego(juego) {
      // Diagnostic log to verify click fires
      console.log("abrirJuego llamado para:", juego.ruta);

      // Try regular router navigation; if it fails, fallback to hash change
      try {
        if (this.$router) {
          this.$router.push(juego.ruta).catch((err) => {
            // ignore NavigationDuplicated or similar
            console.warn("router.push error (ignored):", err);
          });
        } else {
          // Fallback for environments where $router isn't available
          window.location.hash = `#${juego.ruta}`;
        }
      } catch (e) {
        console.error("Error al navegar con router, usando hash fallback:", e);
        window.location.hash = `#${juego.ruta}`;
      }
    },
  },
};
</script>
