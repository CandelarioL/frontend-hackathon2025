<template>
  <div
    class="min-h-screen relative flex flex-col items-center justify-center overflow-hidden px-4 py-8 sm:px-6"
    :style="{ fontSize: fontSize + 'px' }"
  >
    <!-- 🌀 Fondo de letras flotantes -->
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
      <div class="text-sm text-green-700 font-bold">Lecturas respondidas</div>
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
        class="text-gray-800 text-sm sm:text-lg font-semibold italic mt-2 bg-white bg-opacity-85 px-3 py-1 rounded-xl shadow-md break-words"
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
        title="Aumentar tamaño de texto"
      >
        ➕
      </button>
      <button
        @click="disminuirTexto"
        class="bg-red-500 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-lg shadow hover:bg-red-600"
        title="Disminuir tamaño de texto"
      >
        ➖
      </button>
    </div>

    <!-- 🔹 Contenedor principal -->
    <div
      class="bg-white bg-opacity-95 shadow-2xl rounded-2xl p-6 sm:p-10 w-full max-w-[900px] text-center border border-gray-200 relative z-20 backdrop-blur-sm"
      style="min-width: 260px;"
    >
      <h2 class="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 sm:mb-8">
        📖 {{ idioma === 'es' ? 'Lectura Comprensiva' : 'Tukari yuawi' }}
      </h2>

      <!-- Texto de lectura -->
      <div
        class="bg-yellow-50 border border-yellow-200 rounded-xl p-4 sm:p-6 text-left text-gray-800 leading-relaxed shadow-inner mb-6 max-h-[45vh] overflow-auto"
      >
        <p class="whitespace-pre-line">{{ idioma === 'es' ? lecturaActual.texto : lecturaActual.traduccion }}</p>
      </div>

      <!-- Pregunta -->
      <h3 class="text-lg sm:text-xl font-semibold text-gray-700 mb-4 sm:mb-6">
        {{ idioma === 'es' ? lecturaActual.pregunta : lecturaActual.pregunta_wixarika }}
      </h3>

      <!-- Opciones -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <button
          v-for="(op, index) in lecturaActual.opciones"
          :key="index"
          @click="verificar(op)"
          class="bg-gray-100 border-2 border-gray-200 text-gray-700 font-medium rounded-xl py-3 px-3 hover:bg-green-100 hover:border-green-400 transition-all text-left truncate"
          :aria-label="(idioma === 'es' ? op : traducirOpcion(op))"
        >
          <span class="inline-block align-middle">{{ idioma === 'es' ? op : traducirOpcion(op) }}</span>
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
      <div class="mt-6 sm:mt-8">
        <button
          @click="leerLectura"
          class="flex items-center justify-center mx-auto space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-transform hover:scale-105"
        >
          <span class="material-icons text-3xl">record_voice_over</span>
          <span>{{ idioma === 'es' ? 'Escuchar lectura' : 'Kiwixa tukari' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LecturaComprensivaInclusiva",
  data() {
    return {
      idioma: "es",
      fontSize: 18,
      letrasFondo: [],
      lecturas: [
        {
          texto:
            "Lucía tenía una pequeña planta en su ventana. Todos los días la regaba y le hablaba con cariño. Con el tiempo, la planta creció y dio una hermosa flor amarilla.",
          traduccion:
            "Lucía neiya neutsiri tewi tewarixi. Xatsari neiya wa xehe niatsiri. Nierime tewarixi xukame ta tei tsipame.",
          pregunta: "¿Qué hizo Lucía para que su planta creciera?",
          pregunta_wixarika: "¿Nei Lucía tei tewarixi ma xukame?",
          opciones: [
            "La regó y le habló con cariño",
            "La dejó sin agua",
            "Le quitó las hojas",
            "La puso en la sombra",
          ],
          correcta: "La regó y le habló con cariño",
        },
        {
          texto:
            "Pedro encontró un perrito en la calle. Lo llevó a su casa, le dio comida y lo bañó. Desde ese día, el perrito se volvió su mejor amigo.",
          traduccion:
            "Pedro niatsari niuki xatame. Tei neiya weiyarixi, ta weixi neima neuxi. Tei weiyarixi tei niatsari.",
          pregunta: "¿Qué hizo Pedro con el perrito?",
          pregunta_wixarika: "¿Nei Pedro tei niuki?",
          opciones: [
            "Lo llevó a su casa y lo cuidó",
            "Lo ignoró",
            "Lo llevó al parque",
            "Se lo dio a un vecino",
          ],
          correcta: "Lo llevó a su casa y lo cuidó",
        },
      ],
      lecturaActual: {},
      mensaje: "",
      esCorrecto: false,
      contador: 0,
      puntuacion: 0,
      mensajeMascota: "💬 Lee con calma, piensa y elige la respuesta correcta 🐶📚",
      saltando: false,
    };
  },
  mounted() {
    this.nuevaLectura();
    this.generarLetrasFondo();
    // Regenerar letras cuando cambie el tamaño de ventana para mejorar responsividad
    window.addEventListener('resize', this._handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this._handleResize);
  },
  methods: {
    _handleResize() {
      // small debounce
      clearTimeout(this._resizeTimeout);
      this._resizeTimeout = setTimeout(() => this.generarLetrasFondo(), 150);
    },
    generarLetrasFondo() {
      // generar cantidad y tamaños según ancho de pantalla
      this.letrasFondo = [];
      const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZÑÁÉÍÓÚ";
      const width = window.innerWidth || 1024;
      let count = 20;
      if (width < 480) count = 10;
      else if (width < 768) count = 14;
      else if (width < 1024) count = 18;
      for (let i = 0; i < count; i++) {
        const randChar = letras.charAt(Math.floor(Math.random() * letras.length));
        // tamaño y rotación adaptativa
        const sizeBase = width < 480 ? 20 : width < 768 ? 28 : 36;
        const size = Math.round(sizeBase + Math.random() * 18);
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
          ? "💬 Lee con calma, imagina la historia y luego responde 🐾✨"
          : "💬 Tukari neiya, xutiri weiya ma neiyewe 🐾✨";
    },
    traducirOpcion(op) {
      const traducciones = {
        "La regó y le habló con cariño": "Neiya xehe ta niatsiri",
        "La dejó sin agua": "Xuwe xehe",
        "Le quitó las hojas": "Tei wa nieri tewame",
        "Lo llevó a su casa y lo cuidó": "Neiya weiyarixi ta weixi",
        "Lo ignoró": "Xuwe nieri",
      };
      return traducciones[op] || op;
    },
    nuevaLectura() {
      const index = Math.floor(Math.random() * this.lecturas.length);
      this.lecturaActual = this.lecturas[index];
      this.mensaje = "";
    },
    verificar(opcion) {
      if (opcion === this.lecturaActual.correcta) {
        this.mensaje = this.idioma === "es" ? "✅ ¡Excelente comprensión!" : "✅ ¡Tei nieri tukari!";
        this.esCorrecto = true;
        this.contador++;
        this.puntuacion += 20;
        this.saltarMascota();
      } else {
        this.mensaje =
          this.idioma === "es" ? "❌ No es correcto, intenta nuevamente." : "❌ Xuwe tei. Neiya pewi.";
        this.esCorrecto = false;
      }
      setTimeout(() => this.nuevaLectura(), 4000);
    },
    saltarMascota() {
      this.saltando = true;
      setTimeout(() => (this.saltando = false), 1200);
    },
    leerLectura() {
      const texto =
        this.idioma === "es"
          ? `${this.lecturaActual.texto}. Pregunta: ${this.lecturaActual.pregunta}`
          : `${this.lecturaActual.traduccion}. ${this.lecturaActual.pregunta_wixarika}`;
      const speech = new SpeechSynthesisUtterance(texto);
      speech.lang = this.idioma === "es" ? "es-ES" : "es-MX";
      speech.rate = 0.9;
      speech.pitch = 1.1;
      // volume must be between 0.0 and 1.0
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
  0% {
    transform: translateY(0) rotate(0);
    opacity: 0.2;
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
    opacity: 0.3;
  }
  100% {
    transform: translateY(0) rotate(-5deg);
    opacity: 0.2;
  }
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
