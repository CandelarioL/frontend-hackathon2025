<template>
  <div>
    <div class="flex items-center gap-4">
      <img v-if="mascota" :src="mascota.img" :alt="mascota.nombre" class="w-12 h-12" />
      <h3 class="text-xl font-bold">Quiz Rápido</h3>
    </div>
    <p class="text-sm text-gray-600">Contesta la pregunta. Mascota: {{ mascota?.nombre }}</p>
    <div class="mt-4">
      <div class="font-semibold">¿Cuál es la capital de Chile?</div>
      <div class="mt-2 flex gap-2">
        <button @click="responder('Santiago')" class="bg-blue-500 text-white px-3 py-2 rounded">Santiago</button>
        <button @click="responder('Lima')" class="bg-gray-200 px-3 py-2 rounded">Lima</button>
        <button @click="responder('Buenos Aires')" class="bg-gray-200 px-3 py-2 rounded">Buenos Aires</button>
      </div>
      <div v-if="msg" class="mt-3 font-semibold">{{ msg }}</div>
    </div>
  </div>
</template>

<script>
export default{
  props:['mascota'],
  data(){return {msg:null};},
  methods:{responder(v){ this.msg = v==='Santiago'?'¡Correcto!':'Incorrecto'; }}
}
</script>
