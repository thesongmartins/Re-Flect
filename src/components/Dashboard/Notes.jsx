import { useState, useEffect } from "react";
import { FileEdit, Trash, Loader, Save, Plus } from "lucide-react";
import { Editor } from "primereact/editor";

const API_URL = "https://api.example.com/notes"; // Replace with your actual API URL

const fetchNotes = async (setNotes, setIsLoading, setError) => {
  try {
    setIsLoading(true);
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch notes");
    const data = await response.json();
    setNotes(data);
  } catch (err) {
    console.error(err);
    setError("Failed to load notes. Please try again later.");
  } finally {
    setIsLoading(false);
  }
};

function Notes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState([]);
  const [moodLog, setMoodLog] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [newNote, setNewNote] = useState({ title: "", content: "", mood: "" });
  const [isNewNoteOpen, setIsNewNoteOpen] = useState(false);
  const [text, setText] = useState("");

  const handleDeleteMood = (moodId) => {
    setMoodLog((prev) => prev.filter((mood) => mood.id !== moodId));
  };

  const handleCreateNote = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newNote,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Failed to create note");
      const createdNote = await response.json();
      setNotes((prev) => [...prev, createdNote]);
      setIsNewNoteOpen(false);
    } catch (err) {
      console.error(err);
      setError("Failed to create note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const moodOptions = [
    { type: "happy", emoji: "😊" },
    { type: "sad", emoji: "😢" },
    { type: "neutral", emoji: "😐" },
    { type: "excited", emoji: "🎉" },
    { type: "tired", emoji: "😴" },
  ];

  const handleLogMood = (type) => {
    const newMood = {
      id: Date.now().toString(),
      type,
      timestamp: new Date().toISOString(),
    };
    setMoodLog((prev) => [...prev, newMood]);
  };
  const handleDeleteNote = async (noteId) => {
    try {
      setIsLoading(true);
      await fetch(`${API_URL}/${noteId}`, {
        method: "DELETE",
      });
      setNotes((prev) => prev.filter((note) => note.id !== noteId));
    } catch (err) {
      console.error(err);
      setError("Failed to delete note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes(setNotes, setIsLoading, setError);
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
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Recent Mood History</h3>
          <div className="space-y-2">
            {moodLog
              .slice(-5)
              .reverse()
              .map((mood) => (
                <div
                  key={mood.id}
                  className={`p-3 rounded-lg flex justify-between items-center group ${
                    isDarkMode ? "bg-gray-800" : "bg-gray-50"
                  }`}
                >
                  <span>
                    {moodOptions.find((m) => m.type === mood.type)?.emoji}
                  </span>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs sm:text-sm text-gray-500">
                      {new Date(mood.timestamp).toLocaleString()}
                    </span>
                    <button
                      onClick={() => handleDeleteMood(mood.id)}
                      className="text-red-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {isNewNoteOpen ? (
          <div
            className={`p-4 lg:p-6 rounded-lg ${
              isDarkMode ? "bg-transparent" : "bg-transparent"
            } shadow`}
          >
            <input
              type="text"
              placeholder="Note Title"
              className={`w-full mb-4 p-2 rounded ${
                isDarkMode ? "bg-gray-700" : "bg-transparent"
              }`}
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
            <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
              You do not have any notes.
            </p>
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
              <div
                key={note.id}
                className={`p-4 rounded-lg ${
                  isDarkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-gray-50"
                } shadow relative group`}
              >
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="absolute top-2 right-2 p-2 text-red-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
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
