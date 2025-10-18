<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
    >
      <div
        class="bg-white w-[90%] sm:w-[600px] rounded-2xl p-8 shadow-2xl text-center relative border-4 border-indigo-500"
      >
        <!-- Cerrar -->
        <button
          class="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl"
          @click="cerrar"
        >
          ✖
        </button>

        <!-- Encabezado -->
        <h2 class="text-2xl font-bold text-indigo-700 mb-6">
          {{ titulo }}
        </h2>

        <!-- Pregunta -->
        <p class="text-lg font-semibold text-gray-800 mb-6">{{ pregunta.texto }}</p>

        <!-- Opciones -->
        <div class="grid grid-cols-1 gap-3">
          <button
            v-for="(op, i) in pregunta.opciones"
            :key="i"
            @click="verificar(op)"
            class="border-2 border-indigo-300 hover:bg-indigo-500 hover:text-white py-2 rounded-lg transition text-lg"
            :disabled="bloqueado"
          >
            {{ op }}
          </button>
        </div>

        <!-- Resultado -->
        <div v-if="resultado" class="mt-6 text-xl font-bold" :class="resultadoColor">
          {{ resultado }}
        </div>

        <!-- Botón siguiente -->
        <button
          v-if="mostrarSiguiente"
          @click="siguiente"
          class="mt-8 bg-green-500 text-white px-8 py-2 rounded-full font-bold hover:bg-green-600 transition"
        >
          Siguiente
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalMision",
  props: {
    visible: Boolean,
    titulo: String,
    preguntas: Array,
  },
  data() {
    return {
      index: 0,
      pregunta: {},
      resultado: "",
      bloqueado: false,
      mostrarSiguiente: false,
    };
  },
  computed: {
    resultadoColor() {
      return this.resultado.includes("✅") ? "text-green-600" : "text-red-600";
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.index = 0;
        this.pregunta = this.preguntas[this.index];
      }
    },
  },
  methods: {
    verificar(op) {
      this.bloqueado = true;
      if (op === this.pregunta.correcta) {
        this.resultado = "✅ ¡Excelente trabajo!";
        this.hablar("¡Excelente! Respuesta correcta.");
        this.mostrarSiguiente = true;
      } else {
        this.resultado = "❌ Incorrecto, inténtalo de nuevo.";
        this.hablar("Incorrecto, pero sigue intentando.");
      }
    },
    siguiente() {
      if (this.index < this.preguntas.length - 1) {
        this.index++;
        this.pregunta = this.preguntas[this.index];
        this.resultado = "";
        this.mostrarSiguiente = false;
        this.bloqueado = false;
      } else {
        this.$emit("completado");
      }
    },
    cerrar() {
      this.$emit("cerrar");
    },
    hablar(texto) {
      const voice = new SpeechSynthesisUtterance(texto);
      voice.lang = "es-ES";
      voice.rate = 0.9;
      window.speechSynthesis.speak(voice);
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
