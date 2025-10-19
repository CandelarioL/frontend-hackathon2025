<template>
  <div>
    <div class="flex items-center gap-4">
      <img v-if="mascota" :src="mascota.img" :alt="mascota.nombre" class="w-12 h-12" />
      <h3 class="text-xl font-bold">Sopa de Letras</h3>
    </div>
    <p class="text-sm text-gray-600">Encuentra la palabra: <strong>{{ palabra }}</strong>. Mascota: {{ mascota?.nombre }}</p>
    <div class="mt-4 grid grid-cols-8 gap-1 text-center text-sm">
      <div v-for="(c, i) in grid" :key="i" @click="pick(i)" :class="['p-2 border rounded', selected.includes(i)?'bg-yellow-200':'bg-white']">{{ c }}</div>
    </div>
    <div v-if="found" class="mt-3 font-semibold text-indigo-700">¡Encontraste la palabra!</div>
  </div>
</template>

<script>
function shuffle(a){return a.sort(()=>Math.random()-0.5)}
export default{
  props:['mascota'],
  data(){
    const palabra='GATO';
    const letters = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    const grid = [];
    for(let i=0;i<64;i++) grid.push(letters[Math.floor(Math.random()*letters.length)]);
    // place palabra horizontally at a random row
    const row = Math.floor(Math.random()*8);
    const colStart = Math.floor(Math.random()*(8-palabra.length+1));
    for(let j=0;j<palabra.length;j++) grid[row*8+colStart+j]=palabra[j];
    return {palabra,grid,selected:[],found:false};
  },
  methods:{
    pick(i){
      this.selected.push(i);
      // check if any selected indices form the exact positions
      const positions = [];
      for(let r=0;r<8;r++){
        for(let c=0;c<8;c++){
          // nothing
        }
      }
      const pattern = this.grid.join('');
      if(this.selected.length>=this.palabra.length){
        // naive check: if the letters of selected equal palabra
        const word = this.selected.map(i=>this.grid[i]).join('');
        if(word.includes(this.palabra)) this.found=true;
      }
    }
  }
}
</script>
