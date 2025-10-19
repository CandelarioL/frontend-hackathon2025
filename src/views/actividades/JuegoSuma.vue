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
      <h2 class="text-2xl font-semibold text-gray-800 mb-8">
        {{ instruccion }}
      </h2>

      <!-- 🔹 Operación / Pregunta -->
      <div
        v-if="['suma', 'resta', 'multiplicacion', 'division'].includes(tipo)"
        class="flex justify-center items-center flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-10 text-4xl sm:text-6xl font-bold"
      >
        <div class="text-red-500">{{ numero1 }}</div>
        <div class="text-gray-700">{{ operador }}</div>
        <div class="text-blue-500">{{ numero2 }}</div>
        <div class="text-gray-700">=</div>
        <input
          type="number"
          v-model="respuesta"
          placeholder="?"
          class="border-2 border-gray-300 rounded-xl w-16 sm:w-24 md:w-28 text-center text-2xl sm:text-4xl py-2 focus:outline-none focus:ring-4 focus:ring-green-400"
        />
      </div>

      <!-- 🔹 Ejercicios tipo texto -->
      <div v-else class="mb-6 sm:mb-10 text-base sm:text-xl font-semibold text-gray-800">
        {{ preguntaTexto }}
        <input
          v-model="respuesta"
          type="text"
          placeholder="Tu respuesta"
          class="mt-2 sm:mt-4 border-2 border-gray-300 rounded-xl w-32 sm:w-48 md:w-64 text-center text-lg sm:text-2xl py-2 focus:outline-none focus:ring-4 focus:ring-green-400"
        />
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

      <div v-if="explicacion" class="mt-2 sm:mt-3 text-gray-700 text-sm sm:text-md">{{ explicacion }}</div>

      <!-- 🔹 Botón de voz (más pequeño) -->
      <div class="mt-6 sm:mt-8">
        <button
          @click="leerInstruccion"
          class="flex items-center justify-center mx-auto space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 sm:py-2 px-3 sm:px-5 rounded-full shadow-md transition-transform hover:scale-105 text-xs sm:text-sm"
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
  name: "EjerciciosMatematicos",
  data() {
    return {
      ejercicios: [],
      indice: 0,
      numero1: 0,
      numero2: 0,
      operador: "+",
      tipo: "suma",
      instruccion: "Suma los números y observa las pistas 👀",
      preguntaTexto: "",
      respuesta: "",
      mensaje: "",
      explicacion: "",
      esCorrecto: false,
      contador: 0,
      puntuacion: 0,
      mensajeMascota: "💬 ¡Vamos! Tú puedes hacerlo, confío en ti 🐶💪",
      saltando: false,
    };
  },
  created() {
    this.cargarEjercicios();
    this.generarEjercicio();
  },
  methods: {
    generarNumero(min = 1, max = 10) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    cargarEjercicios() {
      this.ejercicios = [
        { tipo: "suma", op: "+", rango: [1, 5], texto: "Suma los números." },
        { tipo: "suma", op: "+", rango: [5, 10], texto: "Suma un poco más grande." },
        { tipo: "resta", op: "-", rango: [3, 10], texto: "Resta y encuentra la diferencia." },
        { tipo: "comparacion", texto: "¿Cuál símbolo es correcto? Usa >, < o =" },
        { tipo: "sucesion", texto: "Completa la sucesión numérica: 5, 7, 9, ?" },
        { tipo: "antecesor", texto: "¿Qué número viene antes de 25?" },
        { tipo: "mayorMenor", texto: "Entre 45, 62 y 90, ¿cuál es el mayor?" },
        { tipo: "fraccionEq", texto: "¿Qué fracción es equivalente a 1/2?" },
        { tipo: "fraccionComp", texto: "¿Qué fracción es mayor: 2/3 o 3/5?" },
        { tipo: "decimal", texto: "¿Cuál número decimal es mayor: 0.8 o 0.75?" },
        { tipo: "multiplicacion", op: "×", rango: [2, 9], texto: "Multiplica los números." },
        { tipo: "division", op: "÷", rango: [2, 9], texto: "Divide los números." },
        { tipo: "divisionResiduo", texto: "15 ÷ 4, ¿cuál es el cociente entero?" },
        { tipo: "problema", texto: "Si tienes 3 bolsas con 5 manzanas cada una, ¿cuántas manzanas tienes en total?" },
        { tipo: "mixta", texto: "Convierte 2 1/2 en número impropio." },
      ];
    },

    generarEjercicio() {
      const e = this.ejercicios[this.indice % this.ejercicios.length];
      this.tipo = e.tipo;
      this.instruccion = e.texto;
      this.operador = e.op || "";
      this.numero1 = this.generarNumero(e.rango ? e.rango[0] : 1, e.rango ? e.rango[1] : 10);
      this.numero2 = this.generarNumero(e.rango ? e.rango[0] : 1, e.rango ? e.rango[1] : 10);

      if (this.tipo === "comparacion") {
        this.preguntaTexto = `¿Cuál símbolo es correcto? ${this.numero1} ? ${this.numero2} (usa >, < o =)`;
      } else if (this.tipo === "sucesion") {
        this.preguntaTexto = "Completa la sucesión numérica: 5, 7, 9, ?";
      } else if (this.tipo === "antecesor") {
        this.preguntaTexto = "¿Qué número viene antes de 25?";
      } else if (this.tipo === "mayorMenor") {
        this.preguntaTexto = "Entre 45, 62 y 90, ¿cuál es el mayor?";
      } else if (this.tipo === "fraccionEq") {
        this.preguntaTexto = "¿Qué fracción es equivalente a 1/2?";
      } else if (this.tipo === "fraccionComp") {
        this.preguntaTexto = "¿Qué fracción es mayor: 2/3 o 3/5?";
      } else if (this.tipo === "decimal") {
        this.preguntaTexto = "¿Cuál número decimal es mayor: 0.8 o 0.75?";
      } else if (this.tipo === "divisionResiduo") {
        this.preguntaTexto = "15 ÷ 4, ¿cuál es el cociente entero?";
      } else if (this.tipo === "problema") {
        this.preguntaTexto = "Si tienes 3 bolsas con 5 manzanas cada una, ¿cuántas manzanas tienes en total?";
      } else if (this.tipo === "mixta") {
        this.preguntaTexto = "Convierte 2 1/2 en número impropio.";
      } else {
        this.preguntaTexto = "";
      }
    },

    verificar() {
      let correcta, exp = "";

      switch (this.tipo) {
        case "suma":
          correcta = this.numero1 + this.numero2;
          exp = `Sumar es juntar: ${this.numero1} + ${this.numero2} = ${correcta}.`;
          break;
        case "resta":
          correcta = this.numero1 - this.numero2;
          exp = `Restar es quitar: ${this.numero1} - ${this.numero2} = ${correcta}.`;
          break;
        case "multiplicacion":
          correcta = this.numero1 * this.numero2;
          exp = `${this.numero1} × ${this.numero2} = ${correcta}. Multiplicar es sumar repetidamente.`;
          break;
        case "division":
          correcta = (this.numero1 / this.numero2).toFixed(2);
          exp = `${this.numero1} ÷ ${this.numero2} = ${correcta}.`;
          break;
        case "comparacion":
          if (this.numero1 > this.numero2) correcta = ">";
          else if (this.numero1 < this.numero2) correcta = "<";
          else correcta = "=";
          exp = `Comparamos: ${this.numero1} ${correcta} ${this.numero2}. ${
            this.numero1 > this.numero2
              ? "El primer número es mayor."
              : this.numero1 < this.numero2
              ? "El segundo número es mayor."
              : "Ambos son iguales."
          }`;
          break;
        case "sucesion":
          correcta = "11";
          exp = "La sucesión 5, 7, 9, 11 avanza de dos en dos.";
          break;
        case "antecesor":
          correcta = "24";
          exp = "El número anterior a 25 es 24.";
          break;
        case "mayorMenor":
          correcta = "90";
          exp = "Entre 45, 62 y 90, el mayor es 90.";
          break;
        case "fraccionEq":
          correcta = "2/4";
          exp = "1/2 es equivalente a 2/4 porque ambos representan la mitad.";
          break;
        case "fraccionComp":
          correcta = "2/3";
          exp = "2/3 es mayor porque representa una parte más grande del entero.";
          break;
        case "decimal":
          correcta = "0.8";
          exp = "0.8 es mayor que 0.75 porque tiene más décimas.";
          break;
        case "divisionResiduo":
          correcta = "3";
          exp = "15 ÷ 4 = 3, porque 3×4=12 y sobran 3.";
          break;
        case "problema":
          correcta = "15";
          exp = "3 bolsas × 5 manzanas = 15 manzanas en total.";
          break;
        case "mixta":
          correcta = "5/2";
          exp = "2 1/2 = (2×2+1)/2 = 5/2.";
          break;
      }

      const respuestaStr = String(this.respuesta).trim();

      if (respuestaStr === String(correcta)) {
        this.mensaje = "✅ ¡Correcto!";
        this.explicacion = exp;
        this.esCorrecto = true;
        this.contador++;
        this.puntuacion += 10;
        this.saltarMascota();
      } else {
        this.mensaje = `❌ Incorrecto. La respuesta era ${correcta}`;
        this.explicacion = exp;
        this.esCorrecto = false;
      }

      this.indice++;
      setTimeout(() => {
        this.respuesta = "";
        this.mensaje = "";
        this.explicacion = "";
        this.generarEjercicio();
      }, 2500);
    },

    saltarMascota() {
      this.saltando = true;
      setTimeout(() => (this.saltando = false), 1200);
    },

    leerInstruccion() {
      const texto = `Atención: ${this.instruccion}`;
      const speech = new SpeechSynthesisUtterance(texto);
      speech.lang = "es-ES";
      speech.rate = 0.9;
      speech.pitch = 1.2;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(speech);
    },
  },
};
</script>

<style scoped>
.material-icons {
  font-size: 20px;
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
