<template>
  <div class="flex items-center gap-2">
    <img v-if="mascota" :src="mascota.img" :alt="mascota.nombre" class="w-10 h-10 rounded-full" />
    <div v-if="mascota" class="text-sm font-semibold">{{ mascota.nombre }}</div>
    <div v-else class="text-sm text-gray-500">Sin mascota</div>
  </div>
</template>

<script>
export default {
  name: 'PetBadge',
  props: { mascota: { type: Object, default: null } },
};
</script>
