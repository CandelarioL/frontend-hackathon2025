<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-emerald-100 to-lime-50"
  >
    <!-- 🔹 Contenido principal -->
    <main
      class="flex-1 flex flex-col items-center justify-start px-6 sm:px-10 py-10"
    >
      <div
        class="w-full max-w-md bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-green-100"
      >
        <h2
          class="text-3xl font-extrabold text-center text-green-700 mb-6 drop-shadow-sm"
        >
          🎓 Unirse a un Aula
        </h2>

        <p class="text-gray-600 text-center mb-6">
          Ingresa el
          <strong class="text-green-700">código de acceso</strong>
          que te proporcionó tu maestro para unirte al aula.
        </p>

        <!-- 🔸 Formulario para unirse -->
        <form @submit.prevent="unirseAula" class="space-y-5">
          <input
            v-model="codigo"
            type="text"
            maxlength="10"
            placeholder="EJEMPLO: XGHT29"
            class="w-full text-center text-lg tracking-widest uppercase px-4 py-3 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
            required
          />

          <button
            type="submit"
            class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold shadow-md transition"
          >
            ➕ Unirse al Aula
          </button>
        </form>

        <!-- 🔹 Aulas inscritas -->
        <div v-if="aulas.length > 0" class="mt-10">
          <h3 class="text-lg font-semibold text-gray-700 mb-3">
            📚 Mis Aulas
          </h3>
          <ul class="space-y-3">
            <li
              v-for="aula in aulas"
              :key="aula.id"
              class="p-4 bg-gray-50 rounded-lg shadow-sm border border-green-100 hover:bg-green-50 transition cursor-pointer"
              @click="abrirAula(aula)"
            >
              <div>
                <p class="font-semibold text-gray-800">{{ aula.nombre }}</p>
                <p class="text-sm text-gray-500">
                  {{ aula.descripcion || "Sin descripción" }}
                </p>
              </div>
              <span
                class="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-lg font-semibold"
              >
                {{ aula.codigo_acceso }}
              </span>
            </li>
          </ul>
        </div>

        <p v-else class="text-center text-gray-500 mt-10">
          Aún no te has unido a ninguna aula.
        </p>

        <!-- 🔹 Mensaje de estado -->
        <transition name="fade">
          <p
            v-if="mensaje"
            class="mt-6 text-center text-sm font-medium"
            :class="color"
          >
            {{ mensaje }}
          </p>
        </transition>
      </div>

      <!-- 🦉 Mascota educativa -->
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
          💬 ¡Únete y comienza a aprender con tu grupo!
        </p>
      </div>
    </main>

    <!-- 🔹 Pie -->
    <footer class="text-center py-5 text-sm text-gray-500">
      © 2025 DynamicsClass — Aprende, comparte y crece 💚
    </footer>
  </div>
</template>

<script>
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default {
  name: "UnirseAulaView",
  data() {
    return {
      codigo: "",
      aulas: [],
      mensaje: "",
      color: "",
      rol: "",
    };
  },
  mounted() {
    this.obtenerRol();
    this.obtenerAulas();
  },
  methods: {
    obtenerRol() {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode(token);
          this.rol = decoded.rol || "";
        }
      } catch (err) {
        console.error("❌ Error al obtener rol:", err);
      }
    },

    async obtenerAulas() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/aulas", {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.aulas = res.data || [];
      } catch (err) {
        console.error("❌ Error al obtener aulas:", err);
      }
    },

    async unirseAula() {
      if (!this.codigo.trim()) {
        this.mensaje = "⚠️ Debes ingresar un código válido.";
        this.color = "text-yellow-600";
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const codigoLimpio = this.codigo.trim().toUpperCase();

        await axios.post(
          "http://localhost:3000/api/aulas/unirse",
          { codigo: codigoLimpio },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        this.mensaje = "✅ Te has unido correctamente al aula.";
        this.color = "text-green-600";
        this.codigo = "";
        this.obtenerAulas();
      } catch (err) {
        console.error("❌ Error al unirse al aula:", err);
        this.mensaje =
          err.response?.data?.msg || "❌ Error al unirse al aula.";
        this.color = "text-red-600";
      } finally {
        setTimeout(() => (this.mensaje = ""), 3000);
      }
    },

    // ✅ Nueva función: entrar al aula seleccionada
    abrirAula(aula) {
      localStorage.setItem("aulaSeleccionada", JSON.stringify(aula));
      this.$router.push(`/mi-aula-alumno`);
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

/* 🦉 Rebote suave de la mascota */
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
