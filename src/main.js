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

// 🔹 Nuevas vistas de actividades (matemáticas y lenguaje)
import JuegoMatematicas from "./views/actividades/JuegoMatematicas.vue";
import JuegoLenguaje from "./views/actividades/JuegoLenguaje.vue";
import JuegoSuma from "./views/actividades/JuegoSuma.vue";
import JuegoResta from "./views/actividades/JuegoResta.vue";
import JuegoMultiplicacion from "./views/actividades/JuegoMultiplicacion.vue";
import JuegoDivision from "./views/actividades/JuegoDivision.vue";
import ValorPosicional from "./views/actividades/ValorPosicional.vue";
import ProblemasMatematicos from "./views/actividades/Problemas.vue";

// 🔹 Actividades de lenguaje
import LecturaComprensiva from "./views/actividades/LecturaComprensiva.vue";
import Ortografia from "./views/actividades/Ortografia.vue";
import Vocabulario from "./views/actividades/Vocabulario.vue";
import FormarOraciones from "./views/actividades/FormarOraciones.vue";
import Acentuacion from "./views/actividades/Acentuacion.vue";
import HistoriasInteractivas from "./views/actividades/HistoriasInteractivas.vue";

// 🔹 Aventura educativa
import SeleccionPersonaje from "./views/aventura/SeleccionPersonaje.vue";
import MisionConocimiento from "./views/aventura/MisionConocimiento.vue";
import TiendaView from "./views/aventura/TiendaView.vue";
import RankingView from "./views/aventura/RankingView.vue";

// 🔹 Paneles de aula
import PanelAulaView from "./views/PanelAulaView.vue";
import MiAulaAlumnoView from "./views/MiAulaAlumnoView.vue";

// =====================================
// 🔹 Definición de rutas
// =====================================
const routes = [
  // Autenticación y menú
  { path: "/", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/menu", component: MenuView },
  { path: "/perfil", component: PerfilView },
  { path: "/forgot", component: ForgotPasswordView },
  { path: "/reset/:token", component: ResetPasswordView },

  // Aulas
  { path: "/aulas", component: AulasView },
  { path: "/crear-aula", component: CrearAulaView },
  { path: "/unirse", component: UnirseAulaView },
  { path: "/mi-aula", component: MiAulaView },
  { path: "/aulas/:id/panel", component: PanelAulaView },
  { path: "/mi-aula-alumno", component: MiAulaAlumnoView },

  // 🧮 Juegos de matemáticas
  { path: "/matematicas", component: JuegoMatematicas },
  { path: "/juego-lenguaje", component: JuegoLenguaje },
  { path: "/juego-suma", component: JuegoSuma },
  { path: "/juego-resta", component: JuegoResta },
  { path: "/juego-multiplicacion", component: JuegoMultiplicacion },
  { path: "/juego-division", component: JuegoDivision },
  { path: "/valor-posicional", component: ValorPosicional },
  { path: "/problemas", component: ProblemasMatematicos },

  // 🎮 Minijuegos
  { path: "/juego-pares", component: () => import("./views/actividades/JuegoPares.vue") },
  { path: "/juego-rompecabezas", component: () => import("./views/actividades/JuegoRompecabezas.vue") },
  { path: "/juego-colores", component: () => import("./views/actividades/JuegoColores.vue") },
  { path: "/juego-palabra", component: () => import("./views/actividades/JuegoPalabra.vue") },
  { path: "/juego-logica", component: () => import("./views/actividades/JuegoLogica.vue") },
  { path: "/juego-sonido", component: () => import("./views/actividades/JuegoSonido.vue") },

  // ✍️ Actividades de lenguaje
  { path: "/lectura-comprensiva", component: LecturaComprensiva },
  { path: "/ortografia", component: Ortografia },
  { path: "/vocabulario", component: Vocabulario },
  { path: "/formar-oraciones", component: FormarOraciones },
  { path: "/acentuacion", component: Acentuacion },
  { path: "/historias-interactivas", component: HistoriasInteractivas },

  // 🏰 Aventura educativa
  { path: "/aventura/personaje", component: SeleccionPersonaje },
  { path: "/aventura/mision", component: MisionConocimiento },
  { path: "/minijuegos", component: () => import("./views/aventura/minijuegos/MiniJuegos.vue") },

  // 🛒 Tienda y ranking
  { path: "/tienda", component: TiendaView },
  { path: "/ranking", component: RankingView },

  // 🧩 Nueva ruta dinámica para las actividades reales
  { path: "/actividad/:id", component: () => import("./views/ActividadView.vue") },
];

// =====================================
// 🔒 Middleware de autenticación (actualizado)
// =====================================
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  // ✅ Permitir libre acceso a TODOS los minijuegos
  const esMinijuego = to.path.startsWith("/juego-");

  const rutasPublicas = [
    "/", 
    "/register", 
    "/forgot"
  ];

  const esRutaReset = to.path.startsWith("/reset/");

  if (!token && !esMinijuego && !rutasPublicas.includes(to.path) && !esRutaReset) {
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
