<template>
  <div class="juego-logica">
    <!-- 🔙 Botón Regresar -->
    <div class="top-bar">
      <button class="btn-back" @click="goBack">⬅️ Regresar</button>
    </div>

    <!-- 🧭 Título -->
    <div class="titulo-container animate-bounce">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2917/2917995.png"
        class="icono"
        alt="icono lógica"
      />
      <h1 class="titulo">🧠 Secuencia y Lógica</h1>
    </div>

    <p class="descripcion">
      Observa la secuencia y elige la opción que continúa correctamente.
    </p>

    <!-- 🧩 Zona del juego -->
    <div class="zona-juego">
      <div class="tarjeta">
        <p class="pregunta">{{ preguntaActual.texto }}</p>

        <div class="secuencia">
          <span
            v-for="(n, i) in preguntaActual.secuencia"
            :key="i"
            class="numero"
          >
            {{ n }}
          </span>
          <span class="faltante">?</span>
        </div>

        <div class="opciones">
          <button
            v-for="(op, idx) in preguntaActual.opciones"
            :key="idx"
            @click="verificar(idx)"
            :disabled="respondido"
            class="opcion"
          >
            {{ op }}
          </button>
        </div>

        <p v-if="mensaje" class="feedback" :class="esCorrecto ? 'correcto' : 'incorrecto'">
          {{ mensaje }}
        </p>

        <div class="acciones" v-if="!completado">
          <button class="btn-siguiente" @click="siguiente">Siguiente</button>
        </div>

        <div v-if="completado" class="resultado animate-bounce">
          🏆 ¡Excelente trabajo!  
          Has completado <strong>{{ puntaje }}/{{ preguntas.length }}</strong> secuencias.
          <br />
          🌿 Wixárika: <span class="wixarika">¡Rikiari! Ne kúxi ne wieme!</span>
        </div>
      </div>
    </div>

    <!-- 🐶 Mascota -->
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
  name: "JuegoLogica",
  data() {
    return {
      indice: 0,
      puntaje: 0,
      mensaje: "",
      esCorrecto: false,
      respondido: false,
      completado: false,
      mascotaMensaje: "¡Piensa con atención! 🧠🐾",
      mascotaImg: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
      sonidoAcierto: null,
      sonidoFallo: null,
      preguntas: [
        {
          texto: "¿Qué número sigue en la secuencia?",
          secuencia: [2, 4, 6, 8],
          opciones: [9, 10, 12],
          correcta: 1,
        },
        {
          texto: "Observa: 3, 6, 9, 12, ¿qué sigue?",
          secuencia: [3, 6, 9, 12],
          opciones: [13, 14, 15],
          correcta: 2,
        },
        {
          texto: "Secuencia: 1, 1, 2, 3, 5, ¿qué número sigue?",
          secuencia: [1, 1, 2, 3, 5],
          opciones: [7, 8, 6],
          correcta: 1,
        },
        {
          texto: "Mira los colores: 🔴 🟠 🟡 🟢, ¿cuál sigue?",
          secuencia: ["🔴", "🟠", "🟡", "🟢"],
          opciones: ["🔵", "🟣", "🟤"],
          correcta: 0,
        },
        {
          texto: "Serie: 10, 20, 30, 40, ¿qué sigue?",
          secuencia: [10, 20, 30, 40],
          opciones: [45, 50, 55],
          correcta: 1,
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
  },
  methods: {
    goBack() {
      window.history.back();
    },
    verificar(idx) {
      this.respondido = true;
      if (idx === this.preguntaActual.correcta) {
        this.mensaje = "✅ ¡Excelente! Tu lógica es muy buena.";
        this.esCorrecto = true;
        this.puntaje++;
        this.mascotaImg = "https://cdn-icons-png.flaticon.com/512/616/616408.png";
        this.mascotaMensaje = "¡Bien hecho! 😄";
        this.sonidoAcierto.play();
      } else {
        this.mensaje = "❌ Ups... inténtalo de nuevo.";
        this.esCorrecto = false;
        this.mascotaImg = "https://cdn-icons-png.flaticon.com/512/616/616555.png";
        this.mascotaMensaje = "Oh no... eso no está bien 😢";
        this.sonidoFallo.play();
      }
    },
    siguiente() {
      if (this.indice < this.preguntas.length - 1) {
        this.indice++;
        this.respondido = false;
        this.mensaje = "";
        this.mascotaMensaje = "¡Piensa con atención! 🧠🐶";
        this.mascotaImg = "https://cdn-icons-png.flaticon.com/512/616/616408.png";
      } else {
        this.completado = true;
        this.mascotaMensaje = "¡Lo lograste! 🏆";
      }
    },
  },
};
</script>

<style scoped>
.juego-logica {
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
.top-bar {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 1rem;
}
.btn-back {
  background: white;
  border: 2px solid #60a5fa;
  color: #1e3a8a;
  font-weight: bold;
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  cursor: pointer;
  transition: 0.2s;
}
.btn-back:hover {
  background: #e0f2fe;
  transform: scale(1.05);
}

/* 🧭 Título */
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

/* Secuencia */
.secuencia {
  display: flex;
  justify-content: center;
  gap: 12px;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.numero {
  background: #dbeafe;
  border-radius: 10px;
  padding: 0.6rem 1rem;
  font-weight: bold;
  color: #1e40af;
}
.faltante {
  background: #f87171;
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 10px;
  font-weight: bold;
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
.feedback {
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
}
.btn-siguiente:hover {
  background: #2563eb;
  transform: scale(1.05);
}

/* 🐶 Mascota */
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

/* Animación */
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
