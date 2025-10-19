<template>
  <div>
    <div class="flex items-center gap-4">
      <img v-if="mascota" :src="mascota.img" :alt="mascota.nombre" class="w-12 h-12" />
      <h3 class="text-xl font-bold">Unir Puntos</h3>
    </div>
    <p class="text-sm text-gray-600">Sigue la secuencia numérica. Mascota: {{ mascota?.nombre }}</p>
    <div class="mt-4 grid grid-cols-4 gap-2">
      <button v-for="n in numeros" :key="n" @click="click(n)" :class="['p-4 rounded border', clicked.includes(n)?'bg-green-200':'bg-white']">{{ n }}</button>
    </div>
    <div v-if="completo" class="mt-3 font-semibold text-indigo-700">¡Secuencia correcta!</div>
  </div>
</template>

<script>
export default {
  props: ['mascota'],
  data(){
    const numeros = [1,2,3,4,5,6,7,8].sort(()=>Math.random()-0.5);
    return { numeros, clicked: [], completo:false };
  },
  methods:{
    click(n){
      this.clicked.push(n);
      const seq = this.clicked.join(',');
      const ordered = [1,2,3,4,5,6,7,8].slice(0,this.clicked.length).join(',');
      if(seq===ordered && this.clicked.length===8) this.completo=true;
      if(seq!==ordered) this.clicked=[];
    }
  }
}
</script>
