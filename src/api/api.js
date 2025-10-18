import axios from "axios";

// ✅ Usa la variable del entorno definida en .env
const API_BASE = import.meta.env.VITE_API_URL;

export const api = {
  // =====================================
  // 🔹 AUTENTICACIÓN Y USUARIOS
  // =====================================
  async register(data) {
    return axios.post(`${API_BASE}/auth/register`, data);
  },

  async login(data) {
    return axios.post(`${API_BASE}/auth/login`, data);
  },

  async perfil(token) {
    return axios.get(`${API_BASE}/auth/perfil`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // =====================================
  // 🔹 RECUPERAR CONTRASEÑA
  // =====================================
  async solicitarReset(email) {
    return axios.post(`${API_BASE}/auth/solicitar-reset`, { email });
  },

  async cambiarPassword(data) {
    return axios.post(`${API_BASE}/auth/cambiar-password`, data);
  },

  // =====================================
  // 🔹 GESTIÓN DE AULAS
  // =====================================

  // 🧑‍🏫 Crear aula (solo maestro)
  async crearAula(data, token) {
    return axios.post(`${API_BASE}/aulas/crear`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // 📋 Listar aulas (maestro o alumno)
  async misAulas(token) {
    return axios.get(`${API_BASE}/aulas`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // 🎓 Unirse a un aula (solo alumno)
  async unirseAula(codigo, token) {
    return axios.post(
      `${API_BASE}/aulas/unirse`,
      { codigo },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  },

  // 👥 Listar alumnos de un aula (solo maestro)
  async alumnosPorAula(idAula, token) {
    return axios.get(`${API_BASE}/aulas/${idAula}/alumnos`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
