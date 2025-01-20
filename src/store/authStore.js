import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  tokens: null,
  setAuthData: (user, tokens) =>
    set({ user, tokens }),
  clearAuthData: () =>
    set({ user: null, tokens: null }),
}));

export default useAuthStore;
