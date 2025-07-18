import { create } from "zustand";

// Utility functions for localStorage
const persistData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getPersistedData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const useAuthStore = create((set) => ({
  user: getPersistedData("authUser"),
  tokens: getPersistedData("authTokens"),

  // Set user and tokens
  setAuthData: (user, tokens) => {
    persistData("authUser", user);
    persistData("authTokens", tokens);
    set({ user, tokens });
  },

  // Clear user and tokens
  clearAuthData: () => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("authTokens");
    set({ user: null, tokens: null });
  },

  // Utility methods (optional)
  getAccessToken: () => getPersistedData("authTokens")?.access || null,
  getRefreshToken: () => getPersistedData("authTokens")?.refresh || null,
}));


export default useAuthStore;
