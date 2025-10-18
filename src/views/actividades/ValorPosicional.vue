<template>
  <div
    class="min-h-screen bg-gradient-to-b from-sky-200 to-green-200 flex flex-col items-center justify-center relative overflow-hidden"
  >
    <!-- 🟢 Panel de puntuación -->
    <div
      class="absolute top-[140px] right-8 text-right bg-white border border-gray-300 rounded-xl px-6 py-3 shadow-lg z-20"
    >
      <div class="text-sm text-green-700 font-bold">Preguntas contestadas</div>
      <div class="text-3xl font-bold">{{ contador }}</div>
      <div class="text-sm text-blue-600 mt-2 font-semibold">SmartScore</div>
      <div class="text-3xl font-bold text-orange-500">{{ puntuacion }}</div>
    </div>

    <!-- 🐶 Mascota motivadora -->
    <div
      class="absolute bottom-4 left-6 flex flex-col items-center text-center z-10"
    >
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

    <!-- 🔹 Contenedor principal -->
    <div
      class="bg-white shadow-2xl rounded-2xl p-10 w-[95%] sm:w-[750px] text-center border border-gray-200 relative z-20"
    >
      <h2 class="text-2xl font-semibold text-gray-800 mb-8">
        Observa el número y escribe el valor posicional del dígito 👀
      </h2>

      <!-- 🔹 Número mostrado -->
      <div class="text-7xl font-bold text-blue-600 mb-8 tracking-widest">
        {{ numero }}
      </div>

      <!-- 🔹 Pregunta -->
      <h3 class="text-xl font-medium text-gray-700 mb-6">
        ¿Cuál es el valor del
        <span class="text-red-500 text-2xl">{{ digito }}</span> en este número?
      </h3>

      <!-- 🔹 Campo de respuesta -->
      <input
        type="number"
        v-model="respuesta"
        placeholder="Escribe el valor..."
        class="border-2 border-gray-300 rounded-xl w-60 text-center text-3xl py-2 focus:outline-none focus:ring-4 focus:ring-green-400 mb-8"
      />

      <!-- 🔹 Pistas visuales -->
      <div class="flex justify-center flex-wrap gap-4 mb-8">
        <div v-for="n in pistasCantidad" :key="n" class="text-4xl">
          {{ iconoAleatorio() }}
        </div>
      </div>

      <!-- 🔹 Botón Enviar -->
      <button
        @click="verificar"
        class="bg-green-500 hover:bg-green-600 text-white text-lg font-semibold py-3 px-10 rounded-full shadow-md transition-transform hover:scale-105"
      >
        Enviar
      </button>

      <!-- 🔹 Resultado -->
      <transition name="fade">
        <div
          v-if="mensaje"
          class="mt-6 text-2xl font-semibold"
          :class="esCorrecto ? 'text-green-600' : 'text-red-600'"
        >
          {{ mensaje }}
        </div>
      </transition>

      <!-- 🔹 Botón de voz -->
      <div class="mt-8">
        <button
          @click="leerInstruccion"
          class="flex items-center justify-center mx-auto space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-transform hover:scale-105"
        >
          <span class="material-icons text-3xl">record_voice_over</span>
          <span>Escuchar explicación</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ValorPosicional",
  data() {
    return {
      numero: null,
      digito: null,
      respuesta: "",
      mensaje: "",
      esCorrecto: false,
      contador: 0,
      puntuacion: 0,
      mensajeMascota:
        "💬 ¡Vamos! Observa bien cada número, yo te explicaré 🐶💪",
      iconos: ["🔵", "🟢", "🟡", "🟣", "⭐", "🔺", "🧩", "⚽", "🍬", "🎈"],
      saltando: false,
    };
  },
  mounted() {
    this.generarNumero();
  },
  computed: {
    valorCorrecto() {
      if (this.numero === null || this.digito === null) return 0;
      const numStr = this.numero.toString();
      const pos = numStr.length - numStr.indexOf(this.digito.toString()) - 1;
      return Math.pow(10, pos) * this.digito;
    },
    pistasCantidad() {
      return Math.min(Math.max(this.valorCorrecto / 10, 1), 20);
    },
  },
  methods: {
    generarNumero() {
      const numero = Math.floor(Math.random() * 900) + 100;
      const digitoStr = numero.toString();
      const pos = Math.floor(Math.random() * digitoStr.length);
      this.numero = numero;
      this.digito = parseInt(digitoStr[pos]);
      this.mensajeMascota = `💬 Este es el número ${numero}. El perrito te dice: “Cada cifra tiene un valor diferente según su lugar. ¡Encuentra cuánto vale el ${this.digito}!” 🐶✨`;
    },
    iconoAleatorio() {
      return this.iconos[Math.floor(Math.random() * this.iconos.length)];
    },
    verificar() {
      if (parseInt(this.respuesta) === this.valorCorrecto) {
        this.mensaje = "✅ ¡Correcto!";
        this.mensajeMascota =
          "🎉 ¡Muy bien! Si el número está en la posición de las centenas, vale 100 veces más. ¡Excelente trabajo! 🐾💫";
        this.esCorrecto = true;
        this.contador++;
        this.puntuacion += 15;
        this.saltarMascota();
      } else {
        this.mensaje = `❌ Incorrecto, era ${this.valorCorrecto}`;
        this.mensajeMascota =
          "😿 No pasa nada. Recuerda: si está en las unidades, vale lo mismo; en las decenas vale 10 veces más; y en las centenas, 100 veces más. 💪🐶";
        this.esCorrecto = false;
      }

      setTimeout(() => {
        this.generarNumero();
        this.respuesta = "";
        this.mensaje = "";
      }, 4000);
    },
    saltarMascota() {
      this.saltando = true;
      setTimeout(() => {
        this.saltando = false;
      }, 1200);
    },
    leerInstruccion() {
      const texto = `Observa el número ${this.numero}. 
      Dime cuál es el valor del ${this.digito}.
      Recuerda: si el número está en las unidades, vale lo mismo. 
      En las decenas, vale diez veces más. 
      Y en las centenas, vale cien veces más.`;
      const speech = new SpeechSynthesisUtterance(texto);
      speech.lang = "es-ES";
      speech.rate = 0.85;
      speech.pitch = 1.2;
      speech.volume = 1;
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
</style>
