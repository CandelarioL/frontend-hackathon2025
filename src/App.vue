<!-- Cambio menor para forzar rebuild -->
<template>
  <div>
    <NavBarGlobal v-if="isAuthenticated" />
    <router-view />
  </div>
</template>

<script>
import NavBarGlobal from "./components/NavBarGlobal.vue";

export default {
  name: "App",
  components: { NavBarGlobal },
  data() {
    return {
      isAuthenticated: false,
    };
  },
  mounted() {
    this.isAuthenticated = !!localStorage.getItem("token");
    window.addEventListener("storage", this.syncAuth);
  },
  beforeUnmount() {
    window.removeEventListener("storage", this.syncAuth);
  },
  methods: {
    syncAuth() {
      this.isAuthenticated = !!localStorage.getItem("token");
    }
  },
  watch: {
    // Si la ruta cambia, actualiza el estado de autenticación
    $route() {
      this.isAuthenticated = !!localStorage.getItem("token");
    }
  }
};
</script>

<style>
body {
  @apply bg-gray-100;
}
</style>
