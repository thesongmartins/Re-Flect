import { create } from "zustand";

const useLoadingStore = create((set) => ({
  loading: false, // Initial loading state
  start: () => set({ loading: true }), // Method to set loading to true
  stop: () => set({ loading: false }), // Method to set loading to false
}));

export default useLoadingStore;
