<template>
  <div>
    <div class="flex items-center gap-4">
      <img v-if="mascota" :src="mascota.img" :alt="mascota.nombre" class="w-12 h-12" />
      <h3 class="text-xl font-bold">Parejas</h3>
    </div>
    <p class="text-sm text-gray-600">Encuentra las parejas iguales. Mascota: {{ mascota?.nombre }}</p>
    <div class="mt-4 grid grid-cols-4 gap-2">
      <button v-for="(c, i) in cartas" :key="i" @click="flip(i)" class="p-6 border rounded bg-white">{{ revealed.includes(i)?c:'' }}</button>
    </div>
    <div v-if="paresEncontrados===(cartas.length/2)" class="mt-3 font-semibold text-indigo-700">¡Todas las parejas encontradas!</div>
  </div>
</template>

<script>
export default{
  props:['mascota'],
  data(){
    const items=['A','B','C','D','E','F','G','H'];
    const cartas = items.concat(items).sort(()=>Math.random()-0.5);
    return {cartas, revealed:[], first:null, paresEncontrados:0};
  },
  methods:{
    flip(i){
      if(this.revealed.includes(i)) return;
      this.revealed.push(i);
      if(this.first===null) this.first=i; else {
        if(this.cartas[this.first]===this.cartas[i]){
          this.paresEncontrados++;
        } else {
          setTimeout(()=>{
            this.revealed = this.revealed.filter(idx=>idx!==this.first && idx!==i);
          },700);
        }
        this.first=null;
      }
    }
  }
}
</script>
