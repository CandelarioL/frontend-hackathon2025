<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-emerald-100 to-lime-50 px-4 py-10"
  >
    <div
      class="w-full max-w-3xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-green-100 p-8"
    >
      <h2
        class="text-3xl font-extrabold text-center text-green-700 mb-6 drop-shadow-sm"
      >
        🧩 {{ actividad?.titulo || "Actividad" }}
      </h2>

      <p class="text-center text-gray-600 mb-6">
        {{ actividad?.descripcion || "Responde las siguientes preguntas:" }}
      </p>

      <!-- 🔹 Preguntas -->
      <div v-if="preguntas.length > 0" class="space-y-6">
        <div
          v-for="(pregunta, index) in preguntas"
          :key="index"
          class="bg-gray-50 border border-green-100 p-5 rounded-xl shadow-sm"
        >
          <p class="font-semibold text-gray-800 mb-3">
            {{ index + 1 }}. {{ pregunta.texto }}
          </p>

          <div v-if="pregunta.opciones">
            <label
              v-for="(opcion, i) in pregunta.opciones"
              :key="i"
              class="flex items-center space-x-2 mb-2 cursor-pointer"
            >
              <input
                type="radio"
                :name="'pregunta-' + index"
                :value="opcion"
                v-model="respuestas[index]"
                class="text-green-600 focus:ring-green-500"
              />
              <span class="text-gray-700">{{ opcion }}</span>
            </label>
          </div>

          <div v-else>
            <input
              type="text"
              v-model="respuestas[index]"
              class="border border-gray-300 rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              placeholder="Escribe tu respuesta..."
            />
          </div>
        </div>

        <!-- Botón para enviar -->
        <div class="text-center mt-8">
          <button
            @click="enviarRespuestas"
            class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            :disabled="enviando"
          >
            {{ enviando ? "Enviando..." : "✅ Enviar respuestas" }}
          </button>
        </div>
      </div>

      <p v-else class="text-center text-gray-500">
        Esta actividad aún no tiene preguntas configuradas.
      </p>

      <!-- 🔹 Resultado -->
      <transition name="fade">
        <div
          v-if="mensaje"
          class="mt-6 text-center font-medium text-lg"
          :class="color"
        >
          {{ mensaje }}
        </div>
      </transition>
    </div>

    <!-- 🦮 Mascota -->
    <div
      class="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 flex flex-col items-center animate-bounce-slow"
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
        alt="Mascota EduPlay"
        class="w-24 sm:w-32 drop-shadow-xl"
      />
      <p
        class="bg-white/80 text-gray-700 font-semibold px-4 py-1 mt-2 rounded-full shadow-sm text-sm"
      >
        💬 ¡Tú puedes hacerlo!
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ActividadView",
  data() {
    return {
      actividad: null,
      preguntas: [],
      respuestas: [],
      mensaje: "",
      color: "",
      enviando: false,
      tiempoInicio: null,
    };
  },
  async mounted() {
    await this.cargarActividad();
    this.tiempoInicio = Date.now();
  },
  methods: {
    async cargarActividad() {
      try {
        const id = this.$route.params.id;
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:3000/api/aulas/actividades/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        this.actividad = res.data;
        this.preguntas = res.data.contenido?.preguntas || [];
        this.respuestas = new Array(this.preguntas.length).fill("");
      } catch (err) {
        console.error("❌ Error al cargar actividad:", err);
        this.mensaje = "Error al cargar la actividad.";
        this.color = "text-red-600";
      }
    },

    async enviarRespuestas() {
      if (this.respuestas.includes("")) {
        this.mensaje = "⚠️ Responde todas las preguntas antes de enviar.";
        this.color = "text-yellow-600";
        return;
      }

      this.enviando = true;
      const tiempoTotal = Math.floor((Date.now() - this.tiempoInicio) / 1000);

      // Calcular puntaje
      let correctas = 0;
      this.preguntas.forEach((p, i) => {
        if (
          this.respuestas[i].trim().toLowerCase() ===
          p.respuesta_correcta?.trim().toLowerCase()
        ) {
          correctas++;
        }
      });

      const puntaje = Math.round((correctas / this.preguntas.length) * 100);
      const token = localStorage.getItem("token");

      try {
        await axios.post(
          `http://localhost:3000/api/aulas/${this.actividad.id_aula}/actividades/${this.actividad.id}/progreso`,
          {
            puntaje,
            completado: true,
            tiempo_respuesta: tiempoTotal,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        this.mensaje = `🎉 Actividad completada con ${puntaje}%`;
        this.color = "text-green-700";
        setTimeout(() => this.$router.push("/mi-aula-alumno"), 2500);
      } catch (err) {
        console.error("❌ Error al registrar progreso:", err);
        this.mensaje = "Error al guardar tu progreso.";
        this.color = "text-red-600";
      } finally {
        this.enviando = false;
      }
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 🦮 Animación mascota */
@keyframes bounceSlow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.animate-bounce-slow {
  animation: bounceSlow 3s ease-in-out infinite;
}
</style>
