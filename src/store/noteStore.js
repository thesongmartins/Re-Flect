import {create} from 'zustand';

const useNoteStore = create((set) => ({
  notes: [],
  isLoading: false,
  error: null,
  setNotes: (newNotes) => set({ notes: newNotes }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  addNote: (newNote) => set((state) => ({ notes: [...state.notes, newNote] })),
  deleteNote: (noteId) => set((state) => ({ notes: state.notes.filter(note => note.id !== noteId) }))
}));

export default useNoteStore;
