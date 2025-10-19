<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-lime-50 flex flex-col">
    <main class="flex-1 px-6 py-10">
      <div class="max-w-5xl mx-auto bg-white/90 p-8 rounded-2xl shadow-lg border border-green-100">
        <h2 class="text-3xl font-bold text-center text-green-700 mb-8">
          🧩 Panel del Aula — {{ aula?.nombre || "Cargando..." }}
        </h2>

        <!-- 📘 Crear nueva actividad -->
        <form @submit.prevent="crearActividad" class="mb-10 bg-green-50 p-5 rounded-lg shadow-sm">
          <h3 class="text-xl font-semibold text-green-700 mb-3">➕ Nueva Actividad</h3>
          <input v-model="titulo" placeholder="Título" class="w-full border p-2 rounded-lg mb-2" required />
          <textarea v-model="descripcion" placeholder="Descripción" class="w-full border p-2 rounded-lg mb-2" />
          <select v-model="tipo" class="w-full border p-2 rounded-lg mb-2">
            <option value="matematicas">Matemáticas</option>
            <option value="lenguaje">Lenguaje</option>
          </select>
          <input type="number" v-model="nivel" min="1" class="w-full border p-2 rounded-lg mb-3" placeholder="Nivel" />
          <button class="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg">Crear</button>
        </form>

        <!-- 📋 Lista de actividades -->
        <div v-if="actividades.length > 0" class="space-y-4">
          <div
            v-for="act in actividades"
            :key="act.id"
            class="p-4 bg-gray-50 border border-green-100 rounded-lg flex justify-between items-start hover:bg-green-50 transition"
          >
            <div>
              <h3 class="font-bold text-green-800 text-lg">{{ act.titulo }}</h3>
              <p class="text-sm text-gray-600">{{ act.descripcion }}</p>
              <p class="text-xs text-gray-500 mt-1">
                📘 Tipo: <span class="font-medium">{{ act.tipo }}</span> | Nivel: {{ act.nivel }}
              </p>
            </div>
            <div class="space-x-2">
              <button @click="editarActividad(act)" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                ✏️
              </button>
              <button @click="eliminarActividad(act.id)" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                🗑️
              </button>
            </div>
          </div>
        </div>
        <p v-else class="text-center text-gray-500 mt-8">Aún no hay actividades.</p>

        <!-- 📊 Progreso de alumnos -->
        <div v-if="progreso.length > 0" class="mt-12">
          <h3 class="text-2xl font-semibold text-green-700 mb-4">📊 Progreso de los alumnos</h3>
          <table class="w-full border border-green-100 text-left rounded-lg shadow-sm">
            <thead class="bg-green-100 text-green-800">
              <tr>
                <th class="px-4 py-2">Alumno</th>
                <th class="px-4 py-2">Correo</th>
                <th class="px-4 py-2">Promedio</th>
                <th class="px-4 py-2">Completadas</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="alumno in progreso"
                :key="alumno.email"
                class="border-t hover:bg-green-50 transition"
              >
                <td class="px-4 py-2 font-semibold">{{ alumno.nombre }}</td>
                <td class="px-4 py-2">{{ alumno.email }}</td>
                <td class="px-4 py-2 text-green-700">{{ alumno.promedio }}%</td>
                <td class="px-4 py-2">{{ alumno.completadas }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PanelAulaView",
  data() {
    return {
      aula: null,
      actividades: [],
      progreso: [],
      titulo: "",
      descripcion: "",
      tipo: "matematicas",
      nivel: 1,
    };
  },
  async mounted() {
    await this.cargarAula();
    await this.cargarActividades();
    await this.cargarProgreso();
  },
  methods: {
    async cargarAula() {
      const id = this.$route.params.id;
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:3000/api/aulas/${id}/alumnos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.aula = res.data.aula;
    },
    async cargarActividades() {
      const id = this.$route.params.id;
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:3000/api/actividades/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.actividades = res.data;
    },
    async cargarProgreso() {
      const id = this.$route.params.id;
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:3000/api/actividades/${id}/progreso`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.progreso = res.data;
    },
    async crearActividad() {
      const id = this.$route.params.id;
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/api/actividades",
        {
          titulo: this.titulo,
          descripcion: this.descripcion,
          tipo: this.tipo,
          nivel: this.nivel,
          id_aula: id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      this.titulo = "";
      this.descripcion = "";
      this.nivel = 1;
      this.cargarActividades();
    },
    async eliminarActividad(id) {
      if (!confirm("¿Eliminar esta actividad?")) return;
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/actividades/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.cargarActividades();
    },
    editarActividad(act) {
      this.titulo = act.titulo;
      this.descripcion = act.descripcion;
      this.tipo = act.tipo;
      this.nivel = act.nivel;
      alert("🔧 Edita los campos y guarda para actualizar la actividad.");
    },
  },
};
</script>
