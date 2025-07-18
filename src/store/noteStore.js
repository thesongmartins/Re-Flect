import { create } from "zustand";

const useNoteStore = create((set) => ({
  notes: [],
  moodLog: [],
  newNote: { title: "", content: "", mood: "" },
  isLoading: false,
  error: null,
  selectedNote: null,

  // Set Notes
  setNotes: (newNotes) => set({ notes: newNotes }),

  // Set loading state
  setLoading: (isLoading) => set({ isLoading }),

  // Set error message
  setError: (error) => set({ error }),

  // Add a new note
  addNote: (newNote) => set((state) => ({ notes: [...state.notes, newNote] })),

  // Delete a note
  deleteNote: (noteId) =>
    set((state) => ({ notes: state.notes.filter((note) => note.id !== noteId) })),

  // Update a note
  updateNote: (updatedNote) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      ),
    })),

  // Log Mood (create moodLog)
  logMood: (newMood) => set((state) => ({ moodLog: [...state.moodLog, newMood] })),

  // Set selected note for editing
  setSelectedNote: (note) => set({ selectedNote: note }),

  // Reset newNote state
  resetNewNote: () => set({ newNote: { title: "", content: "", mood: "" } }),
  setNewNote: (newNote) => set({ newNote }),
}));

export default useNoteStore;
