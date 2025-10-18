<template>
  <div
    class="min-h-screen bg-gradient-to-b from-sky-200 to-green-200 flex flex-col items-center justify-center relative overflow-hidden"
    :style="{ fontSize: fontSize + 'px' }"
  >
    <!-- 🟢 Panel de puntuación -->
    <div
      class="absolute top-[140px] right-8 text-right bg-white border border-gray-300 rounded-xl px-6 py-3 shadow-lg z-20"
    >
      <div class="text-sm text-green-700 font-bold">Palabras aprendidas</div>
      <div class="text-3xl font-bold">{{ contador }}</div>
      <div class="text-sm text-blue-600 mt-2 font-semibold">SmartScore</div>
      <div class="text-3xl font-bold text-orange-500">{{ puntuacion }}</div>
    </div>

    <!-- 🐶 Mascota -->
    <div class="absolute bottom-4 left-6 flex flex-col items-center text-center z-10">
      <img
        :class="['w-52 sm:w-64 drop-shadow-2xl transition-transform duration-700', saltando ? 'jump' : '']"
        src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
        alt="Mascota motivadora"
      />
      <p
        class="text-gray-800 text-xl font-semibold italic mt-2 bg-white bg-opacity-80 px-3 py-1 rounded-xl shadow-md max-w-xs"
      >
        {{ mensajeMascota }}
      </p>
    </div>

    <!-- 🔹 Controles de accesibilidad -->
    <div class="absolute top-4 right-4 flex space-x-3 z-20">
      <button
        @click="cambiarIdioma"
        class="bg-indigo-600 text-white px-3 py-2 rounded-lg shadow hover:bg-indigo-700"
      >
        🌐 {{ idioma === 'es' ? 'Wixárika' : 'Español' }}
      </button>
      <button
        @click="aumentarTexto"
        class="bg-green-500 text-white px-3 py-2 rounded-lg shadow hover:bg-green-600"
      >
        ➕ Aumentar
      </button>
      <button
        @click="disminuirTexto"
        class="bg-red-500 text-white px-3 py-2 rounded-lg shadow hover:bg-red-600"
      >
        ➖ Reducir
      </button>
    </div>

    <!-- 🔹 Contenedor principal -->
    <div
      class="bg-white shadow-2xl rounded-2xl p-10 w-[95%] sm:w-[850px] text-center border border-gray-200 relative z-20"
    >
      <h2 class="text-2xl font-semibold text-gray-800 mb-8">
        💬 {{ idioma === "es" ? "Vocabulario" : "Tukari" }}
      </h2>

      <!-- Palabra y definición -->
      <div
        class="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-left text-gray-800 leading-relaxed shadow-inner mb-6"
      >
        <p class="text-2xl font-bold text-blue-700 mb-3">
          {{ idioma === "es" ? palabraActual.palabra : palabraActual.traduccion }}
        </p>
        <p class="text-gray-700">
          {{ idioma === "es" ? palabraActual.definicion : palabraActual.definicion_wixarika }}
        </p>
      </div>

      <!-- Pregunta -->
      <h3 class="text-xl font-semibold text-gray-700 mb-6">
        {{ idioma === "es"
          ? "¿Cuál es la palabra que coincide con la definición?"
          : "¿Nei peme iya tukari nieme?" }}
      </h3>

      <!-- Opciones -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <button
          v-for="(op, index) in palabraActual.opciones"
          :key="index"
          @click="verificar(op)"
          class="bg-gray-100 border-2 border-gray-200 text-gray-700 font-medium rounded-xl py-3 px-4 hover:bg-green-100 hover:border-green-400 transition-all"
        >
          {{ idioma === "es" ? op : traducirOpcion(op) }}
        </button>
      </div>

      <!-- Resultado -->
      <transition name="fade">
        <div
          v-if="mensaje"
          class="mt-4 text-2xl font-semibold"
          :class="esCorrecto ? 'text-green-600' : 'text-red-600'"
        >
          {{ mensaje }}
        </div>
      </transition>

      <!-- Botón de voz -->
      <div class="mt-8">
        <button
          @click="leerPalabra"
          class="flex items-center justify-center mx-auto space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-transform hover:scale-105"
        >
          <span class="material-icons text-3xl">record_voice_over</span>
          <span>
            {{ idioma === "es" ? "Escuchar palabra" : "Kiwixa tukari" }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VocabularioInclusivo",
  data() {
    return {
      idioma: "es",
      fontSize: 18,
      palabras: [
        {
          palabra: "Alegría",
          traduccion: "Tukari",
          definicion: "Sentimiento de felicidad o satisfacción.",
          definicion_wixarika: "Tukari: Nieri niema ximari xi’ari.",
          opciones: ["Tristeza", "Alegría", "Miedo", "Frío"],
          correcta: "Alegría",
        },
        {
          palabra: "Gigante",
          traduccion: "Tatéi",
          definicion: "Algo que es muy, muy grande.",
          definicion_wixarika: "Tatéi: neiya xikúari, xukame.",
          opciones: ["Pequeño", "Gigante", "Lento", "Rápido"],
          correcta: "Gigante",
        },
        {
          palabra: "Bosque",
          traduccion: "Tuxanari",
          definicion: "Lugar con muchos árboles y animales.",
          definicion_wixarika: "Tuxanari: xupeme tewarixi nieme.",
          opciones: ["Desierto", "Bosque", "Playa", "Montaña"],
          correcta: "Bosque",
        },
      ],
      palabraActual: {},
      mensaje: "",
      esCorrecto: false,
      contador: 0,
      puntuacion: 0,
      mensajeMascota: "💬 Aprende palabras nuevas en dos lenguas 🐶📘",
      saltando: false,
    };
  },
  mounted() {
    this.nuevaPalabra();
  },
  methods: {
    cambiarIdioma() {
      this.idioma = this.idioma === "es" ? "wix" : "es";
      this.mensajeMascota =
        this.idioma === "es"
          ? "💬 Aprende nuevas palabras y su significado 🐶📘"
          : "💬 Tukari tei neiya xutiri weiya 🐶✨";
    },
    traducirOpcion(op) {
      const traducciones = {
        Tristeza: "Natsiya",
        Alegría: "Tukari",
        Miedo: "Niutsi",
        Frío: "Tiyari",
        Gigante: "Tatéi",
        Pequeño: "Niwame",
        Bosque: "Tuxanari",
        Desierto: "Xuwime",
      };
      return traducciones[op] || op;
    },
    nuevaPalabra() {
      const index = Math.floor(Math.random() * this.palabras.length);
      this.palabraActual = this.palabras[index];
      this.mensaje = "";
    },
    verificar(opcion) {
      if (opcion === this.palabraActual.correcta) {
        this.mensaje =
          this.idioma === "es"
            ? "✅ ¡Excelente! Has elegido la palabra correcta."
            : "✅ ¡Tei nieri! Nieme tukari ma xuti.";
        this.esCorrecto = true;
        this.contador++;
        this.puntuacion += 20;
        this.saltarMascota();
      } else {
        this.mensaje =
          this.idioma === "es"
            ? `❌ No es correcto. La palabra correcta era "${this.palabraActual.correcta}".`
            : "❌ Neime wa tei. Tukari nieri ma xuti.";
        this.esCorrecto = false;
      }
      setTimeout(() => this.nuevaPalabra(), 4000);
    },
    saltarMascota() {
      this.saltando = true;
      setTimeout(() => (this.saltando = false), 1200);
    },
    leerPalabra() {
      const texto =
        this.idioma === "es"
          ? `${this.palabraActual.palabra}. ${this.palabraActual.definicion}`
          : `${this.palabraActual.traduccion}. ${this.palabraActual.definicion_wixarika}`;
      const speech = new SpeechSynthesisUtterance(texto);
      speech.lang = this.idioma === "es" ? "es-ES" : "es-MX";
      speech.rate = 0.9;
      speech.pitch = 1.1;
      speech.volume = 1.3;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(speech);
    },
    aumentarTexto() {
      if (this.fontSize < 28) this.fontSize += 2;
    },
    disminuirTexto() {
      if (this.fontSize > 14) this.fontSize -= 2;
    },
  },
};
</script>

<style scoped>
.material-icons {
  font-size: 28px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
/* 🐶 Animación de salto */
@keyframes dogJump {
  0% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-60px);
  }
  60% {
    transform: translateY(0);
  }
  80% {
    transform: translateY(-25px);
  }
  100% {
    transform: translateY(0);
  }
}
.jump {
  animation: dogJump 1.2s ease-in-out;
}
</style>
