<template>
  <div class="juego-valores">
    <!-- 🔙 Botón de regreso -->
    <div class="back-btn-container">
      <button @click="goBack" class="back-btn">⬅️ Regresar</button>
    </div>

    <!-- 🧭 Título centrado -->
    <div class="titulo-container animate-bounce">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4854/4854136.png"
        alt="icono valores"
        class="icono"
      />
      <h1 class="titulo">Juego de Valores</h1>
    </div>

    <p class="descripcion">
      Escucha la situación y elige la opción que muestre un buen valor.
    </p>

    <!-- 🧩 Zona de juego -->
    <div class="zona-juego">
      <div class="tarjeta">
        <h2 class="pregunta animate-bounce">{{ preguntaActual.texto }}</h2>

        <div class="opciones">
          <button
            v-for="(op, i) in preguntaActual.opciones"
            :key="i"
            @click="verificar(i)"
            :disabled="respondido"
            class="opcion"
          >
            {{ op }}
          </button>
        </div>

        <p v-if="mensaje" class="mensaje" :class="esCorrecto ? 'correcto' : 'incorrecto'">
          {{ mensaje }}
        </p>

        <div class="acciones" v-if="!completado">
          <button class="btn-siguiente" @click="siguiente">Siguiente</button>
        </div>

        <div v-if="completado" class="resultado animate-bounce">
          🏆 ¡Felicidades!  
          Has completado el juego con <strong>{{ puntaje }}/{{ preguntas.length }}</strong> aciertos.
          <br />
          🌿 Wixárika: <span class="wixarika">¡Rikiari! Ne kúxi tewieme.</span>
        </div>
      </div>
    </div>

    <!-- 🐶 Mascota emocional -->
    <div class="mascota-container">
      <img :src="mascotaImg" alt="mascota" class="mascota" />
      <div class="burbuja">
        <p>{{ mascotaMensaje }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "JuegoValores",
  data() {
    return {
      indice: 0,
      puntaje: 0,
      mensaje: "",
      esCorrecto: false,
      respondido: false,
      completado: false,
      mascotaMensaje: "¡Hola! Vamos a aprender sobre valores 🐾",
      mascotaImg: "https://cdn-icons-png.flaticon.com/512/616/616408.png", // neutro
      sonidoAcierto: null,
      sonidoFallo: null,
      preguntas: [
        {
          texto: "Tu amigo olvidó su cuaderno. ¿Qué haces?",
          opciones: ["Le presto uno", "Me burlo de él", "Le digo que se aguante"],
          correcta: 0,
        },
        {
          texto: "Encuentras una cartera en el patio. ¿Qué haces?",
          opciones: ["La entrego al maestro", "La guardo para mí", "La tiro"],
          correcta: 0,
        },
        {
          texto: "Ves a alguien triste en clase. ¿Qué haces?",
          opciones: ["Le pregunto si está bien", "Lo ignoro", "Le tomo una foto"],
          correcta: 0,
        },
        {
          texto: "Tu mamá te pide ayuda con la mesa. ¿Qué haces?",
          opciones: ["Ayudo con gusto", "Le digo que no quiero", "Me voy sin hacer nada"],
          correcta: 0,
        },
        {
          texto: "Tu compañero nuevo no tiene con quién sentarse. ¿Qué haces?",
          opciones: ["Lo invito a sentarse conmigo", "Lo dejo solo", "Le digo que no hay lugar"],
          correcta: 0,
        },
      ],
    };
  },
  computed: {
    preguntaActual() {
      return this.preguntas[this.indice];
    },
  },
  mounted() {
    this.sonidoAcierto = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_c51d7fa4e6.mp3");
    this.sonidoFallo = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_7bb6cb35f8.mp3");
    this.hablar(this.preguntaActual.texto);
  },
  methods: {
    goBack() {
      window.history.back();
    },
    hablar(texto) {
      const voz = new SpeechSynthesisUtterance(texto);
      voz.lang = "es-MX";
      voz.rate = 0.95;
      voz.pitch = 1;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(voz);
    },
    verificar(idx) {
      this.respondido = true;
      if (idx === this.preguntaActual.correcta) {
        this.mensaje = "✅ ¡Excelente elección! Eso demuestra un buen valor.";
        this.esCorrecto = true;
        this.mascotaImg = "https://cdn-icons-png.flaticon.com/512/616/616408.png"; // feliz
        this.mascotaMensaje = "¡Estoy muy orgulloso de ti! 😄🐾";
        this.puntaje++;
        this.sonidoAcierto.play();
        this.hablar("¡Muy bien! Has elegido con valores.");
      } else {
        this.mensaje = "❌ Mmm... eso no fue una buena acción. Piensa cómo mejorar.";
        this.esCorrecto = false;
        this.mascotaImg = "https://cdn-icons-png.flaticon.com/512/616/616555.png"; // triste
        this.mascotaMensaje = "Oh no... eso no está bien 😢";
        this.sonidoFallo.play();
        this.hablar("Intenta de nuevo. Eso no está bien.");
      }
    },
    siguiente() {
      if (this.indice < this.preguntas.length - 1) {
        this.indice++;
        this.respondido = false;
        this.mensaje = "";
        this.mascotaMensaje = "Escucha con atención 🐶";
        this.mascotaImg = "https://cdn-icons-png.flaticon.com/512/616/616408.png";
        this.hablar(this.preguntaActual.texto);
      } else {
        this.completado = true;
        this.mascotaMensaje = "¡Lo lograste! 🏆 Estoy feliz por ti 🎉";
      }
    },
  },
};
</script>

<style scoped>
/* 🎨 Fondo tipo rompecabezas */
.juego-valores {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #a5f3fc, #d8b4fe, #fef9c3);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Poppins", sans-serif;
  text-align: center;
  position: relative;
  overflow: hidden;
  padding-bottom: 130px;
}

/* 🔙 Botón */
.back-btn-container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 1rem;
}
.back-btn {
  background: white;
  border: 2px solid #60a5fa;
  color: #1e3a8a;
  font-weight: bold;
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  cursor: pointer;
  transition: 0.2s;
}
.back-btn:hover {
  background: #e0f2fe;
  transform: scale(1.05);
}

/* 🧭 Título centrado */
.titulo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}
.icono {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
.titulo {
  font-size: 2.4rem;
  font-weight: 900;
  color: #1d4ed8;
}
.descripcion {
  font-size: 1.1rem;
  color: #1e3a8a;
  margin-bottom: 1.5rem;
  max-width: 600px;
}

/* 🧩 Tarjeta */
.zona-juego {
  display: flex;
  justify-content: center;
  width: 100%;
}
.tarjeta {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 700px;
  width: 90%;
}
.pregunta {
  font-size: 1.4rem;
  font-weight: bold;
  color: #1e3a8a;
  margin-bottom: 1.2rem;
}

/* Botones */
.opciones {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.opcion {
  background: #bfdbfe;
  color: #1e3a8a;
  border: none;
  border-radius: 12px;
  padding: 0.9rem;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}
.opcion:hover {
  background: #3b82f6;
  color: white;
  transform: scale(1.05);
}

/* Feedback */
.mensaje {
  margin-top: 1rem;
  font-weight: 700;
  font-size: 1.2rem;
}
.correcto {
  color: #16a34a;
}
.incorrecto {
  color: #dc2626;
}

/* Botón siguiente */
.btn-siguiente {
  background: #60a5fa;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.8rem 1.8rem;
  font-weight: bold;
  margin-top: 1.2rem;
  cursor: pointer;
  transition: 0.3s;
}
.btn-siguiente:hover {
  background: #2563eb;
  transform: scale(1.05);
}

/* 🐶 Mascota emocional */
.mascota-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}
.mascota {
  width: 120px;
  height: 120px;
}
.burbuja {
  background: white;
  border-radius: 20px;
  padding: 0.8rem 1rem;
  max-width: 250px;
  font-weight: 600;
  color: #1e3a8a;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  text-align: left;
}

/* Resultado final */
.resultado {
  margin-top: 1.4rem;
  background: #f0f9ff;
  border-radius: 18px;
  padding: 1rem;
  font-weight: bold;
  color: #065f46;
}
.wixarika {
  color: #6d28d9;
  font-style: italic;
}

/* Animaciones */
.animate-bounce {
  animation: bounce 1.2s infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(-4%); }
  50% { transform: translateY(0); }
}

/* 📱 Responsivo */
@media (max-width: 640px) {
  .titulo { font-size: 2rem; }
  .mascota { width: 90px; height: 90px; }
  .burbuja { font-size: 0.9rem; max-width: 180px; }
  .tarjeta { padding: 1.5rem; }
}
</style>
