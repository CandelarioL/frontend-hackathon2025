const KEY = 'selectedPet';

export default {
  get() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },
  set(pet) {
    try {
      if (!pet) return localStorage.removeItem(KEY);
      localStorage.setItem(KEY, JSON.stringify(pet));
    } catch (e) {
      // ignore
    }
  },
};
