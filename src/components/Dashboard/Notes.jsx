import { useState, useEffect } from "react";
import { FileEdit, Trash, Loader, Save, Plus, X, Edit } from "lucide-react";
import { Editor } from "primereact/editor";
import axios from "axios";
import useAuthStore from "../../store/authStore";
import useNoteStore from "../../store/noteStore";
import useThemeStore from "../../store/themeStore";
import EmojiPicker from "emoji-picker-react";

const API_URL = "https://re-flect.onrender.com/api/journal/entries/";

function Notes() {
  const [showEmoji, setShowEmoji] = useState(false);
  const [moodLog, setMoodLog] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "", mood: "" });
  const [isNewNoteOpen, setIsNewNoteOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
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
    updateNote, // New method to update notes
  } = useNoteStore();
  
  const { getAccessToken } = useAuthStore();

  const moodOptions = [
    { type: "happy", emoji: "😊" },
    { type: "sad", emoji: "😢" },
    { type: "neutral", emoji: "😐" },
    { type: "excited", emoji: "🎉" },
    { type: "tired", emoji: "😴" },
  ];

  const extractFirstEmoji = (content) => {
    const emojiRegex = /[\p{Emoji}]/u;
    const match = content.match(emojiRegex);
    return match ? match[0] : null;
  };

  const getAuthorizedAxios = () => {
    const token = getAccessToken();
    return axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const authorizedAxios = getAuthorizedAxios();
      const response = await authorizedAxios.get(API_URL);
      setNotes(response.data);
    } catch (err) {
      console.error("Error during fetchNotes:", err);
      setError("Failed to load notes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async () => {
    try {
      setLoading(true);
      const token = getAccessToken();
      
      const requestBody = {
        title: newNote.title,
        content: text,
      };

      const authorizedAxios = axios.create({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await authorizedAxios.post(API_URL, requestBody);
      addNote(response.data);
      setIsNewNoteOpen(false);
      setText("");
      setNewNote({ title: "", content: "", mood: "" });
    } catch (err) {
      console.error(err);
      setError("Failed to create note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

 // In the handleEditNote function
 const handleEditNote = async () => {
  try {
    setLoading(true);
    const token = getAccessToken();
    
    // Ensure the selected note has an ID
    if (!selectedNote?.id) {
      throw new Error('No note selected for editing');
    }

    const requestBody = {
      title: newNote.title, // The updated title from the input
      content: text,        // The updated content from the editor
    };

    const authorizedAxios = axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Use the correct endpoint for updating the note
    const response = await authorizedAxios.put(
      `${API_URL}${selectedNote.id}/`, // The correct API URL with the note ID
      requestBody
    );

    // Update the note in the store with the response data
    updateNote(response.data);

    // Reset the form and close the editor
    setSelectedNote(null);
    setIsNewNoteOpen(false);
    setText("");
    setNewNote({ title: "", content: "", mood: "" });
  } catch (err) {
    console.error(err);
    setError("Failed to update note. Please try again.");
  } finally {
    setLoading(false);
  }
};


// When selecting a note to edit (in the note card's edit button click handler)
<button
  onClick={(e) => {
    e.stopPropagation();
    const noteToEdit = useNoteStore.getState().getNote(note.id);
    setSelectedNote(noteToEdit);
    setNewNote({
      title: noteToEdit.title,
      content: noteToEdit.content,
    });
    setText(noteToEdit.content);
    setIsNewNoteOpen(true);
  }}
  className="absolute top-2 right-8 p-2 text-blue-500 hover:text-blue-700"
>
  <Edit className="w-4 h-4" />
</button>
  const handleDeleteNote = async (e, noteId) => {
    e.stopPropagation(); // Prevent note selection when deleting
    try {
      setLoading(true);
      const authorizedAxios = getAuthorizedAxios();
      // Make the DELETE request to the API
      await authorizedAxios.delete(`${API_URL}${noteId}/`);
      // Remove the note from the local store
      deleteNote(noteId);
      // If the deleted note was the selected note, reset the selected note state
      if (selectedNote?.id === noteId) {
        setSelectedNote(null);
      }
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
    <div className="relative min-h-screen">
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

        {isNewNoteOpen ? (
          <div className="p-4 lg:p-6 rounded-lg">
            <input
              type="text"
              placeholder="Note Title"
              className="w-full border mb-4 p-2 rounded bg-transparent border-gray-500"
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
            {showEmoji && (
              <div>
                <EmojiPicker />
              </div>
            )}
            <div
              onClick={() => setShowEmoji(!showEmoji)}
              className="fixed cursor-pointer bottom-24 right-24 bg-white rounded-full p-4 text-xl shadow-lg"
            >
              😊
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <button
                onClick={() => setIsNewNoteOpen(false)}
                className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={selectedNote ? handleEditNote : handleCreateNote}
                disabled={isLoading}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 flex items-center"
              >
                {isLoading ? (
                  <Loader className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {selectedNote ? "Save Changes" : "Save Note"}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
            {notes.length === 0 ? (
              <div className="flex flex-col items-center justify-center col-span-full">
                <FileEdit className="w-24 h-24 text-gray-300 mb-4" />
                <p>You do not have any notes.</p>
              </div>
            ) : (
              notes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => setSelectedNote(note)}
                  className="mt-8 p-4 rounded-lg shadow-md relative bg-transparent cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <button
                    onClick={(e) => handleDeleteNote(e, note.id)}
                    className="absolute top-2 right-2 p-2 text-red-500 hover:text-red-700"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{note.title}</h3>
                    {extractFirstEmoji(note.content) && (
                      <span className="text-xl">
                        {extractFirstEmoji(note.content)}
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedNote(note);
                        setNewNote({
                          title: note.title,
                          content: note.content,
                        });
                        setText(note.content);
                        setIsNewNoteOpen(true);
                      }}
                      className="absolute top-2 right-8 p-2 text-blue-500 hover:text-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
     

      {selectedNote && (
  <div className={` fixed md:relative inset-0 flex items-start justify-center rounded-3xl p-4 top-0 left-0 mr-2 ${
    isDarkMode
      ? "bg-gray-800 md:bg-transparent"
      : "bg-gray-50 md:bg-transparent"
  } shadow`}>
    <div className="rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">{selectedNote.title}</h2>
        <button
          onClick={() => setSelectedNote(null)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <div 
        className="p-4 prose max-w-none"
        dangerouslySetInnerHTML={{ __html: selectedNote.content }}
      />
    </div>
  </div>
)}


      {/* FAB */}
      {!isNewNoteOpen && (
        <button
          onClick={() => setIsNewNoteOpen(true)}
          className={"fixed bottom-8 right-8 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 flex items-center justify-center transition-transform hover:scale-110"}
          aria-label="Add new note"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

export default Notes;
