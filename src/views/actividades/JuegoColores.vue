<template>
  <div class="juego-colores">
    <!-- 🔙 Botón de regreso -->
    <div class="back-btn-container">
      <button @click="goBack" class="back-btn">⬅️ Regresar</button>
    </div>

    <!-- 🧩 Título principal -->
    <h1 class="titulo animate-bounce">🎨 Aprendamos Colores, Formas y Letras</h1>
    <p class="subtitulo">Elige la sección para comenzar a jugar</p>

    <!-- 🧭 Selector de secciones -->
    <div class="secciones">
      <button
        v-for="(sec, index) in secciones"
        :key="index"
        @click="cambiarSeccion(sec.id)"
        :class="['boton-seccion', { activo: seccionActual === sec.id }]"
      >
        {{ sec.icono }} {{ sec.nombre }}
      </button>
    </div>

    <!-- 🎨 SECCIÓN: Colores -->
    <div v-if="seccionActual === 'colores'" class="zona-juego colores">
      <h2 class="titulo-seccion" style="color:#db2777;">🎨 Colores</h2>
      <p class="descripcion">Selecciona el color correcto para cada emoji.</p>
      <div class="zona-grid">
        <div v-for="(obj, i) in coloresJuego" :key="i" class="tarjeta">
          <div class="forma-grande">{{ obj.simbolo }}</div>
          <div class="opciones">
            <button
              v-for="color in colores"
              :key="color.nombre"
              :style="{ backgroundColor: color.valor }"
              class="opcion"
              @click="verificarColor(obj, color)"
            ></button>
          </div>
        </div>
      </div>
    </div>

    <!-- 🔺 SECCIÓN: Formas -->
    <div v-if="seccionActual === 'formas'" class="zona-juego formas">
      <h2 class="titulo-seccion" style="color:#2563eb;">🔺 Formas</h2>
      <p class="descripcion">Asocia el nombre con la forma correcta.</p>
      <div class="zona-grid">
        <div v-for="(forma, i) in formasJuego" :key="i" class="tarjeta">
          <div class="nombre">{{ forma.nombre }}</div>
          <div class="opciones">
            <button
              v-for="f in formasOpciones"
              :key="f.simbolo"
              class="forma-opcion-grande"
              @click="verificarForma(forma, f)"
            >
              {{ f.simbolo }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 🔤 SECCIÓN: Letras -->
    <div v-if="seccionActual === 'letras'" class="zona-juego letras">
      <h2 class="titulo-seccion" style="color:#059669;">🔤 Letras y Colores</h2>
      <p class="descripcion">Selecciona el color correcto que representa la palabra mostrada.</p>
      <div class="zona-grid">
        <div v-for="(palabra, i) in letrasJuego" :key="i" class="tarjeta">
          <div class="palabra" :style="{ color: palabra.colorVisual }">{{ palabra.texto }}</div>
          <div class="opciones">
            <button
              v-for="color in colores"
              :key="color.nombre"
              :style="{ backgroundColor: color.valor }"
              class="opcion"
              @click="verificarPalabra(palabra, color)"
            ></button>
          </div>
        </div>
      </div>
    </div>

    <!-- 🏆 Mensaje final -->
    <transition name="pop">
      <div v-if="completado" class="mensaje-final animate-bounce">
        🎉 ¡Excelente trabajo!  
        <br />
        🌿 Wixárika: <span class="wixarika">¡Rikiari! Ne kúxi rawe.</span>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "JuegoColoresFormasLetras",
  data() {
    return {
      seccionActual: "colores",
      completado: false,
      sonidoAcierto: null,
      sonidoFallo: null,
      secciones: [
        { id: "colores", nombre: "Colores", icono: "🎨" },
        { id: "formas", nombre: "Formas", icono: "🔺" },
        { id: "letras", nombre: "Letras y Colores", icono: "🔤" },
      ],
      colores: [
        { nombre: "rojo", valor: "red" },
        { nombre: "azul", valor: "blue" },
        { nombre: "verde", valor: "green" },
        { nombre: "amarillo", valor: "yellow" },
        { nombre: "morado", valor: "purple" },
      ],
      coloresJuego: [
        { simbolo: "🍎", colorCorrecto: "red" },
        { simbolo: "🌊", colorCorrecto: "blue" },
        { simbolo: "🌿", colorCorrecto: "green" },
        { simbolo: "☀️", colorCorrecto: "yellow" },
        { simbolo: "🍇", colorCorrecto: "purple" },
      ],
      formasJuego: [
        { nombre: "Círculo", correcta: "⚪" },
        { nombre: "Cuadro", correcta: "⬛" },
        { nombre: "Triángulo", correcta: "🔺" },
        { nombre: "Estrella", correcta: "⭐" },
      ],
      formasOpciones: [
        { simbolo: "⚪" },
        { simbolo: "⬛" },
        { simbolo: "🔺" },
        { simbolo: "⭐" },
      ],
      letrasJuego: [
        { texto: "ROJO", colorCorrecto: "red", colorVisual: "blue" },
        { texto: "AZUL", colorCorrecto: "blue", colorVisual: "green" },
        { texto: "VERDE", colorCorrecto: "green", colorVisual: "red" },
        { texto: "AMARILLO", colorCorrecto: "yellow", colorVisual: "purple" },
      ],
    };
  },
  mounted() {
    this.sonidoAcierto = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_c51d7fa4e6.mp3");
    this.sonidoFallo = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_7bb6cb35f8.mp3");
  },
  methods: {
    goBack() {
      window.history.back();
    },
    cambiarSeccion(id) {
      this.seccionActual = id;
      this.completado = false;
    },
    verificarColor(obj, color) {
      if (color.valor === obj.colorCorrecto) {
        obj.simbolo = "✅";
        this.reproducirAcierto();
      } else this.reproducirFallo();
      this.comprobarCompletado();
    },
    verificarForma(forma, f) {
      if (f.simbolo === forma.correcta) {
        forma.nombre = "✅";
        this.reproducirAcierto();
      } else this.reproducirFallo();
      this.comprobarCompletado();
    },
    verificarPalabra(palabra, color) {
      if (color.valor === palabra.colorCorrecto) {
        palabra.colorVisual = color.valor;
        this.reproducirAcierto();
      } else this.reproducirFallo();
      this.comprobarCompletado();
    },
    comprobarCompletado() {
      const todoHecho =
        this.coloresJuego.every(c => c.simbolo === "✅") &&
        this.formasJuego.every(f => f.nombre === "✅") &&
        this.letrasJuego.every(l => l.colorVisual === l.colorCorrecto);
      if (todoHecho) this.completado = true;
    },
    reproducirAcierto() {
      this.sonidoAcierto.play();
      const voz = new SpeechSynthesisUtterance("¡Muy bien!");
      voz.lang = "es-MX";
      window.speechSynthesis.speak(voz);
    },
    reproducirFallo() {
      this.sonidoFallo.play();
      const voz = new SpeechSynthesisUtterance("Intenta de nuevo");
      voz.lang = "es-MX";
      window.speechSynthesis.speak(voz);
    },
  },
};
</script>

<style scoped>
.juego-colores {
  min-height: 100vh;
  background: linear-gradient(135deg, #fde68a, #a5f3fc, #fbcfe8);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
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
  font-size: 1rem;
}
.back-btn:hover {
  background: #fdf2f8;
  transform: scale(1.05);
}

/* 🧩 Títulos */
.titulo {
  font-size: 2.6rem;
  font-weight: 900;
  color: #db2777;
  margin: 0.8rem 0;
}
.subtitulo {
  font-size: 1.2rem;
  font-weight: 500;
  color: #1e3a8a;
  margin-bottom: 1rem;
}

/* 🧭 Secciones */
.secciones {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1.5rem;
}
.boton-seccion {
  background: white;
  border: 3px solid #a78bfa;
  color: #4c1d95;
  font-weight: bold;
  border-radius: 999px;
  padding: 0.6rem 1.4rem;
  transition: 0.2s;
  font-size: 1rem;
}
.boton-seccion.activo {
  background: #a78bfa;
  color: white;
  transform: scale(1.1);
}
.boton-seccion:hover {
  transform: scale(1.05);
}

/* 🧠 Zona de juego */
.zona-juego {
  width: 100%;
  max-width: 1000px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}
.titulo-seccion {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.descripcion {
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

/* 🧩 Tarjetas */
.zona-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  justify-items: center;
}
.tarjeta {
  background: white;
  border-radius: 18px;
  padding: 1.2rem;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}
.forma-grande {
  font-size: 4rem;
  margin-bottom: 1rem;
}
.forma-opcion-grande {
  font-size: 3rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
}
.forma-opcion-grande:hover {
  transform: scale(1.2);
}
.palabra {
  font-size: 2.4rem;
  font-weight: 800;
  margin-bottom: 1rem;
}
.nombre {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 0.8rem;
}
.opciones {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  flex-wrap: wrap;
}
.opcion {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 3px solid white;
  cursor: pointer;
  transition: transform 0.2s;
}
.opcion:hover {
  transform: scale(1.2);
}

/* 🏆 Mensaje final */
.mensaje-final {
  background: white;
  border-radius: 18px;
  padding: 1.2rem 2.4rem;
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #047857;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}
.wixarika {
  color: #6d28d9;
  font-style: italic;
  font-weight: 500;
}

/* ✨ Animaciones */
.animate-bounce {
  animation: bounce 1s infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(-4%); }
  50% { transform: translateY(0); }
}

/* 🎉 Transición del mensaje */
.pop-enter-active, .pop-leave-active {
  transition: opacity 0.5s;
}
.pop-enter-from, .pop-leave-to {
  opacity: 0;
}
</style>
