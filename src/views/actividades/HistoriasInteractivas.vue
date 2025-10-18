<template>
  <div
    class="min-h-screen relative flex flex-col items-center justify-center overflow-hidden"
    :style="{ fontSize: fontSize + 'px' }"
  >
    <!-- 🌀 Fondo animado -->
    <div class="absolute inset-0 bg-gradient-to-b from-yellow-100 to-green-100 overflow-hidden">
      <div
        v-for="(letra, i) in letrasFondo"
        :key="i"
        class="absolute text-[40px] font-bold opacity-10 text-gray-700 animate-float select-none"
        :style="{
          top: letra.top + '%',
          left: letra.left + '%',
          animationDelay: letra.delay + 's',
          color: letra.color
        }"
      >
        {{ letra.char }}
      </div>
    </div>

    <!-- 🟢 Panel de puntuación -->
    <div
      class="absolute top-[140px] right-8 text-right bg-white bg-opacity-90 border border-gray-300 rounded-xl px-6 py-3 shadow-lg z-20"
    >
      <div class="text-sm text-green-700 font-bold">
        {{ idioma === 'es' ? 'Historias jugadas' : 'Tukari neyutɨa' }}
      </div>
      <div class="text-3xl font-bold">{{ contador }}</div>
      <div class="text-sm text-blue-600 mt-2 font-semibold">
        SmartScore
      </div>
      <div class="text-3xl font-bold text-orange-500">{{ puntuacion }}</div>
    </div>

    <!-- 🐶 Mascota -->
    <div class="absolute bottom-4 left-6 flex flex-col items-center text-center z-10">
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

    <!-- 🌐 Controles -->
    <div class="absolute top-4 right-4 flex space-x-3 z-30">
      <button
        @click="cambiarIdioma"
        class="bg-indigo-600 text-white px-3 py-2 rounded-lg shadow hover:bg-indigo-700"
      >
        🌐 {{ idioma === 'es' ? 'Wixárika' : 'Español' }}
      </button>
      <button
        @click="aumentarTexto"
        class="bg-green-500 text-white px-3 py-2 rounded-lg shadow hover:bg-green-600"
      >
        ➕
      </button>
      <button
        @click="disminuirTexto"
        class="bg-red-500 text-white px-3 py-2 rounded-lg shadow hover:bg-red-600"
      >
        ➖
      </button>
    </div>

    <!-- 📖 Contenedor principal -->
    <div
      class="bg-white bg-opacity-90 shadow-2xl rounded-2xl p-10 w-[95%] sm:w-[850px] text-center border border-gray-200 relative z-20 backdrop-blur-sm"
    >
      <!-- Título -->
      <h2 class="text-2xl font-bold text-gray-800 mb-4">
        {{ idioma === 'es' ? '📖 Historias Interactivas' : '📖 Tukari neyutɨa' }}
      </h2>
      <p class="text-gray-600 italic mb-8">
        {{
          idioma === 'es'
            ? 'Lee, elige y descubre el final...'
            : 'Neyutɨa, kiwixa tei tukari tewi.'
        }}
      </p>

      <!-- Imagen -->
      <img
        :src="historiaActual.imagen"
        alt="imagen historia"
        class="w-56 h-56 mx-auto mb-6 object-contain rounded-xl shadow-md"
      />

      <!-- Texto -->
      <div
        class="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-left text-gray-800 text-lg leading-relaxed shadow-inner mb-6"
      >
        {{ textoHistoria }}
      </div>

      <!-- Opciones -->
      <div class="flex flex-col sm:flex-row justify-center gap-4 mb-8">
        <button
          v-for="(op, i) in opcionesActuales"
          :key="i"
          @click="elegirOpcion(op)"
          class="bg-indigo-100 border border-indigo-300 hover:bg-green-100 text-gray-800 font-semibold rounded-xl px-6 py-3 transition-all shadow-md hover:scale-105"
        >
          {{ idioma === 'es' ? op.texto : op.textoWix }}
        </button>
      </div>

      <!-- Resultado -->
      <transition name="fade">
        <div
          v-if="mensaje"
          class="mt-4 text-xl font-semibold"
          :class="esCorrecto ? 'text-green-600' : 'text-red-600'"
        >
          {{ mensaje }}
        </div>
      </transition>

      <!-- 🎧 Botón de voz -->
      <div class="mt-6">
        <button
          @click="leerTexto"
          class="flex items-center justify-center mx-auto space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-transform hover:scale-105"
        >
          <span class="material-icons text-3xl">record_voice_over</span>
          <span>
            {{ idioma === 'es' ? 'Escuchar narración' : 'Kiwixa tukari' }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HistoriasInteractivasBilingue",
  data() {
    return {
      idioma: "es",
      fontSize: 18,
      letrasFondo: [],
      historias: [],
      historiaActual: {},
      mensaje: "",
      esCorrecto: false,
      contador: 0,
      puntuacion: 0,
      mensajeMascota:
        "💬 Lee, imagina y elige. ¡Tus decisiones cambian la historia! 🐶✨",
      saltando: false,
    };
  },
  computed: {
    textoHistoria() {
      return this.idioma === "es"
        ? this.historiaActual.texto
        : this.historiaActual.textoWix;
    },
    opcionesActuales() {
      return this.historiaActual.opciones || [];
    },
  },
  mounted() {
    this.cargarHistorias();
    this.nuevaHistoria();
    this.generarLetrasFondo();
  },
  methods: {
    generarLetrasFondo() {
      const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZÑÁÉÍÓÚ";
      for (let i = 0; i < 25; i++) {
        this.letrasFondo.push({
          char: letras.charAt(Math.floor(Math.random() * letras.length)),
          top: Math.random() * 100,
          left: Math.random() * 100,
          delay: Math.random() * 5,
          color: ["#1E3A8A", "#0EA5E9", "#9333EA", "#F59E0B"][
            Math.floor(Math.random() * 4)
          ],
        });
      }
    },
    cambiarIdioma() {
      this.idioma = this.idioma === "es" ? "wix" : "es";
      this.mensajeMascota =
        this.idioma === "es"
          ? "💬 Lee, imagina y elige. ¡Tus decisiones cambian la historia! 🐶✨"
          : "💬 Tukari neyutɨa, kiwixa tei tukari tewi 🐶✨";
    },
    cargarHistorias() {
      this.historias = [
        {
          texto: "🐕 Sofía encontró un perrito perdido en el parque. Tenía frío y hambre. Ella pensó en ayudarlo, pero no sabía cómo...",
          textoWix: "🐕 Sofía xuri neiya tei perrito tewi parke. Peuka neyutɨa tewi nixi. Pewi neiya niyari, pero xuxi meyɨ neiya.",
          imagen: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
          opciones: [
            {
              texto: "Llevarlo a casa para cuidarlo",
              textoWix: "Niyari tei tewi neyutɨa xuri tewi",
              resultado: "🏡 Sofía lo cuidó, le dio agua y comida. Al otro día, encontró al dueño y se ganaron un nuevo amigo. 💕",
              resultadoWix: "🏡 Sofía tewi neyutɨa, neiya tei xutsi tewi. Pewi tewi nieri neiya, neiya tei tukari niyari. 💕",
              correcta: true,
            },
            {
              texto: "Dejarlo y seguir su camino",
              textoWix: "Pewi tewi neiya tei muxi nieri",
              resultado: "🐾 El perrito se quedó solo. Sofía aprendió que ayudar da alegría al corazón. ❤️",
              resultadoWix: "🐾 Xuri tewi perrito muxi tewi. Sofía neiya tukari tewi ma tei tewi. ❤️",
              correcta: false,
            },
          ],
        },
        {
          texto: "🌳 Lila vio que alguien tiró basura en el bosque. Ella se preguntó si debería recogerla o ignorarla...",
          textoWix: "🌳 Lila neiya tukari neiya basura tewi neyutɨa tewi yawi. Pewi tewi xuwe tukari neyutɨa.",
          imagen: "https://cdn-icons-png.flaticon.com/512/616/616554.png",
          opciones: [
            {
              texto: "Recogerla y cuidar el lugar",
              textoWix: "Tukari neyutɨa tewi tewi yawi",
              resultado: "🌎 Lila ayudó al planeta y motivó a otros a hacerlo. ¡Una heroína del ambiente! 🌱",
              resultadoWix: "🌎 Lila neyutɨa tewi yawi, tukari neyutɨa meyɨ tewi. 🌱",
              correcta: true,
            },
            {
              texto: "Ignorarla y seguir caminando",
              textoWix: "Muxi neyutɨa tewi nieri",
              resultado: "💭 Lila siguió, pero luego pensó que pequeñas acciones hacen grandes cambios. 🌍",
              resultadoWix: "💭 Lila muxi neiya, pero pewi neiya tukari neyutɨa tewi. 🌍",
              correcta: false,
            },
          ],
        },
      ];
    },
    nuevaHistoria() {
      const random = Math.floor(Math.random() * this.historias.length);
      this.historiaActual = this.historias[random];
      this.mensaje = "";
      this.mensajeMascota =
        this.idioma === "es"
          ? "💭 ¿Qué harías tú en esta situación? Lee con atención y elige bien 🧠"
          : "💭 Tukari neyutɨa tei tewi, pewi neyutɨa kiwixa 🧠";
    },
    elegirOpcion(opcion) {
      this.mensaje =
        this.idioma === "es" ? opcion.resultado : opcion.resultadoWix;
      this.esCorrecto = opcion.correcta;
      if (opcion.correcta) {
        this.contador++;
        this.puntuacion += 30;
        this.mensajeMascota =
          this.idioma === "es"
            ? "🎉 ¡Gran elección! Eso demuestra empatía y valores 🐾💖"
            : "🎉 ¡Tukari neyutɨa! Neiya tei tukari tewi. 🐾💖";
        this.saltarMascota();
      } else {
        this.mensajeMascota =
          this.idioma === "es"
            ? "😿 Ups... pero aprendiste algo importante 💪"
            : "😿 Pewi tewi nieri, pero tukari neyutɨa 💪";
      }
      setTimeout(() => this.nuevaHistoria(), 6000);
    },
    leerTexto() {
      const texto = this.idioma === "es"
        ? this.historiaActual.texto
        : this.historiaActual.textoWix;
      const speech = new SpeechSynthesisUtterance(texto);
      speech.lang = this.idioma === "es" ? "es-ES" : "es-MX";
      speech.rate = 0.9;
      speech.pitch = 1.1;
      speech.volume = 1.5;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(speech);
    },
    saltarMascota() {
      this.saltando = true;
      setTimeout(() => (this.saltando = false), 1200);
    },
    aumentarTexto() {
      if (this.fontSize < 30) this.fontSize += 2;
    },
    disminuirTexto() {
      if (this.fontSize > 14) this.fontSize -= 2;
    },
  },
};
</script>

<style scoped>
.material-icons {
  font-size: 28px;
}
@keyframes float {
  0%, 100% { transform: translateY(0); opacity: 0.2; }
  50% { transform: translateY(-25px); opacity: 0.35; }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
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
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-60px); }
  80% { transform: translateY(-25px); }
}
.jump {
  animation: dogJump 1.2s ease-in-out;
}
</style>
