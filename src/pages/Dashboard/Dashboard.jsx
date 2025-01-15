import { useState, useEffect } from "react";
import Logout from "../../components/LogOut";
import { useNavigate } from "react-router-dom";
import Setting from "../../components/Dashboard/Setting";
import Analytics from "../../components/Dashboard/Analytics";
import {
  Search,
  FileEdit,
  PieChart,
  Settings,
  LogOut,
  Moon,
  Sticker,
  Sun,
  Trash,
  X,
  Menu,
} from "lucide-react";
import Notes from "../../components/Dashboard/Notes";

const ReflectApp = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("Notes");
  const [searchQuery, setSearchQuery] = useState("");

  const [moodLog, setMoodLog] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isloggedOut, setIsloggedOut] = useState(false);

  useEffect(() => {
    const savedMoodLog = localStorage.getItem("moodLog");
    const savedTheme = localStorage.getItem("theme");

    if (savedMoodLog) setMoodLog(JSON.parse(savedMoodLog));
    if (savedTheme === "dark") setIsDarkMode(true);
  }, []);

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

  const handleSignOut = () => {
    localStorage.clear();
    // setNotes([]);
    setMoodLog([]);
    setSearchQuery("");
    setActiveSection("Notes");
    navigate("/login");
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {isloggedOut && (
        <Logout handleSignOut={handleSignOut} setIsLoggedOut={setIsloggedOut} />
      )}
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold">Re-flect</h1>
        <button onClick={toggleSidebar} className="p-2">
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div
          className={`
          fixed lg:static inset-0 z-20 
          w-64 lg:w-64 
          transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 
          transition-transform duration-200 ease-in-out
          border-r p-6 flex flex-col h-screen
          ${
            isDarkMode
              ? "border-gray-700 bg-gray-800"
              : "border-gray-200 bg-white"
          }
        `}
        >
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold hidden lg:block">Re-flect</h1>
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

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActiveSection(item.name);
                  setIsSidebarOpen(false);
                }}
                className={`w-full text-left p-3 rounded-lg flex items-center ${
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
            onClick={() => setIsloggedOut(true)}
            className="w-full text-left p-3 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 mt-auto"
          >
            <span className="flex items-center">
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-16 max-h-screen overflow-y-scroll">
          {/* Search Bar */}
          <div
            className={`p-4 mt-3 lg:p-6 border-b ${
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
            <div>
              <Notes />
            </div>
          )}

          {activeSection === "Log Mood" && (
            <div className="flex-1 p-4 lg:p-6">
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
            </div>
          )}

          {activeSection === "Analytics" && (
            <div className="flex-1 p-4 lg:p-6">
              <div className="">
                <Analytics />
              </div>
            </div>
          )}
          {activeSection === "Settings" && (
            <div>
              <Setting />
            </div>
          )}

          <div
            className={`p-4 lg:p-6 mx-4 lg:mx-6 mb-6 rounded-lg ${
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
