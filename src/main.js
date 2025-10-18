import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";

// 🔹 Vistas principales
import LoginView from "./views/LoginView.vue";
import RegisterView from "./views/RegisterView.vue";
import PerfilView from "./views/PerfilView.vue";
import MenuView from "./views/MenuView.vue";
import ForgotPasswordView from "./views/ForgotPasswordView.vue";
import ResetPasswordView from "./views/ResetPasswordView.vue";
import MiAulaView from "./views/MiAula.vue";

// 🔹 Vistas relacionadas con aulas
import AulasView from "./views/MisAulas.vue";
import CrearAulaView from "./views/CrearAulaView.vue";
import UnirseAulaView from "./views/UnirseAulaView.vue";

// 🔹 Nuevas vistas de actividades
import JuegoMatematicas from "./views/actividades/JuegoMatematicas.vue";
import JuegoLenguaje from "./views/actividades/JuegoLenguaje.vue";
import JuegoSuma from "./views/actividades/JuegoSuma.vue";
import JuegoResta from "./views/actividades/JuegoResta.vue";
import JuegoMultiplicacion from "./views/actividades/JuegoMultiplicacion.vue";
import JuegoDivision from "./views/actividades/JuegoDivision.vue";
import ValorPosicional from "./views/actividades/ValorPosicional.vue";
import ProblemasMatematicos from "./views/actividades/Problemas.vue";
// Importar nuevos componentes de lenguaje
import LecturaComprensiva from "./views/actividades/LecturaComprensiva.vue";
import Ortografia from "./views/actividades/Ortografia.vue";
import Vocabulario from "./views/actividades/Vocabulario.vue";
import FormarOraciones from "./views/actividades/FormarOraciones.vue";
import Acentuacion from "./views/actividades/Acentuacion.vue";
import HistoriasInteractivas from "./views/actividades/HistoriasInteractivas.vue";

import SeleccionPersonaje from "./views/aventura/SeleccionPersonaje.vue";
import MisionConocimiento from "./views/aventura/MisionConocimiento.vue";

import TiendaView from "./views/aventura/TiendaView.vue";

import RankingView from "./views/aventura/RankingView.vue";





// =====================================
// 🔹 Definición de rutas
// =====================================
const routes = [
  { path: "/", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/menu", component: MenuView },
  { path: "/perfil", component: PerfilView },
  { path: "/forgot", component: ForgotPasswordView },
  { path: "/reset/:token", component: ResetPasswordView },
  { path: "/aulas", component: AulasView },
  { path: "/crear-aula", component: CrearAulaView },
  { path: "/unirse", component: UnirseAulaView },
  { path: "/mi-aula", component: MiAulaView },

  // 🧮 Juegos y actividades
  { path: "/matematicas", component: JuegoMatematicas },
  { path: "/juego-lenguaje", component: JuegoLenguaje },
  { path: "/juego-suma", component: JuegoSuma },
  { path: "/juego-resta", component: JuegoResta },
  { path: "/juego-multiplicacion", component: JuegoMultiplicacion },
  { path: "/juego-division", component: JuegoDivision },
  { path: "/valor-posicional", component: ValorPosicional },
  { path: "/problemas", component: ProblemasMatematicos },
  // Rutas de actividades de lenguaje
  { path: "/lectura-comprensiva", component: LecturaComprensiva },
  { path: "/ortografia", component: Ortografia },
  { path: "/vocabulario", component: Vocabulario },
  { path: "/formar-oraciones", component: FormarOraciones },
  { path: "/acentuacion", component: Acentuacion },
  { path: "/historias-interactivas", component: HistoriasInteractivas },

  // 🏰 Aventura educativa
  { path: "/aventura/personaje", component: SeleccionPersonaje },
  { path: "/aventura/mision", component: MisionConocimiento },

  // 🛒 Tienda
  { path: "/tienda", component: TiendaView },

  // 🏆 Ranking
  { path: "/ranking", component: RankingView },



];






// =====================================
// 🔒 Middleware de autenticación
// =====================================
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const rutasPublicas = ["/", "/register", "/forgot"];
  const esRutaReset = to.path.startsWith("/reset/");

  if (!token && !rutasPublicas.includes(to.path) && !esRutaReset) {
    next("/");
  } else if (token && rutasPublicas.includes(to.path)) {
    next("/menu");
  } else {
    next();
  }
});

// =====================================
// 🚀 Iniciar la aplicación
// =====================================
createApp(App).use(router).mount("#app");
