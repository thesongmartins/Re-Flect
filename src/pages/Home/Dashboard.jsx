import { useState } from "react";
import {
  Search,
  FileEdit,
  PieChart,
  Settings,
  ChevronDown,
} from "lucide-react";

const ReflectApp = () => {
  const [activeSection, setActiveSection] = useState("Notes");
  const [searchQuery, setSearchQuery] = useState("");

  const menuItems = [
    { name: "Notes", icon: <FileEdit className="w-5 h-5" /> },
    { name: "Log Mood", icon: null },
    { name: "Analytics", icon: <PieChart className="w-5 h-5" /> },
    { name: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Sidebar */}
      <div className="w-64 border-r p-6 flex flex-col h-screen">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Re-flect</h1>
        </div>

        <nav className="flex-1">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveSection(item.name)}
              className={`w-full text-left mb-2 p-3 rounded-lg flex items-center ${
                activeSection === item.name ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        <button className="w-full text-left p-3 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 mt-auto">
          Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Search Bar */}
        <div className="p-6 border-b">
          <div className="max-w-2xl relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-4 pr-10 py-2 rounded-lg bg-gray-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
          <div className="absolute right-6 top-6 flex space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
              <FileEdit className="w-full h-full" />
            </div>
            <p className="text-gray-500 mb-4">Yo do not have any note.</p>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-600">
              <span>+</span>
              <span>Start New Note</span>
            </button>
          </div>
        </div>

        {/* Today's Prompt */}
        <div className="p-6 max-w-md ml-auto bg-gray-50 rounded-lg m-6">
          <h2 className="font-semibold mb-3">Today&apos;s Prompt</h2>
          <p className="text-gray-600 mb-4">
            What are three things that happened today (big or small) that made
            you smile, feel appreciated, or brought joy to your day?
          </p>
          <p className="text-gray-600">
            Take a moment to reflect and write them down! 😊
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReflectApp;
