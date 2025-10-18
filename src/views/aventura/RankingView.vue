<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 flex flex-col items-center py-10">
    <h1 class="text-4xl font-bold text-indigo-700 mb-6">🏆 Ranking de Jugadores</h1>

    <table class="w-[90%] sm:w-[700px] bg-white shadow-xl rounded-2xl border border-gray-300">
      <thead>
        <tr class="bg-indigo-500 text-white text-lg">
          <th class="py-3 px-4 text-left">Jugador</th>
          <th class="py-3 px-4">Nivel</th>
          <th class="py-3 px-4">XP</th>
          <th class="py-3 px-4">Monedas</th>
          <th class="py-3 px-4">Personaje</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(j, index) in jugadores"
          :key="index"
          class="hover:bg-indigo-100 border-b"
        >
          <td class="py-2 px-4 font-semibold text-gray-800">{{ j.nombre }}</td>
          <td class="py-2 px-4 text-center">{{ j.nivel }}</td>
          <td class="py-2 px-4 text-center">{{ j.experiencia }}</td>
          <td class="py-2 px-4 text-center text-yellow-600 font-bold">
            {{ j.monedas }} 💰
          </td>
          <td class="py-2 px-4 text-center">
            <img :src="j.personaje" class="w-10 h-10 mx-auto" alt="avatar" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "RankingView",
  data() {
    return { jugadores: [] };
  },
  async mounted() {
    try {
      const res = await fetch("http://localhost:4000/api/jugador/ranking");
      this.jugadores = await res.json();
    } catch (error) {
      console.error("Error al cargar ranking:", error);
    }
  },
};
</script>
