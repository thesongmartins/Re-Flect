import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  // Upload,
  User,
  Bell,
  HelpCircle,
  Mail,
  Phone,
  MessageSquare,
  Shield,
} from "lucide-react";

const Setting = () => {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setIsDarkMode(newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       // handle the uploaded file
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  // Profile state
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    avatar: null,
    privacy: "public",
  });

  // Appearance state
  const [fontSize, setFontSize] = useState("default");
  const [fontStyle, setFontStyle] = useState("Philosopher");
  const [theme, setTheme] = useState("default");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Notification state
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    comments: true,
  });

  // Active section state
  const [activeSection, setActiveSection] = useState("main");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedProfile = localStorage.getItem("profile");
    const savedNotifications = localStorage.getItem("notifications");

    if (savedTheme) {
      setTheme(savedTheme);
      setIsDarkMode(savedTheme === "dark");
    }
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);
  
    try {
      // Validate required fields
      if (!profile.name || !profile.email) {
        throw new Error("Name and email are required");
      }
  
      // Validate email format
      if (!/\S+@\S+\.\S+/.test(profile.email)) {
        throw new Error("Please enter a valid email address");
      }
  
      // Save to localStorage
      localStorage.setItem("profile", JSON.stringify(profile));
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setTimeout(() => {
        setActiveSection("main");
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationUpdate = () => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
    setActiveSection("main");
  };

  const sections = {
    main: (
      <div className="space-y-6">
        {[
          { title: "Edit Profile", icon: User, section: "profile" },
          { title: "Appearance", icon: ChevronRight, section: "appearance" },
          { title: "Notification", icon: Bell, section: "notification" },
          { title: "Help & Support", icon: HelpCircle, section: "help" },
        ].map(({ title, icon: Icon, section }) => (
          <button
            key={title}
            onClick={() => setActiveSection(section)}
            className={`w-full flex items-center justify-between p-4 rounded-lg shadow transition-colors ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
              {title}
            </span>
            <Icon
              className={`w-5 h-5 ${
                isDarkMode ? "text-gray-500" : "text-gray-400"
              }`}
            />
          </button>
        ))}
      </div>
    ),

    profile: (
      <form onSubmit={handleProfileUpdate} className="space-y-6 text-white">
        {/* Avatar Upload */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
            {profile.avatar ? (
              <img 
                src={profile.avatar} 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Upload Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setProfile({ ...profile, avatar: reader.result });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
        </div>
    
        {/* Form Fields */}
        <div>
          <label className="block text-white mb-2">Full Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            placeholder="Enter your full name"
          />
        </div>
    
        <div>
          <label className="block text-white mb-2">Email Address</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            placeholder="Enter your email"
          />
        </div>
    
        <div>
          <label className="block text-white mb-2">Phone Number</label>
          <input
            type="tel"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            placeholder="Enter your phone number"
          />
        </div>
    
        <div>
          <label className="block text-white mb-2">Bio</label>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            placeholder="Write a short bio about yourself"
            rows="3"
          />
        </div>
    
        <div>
          <label className="block text-white mb-2">Profile Privacy</label>
          <select
            value={profile.privacy}
            onChange={(e) => setProfile({ ...profile, privacy: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="friends">Friends Only</option>
          </select>
        </div>
    
        {/* Success Message */}
        {success && (
          <div className="text-green-400 text-sm">Profile updated successfully!</div>
        )}
    
        {/* Error Message */}
        {error && (
          <div className="text-red-400 text-sm">{error}</div>
        )}
    
        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => setActiveSection("main")}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    ),
    
    appearance: (
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Font Size</h3>
          <div className="space-y-4">
            {["small", "default", "large"].map((size) => (
              <label key={size} className="flex items-center">
                <input
                  type="radio"
                  name="fontSize"
                  value={size}
                  checked={fontSize === size}
                  onChange={(e) => setFontSize(e.target.value)}
                  className="w-4 h-4 text-blue-500"
                />
                <span className="ml-2 capitalize">{size}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Font Style</h3>
          <select
            value={fontStyle}
            onChange={(e) => setFontStyle(e.target.value)}
            className={`w-full p-3 rounded-lg ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white"
            }`}
          >
            <option value="Philosopher">Philosopher</option>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Theme</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleThemeChange("default")}
              className={`p-4 border rounded-lg flex items-center justify-center ${
                theme === "default"
                  ? "border-blue-500"
                  : isDarkMode
                  ? "border-gray-700"
                  : "border-gray-300"
              }`}
            >
              Default
            </button>
            <button
              onClick={() => handleThemeChange("dark")}
              className={`p-4 border rounded-lg flex items-center justify-center ${
                theme === "dark" ? "border-blue-500" : "border-gray-700"
              } bg-gray-900 text-white`}
            >
              Dark
            </button>
          </div>
        </div>

        <button
          onClick={() => setActiveSection("main")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Save Changes
        </button>
      </div>
    ),

    notification: (
      <div className="space-y-6">
        {[
          { key: "email", label: "Email Notifications", icon: Mail },
          { key: "push", label: "Push Notifications", icon: Bell },
          { key: "sms", label: "SMS Notifications", icon: Phone },
          {
            key: "comments",
            label: "Comment Notifications",
            icon: MessageSquare,
          },
        ].map(({ key, label, icon: Icon }) => (
          <div key={key} className="flex items-center justify-between">
            <div className="flex items-center">
              <Icon className="w-5 h-5 mr-3" />
              <span>{label}</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications[key]}
                onChange={() =>
                  setNotifications({
                    ...notifications,
                    [key]: !notifications[key],
                  })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
        <div className="flex space-x-4">
          <button
            onClick={handleNotificationUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Save Changes
          </button>
          <button
            onClick={() => setActiveSection("main")}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    ),

    help: (
      <div className="space-y-6">
        {[
          {
            title: "FAQs",
            icon: HelpCircle,
            content: "Frequently asked questions about using the app",
          },
          {
            title: "Contact Support",
            icon: Mail,
            content: "Get in touch with our support team",
          },
          {
            title: "Privacy Policy",
            icon: Shield,
            content: "Read our privacy policy",
          },
          {
            title: "Terms of Service",
            icon: Lock,
            content: "View our terms of service",
          },
        ].map(({ title, icon: Icon, content }) => (
          <div
            key={title}
            className={`p-4 rounded-lg ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } shadow`}
          >
            <div className="flex items-center mb-2">
              <Icon className="w-5 h-5 mr-2" />
              <h3 className="font-semibold">{title}</h3>
            </div>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {content}
            </p>
          </div>
        ))}
        <button
          onClick={() => setActiveSection("main")}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          Back
        </button>
      </div>
    ),
  };
  return (
    <div
      className={`min-h-screen ${
        isDarkMode
          ? "bg-transparent text-white"
          : "bg-transparent text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
        <div
          className={`min-h-screen ${
            isDarkMode
              ? "bg-transparent text-white"
              : "bg-transparent text-white"
          }`}
        >
          <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
            <div className="mb-8 flex items-center">
              {activeSection !== "main" && (
                <button
                  onClick={() => setActiveSection("main")}
                  className="mr-2"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}
              <h1 className="text-2xl font-semibold">
                {activeSection === "main"
                  ? "Settings"
                  : activeSection.charAt(0).toUpperCase() +
                    activeSection.slice(1)}
              </h1>
            </div>

            {sections[activeSection]}
          </div>
          {/* <div className="mt-3">
            <h2 className="text-2xl font-semibold mb-8">Appearances</h2>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Font Size</h3>
              <div className="space-y-4">
                {["small", "default", "large"].map((size) => (
                  <label key={size} className="flex items-center">
                    <input
                      type="radio"
                      name="fontSize"
                      value={size}
                      checked={fontSize === size}
                      onChange={(e) => setFontSize(e.target.value)}
                      className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 capitalize">{size}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Font Style</h3>
              <p
                className={`mb-4 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Choose the style you prefer for your journal
              </p>
              <select
                value={fontStyle}
                onChange={(e) => setFontStyle(e.target.value)}
                className={`w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                <option value="Philosopher">Philosopher</option>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
              </select>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Background</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => handleThemeChange("default")}
                  className={`p-4 border rounded-lg flex items-center justify-center ${
                    theme === "default"
                      ? "border-blue-500"
                      : isDarkMode
                      ? "border-gray-700"
                      : "border-gray-300"
                  } ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
                >
                  <div className="w-4 h-4 rounded-full border border-gray-300 mr-2 flex items-center justify-center">
                    {theme === "default" && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                  </div>
                  Default
                </button>

                <button
                  onClick={() => handleThemeChange("dark")}
                  className={`p-4 border rounded-lg flex items-center justify-center bg-gray-900 text-white ${
                    theme === "dark" ? "border-blue-500" : "border-gray-700"
                  }`}
                >
                  <div className="w-4 h-4 rounded-full border border-gray-300 mr-2 flex items-center justify-center">
                    {theme === "dark" && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                  </div>
                  Dark
                </button>
              </div>

              <label className="mt-4 flex items-center justify-center w-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <span
                  className={`inline-flex items-center px-4 py-2 ${
                    isDarkMode
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-blue-500 hover:text-blue-600"
                  }`}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </span>
              </label>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Setting;
