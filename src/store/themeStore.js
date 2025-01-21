import { create } from "zustand";

// Define the store
const useThemeStore = create((set) => ({
  isDarkMode: false, // Default value
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setDarkMode: (value) => set({ isDarkMode: value }),
}));

export default useThemeStore;
