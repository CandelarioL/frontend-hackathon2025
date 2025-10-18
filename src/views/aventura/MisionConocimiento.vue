<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-200 to-green-100 relative overflow-hidden"
  >
    <!-- 🌟 Encabezado -->
    <h2 class="text-3xl font-bold text-indigo-700 mb-2">
      🌍 Misión del Conocimiento
    </h2>
    <p class="text-gray-700 font-semibold mb-6">
      Nivel {{ nivel }} — XP: {{ experiencia }} | 💰 {{ monedas }} monedas
    </p>

    <!-- 🎮 Zona del mapa -->
    <div
      class="relative w-[90%] sm:w-[800px] h-[400px] bg-gradient-to-b from-green-200 to-green-400 border-4 border-green-600 rounded-3xl shadow-2xl overflow-hidden"
    >
      <!-- 🛣️ Camino visual -->
      <div
        class="absolute bottom-10 left-0 right-0 h-16 bg-yellow-300 border-t-4 border-yellow-500 rounded-t-xl"
      ></div>

      <!-- 🌳 Decoración -->
      <img
        src="https://cdn-icons-png.flaticon.com/512/616/616693.png"
        class="absolute top-10 left-10 w-16 opacity-80"
        alt="tree"
      />
      <img
        src="https://cdn-icons-png.flaticon.com/512/616/616693.png"
        class="absolute top-20 right-20 w-20 opacity-80"
        alt="tree"
      />

      <!-- 🐶 Personaje en movimiento -->
      <img
        :src="personaje.img"
        class="absolute bottom-10 transition-all duration-500 drop-shadow-2xl"
        :class="{ 'salto-nivel': animarSalto }"
        :style="{ left: posicionX + 'px', width: '90px' }"
        alt="personaje"
      />

      <!-- 🎉 Moneda emergente -->
      <transition name="pop">
        <div
          v-if="mostrarRecompensa"
          class="absolute top-32 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg animate-bounce"
        >
          +{{ recompensaMonedas }} 💰 +{{ recompensaXP }} XP
        </div>
      </transition>

      <!-- 📍 Misiones visibles -->
      <div
        v-for="(m, i) in misiones"
        :key="i"
        class="absolute bottom-[90px] flex flex-col items-center"
        :style="{ left: m.x + 'px' }"
      >
        <div
          class="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold cursor-pointer hover:scale-110 transition"
          :class="{ 'bg-green-500': nivel > i }"
          @click="iniciarMision(i)"
        >
          {{ m.nivel }}
        </div>
        <p class="text-xs text-gray-700 mt-1 font-semibold">
          {{ m.nombre }}
        </p>
      </div>
    </div>

    <!-- 🔹 Botones de movimiento -->
    <div class="flex gap-6 mt-8">
      <button
        @click="mover('izquierda')"
        class="bg-indigo-600 text-white font-bold py-2 px-6 rounded-full hover:bg-indigo-700 shadow-md"
      >
        ⬅️
      </button>
      <button
        @click="mover('derecha')"
        class="bg-indigo-600 text-white font-bold py-2 px-6 rounded-full hover:bg-indigo-700 shadow-md"
      >
        ➡️
      </button>
    </div>

    <!-- 🏆 Estado -->
    <div class="mt-4 font-semibold text-indigo-700 text-lg">
      Progreso: Nivel {{ nivel }} / {{ misiones.length }}
    </div>

    <!-- 🧩 Modal de misión -->
    <ModalMision
      v-if="misionActual"
      :visible="mostrarModal"
      :titulo="misionActual.nombre"
      :preguntas="misionActual.preguntas"
      @cerrar="mostrarModal = false"
      @completado="misionCompletada"
    />
  </div>
</template>

<script>
import ModalMision from "./ModalMision.vue";

export default {
  name: "MisionConocimiento",
  components: { ModalMision },
  data() {
    return {
      personaje: { img: "https://cdn-icons-png.flaticon.com/512/616/616408.png" },
      posicionX: 50,
      nivel: 1,
      limiteDerecha: 650,
      mostrarModal: false,
      mostrarRecompensa: false,
      animarSalto: false,
      recompensaMonedas: 0,
      recompensaXP: 0,
      experiencia: 0,
      monedas: 0,
      misionActual: {},
      misiones: [
        {
          nivel: 1,
          nombre: "Suma Básica",
          x: 100,
          preguntas: [
            { texto: "¿Cuánto es 2 + 3?", opciones: ["4", "5", "6"], correcta: "5" },
            { texto: "¿Cuánto es 7 + 1?", opciones: ["6", "8", "9"], correcta: "8" },
          ],
        },
        {
          nivel: 2,
          nombre: "Razonamiento",
          x: 300,
          preguntas: [
            {
              texto: "Si hoy es lunes, ¿qué día será pasado mañana?",
              opciones: ["Martes", "Miércoles", "Jueves"],
              correcta: "Miércoles",
            },
          ],
        },
        {
          nivel: 3,
          nombre: "Lenguaje",
          x: 500,
          preguntas: [
            {
              texto: "¿Cuál palabra está escrita correctamente?",
              opciones: ["Abilidad", "Habilidad", "Havilidad"],
              correcta: "Habilidad",
            },
          ],
        },
      ],
    };
  },
  mounted() {
    const guardado = localStorage.getItem("aventura");
    if (guardado) {
      const datos = JSON.parse(guardado);
      this.nivel = datos.nivel;
      this.experiencia = datos.experiencia;
      this.monedas = datos.monedas;
    }

    const p = localStorage.getItem("personaje");
    if (p) this.personaje = JSON.parse(p);

    window.addEventListener("keydown", this.controlesTeclado);
  },
  unmounted() {
    window.removeEventListener("keydown", this.controlesTeclado);
  },
  methods: {
    mover(direccion) {
      const paso = 50;
      if (direccion === "izquierda" && this.posicionX > 20) {
        this.posicionX -= paso;
      } else if (direccion === "derecha" && this.posicionX < this.limiteDerecha) {
        this.posicionX += paso;
      }
    },
    controlesTeclado(e) {
      if (e.key === "ArrowRight") this.mover("derecha");
      if (e.key === "ArrowLeft") this.mover("izquierda");
    },
    iniciarMision(i) {
      const mision = this.misiones[i];
      if (i + 1 > this.nivel)
        return alert("🔒 Completa los niveles anteriores primero.");
      this.misionActual = mision;
      this.mostrarModal = true;
    },
    misionCompletada() {
      this.mostrarModal = false;
      this.recompensaMonedas = Math.floor(Math.random() * 10) + 5;
      this.recompensaXP = 20;

      this.monedas += this.recompensaMonedas;
      this.experiencia += this.recompensaXP;

      this.mostrarRecompensa = true;
      this.animarSalto = true;

      this.hablar("¡Excelente! Has ganado monedas y experiencia.");

      setTimeout(() => {
        this.mostrarRecompensa = false;
        this.animarSalto = false;
      }, 2000);

      // Guardar progreso local
      localStorage.setItem(
        "aventura",
        JSON.stringify({
          nivel: this.nivel,
          experiencia: this.experiencia,
          monedas: this.monedas,
        })
      );

      // Subir de nivel
      if (this.nivel < this.misiones.length) {
        this.nivel++;
        alert("🎉 ¡Nivel superado! Has avanzado al siguiente reto.");
      } else {
        this.hablar("¡Felicidades! Has completado todas las misiones.");
        alert("🏆 ¡Has completado todas las misiones!");
      }
    },
    hablar(texto) {
      const voz = new SpeechSynthesisUtterance(texto);
      voz.lang = "es-ES";
      voz.rate = 0.9;
      voz.pitch = 1.1;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(voz);
    },
  },
};
</script>

<style scoped>
/* 💥 Animación al subir de nivel */
@keyframes salto {
  0% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-70px);
  }
  60% {
    transform: translateY(0);
  }
  80% {
    transform: translateY(-30px);
  }
  100% {
    transform: translateY(0);
  }
}
.salto-nivel {
  animation: salto 1s ease-in-out;
}

/* ✨ Aparición de recompensas */
.pop-enter-active,
.pop-leave-active {
  transition: opacity 0.8s;
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
}
</style>
