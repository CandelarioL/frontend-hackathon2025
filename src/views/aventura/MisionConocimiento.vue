<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-6">
    <h2 class="text-2xl font-bold mb-4">¡Bienvenido a la misión de conocimiento!</h2>
    <p class="mb-4">Selecciona una misión para comenzar a jugar.</p>
    <!-- Aquí puedes poner botones o links a los juegos/minijuegos -->
    <router-link to="/minijuegos" class="bg-green-600 text-white px-6 py-2 rounded-full font-bold hover:bg-green-700 transition">Ir a los minijuegos</router-link>
  </div>
</template>

<script>
export default {
  name: "MisionConocimiento"
};
</script>
