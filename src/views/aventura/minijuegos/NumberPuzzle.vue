<template>
  <div>
    <div class="flex items-center gap-4">
      <img v-if="mascota" :src="mascota.img" :alt="mascota.nombre" class="w-12 h-12" />
      <h3 class="text-xl font-bold">Puzles de Números</h3>
    </div>
    <p class="text-sm text-gray-600">Resuelve la suma para avanzar. Mascota: {{ mascota?.nombre }}</p>
    <div class="mt-4">
      <div class="text-2xl font-bold">{{ a }} + {{ b }} = ?</div>
      <div class="mt-3 flex gap-3">
        <button v-for="opt in opciones" :key="opt" @click="probar(opt)" class="bg-blue-500 text-white px-4 py-2 rounded">{{ opt }}</button>
      </div>
      <div v-if="resultado!==null" class="mt-3 font-semibold">{{ resultado }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['mascota'],
  data() {
    const a = Math.floor(Math.random()*9)+1;
    const b = Math.floor(Math.random()*9)+1;
    const correcta = a+b;
    const opciones = [correcta, correcta+1, Math.max(1, correcta-1)].sort(()=>Math.random()-0.5);
    return { a,b,opciones,correcta,resultado:null };
  },
  methods: {
    probar(v) {
      if (v===this.correcta) this.resultado='¡Correcto!'; else this.resultado='Intenta otra vez';
    }
  }
}
</script>
