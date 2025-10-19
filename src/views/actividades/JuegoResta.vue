<template>
  <div
    class="min-h-screen bg-gradient-to-b from-sky-200 to-green-200 flex flex-col items-center justify-center relative overflow-hidden px-2 sm:px-0"
  >
    <!-- 🟢 Panel de puntuación -->
    <div
      class="absolute top-[110px] right-2 sm:top-[140px] sm:right-8 text-right bg-white border border-gray-300 rounded-xl px-4 sm:px-6 py-2 sm:py-3 shadow-lg z-20 panel-responsive"
    >
      <div class="text-sm text-green-700 font-bold">Ejercicios</div>
      <div class="text-2xl sm:text-3xl font-bold">{{ contador }}/10</div>
      <div class="text-sm text-blue-600 mt-2 font-semibold">SmartScore</div>
      <div class="text-2xl sm:text-3xl font-bold text-orange-500">{{ puntuacion }}</div>
    </div>

    <!-- 🐶 Mascota motivadora -->
    <div class="absolute bottom-2 left-2 sm:bottom-4 sm:left-6 flex flex-col items-center text-center z-10 mascota-responsive">
      <img
        :class="['w-36 sm:w-52 md:w-64 drop-shadow-2xl transition-transform duration-700', saltando ? 'jump' : '']"
        src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
        alt="Mascota motivadora"
      />
      <p
        class="text-gray-800 text-base sm:text-xl font-semibold italic mt-2 bg-white bg-opacity-80 px-2 sm:px-3 py-1 rounded-xl shadow-md"
      >
        {{ mensajeMascota }}
      </p>
    </div>

    <!-- 🔹 Contenedor principal -->
    <div
      class="bg-white shadow-2xl rounded-2xl p-4 sm:p-10 w-full max-w-[98vw] sm:max-w-[750px] text-center border border-gray-200 relative z-20"
    >
      <!-- 🔹 Instrucción -->
      <h2 class="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 sm:mb-8">
        {{ instruccion }}
      </h2>

      <!-- 🔹 Operación -->
      <div class="flex justify-center items-center flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-10">
        <div class="text-4xl sm:text-7xl font-bold text-red-500">{{ numero1 }}</div>
        <div class="text-3xl sm:text-6xl font-bold text-gray-700">{{ operador }}</div>
        <div class="text-4xl sm:text-7xl font-bold text-blue-500">{{ numero2 }}</div>
        <div class="text-3xl sm:text-6xl font-bold text-gray-700">=</div>
        <input
          type="number"
          v-model="respuesta"
          placeholder="?"
          class="border-2 border-gray-300 rounded-xl w-16 sm:w-24 md:w-28 text-center text-2xl sm:text-4xl py-2 focus:outline-none focus:ring-4 focus:ring-green-400"
        />
      </div>

      <!-- 🔹 Pistas visuales -->
      <div class="flex justify-center flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
        <div v-for="n in resultadoPositivo" :key="n" class="text-2xl sm:text-4xl">
          {{ iconoAleatorio() }}
        </div>
      </div>

      <!-- 🔹 Botón Enviar -->
      <button
        v-if="contador < 10"
        @click="verificar"
        class="bg-green-500 hover:bg-green-600 text-white text-base sm:text-lg font-semibold py-2 sm:py-3 px-6 sm:px-10 rounded-full shadow-md transition-transform hover:scale-105"
      >
        Enviar
      </button>

      <!-- 🔹 Resultado -->
      <transition name="fade">
        <div
          v-if="mensaje"
          class="mt-4 sm:mt-6 text-lg sm:text-2xl font-semibold"
          :class="esCorrecto ? 'text-green-600' : 'text-red-600'"
        >
          {{ mensaje }}
        </div>
      </transition>

      <!-- 🔹 Pantalla final -->
      <div v-if="contador >= 10" class="mt-6 sm:mt-8 text-center">
        <h3 class="text-xl sm:text-3xl font-bold text-green-700 mb-2 sm:mb-4">
          🎉 ¡Terminaste los 10 ejercicios!
        </h3>
        <p class="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">
          Tu puntaje final es <strong>{{ puntuacion }}</strong> puntos 🏅
        </p>
        <button
          @click="reiniciarJuego"
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 sm:py-3 px-5 sm:px-8 rounded-full shadow-md transition-transform hover:scale-105"
        >
          Jugar de nuevo 🔁
        </button>
      </div>

      <!-- 🔹 Botón de voz -->
      <div class="mt-6 sm:mt-8" v-if="contador < 10">
        <button
          @click="leerInstruccion"
          class="flex items-center justify-center mx-auto space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 sm:py-2 px-3 sm:px-6 rounded-full shadow-md transition-transform hover:scale-105 text-xs sm:text-sm"
        >
          <span class="material-icons text-lg">record_voice_over</span>
          <span>Escuchar</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SumaRestaBasica",
  data() {
    return {
      numero1: 0,
      numero2: 0,
      operador: "+",
      respuesta: "",
      mensaje: "",
      esCorrecto: false,
      contador: 0,
      puntuacion: 0,
      mensajeMascota: "💬 ¡Tú puedes hacerlo! Confío en ti 🐶💪",
      iconos: ["🍎", "🧩", "🎈", "⭐", "🍬", "🍉", "🦋", "⚽", "🐠", "🎲"],
      saltando: false,
      instruccion: "Resuelve la operación 👇",
    };
  },
  computed: {
    resultadoPositivo() {
      return Math.abs(this.numero1 - this.numero2);
    },
  },
  created() {
    this.generarEjercicio();
  },
  methods: {
    generarEjercicio() {
      if (this.contador >= 10) return;
      const tipo = Math.random() < 0.5 ? "suma" : "resta";
      this.operador = tipo === "suma" ? "+" : "−";
      this.numero1 = Math.floor(Math.random() * 9) + 1;
      this.numero2 = Math.floor(Math.random() * 9) + 1;
      if (tipo === "resta" && this.numero2 > this.numero1)
        [this.numero1, this.numero2] = [this.numero2, this.numero1];
      this.instruccion = tipo === "suma" ? "Suma los números ✨" : "Resta los números 👀";
    },
    iconoAleatorio() {
      return this.iconos[Math.floor(Math.random() * this.iconos.length)];
    },
    verificar() {
      const correcta =
        this.operador === "+" ? this.numero1 + this.numero2 : this.numero1 - this.numero2;

      if (parseInt(this.respuesta) === correcta) {
        this.mensaje = "✅ ¡Correcto!";
        this.mensajeMascota = "🎉 ¡Excelente! ¡Sigue así campeón! 🐾💫";
        this.esCorrecto = true;
        this.contador++;
        this.puntuacion += 10;
        this.saltarMascota();
      } else {
        this.mensaje = `❌ Incorrecto, era ${correcta}`;
        this.mensajeMascota =
          "😿 No pasa nada, inténtalo otra vez. ¡Tú puedes lograrlo! 💪";
        this.esCorrecto = false;
        this.contador++;
      }

      setTimeout(() => {
        this.respuesta = "";
        this.mensaje = "";
        this.mensajeMascota = "💬 ¡Tú puedes hacerlo! Confío en ti 🐶💪";
        this.generarEjercicio();
      }, 2200);
    },
    reiniciarJuego() {
      this.contador = 0;
      this.puntuacion = 0;
      this.mensaje = "";
      this.generarEjercicio();
    },
    saltarMascota() {
      this.saltando = true;
      setTimeout(() => {
        this.saltando = false;
      }, 1200);
    },
    leerInstruccion() {
      const texto = `Atención: ${this.instruccion}. ${this.numero1} ${this.operador} ${this.numero2}`;
      const speech = new SpeechSynthesisUtterance(texto);
      speech.lang = "es-ES";
      speech.rate = 0.85;
      speech.pitch = 1.2;
      speech.volume = 2;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(speech);
    },
  },
};
</script>

<style scoped>
.material-icons {
  font-size: 22px;
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
/* Responsividad extra para panel y mascota */
.panel-responsive {
  max-width: 90vw;
}
.mascota-responsive {
  max-width: 60vw;
}
@media (max-width: 640px) {
  .panel-responsive {
    top: 60px !important;
    right: 2vw !important;
    padding: 0.5rem 1rem !important;
    font-size: 0.95rem !important;
  }
  .mascota-responsive {
    left: 2vw !important;
    bottom: 2vw !important;
  }
}
</style>
