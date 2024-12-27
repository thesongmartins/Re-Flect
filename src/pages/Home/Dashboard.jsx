import { useState, useEffect } from "react";
import {
  Search,
  FileEdit,
  PieChart,
  Settings,
  LogOut,
  Moon,
  Sticker,
  Sun,
  Plus,
  Trash,
  Loader,
  Save,
} from "lucide-react";

const ReflectApp = () => {
  const [activeSection, setActiveSection] = useState("Notes");
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState([]);
  const [moodLog, setMoodLog] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [newNote, setNewNote] = useState({ title: "", content: "", mood: "" });
  const [isNewNoteOpen, setIsNewNoteOpen] = useState(false);

  const API_URL = "https://api.example.com/notes"; // Replace with your API endpoint

  useEffect(() => {
    fetchNotes();
    const savedMoodLog = localStorage.getItem("moodLog");
    const savedTheme = localStorage.getItem("theme");

    if (savedMoodLog) setMoodLog(JSON.parse(savedMoodLog));
    if (savedTheme === "dark") setIsDarkMode(true);
  }, []);

  const fetchNotes = async () => {
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
      setError("Failed to create note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      setIsLoading(true);
      await fetch(`${API_URL}/${noteId}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err);
      setError("Failed to delete note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const menuItems = [
    { name: "Notes", icon: <FileEdit className="w-5 h-5" /> },
    { name: "Log Mood", icon: <Sticker className="w-5 h-5" /> },
    { name: "Analytics", icon: <PieChart className="w-5 h-5" /> },
    { name: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

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

  const handleDeleteMood = (moodId) => {
    setMoodLog((prev) => prev.filter((mood) => mood.id !== moodId));
  };

  // const handleDeleteNote = (noteId) => {
  //   setNotes((prev) => prev.filter((note) => note.id !== noteId));
  // };

  const handleSignOut = () => {
    localStorage.clear();
    setNotes([]);
    setMoodLog([]);
    setSearchQuery("");
    setActiveSection("Notes");
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex">
        <div
          className={`w-64 border-r p-6 flex flex-col h-screen ${
            isDarkMode
              ? "border-gray-700 bg-gray-800"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Re-flect</h1>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>

          <nav className="flex-1">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveSection(item.name)}
                className={`w-full text-left mb-2 p-3 rounded-lg flex items-center ${
                  activeSection === item.name
                    ? isDarkMode
                      ? "bg-blue-900"
                      : "bg-blue-50"
                    : isDarkMode
                    ? "hover:bg-gray-700"
                    : "hover:bg-gray-50"
                }`}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.name}
              </button>
            ))}
          </nav>

          <button
            onClick={handleSignOut}
            className="w-full text-left p-3 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 mt-auto"
          >
            <span className="flex items-center">
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </span>
          </button>
        </div>

        <div className="flex-1 flex flex-col">
          <div
            className={`p-6 border-b ${
              isDarkMode
                ? "border-gray-700 bg-gray-800"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="max-w-2xl relative">
              <input
                type="text"
                placeholder="Search"
                className={`w-full pl-4 pr-10 py-2 rounded-lg ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-50"
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {activeSection === "Notes" && (
            <div className="flex-1 p-6">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              {isNewNoteOpen ? (
                <div
                  className={`p-6 rounded-lg ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  } shadow`}
                >
                  <input
                    type="text"
                    placeholder="Note Title"
                    className={`w-full mb-4 p-2 rounded ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                    value={newNote.title}
                    onChange={(e) =>
                      setNewNote((prev) => ({ ...prev, title: e.target.value }))
                    }
                  />
                  <textarea
                    placeholder="Note Content"
                    className={`w-full mb-4 p-2 h-32 rounded ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                    value={newNote.content}
                    onChange={(e) =>
                      setNewNote((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                  />
                  <div className="flex justify-end space-x-2">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                        className="absolute top-2 right-2 p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                      <h3 className="font-semibold mb-2">{note.title}</h3>
                      <p className="text-sm text-gray-500">
                        {note.content.substring(0, 100)}...
                      </p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-xs text-gray-400">
                          {new Date(note.timestamp).toLocaleDateString()}
                        </span>
                        {note.mood && (
                          <span className="text-lg">
                            {
                              moodOptions.find((m) => m.type === note.mood)
                                ?.emoji
                            }
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSection === "Log Mood" && (
            <div className="flex-1 p-6">
              <h2 className="text-xl font-semibold mb-6">
                How are you feeling today?
              </h2>
              <div className="flex space-x-4">
                {moodOptions.map((mood) => (
                  <button
                    key={mood.type}
                    onClick={() => handleLogMood(mood.type)}
                    className={`p-4 rounded-lg text-2xl hover:scale-110 ${
                      isDarkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-white hover:bg-gray-50"
                    } shadow`}
                  >
                    {mood.emoji}
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">
                  Recent Mood History
                </h3>
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
                          <span className="text-sm text-gray-500">
                            {new Date(mood.timestamp).toLocaleString()}
                          </span>
                          <button
                            onClick={() => handleDeleteMood(mood.id)}
                            className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          <div
            className={`p-6 max-w-md ml-auto rounded-lg m-6 ${
              isDarkMode ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
            <h2 className="font-semibold mb-3">Today&apos;s Prompt</h2>
            <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
              What are three things that happened today that made you smile?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReflectApp;
