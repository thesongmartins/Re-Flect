import { useState, useEffect } from "react";
import { FileEdit, Trash, Loader, Save, Plus } from "lucide-react";
import { Editor } from "primereact/editor";
import axios from "axios";
import useAuthStore from "../../store/authStore"; // Assuming auth store is already set up
import useNoteStore from "../../store/noteStore"; // Import the note store
import useThemeStore from "../../store/themeStore";
import EmojiPicker from "emoji-picker-react";

const API_URL = "https://re-flect.onrender.com/api/journal/entries/";

function Notes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [moodLog, setMoodLog] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "", mood: "" });
  const [isNewNoteOpen, setIsNewNoteOpen] = useState(false);
  const [text, setText] = useState("");
  const { isDarkMode } = useThemeStore();

  const {
    notes,
    isLoading,
    error,
    setNotes,
    setLoading,
    setError,
    addNote,
    deleteNote,
  } = useNoteStore(); // Destructure notes state
  const { token } = useAuthStore(); // Assuming the token is stored in authStore

  const moodOptions = [
    { type: "happy", emoji: "😊" },
    { type: "sad", emoji: "😢" },
    { type: "neutral", emoji: "😐" },
    { type: "excited", emoji: "🎉" },
    { type: "tired", emoji: "😴" },
  ];

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load notes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        API_URL,
        {
          ...newNote,
          timestamp: new Date().toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      addNote(response.data); // Add the newly created note to the store
      setIsNewNoteOpen(false);
    } catch (err) {
      console.error(err);
      setError("Failed to create note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      deleteNote(noteId);
    } catch (err) {
      console.error(err);
      setError("Failed to delete note. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleLogMood = (type) => {
    const newMood = {
      id: Date.now().toString(),
      type,
      timestamp: new Date().toISOString(),
    };
    setMoodLog((prev) => [...prev, newMood]);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <div className="flex-1 p-4 lg:p-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold mb-6">
            How are you feeling today?
          </h2>
          <div className="flex flex-wrap gap-4">
            {moodOptions.map((mood) => (
              <button
                key={mood.type}
                onClick={() => handleLogMood(mood.type)}
                className={`p-4 rounded-lg text-2xl hover:scale-110 ${
                  isDarkMode
                    ? "bg-white hover:bg-gray-700"
                    : "bg-gray-800 hover:bg-gray-700"
                } shadow`}
              >
                {mood.emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Render Notes */}
        {isNewNoteOpen ? (
          <div className="p-4 lg:p-6 rounded-lg">
            <input
              type="text"
              placeholder="Note Title"
              className="w-full mb-4 p-2 rounded"
              value={newNote.title}
              onChange={(e) =>
                setNewNote((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <div className="card">
              <Editor
                value={text}
                onTextChange={(e) => setText(e.htmlValue)}
                style={{ height: "320px" }}
              />
              <div>
                <EmojiPicker />
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <button
                onClick={() => setIsNewNoteOpen(false)}
                className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNote}
                disabled={isLoading}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 flex items-center"
              >
                {isLoading ? (
                  <Loader className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Note
              </button>
            </div>
          </div>
        ) : notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <FileEdit className="w-24 h-24 text-gray-300 mb-4" />
            <p>You do not have any notes.</p>
            <button
              onClick={() => setIsNewNoteOpen(true)}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-blue-600"
            >
              <Plus className="w-5 h-5" />
              <span>Start New Note</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <div key={note.id} className="p-4 rounded-lg">
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="absolute top-2 right-2 p-2 text-red-500"
                >
                  <Trash className="w-4 h-4" />
                </button>
                <h3 className="font-semibold mb-2">{note.title}</h3>
                <p className="text-sm text-gray-500">
                  {note.content.substring(0, 100)}...
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notes;
