<template>
  <div
    class="min-h-screen relative flex flex-col items-center justify-center overflow-hidden px-4 py-8 sm:px-6"
    :style="{ fontSize: fontSize + 'px' }"
  >
    <!-- 🌀 Fondo de letras -->
    <div class="absolute inset-0 bg-gradient-to-b from-sky-200 to-green-200 overflow-hidden">
      <div
        v-for="(letra, i) in letrasFondo"
        :key="i"
        class="absolute font-bold opacity-10 text-gray-700 animate-float select-none pointer-events-none"
        :style="{
          top: letra.top + '%',
          left: letra.left + '%',
          animationDelay: letra.delay + 's',
          color: letra.color,
          fontSize: letra.size + 'px',
          transform: `translate(-50%, -50%) rotate(${letra.rotate}deg)`
        }"
      >
        {{ letra.char }}
      </div>
    </div>

    <!-- 🟢 Panel de puntuación -->
    <div
      class="hidden sm:block absolute top-4 sm:top-36 left-1/2 sm:left-auto -translate-x-1/2 sm:translate-x-0 right-4 sm:right-8 text-right bg-white bg-opacity-95 border border-gray-300 rounded-xl px-4 py-2 sm:px-6 sm:py-3 shadow-lg z-20 w-44 sm:w-auto"
      style="backdrop-filter: blur(4px);"
    >
      <div class="text-sm text-green-700 font-bold">
        {{ idioma === 'es' ? 'Oraciones formadas' : 'Tukari neiya' }}
      </div>
      <div class="text-3xl font-bold">{{ contador }}</div>
      <div class="text-sm text-blue-600 mt-2 font-semibold">SmartScore</div>
      <div class="text-3xl font-bold text-orange-500">{{ puntuacion }}</div>
    </div>

    <!-- 🐶 Mascota -->
    <div class="hidden sm:flex absolute bottom-4 left-4 sm:left-6 flex-col items-center text-center z-10 max-w-[180px] sm:max-w-xs">
      <img
        :class="['w-28 sm:w-52 drop-shadow-2xl transition-transform duration-700', saltando ? 'jump' : '']"
        src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
        alt="Mascota motivadora"
      />
      <p
        class="text-gray-800 text-sm sm:text-lg font-semibold italic mt-2 bg-white bg-opacity-80 px-3 py-1 rounded-xl shadow-md break-words"
      >
        {{ mensajeMascota }}
      </p>
    </div>

    <!-- 🔹 Controles de accesibilidad -->
    <div class="absolute top-4 right-4 flex space-x-2 sm:space-x-3 z-30 items-center">
      <button
        @click="cambiarIdioma"
        class="bg-indigo-600 text-white px-3 py-2 rounded-lg shadow hover:bg-indigo-700"
      >
        🌐 {{ idioma === 'es' ? 'Wixárika' : 'Español' }}
      </button>
      <button
        @click="aumentarTexto"
        class="bg-green-500 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-lg shadow hover:bg-green-600"
      >
        ➕
      </button>
      <button
        @click="disminuirTexto"
        class="bg-red-500 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-lg shadow hover:bg-red-600"
      >
        ➖
      </button>
    </div>

    <!-- 🔹 Contenedor principal -->
    <div
      class="bg-white bg-opacity-95 shadow-2xl rounded-2xl p-6 sm:p-10 w-full max-w-[900px] text-center border border-gray-200 relative z-20 backdrop-blur-sm"
      style="min-width:260px;"
    >
      <h2 class="text-2xl font-semibold text-gray-800 mb-8">
        🧩 {{ idioma === "es" ? "Formar Oraciones Correctas" : "Tukari tewi neyutɨa" }}
      </h2>

      <p class="text-gray-700 mb-6 text-lg">
        {{
          idioma === "es"
            ? "Haz clic en las palabras en el orden correcto para formar la oración:"
            : "Kiwixa tukari neyutɨa, neyutɨa tei ma xuti."
        }}
      </p>

      <!-- Palabras desordenadas -->
      <div class="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
        <button
          v-for="(palabra, index) in palabrasDesordenadas"
          :key="index"
          :disabled="palabra.usada"
          @click="seleccionarPalabra(index)"
          class="bg-yellow-100 border-2 border-yellow-300 rounded-xl px-3 sm:px-4 py-2 text-base sm:text-lg font-medium text-gray-800 shadow-sm hover:bg-green-100 transition truncate"
        >
          {{ palabra.texto }}
        </button>
      </div>

      <!-- Oración construida -->
      <div
        class="min-h-[60px] bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 text-lg font-medium text-gray-700 mb-6 shadow-inner break-words"
      >
        <span
          v-for="(palabra, i) in oracionConstruida"
          :key="i"
          class="mx-1 text-blue-700 font-semibold"
        >
          {{ palabra }}
        </span>
      </div>

      <!-- Botones -->
      <div class="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-4">
        <button
          @click="verificar"
          class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-transform hover:scale-105"
        >
          {{ idioma === 'es' ? 'Verificar' : 'Neiwa' }}
        </button>
        <button
          @click="reiniciar"
          class="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-transform hover:scale-105"
        >
          {{ idioma === 'es' ? 'Reiniciar' : 'Puxika' }}
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
          @click="leerInstruccion"
          class="flex items-center justify-center mx-auto space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-transform hover:scale-105"
        >
          <span class="material-icons text-3xl">record_voice_over</span>
          <span>{{ idioma === 'es' ? 'Escuchar instrucciones' : 'Kiwixa tukari' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormarOracionesInclusivas",
  data() {
    return {
      idioma: "es",
      fontSize: 18,
      letrasFondo: [],
      oraciones: [
        { es: "El perro corre en el parque", wix: "Neiwa xuri neiya tei parke" },
        { es: "Mi mamá cocina una sopa deliciosa", wix: "Neiwa niutsi tei supa tukari" },
        { es: "Los niños juegan con la pelota", wix: "Teime tepari neiya tei xukari" },
        { es: "El sol brilla en el cielo", wix: "Neiwa tei niari tei tuturi" },
        { es: "La maestra escribe en el pizarrón", wix: "Neiwa tei maestra niyari tei pizaron" },
      ],
      palabrasDesordenadas: [],
      oracionConstruida: [],
      oracionActual: "",
      oracionTraduccion: "",
      mensaje: "",
      esCorrecto: false,
      contador: 0,
      puntuacion: 0,
      mensajeMascota:
        "💬 Ordena las palabras como un rompecabezas para formar una oración 🐶✨",
      saltando: false,
    };
  },
  mounted() {
    this.nuevaOracion();
    this.generarLetrasFondo();
    window.addEventListener('resize', this._handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this._handleResize);
  },
  methods: {
    _handleResize() {
      clearTimeout(this._resizeTimeout);
      this._resizeTimeout = setTimeout(() => this.generarLetrasFondo(), 150);
    },
    generarLetrasFondo() {
      this.letrasFondo = [];
      const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZÑÁÉÍÓÚ";
      const width = window.innerWidth || 1024;
      let count = 20;
      if (width < 480) count = 8;
      else if (width < 768) count = 12;
      else if (width < 1024) count = 16;
      for (let i = 0; i < count; i++) {
        const randChar = letras.charAt(Math.floor(Math.random() * letras.length));
        const sizeBase = width < 480 ? 18 : width < 768 ? 26 : 34;
        const size = Math.round(sizeBase + Math.random() * 16);
        this.letrasFondo.push({
          char: randChar,
          top: Math.random() * 100,
          left: Math.random() * 100,
          delay: Math.random() * 5,
          rotate: (Math.random() - 0.5) * 40,
          size,
          color: ["#1E3A8A", "#0EA5E9", "#9333EA", "#059669"][Math.floor(Math.random() * 4)],
        });
      }
    },
    cambiarIdioma() {
      this.idioma = this.idioma === "es" ? "wix" : "es";
      this.mensajeMascota =
        this.idioma === "es"
          ? "💬 Ordena las palabras como un rompecabezas para formar una oración 🐶✨"
          : "💬 Tukari neyutɨa tei nieri neyutɨa tewi 🐶✨";
    },
    nuevaOracion() {
      const index = Math.floor(Math.random() * this.oraciones.length);
      this.oracionActual = this.oraciones[index].es;
      this.oracionTraduccion = this.oraciones[index].wix;
      const palabras = this.oracionActual.split(" ");
      this.palabrasDesordenadas = palabras
        .map((texto) => ({ texto, usada: false }))
        .sort(() => Math.random() - 0.5);
      this.oracionConstruida = [];
      this.mensaje = "";
    },
    seleccionarPalabra(index) {
      const palabra = this.palabrasDesordenadas[index];
      palabra.usada = true;
      this.oracionConstruida.push(palabra.texto);
    },
    verificar() {
      const construida = this.oracionConstruida.join(" ");
      if (construida === this.oracionActual) {
        this.mensaje = this.idioma === "es"
          ? "✅ ¡Muy bien! Has formado la oración correctamente."
          : "✅ ¡Tei nieri! Tukari neyutɨa.";
        this.esCorrecto = true;
        this.contador++;
        this.puntuacion += 25;
        this.saltarMascota();
      } else {
        this.mensaje = this.idioma === "es"
          ? "❌ No está correcta. Intenta de nuevo."
          : "❌ Xuwe tei. Pewi neiya.";
        this.esCorrecto = false;
      }
      setTimeout(() => this.nuevaOracion(), 4000);
    },
    reiniciar() {
      this.nuevaOracion();
    },
    saltarMascota() {
      this.saltando = true;
      setTimeout(() => (this.saltando = false), 1200);
    },
    leerInstruccion() {
      const texto =
        this.idioma === "es"
          ? "Ordena las palabras correctamente para formar una oración con sentido."
          : "Kiwixa tukari neyutɨa tei ma xuti.";
      const speech = new SpeechSynthesisUtterance(texto);
      speech.lang = this.idioma === "es" ? "es-ES" : "es-MX";
      speech.rate = 0.9;
      speech.pitch = 1.1;
      speech.volume = Math.min(1.0, 1.0);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(speech);
    },
    aumentarTexto() {
      if (this.fontSize < 30) this.fontSize += 2;
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
@keyframes float {
  0% { transform: translateY(0) rotate(0); opacity: 0.2; }
  50% { transform: translateY(-20px) rotate(10deg); opacity: 0.3; }
  100% { transform: translateY(0) rotate(-5deg); opacity: 0.2; }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@keyframes dogJump {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-60px); }
  80% { transform: translateY(-25px); }
}
.jump {
  animation: dogJump 1.2s ease-in-out;
}
</style>
