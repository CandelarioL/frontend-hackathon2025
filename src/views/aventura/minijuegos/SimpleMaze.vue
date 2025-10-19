<template>
  <div>
    <div class="flex items-center gap-4">
      <img v-if="mascota" :src="mascota.img" :alt="mascota.nombre" class="w-12 h-12" />
      <h3 class="text-xl font-bold">Laberinto Simple</h3>
    </div>
    <p class="text-sm text-gray-600">Mueve la pelota hacia la salida con las flechas. Mascota: {{ mascota?.nombre }}</p>
    <div class="mt-4">
      <div class="w-64 h-40 bg-gray-100 border rounded relative">
        <div :style="{ left: pos.x+'px', top: pos.y+'px' }" class="w-6 h-6 bg-blue-500 rounded-full absolute"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  props:['mascota'],
  data(){
    return { pos:{x:0,y:0} };
  },
  mounted(){ window.addEventListener('keydown', this.k); },
  unmounted(){ window.removeEventListener('keydown', this.k); },
  methods:{
    k(e){
      if(e.key==='ArrowRight') this.pos.x=Math.min(160,this.pos.x+10);
      if(e.key==='ArrowLeft') this.pos.x=Math.max(0,this.pos.x-10);
      if(e.key==='ArrowUp') this.pos.y=Math.max(0,this.pos.y-10);
      if(e.key==='ArrowDown') this.pos.y=Math.min(120,this.pos.y+10);
    }
  }
}
</script>
