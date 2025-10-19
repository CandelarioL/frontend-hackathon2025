<template>
  <div class="juego-palabra">
    <!-- 🔙 Botón de regreso -->
    <div class="back-btn-container">
      <button @click="goBack" class="back-btn">⬅️ Regresar</button>
    </div>

    <!-- 🧩 Título -->
    <h1 class="titulo animate-bounce">📖 Palabra Correcta</h1>
    <p class="subtitulo">Elige la palabra que completa correctamente la oración</p>

    <!-- 📊 Progreso -->
    <div class="progreso">
      <span>Pregunta {{ indice + 1 }} / {{ preguntas.length }}</span>
      <div class="barra">
        <div class="progreso-barra" :style="{ width: progreso + '%' }"></div>
      </div>
    </div>

    <!-- 🎯 Zona de juego -->
    <div class="zona-juego">
      <div class="pregunta">{{ preguntaActual.texto }}</div>

      <div class="opciones">
        <button
          v-for="(opcion, i) in preguntaActual.opciones"
          :key="i"
          class="opcion"
          @click="verificar(opcion)"
          :disabled="respondido"
        >
          {{ opcion }}
        </button>
      </div>

      <transition name="pop">
        <div v-if="mensaje" class="mensaje animate-bounce">
          {{ mensaje }}
        </div>
      </transition>

      <div v-if="completado" class="mensaje-final animate-bounce">
        🏆 ¡Terminaste el reto!  
        <br />
        Tu puntuación: <strong>{{ puntaje }}/{{ preguntas.length }}</strong>  
        <br />
        🌿 Wixárika: <span class="wixarika">¡Rikiari! Ne kúxi tuawi.</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "JuegoPalabraAvanzado",
  data() {
    return {
      indice: 0,
      mensaje: "",
      completado: false,
      puntaje: 0,
      respondido: false,
      sonidoAcierto: null,
      sonidoFallo: null,
      preguntas: [
        {
          texto: "El ___ brilla en el cielo durante el día.",
          correcta: "sol",
          opciones: ["sol", "luna", "estrella"],
        },
        {
          texto: "Mi mamá cocinó una deliciosa ___ de verduras.",
          correcta: "sopa",
          opciones: ["zopa", "sopa", "sopa."],
        },
        {
          texto: "El perro está muy ___ porque llegó su dueño.",
          correcta: "feliz",
          opciones: ["felis", "feliz", "felíz"],
        },
        {
          texto: "Los peces viven en el ___.",
          correcta: "agua",
          opciones: ["aguá", "agua", "hagua"],
        },
        {
          texto: "Me gusta leer libros porque aprendo ___ nuevas.",
          correcta: "palabras",
          opciones: ["palabras", "palavras", "palabrás"],
        },
        {
          texto: "El maestro explicó la ___ con mucha paciencia.",
          correcta: "lección",
          opciones: ["leccion", "lección", "lexión"],
        },
        {
          texto: "El tren se mueve muy rápido por las ___.",
          correcta: "vías",
          opciones: ["vías", "vias", "bias"],
        },
      ],
    };
  },
  computed: {
    preguntaActual() {
      return this.preguntas[this.indice];
    },
    progreso() {
      return ((this.indice + 1) / this.preguntas.length) * 100;
    },
  },
  mounted() {
    this.sonidoAcierto = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_c51d7fa4e6.mp3");
    this.sonidoFallo = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_7bb6cb35f8.mp3");
  },
  methods: {
    goBack() {
      window.history.back();
    },
    verificar(opcion) {
      this.respondido = true;
      if (opcion.toLowerCase() === this.preguntaActual.correcta.toLowerCase()) {
        this.mensaje = "✅ ¡Correcto!";
        this.puntaje++;
        this.reproducirAcierto();
      } else {
        this.mensaje = "❌ Incorrecto";
        this.reproducirFallo();
      }

      setTimeout(() => {
        this.mensaje = "";
        this.respondido = false;
        if (this.indice < this.preguntas.length - 1) {
          this.indice++;
        } else {
          this.completado = true;
        }
      }, 1200);
    },
    reproducirAcierto() {
      this.sonidoAcierto.play();
      const voz = new SpeechSynthesisUtterance("¡Muy bien!");
      voz.lang = "es-MX";
      window.speechSynthesis.speak(voz);
    },
    reproducirFallo() {
      this.sonidoFallo.play();
      const voz = new SpeechSynthesisUtterance("Sigue intentando");
      voz.lang = "es-MX";
      window.speechSynthesis.speak(voz);
    },
  },
};
</script>

<style scoped>
/* 🎨 Fondo general */
.juego-palabra {
  min-height: 100vh;
  background: linear-gradient(135deg, #fef3c7, #a5f3fc, #fbcfe8);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  font-family: "Poppins", sans-serif;
  text-align: center;
}

/* 🔙 Botón de regreso */
.back-btn-container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
.back-btn {
  background: white;
  border: 2px solid #f472b6;
  color: #be185d;
  font-weight: bold;
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  cursor: pointer;
  transition: 0.2s;
}
.back-btn:hover {
  background: #fdf2f8;
  transform: scale(1.05);
}

/* 🧩 Título */
.titulo {
  font-size: 2.4rem;
  font-weight: 900;
  color: #db2777;
  margin-top: 0.5rem;
}
.subtitulo {
  font-size: 1.2rem;
  color: #1e3a8a;
  margin-bottom: 1.5rem;
}

/* 📊 Progreso */
.progreso {
  width: 90%;
  max-width: 500px;
  margin-bottom: 1rem;
  font-weight: 600;
  color: #374151;
}
.barra {
  background: #e5e7eb;
  border-radius: 20px;
  height: 12px;
  margin-top: 6px;
}
.progreso-barra {
  background: #a78bfa;
  height: 100%;
  border-radius: 20px;
  transition: width 0.4s;
}

/* 🎯 Zona de juego */
.zona-juego {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  width: 100%;
}
.pregunta {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

/* 🧠 Opciones */
.opciones {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}
.opcion {
  background: #a78bfa;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.8rem 1.8rem;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.opcion:hover {
  background: #7c3aed;
  transform: scale(1.1);
}
.opcion:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 🏆 Mensajes */
.mensaje {
  margin-top: 1rem;
  font-size: 1.4rem;
  font-weight: 700;
}
.mensaje-final {
  background: white;
  border-radius: 18px;
  padding: 1.2rem 2rem;
  margin-top: 1.5rem;
  font-size: 1.4rem;
  font-weight: bold;
  color: #047857;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}
.wixarika {
  color: #6d28d9;
  font-style: italic;
}

/* ✨ Animaciones */
.animate-bounce {
  animation: bounce 1s infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(-4%); }
  50% { transform: translateY(0); }
}

/* 🌀 Efecto aparición */
.pop-enter-active, .pop-leave-active {
  transition: opacity 0.4s;
}
.pop-enter-from, .pop-leave-to {
  opacity: 0;
}

/* 📱 Responsivo */
@media (max-width: 640px) {
  .titulo { font-size: 2rem; }
  .pregunta { font-size: 1.2rem; }
  .opcion { font-size: 1rem; padding: 0.6rem 1.4rem; }
}
</style>
