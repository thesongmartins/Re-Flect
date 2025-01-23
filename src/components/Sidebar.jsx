import {
  FileEdit,
  Sticker,
  PieChart,
  Settings,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import PropTypes from "prop-types";

const Sidebar = ({
  isSidebarOpen,
  isDarkMode,
  toggleSidebar,
  toggleDarkMode,
  activeSection,
  setActiveSection,
  handleSignOut,
}) => {
  const menuItems = [
    { name: "Notes", icon: <FileEdit className="w-5 h-5" /> },
    { name: "Log Mood", icon: <Sticker className="w-5 h-5" /> },
    { name: "Analytics", icon: <PieChart className="w-5 h-5" /> },
    { name: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
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
          onClick={toggleDarkMode}
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
              toggleSidebar(false);
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
        onClick={handleSignOut}
        className="w-full text-left p-3 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 mt-auto"
      >
        <span className="flex items-center">
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </span>
      </button>
    </div>
  );
};

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
  activeSection: PropTypes.string.isRequired,
  setActiveSection: PropTypes.func.isRequired,
  handleSignOut: PropTypes.func.isRequired,
};

export default Sidebar;
