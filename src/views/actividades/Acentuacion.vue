<template>
  <div
    class="min-h-screen relative flex flex-col items-center justify-center overflow-hidden"
    :style="{ fontSize: fontSize + 'px' }"
  >
    <!-- 🌀 Fondo animado -->
    <div class="absolute inset-0 bg-gradient-to-b from-sky-200 to-green-200 overflow-hidden">
      <div
        v-for="(letra, i) in letrasFondo"
        :key="i"
        class="absolute text-[40px] font-bold opacity-10 text-gray-700 animate-float select-none"
        :style="{
          top: letra.top + '%',
          left: letra.left + '%',
          animationDelay: letra.delay + 's',
          color: letra.color
        }"
      >
        {{ letra.char }}
      </div>
    </div>

    <!-- 🟢 Panel de puntuación -->
    <div
      class="absolute top-[140px] right-8 text-right bg-white bg-opacity-90 border border-gray-300 rounded-xl px-6 py-3 shadow-lg z-20"
    >
      <div class="text-sm text-green-700 font-bold">
        {{ idioma === 'es' ? 'Palabras acentuadas' : 'Tukari neiya' }}
      </div>
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

    <!-- 🌐 Controles -->
    <div class="absolute top-4 right-4 flex space-x-3 z-30">
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
        ➕
      </button>
      <button
        @click="disminuirTexto"
        class="bg-red-500 text-white px-3 py-2 rounded-lg shadow hover:bg-red-600"
      >
        ➖
      </button>
    </div>

    <!-- 🔹 Contenedor principal -->
    <div
      class="bg-white bg-opacity-90 shadow-2xl rounded-2xl p-10 w-[95%] sm:w-[850px] text-center border border-gray-200 relative z-20 backdrop-blur-sm"
    >
      <h2 class="text-2xl font-semibold text-gray-800 mb-8">
        💫 {{ idioma === 'es' ? '¡Acentúa Correctamente!' : 'Tei tukari tewi!' }}
      </h2>

      <p class="text-gray-700 text-lg mb-4">
        {{
          idioma === 'es'
            ? 'Haz clic en la sílaba donde lleva la tilde:'
            : 'Kiwixa tei syllaba neyutɨa tewi tilde.'
        }}
      </p>

      <div class="flex justify-center gap-3 flex-wrap text-4xl font-bold text-blue-700">
        <button
          v-for="(silaba, index) in palabraActual.silabas"
          :key="index"
          @click="verificar(index)"
          class="bg-yellow-100 hover:bg-green-100 px-5 py-2 rounded-xl border border-yellow-300 transition-transform hover:scale-110"
        >
          {{ silaba }}
        </button>
      </div>

      <!-- Resultado -->
      <transition name="fade">
        <div
          v-if="mensaje"
          class="mt-6 text-2xl font-semibold"
          :class="esCorrecto ? 'text-green-600' : 'text-red-600'"
        >
          {{ mensaje }}
        </div>
      </transition>

      <p
        v-if="explicacion"
        class="text-gray-700 mt-4 text-lg font-medium bg-gray-100 rounded-lg p-3 inline-block shadow-inner"
      >
        {{ explicacion }}
      </p>

      <!-- 🎧 Botón de voz -->
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
  name: "AcentuacionInteractiva",
  data() {
    return {
      idioma: "es",
      fontSize: 18,
      letrasFondo: [],
      palabras: [
        { silabas: ["ca", "mion"], correcta: 1, acentuada: "camión", tipo: "palabra aguda (tilde en la última sílaba)" },
        { silabas: ["te", "le", "fono"], correcta: 1, acentuada: "teléfono", tipo: "palabra esdrújula (siempre lleva tilde)" },
        { silabas: ["mu", "si", "ca"], correcta: 0, acentuada: "música", tipo: "palabra esdrújula (siempre lleva tilde)" },
        { silabas: ["co", "ra", "zon"], correcta: 2, acentuada: "corazón", tipo: "palabra aguda (tilde en la última sílaba)" },
        { silabas: ["ma", "ri", "po", "sa"], correcta: null, acentuada: "mariposa", tipo: "palabra grave (no lleva tilde)" },
        { silabas: ["ar", "bol"], correcta: 0, acentuada: "árbol", tipo: "palabra grave (lleva tilde si termina en consonante que no es n ni s)" },
        { silabas: ["a", "zul"], correcta: null, acentuada: "azul", tipo: "palabra aguda (no lleva tilde porque termina en 'l')" },
        { silabas: ["di", "a"], correcta: 0, acentuada: "día", tipo: "palabra grave con hiato (lleva tilde en la 'i')" },
      ],
      palabraActual: {},
      mensaje: "",
      explicacion: "",
      esCorrecto: false,
      contador: 0,
      puntuacion: 0,
      mensajeMascota: "💬 ¡Encuentra la sílaba con tilde! 🐶✏️",
      saltando: false,
    };
  },
  mounted() {
    this.nuevaPalabra();
    this.generarLetrasFondo();
  },
  methods: {
    generarLetrasFondo() {
      const letras = "ÁÉÍÓÚAEIOUÑ";
      for (let i = 0; i < 20; i++) {
        this.letrasFondo.push({
          char: letras.charAt(Math.floor(Math.random() * letras.length)),
          top: Math.random() * 100,
          left: Math.random() * 100,
          delay: Math.random() * 5,
          color: ["#9333EA", "#1E40AF", "#047857", "#E11D48"][Math.floor(Math.random() * 4)],
        });
      }
    },
    cambiarIdioma() {
      this.idioma = this.idioma === "es" ? "wix" : "es";
      this.mensajeMascota =
        this.idioma === "es"
          ? "💬 ¡Encuentra la sílaba con tilde! 🐶✏️"
          : "💬 Kiwixa tei syllaba neyutɨa tewi tilde 🐶✏️";
    },
    nuevaPalabra() {
      const index = Math.floor(Math.random() * this.palabras.length);
      this.palabraActual = this.palabras[index];
      this.mensaje = "";
      this.explicacion = "";
    },
    verificar(index) {
      if (this.palabraActual.correcta === null) {
        this.mensaje = "✨ ¡Correcto! No lleva tilde.";
        this.explicacion = `${this.palabraActual.acentuada} → ${this.palabraActual.tipo}.`;
        this.esCorrecto = true;
      } else if (index === this.palabraActual.correcta) {
        this.mensaje = "✅ ¡Muy bien! Has acentuado correctamente.";
        this.explicacion = `${this.palabraActual.acentuada} → ${this.palabraActual.tipo}.`;
        this.esCorrecto = true;
      } else {
        this.mensaje = "❌ No es esa sílaba.";
        this.explicacion = `La palabra correcta es "${this.palabraActual.acentuada}", ${this.palabraActual.tipo}.`;
        this.esCorrecto = false;
      }

      if (this.esCorrecto) {
        this.contador++;
        this.puntuacion += 20;
        this.saltarMascota();
      }
      setTimeout(() => this.nuevaPalabra(), 4000);
    },
    saltarMascota() {
      this.saltando = true;
      setTimeout(() => (this.saltando = false), 1200);
    },
    leerInstruccion() {
      const texto =
        this.idioma === "es"
          ? "Observa la palabra y haz clic en la sílaba donde lleva la tilde. Si no lleva tilde, te explicaré por qué."
          : "Kiwixa tei palabra neyutɨa tewi tilde. Pewi neyutɨa neni meyɨ."
      const speech = new SpeechSynthesisUtterance(texto);
      speech.lang = "es-ES";
      speech.rate = 0.9;
      speech.pitch = 1.1;
      speech.volume = 1.4;
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
  0%, 100% { transform: translateY(0); opacity: 0.2; }
  50% { transform: translateY(-25px); opacity: 0.35; }
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
