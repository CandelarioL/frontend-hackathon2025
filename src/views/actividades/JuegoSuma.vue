<template>
  <div
    class="min-h-screen bg-gradient-to-b from-sky-200 to-green-200 flex flex-col items-center justify-center relative overflow-hidden"
  >
    <!-- 🟢 Panel de puntuación (más abajo, alineado con el contenedor) -->
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
        :class="['w-52 sm:w-64 drop-shadow-2xl transition-transform duration-700', 
                 saltando ? 'jump' : '']"
        src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
        alt="Mascota motivadora"
      />
      <p
        class="text-gray-800 text-xl font-semibold italic mt-2 bg-white bg-opacity-80 px-3 py-1 rounded-xl shadow-md"
      >
        {{ mensajeMascota }}
      </p>
    </div>

    <!-- 🔹 Contenedor principal -->
    <div
      class="bg-white shadow-2xl rounded-2xl p-10 w-[95%] sm:w-[750px] text-center border border-gray-200 relative z-20"
    >
      <!-- 🔹 Instrucción -->
      <h2 class="text-2xl font-semibold text-gray-800 mb-8">
        Suma los números y observa las pistas 👀
      </h2>

      <!-- 🔹 Operación -->
      <div class="flex justify-center items-center flex-wrap gap-4 mb-10">
        <div class="text-7xl font-bold text-red-500">{{ numero1 }}</div>
        <div class="text-6xl font-bold text-gray-700">+</div>
        <div class="text-7xl font-bold text-blue-500">{{ numero2 }}</div>
        <div class="text-6xl font-bold text-gray-700">=</div>
        <input
          type="number"
          v-model="respuesta"
          placeholder="?"
          class="border-2 border-gray-300 rounded-xl w-24 sm:w-28 text-center text-4xl py-2 focus:outline-none focus:ring-4 focus:ring-green-400"
        />
      </div>

      <!-- 🔹 Pistas visuales -->
      <div class="flex justify-center flex-wrap gap-3 mb-8">
        <div v-for="n in (numero1 + numero2)" :key="n" class="text-4xl">
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
          <span>Escuchar instrucciones</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SumaBasica",
  data() {
    return {
      numero1: this.generarNumero(),
      numero2: this.generarNumero(),
      respuesta: "",
      mensaje: "",
      esCorrecto: false,
      contador: 0,
      puntuacion: 0,
      mensajeMascota: "💬 ¡Vamos! Tú puedes hacerlo, confío en ti 🐶💪",
      iconos: ["🏓", "🍎", "⭐", "⚽", "🐠", "🍬", "🧩", "🎈", "🦋", "🍉"],
      saltando: false,
    };
  },
  methods: {
    generarNumero() {
      return Math.floor(Math.random() * 5) + 1;
    },
    iconoAleatorio() {
      return this.iconos[Math.floor(Math.random() * this.iconos.length)];
    },
    verificar() {
      const correcta = this.numero1 + this.numero2;
      if (parseInt(this.respuesta) === correcta) {
        this.mensaje = "✅ ¡Correcto!";
        this.mensajeMascota =
          "🎉 ¡Excelente trabajo! ¡Mira cómo salto de alegría! 🐾💫";
        this.esCorrecto = true;
        this.contador++;
        this.puntuacion += 10;
        this.saltarMascota();
      } else {
        this.mensaje = `❌ Incorrecto, era ${correcta}`;
        this.mensajeMascota =
          "😿 Uy, casi. No te rindas, ¡tú puedes lograrlo! 💪";
        this.esCorrecto = false;
      }

      setTimeout(() => {
        this.numero1 = this.generarNumero();
        this.numero2 = this.generarNumero();
        this.respuesta = "";
        this.mensaje = "";
        this.mensajeMascota = "💬 ¡Vamos! Tú puedes hacerlo, confío en ti 🐶💪";
      }, 2200);
    },
    saltarMascota() {
      this.saltando = true;
      setTimeout(() => {
        this.saltando = false;
      }, 1200);
    },
    leerInstruccion() {
      const texto = `Atención: Suma los números ${this.numero1} más ${this.numero2} y escribe el resultado.`;
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
</style>
