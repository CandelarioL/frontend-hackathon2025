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

    <!-- 🔹 Contenedor principal -->
    <div
      class="bg-white shadow-2xl rounded-2xl p-10 w-[95%] sm:w-[850px] text-center border border-gray-200 relative z-20"
    >
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">
        🧠 ¡Resuelve el problema matemático!
      </h2>

      <!-- 🔹 Imagen del problema -->
      <img
        :src="problemaActual.imagen"
        alt="Imagen del problema"
        class="w-52 h-52 mx-auto mb-6 rounded-xl shadow-md object-contain bg-white p-2"
      />

      <!-- 🔹 Texto del problema -->
      <p class="text-lg text-gray-700 font-medium mb-6 px-6 leading-relaxed">
        {{ problemaActual.texto }}
      </p>

      <!-- 🔹 Campo de respuesta -->
      <input
        type="number"
        v-model="respuesta"
        placeholder="Escribe tu respuesta..."
        class="border-2 border-gray-300 rounded-xl w-60 text-center text-3xl py-2 focus:outline-none focus:ring-4 focus:ring-green-400 mb-8"
      />

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
          @click="leerProblema"
          class="flex items-center justify-center mx-auto space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-transform hover:scale-105"
        >
          <span class="material-icons text-3xl">record_voice_over</span>
          <span>Escuchar problema</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProblemasMatematicos",
  data() {
    return {
      respuesta: "",
      mensaje: "",
      esCorrecto: false,
      contador: 0,
      puntuacion: 0,
      problemaActual: {},
      mensajeMascota: "💬 ¡Lee con atención, piensa y resuelve con calma! 🐶💪",
      saltando: false,
      problemas: [
        {
          texto: "🍎 Sofía tenía 5 manzanas y compró 4 más. ¿Cuántas tiene ahora?",
          respuesta: 9,
          imagen: "https://cdn-icons-png.flaticon.com/512/415/415733.png",
        },
        {
          texto: "🎈 En una fiesta hay 8 globos azules y 6 rojos. ¿Cuántos globos hay en total?",
          respuesta: 14,
          imagen: "https://cdn-icons-png.flaticon.com/512/2784/2784459.png",
        },
        {
          texto: "🐶 En el parque hay 7 perros jugando, y luego se van 2. ¿Cuántos quedan?",
          respuesta: 5,
          imagen: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
        },
        {
          texto: "🍰 Valeria preparó 3 pasteles, y cada pastel tiene 8 rebanadas. ¿Cuántas rebanadas hay en total?",
          respuesta: 24,
          imagen: "https://cdn-icons-png.flaticon.com/512/3159/3159593.png",
        },
        {
          texto: "⚽ En el equipo de fútbol hay 11 jugadores. Si entran 2 suplentes, ¿cuántos jugadores hay ahora?",
          respuesta: 13,
          imagen: "https://cdn-icons-png.flaticon.com/512/616/616430.png",
        },
        {
          texto: "🚌 En un autobús suben 9 personas, luego bajan 3. ¿Cuántas personas quedan dentro?",
          respuesta: 6,
          imagen: "https://cdn-icons-png.flaticon.com/512/2967/2967354.png",
        },
        {
          texto: "🦋 Había 10 mariposas y llegaron 5 más al jardín. ¿Cuántas hay ahora?",
          respuesta: 15,
          imagen: "https://cdn-icons-png.flaticon.com/512/620/620851.png",
        },
        {
          texto: "🍦 Cada cono de helado cuesta 5 pesos. Si compras 4, ¿cuánto pagas en total?",
          respuesta: 20,
          imagen: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
        },
        {
          texto: "🎂 En una fiesta hay 6 mesas y en cada una hay 5 personas. ¿Cuántas personas hay en total?",
          respuesta: 30,
          imagen: "https://cdn-icons-png.flaticon.com/512/1688/1688400.png",
        },
        {
          texto: "🍌 Si un mono come 2 plátanos cada día, ¿cuántos comerá en 5 días?",
          respuesta: 10,
          imagen: "https://cdn-icons-png.flaticon.com/512/616/616430.png",
        },
        {
          texto: "🐠 En una pecera hay 12 peces. Si sacan 4, ¿cuántos quedan dentro?",
          respuesta: 8,
          imagen: "https://cdn-icons-png.flaticon.com/512/616/616554.png",
        },
        {
          texto: "🚗 Hay 3 estacionamientos con 7 coches cada uno. ¿Cuántos coches hay en total?",
          respuesta: 21,
          imagen: "https://cdn-icons-png.flaticon.com/512/744/744465.png",
        },
        {
          texto: "🧃 Cada caja de jugo tiene 6 envases. Si hay 3 cajas, ¿cuántos envases hay?",
          respuesta: 18,
          imagen: "https://cdn-icons-png.flaticon.com/512/2917/2917944.png",
        },
        {
          texto: "🐱 En una casa viven 3 gatos, y cada uno tiene 4 patas. ¿Cuántas patas hay en total?",
          respuesta: 12,
          imagen: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
        },
        {
          texto: "🍓 Si tienes 9 fresas y regalas 3, ¿cuántas te quedan?",
          respuesta: 6,
          imagen: "https://cdn-icons-png.flaticon.com/512/415/415733.png",
        },
        {
          texto: "🎁 Hay 4 cajas, y cada caja tiene 5 regalos. ¿Cuántos regalos hay en total?",
          respuesta: 20,
          imagen: "https://cdn-icons-png.flaticon.com/512/3219/3219070.png",
        },
        {
          texto: "🏫 En una escuela hay 8 salones, y cada uno tiene 25 alumnos. ¿Cuántos alumnos hay en total?",
          respuesta: 200,
          imagen: "https://cdn-icons-png.flaticon.com/512/3050/3050141.png",
        },
        {
          texto: "🍕 Cada pizza tiene 8 rebanadas. Si compras 3 pizzas, ¿cuántas rebanadas tienes?",
          respuesta: 24,
          imagen: "https://cdn-icons-png.flaticon.com/512/3523/3523063.png",
        },
        {
          texto: "🏖️ En la playa hay 6 sombrillas y bajo cada una hay 3 personas. ¿Cuántas personas hay en total?",
          respuesta: 18,
          imagen: "https://cdn-icons-png.flaticon.com/512/2643/2643918.png",
        },
        {
          texto: "🧩 Si tienes 20 piezas de rompecabezas y colocas 7, ¿cuántas faltan?",
          respuesta: 13,
          imagen: "https://cdn-icons-png.flaticon.com/512/711/711284.png",
        },
      ],
    };
  },
  mounted() {
    this.generarProblema();
  },
  methods: {
    generarProblema() {
      const randomIndex = Math.floor(Math.random() * this.problemas.length);
      this.problemaActual = this.problemas[randomIndex];
      this.respuesta = "";
      this.mensaje = "";
      this.mensajeMascota =
        "💬 ¡Imagina la historia y piensa la operación! Usa dibujos si lo necesitas 🐶✨";
    },
    verificar() {
      if (parseInt(this.respuesta) === this.problemaActual.respuesta) {
        this.mensaje = "✅ ¡Correcto!";
        this.mensajeMascota =
          "🎉 ¡Excelente! Resolviste el problema como un genio 🧠🐾";
        this.esCorrecto = true;
        this.contador++;
        this.puntuacion += 25;
        this.saltarMascota();
      } else {
        this.mensaje = `❌ Incorrecto, la respuesta era ${this.problemaActual.respuesta}`;
        this.mensajeMascota =
          "😿 No pasa nada. ¡Imagina la historia otra vez y lo lograrás! 💪🐶";
        this.esCorrecto = false;
      }
      setTimeout(() => {
        this.generarProblema();
      }, 4000);
    },
    saltarMascota() {
      this.saltando = true;
      setTimeout(() => {
        this.saltando = false;
      }, 1200);
    },
    leerProblema() {
      const texto = `Escucha con atención: ${this.problemaActual.texto}`;
      const speech = new SpeechSynthesisUtterance(texto);
      speech.lang = "es-ES";
      speech.rate = 0.85;
      speech.pitch = 1.2;
      speech.volume = 1.1;
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
