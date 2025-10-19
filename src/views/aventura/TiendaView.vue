<template>
  <div
    class="min-h-screen bg-gradient-to-b from-yellow-100 via-green-100 to-emerald-100 flex flex-col items-center py-10"
  >
    <h1 class="text-4xl font-extrabold text-indigo-700 mb-6 drop-shadow-sm">
      🐾 Tienda de Mascotas Educativas
    </h1>

    <div class="text-lg mb-8 font-semibold text-gray-700">
      Monedas disponibles:
      <span class="text-yellow-600 font-bold">{{ monedas }}</span> 💰
    </div>

    <!-- 🐶 GRID DE PERSONAJES -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl w-full px-6"
    >
      <div
        v-for="p in personajes"
        :key="p.id"
        class="relative bg-white shadow-xl rounded-2xl p-6 text-center border-4 transition duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden"
        :class="[
          p.id === seleccionado.id ? 'border-green-500' : 'border-gray-200',
          p.legendario ? 'legendario' : '',
        ]"
      >
        <!-- ✨ Fondo legendario animado -->
        <div
          v-if="p.legendario"
          class="absolute inset-0 animate-gradient bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 opacity-40 blur-2xl"
        ></div>

        <!-- Ícono principal -->
        <div class="relative z-10 flex flex-col items-center">
          <div
            class="text-7xl mb-3 drop-shadow-lg animate-bounce-slow"
            :class="{ 'animate-float': p.legendario }"
          >
            {{ p.icono }}
          </div>
          <h3
            class="text-xl font-extrabold text-indigo-700 mb-1 flex items-center justify-center gap-1"
          >
            <span>{{ p.icono }}</span>
            <span>{{ p.nombre }}</span>
          </h3>
          <p class="text-sm text-gray-600 mb-4">{{ p.descripcion }}</p>
        </div>

        <!-- Botones -->
        <div class="relative z-10">
          <button
            v-if="p.comprado"
            @click="seleccionar(p)"
            class="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full font-semibold transition"
          >
            ✅ Seleccionar
          </button>
          <button
            v-else
            @click="comprar(p)"
            :disabled="monedas < p.precio"
            class="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-full font-semibold disabled:bg-gray-400 transition"
          >
            💰 Comprar — {{ p.precio }}
          </button>
        </div>
      </div>
    </div>

    <!-- 🧠 LOGROS -->
    <div
      class="mt-14 bg-white shadow-2xl p-8 rounded-2xl w-[90%] sm:w-[600px] text-center border-4 border-indigo-500"
    >
      <h2 class="text-2xl font-bold text-indigo-700 mb-4">
        🏆 Logros del Jugador
      </h2>
      <p>Nivel actual: <span class="font-semibold">{{ progreso.nivel }}</span></p>
      <p>
        Experiencia total:
        <span class="font-semibold">{{ progreso.experiencia }} XP</span>
      </p>
      <p>
        Mascota actual: <span class="font-semibold">{{ seleccionado.nombre }}</span>
      </p>
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
          nombre: "Mochi",
          icono: "🐶",
          descripcion: "Tu fiel compañero de aprendizaje.",
          precio: 0,
          comprado: true,
        },
        {
          id: 2,
          nombre: "Tigre",
          icono: "🐯",
          descripcion: "Fuerte y valiente para los desafíos difíciles.",
          precio: 30,
          comprado: false,
        },
        {
          id: 3,
          nombre: "Búho",
          icono: "🦉",
          descripcion: "Guía del conocimiento y la sabiduría.",
          precio: 50,
          comprado: false,
        },
        {
          id: 4,
          nombre: "Delfín",
          icono: "🐬",
          descripcion: "Rápido, sociable y amante del conocimiento.",
          precio: 100,
          comprado: false,
          legendario: true,
        },
        {
          id: 5,
          nombre: "Unicornio",
          icono: "🦄",
          descripcion: "El más raro y mágico de todos, símbolo del logro.",
          precio: 150,
          comprado: false,
          legendario: true,
        },
        {
          id: 6,
          nombre: "Dragón",
          icono: "🐉",
          descripcion: "Mítico y poderoso, solo los mejores lo consiguen.",
          precio: 200,
          comprado: false,
          legendario: true,
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
    const personaje =
      JSON.parse(localStorage.getItem("personaje")) || this.personajes[0];
    const compras = JSON.parse(localStorage.getItem("tiendaCompras")) || [];

    this.monedas = datos.monedas;
    this.progreso = datos;
    this.seleccionado = personaje;

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
        const compras =
          JSON.parse(localStorage.getItem("tiendaCompras")) || [];
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

/* ✨ Efecto multicolor legendario */
.legendario {
  position: relative;
  overflow: hidden;
  border-image: linear-gradient(45deg, #ff00ff, #ffcc00, #00ffff, #00ff99) 1;
  animation: borderGlow 3s linear infinite, float 4s ease-in-out infinite;
}

@keyframes borderGlow {
  0% {
    border-color: #ff00ff;
    box-shadow: 0 0 20px #ff00ff;
  }
  25% {
    border-color: #ffcc00;
    box-shadow: 0 0 20px #ffcc00;
  }
  50% {
    border-color: #00ffff;
    box-shadow: 0 0 20px #00ffff;
  }
  75% {
    border-color: #00ff99;
    box-shadow: 0 0 20px #00ff99;
  }
  100% {
    border-color: #ff00ff;
    box-shadow: 0 0 20px #ff00ff;
  }
}

/* 🌈 Fondo animado legendario */
.animate-gradient {
  background-size: 200% 200%;
  animation: gradientShift 6s ease infinite;
}
@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* 🫧 Flotación suave */
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0px);
  }
}
.animate-float {
  animation: float 4s ease-in-out infinite;
}

/* 🧸 rebote lento de iconos */
@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}
</style>
