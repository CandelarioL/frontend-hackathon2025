<template>
  <div
    class="min-h-screen bg-gradient-to-b from-sky-200 to-green-200 flex flex-col items-center justify-center relative overflow-hidden px-2 sm:px-0"
  >
    <!-- 🟢 Panel de puntuación -->
    <div
      class="absolute top-[110px] right-2 sm:top-[140px] sm:right-8 text-right bg-white border border-gray-300 rounded-xl px-4 sm:px-6 py-2 sm:py-3 shadow-lg z-20 panel-responsive"
    >
      <div class="text-sm text-green-700 font-bold">Preguntas contestadas</div>
      <div class="text-2xl sm:text-3xl font-bold">{{ contador }}</div>
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
        Divide los números y observa las pistas 👀
      </h2>

      <!-- 🔹 Operación -->
      <div class="flex justify-center items-center flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-10">
        <div class="text-4xl sm:text-7xl font-bold text-red-500">{{ numero1 }}</div>
        <div class="text-3xl sm:text-6xl font-bold text-gray-700">÷</div>
        <div class="text-4xl sm:text-7xl font-bold text-blue-500">{{ numero2 }}</div>
        <div class="text-3xl sm:text-6xl font-bold text-gray-700">=</div>
        <input
          type="number"
          v-model="respuesta"
          placeholder="?"
          class="border-2 border-gray-300 rounded-xl w-16 sm:w-24 md:w-28 text-center text-2xl sm:text-4xl py-2 focus:outline-none focus:ring-4 focus:ring-green-400"
        />
      </div>

      <!-- 🔹 Pistas visuales (agrupadas) -->
      <div class="flex flex-wrap justify-center gap-3 sm:gap-5 mb-6 sm:mb-8">
        <div
          v-for="(grupo, i) in grupos"
          :key="i"
          class="flex flex-wrap justify-center gap-1 sm:gap-2 bg-sky-100 px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-sky-300 shadow-sm"
        >
          <div v-for="n in grupo" :key="n" class="text-xl sm:text-3xl">
            {{ iconoAleatorio() }}
          </div>
        </div>
      </div>

      <!-- 🔹 Botón Enviar -->
      <button
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

      <!-- 🔹 Botón de voz -->
      <div class="mt-6 sm:mt-8">
        <button
          @click="leerInstruccion"
          class="flex items-center justify-center mx-auto space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 sm:py-3 px-3 sm:px-8 rounded-full shadow-md transition-transform hover:scale-105 text-xs sm:text-base"
        >
          <span class="material-icons text-xl sm:text-3xl">record_voice_over</span>
          <span>Escuchar instrucciones</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DivisionBasica",
  data() {
    return {
      numero1: this.generarNumero(),
      numero2: this.generarDivisor(),
      respuesta: "",
      mensaje: "",
      esCorrecto: false,
      contador: 0,
      puntuacion: 0,
      mensajeMascota: "💬 ¡Vamos! Divide con calma, tú puedes 🐶💪",
      iconos: ["🍎", "🎈", "⭐", "🧩", "🍬", "⚽", "🎲", "🦋", "🍉", "🏓"],
      saltando: false,
    };
  },
  computed: {
    resultado() {
      return this.numero1 / this.numero2;
    },
    grupos() {
      // Devuelve una lista de grupos visuales según el divisor
      const grupos = [];
      const total = this.numero1;
      let contador = 0;
      for (let i = 0; i < this.numero2; i++) {
        const grupo = [];
        for (let j = 0; j < this.resultado; j++) {
          contador++;
          if (contador <= total) grupo.push(j);
        }
        grupos.push(grupo);
      }
      return grupos;
    },
  },
  methods: {
    generarNumero() {
      // Solo divisiones exactas (resultado entero)
      const divisores = [2, 3, 4, 5];
      this.numero2 = divisores[Math.floor(Math.random() * divisores.length)];
      const resultado = Math.floor(Math.random() * 4) + 2; // 2–5
      this.numero1 = this.numero2 * resultado;
    },
    generarDivisor() {
      return Math.floor(Math.random() * 4) + 2;
    },
    iconoAleatorio() {
      return this.iconos[Math.floor(Math.random() * this.iconos.length)];
    },
    verificar() {
      const correcta = this.resultado;
      if (parseInt(this.respuesta) === correcta) {
        this.mensaje = "✅ ¡Correcto!";
        this.mensajeMascota =
          "🎉 ¡Muy bien! ¡Dividiste perfecto, eres un genio! 🐾💫";
        this.esCorrecto = true;
        this.contador++;
        this.puntuacion += 20; // un poco más por dificultad
        this.saltarMascota();
      } else {
        this.mensaje = `❌ Incorrecto, era ${correcta}`;
        this.mensajeMascota =
          "😿 No pasa nada, inténtalo otra vez. ¡Tú puedes lograrlo! 💪";
        this.esCorrecto = false;
      }

      setTimeout(() => {
        this.generarNumero();
        this.respuesta = "";
        this.mensaje = "";
        this.mensajeMascota = "💬 ¡Vamos! Divide con calma, tú puedes 🐶💪";
      }, 2200);
    },
    saltarMascota() {
      this.saltando = true;
      setTimeout(() => {
        this.saltando = false;
      }, 1200);
    },
    leerInstruccion() {
      const texto = `Atención: Divide ${this.numero1} entre ${this.numero2} y escribe el resultado.`;
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
