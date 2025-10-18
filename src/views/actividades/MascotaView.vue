<template>
  <div class="text-center mt-10">
    <h2 class="text-2xl font-bold">🐾 Tu Mascota</h2>
    <div v-if="mascota">
      <img :src="mascota.imagen_url" class="mx-auto w-48 h-48" />
      <p class="font-semibold mt-2">{{ mascota.nombre }}</p>
      <p>Nivel: {{ mascota.nivel }}</p>
      <p>Experiencia: {{ mascota.experiencia }}</p>
    </div>
    <p v-else class="text-gray-500 mt-4">Cargando mascota...</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MascotaView",
  data() {
    return { mascota: null };
  },
  async mounted() {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:3000/api/mascotas", {
      headers: { Authorization: `Bearer ${token}` },
    });
    this.mascota = res.data;
  },
};
</script>
