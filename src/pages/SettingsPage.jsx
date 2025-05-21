import { useState } from "react";
import { 
  Bell, 
  Shield, 
  Monitor, 
  Moon, 
  Sun, 
  Database,
  Globe,
  User,
  Check,
  X,
  CircleUser,
  UserCircle,
  UserCog
} from "lucide-react";


import Navbar from "../components/Shared/Navbar";
import Sidebar from "../components/Shared/Sidebar";

const SettingsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile"); 
  const [theme, setTheme] = useState("system");
  const [showNotifications, setShowNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [shareUsageData, setShareUsageData] = useState(true);
  const [language, setLanguage] = useState("english");
  const [savedMessage, setSavedMessage] = useState("");
  
 
  const [userName, setUserName] = useState("John Doe");
  const [userEmail, setUserEmail] = useState("john.doe@example.com");
  const [profileIcon, setProfileIcon] = useState("default"); // default, circle, cog

  // Toggle sidebar (for mobile view)
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle theme change
  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    // Here you would implement the actual theme change logic
  };

  // Save settings
  const saveSettings = () => {
    // Here you would typically send this data to your backend
    console.log("Settings saved:", {
      theme,
      showNotifications,
      emailNotifications,
      shareUsageData,
      language,
      userName,
      userEmail,
      profileIcon
    });
    
    // Show success message
    setSavedMessage("Settings saved successfully!");
    
    // Hide the message after 3 seconds
    setTimeout(() => {
      setSavedMessage("");
    }, 3000);
  };

  // Setting category components
  const settingCategories = [
    { 
      id: "profile", 
      name: "Profile", 
      icon: <User size={20} /> 
    },
    { 
      id: "appearance", 
      name: "Appearance", 
      icon: <Monitor size={20} /> 
    },
    { 
      id: "notifications", 
      name: "Notifications", 
      icon: <Bell size={20} /> 
    },
    { 
      id: "privacy", 
      name: "Privacy & Data", 
      icon: <Shield size={20} /> 
    },
    { 
      id: "language", 
      name: "Language & Region", 
      icon: <Globe size={20} /> 
    }
  ];

  // Toggle switch component
  const ToggleSwitch = ({ enabled, onChange }) => {
    return (
      <button
        type="button"
        className={`relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          enabled ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
        }`}
        onClick={() => onChange(!enabled)}
      >
        <span
          className={`${
            enabled ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </button>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Include the Sidebar component */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Include the Navbar component */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Content area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              {/* Settings Header */}
              <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Settings</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Manage your account preferences and application settings
                </p>
              </div>

              {/* Settings Content */}
              <div className="flex flex-col md:flex-row">
                {/* Settings sidebar/categories */}
                <div className="w-full md:w-64 bg-gray-50 dark:bg-gray-800 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
                  <ul className="py-4">
                    {settingCategories.map((category) => (
                      <li key={category.id}>
                        <button
                          onClick={() => setActiveTab(category.id)}
                          className={`w-full flex items-center px-6 py-3 text-sm font-medium ${
                            activeTab === category.id
                              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-l-4 border-blue-500"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          <span className="mr-3">{category.icon}</span>
                          <span>{category.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Settings form */}
                <div className="flex-1 p-6">
                  {activeTab === "profile" && (
                    <div className="space-y-6">
                      <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">Profile Information</h2>
                      
                      {/* Profile Icon Selection */}
                      <div className="flex flex-col items-center md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                        <div className="flex flex-col items-center space-y-3">
                          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                            {profileIcon === "default" && <User size={80} className="text-gray-600 dark:text-gray-300" />}
                            {profileIcon === "circle" && <UserCircle size={80} className="text-gray-600 dark:text-gray-300" />}
                            {profileIcon === "cog" && <UserCog size={80} className="text-gray-600 dark:text-gray-300" />}
                          </div>
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Choose an icon
                          </div>
                          <div className="flex space-x-3">
                            <button
                              onClick={() => setProfileIcon("default")}
                              className={`p-2 rounded-full ${profileIcon === "default" ? "bg-blue-100 dark:bg-blue-900" : "bg-gray-100 dark:bg-gray-700"}`}
                            >
                              <User size={24} className={`${profileIcon === "default" ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}`} />
                            </button>
                            <button
                              onClick={() => setProfileIcon("circle")}
                              className={`p-2 rounded-full ${profileIcon === "circle" ? "bg-blue-100 dark:bg-blue-900" : "bg-gray-100 dark:bg-gray-700"}`}
                            >
                              <UserCircle size={24} className={`${profileIcon === "circle" ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}`} />
                            </button>
                            <button
                              onClick={() => setProfileIcon("cog")}
                              className={`p-2 rounded-full ${profileIcon === "cog" ? "bg-blue-100 dark:bg-blue-900" : "bg-gray-100 dark:bg-gray-700"}`}
                            >
                              <UserCog size={24} className={`${profileIcon === "cog" ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}`} />
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-4 w-full max-w-md">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Full Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-gray-900 dark:text-gray-100"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="email"
                              value={userEmail}
                              onChange={(e) => setUserEmail(e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-gray-900 dark:text-gray-100"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">Account Information</h2>
                        <div className="mt-4 space-y-4 max-w-md">
                          <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Username
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">
                                @
                              </span>
                              <input
                                type="text"
                                id="username"
                                defaultValue="johndoe"
                                className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Bio
                            </label>
                            <div className="mt-1">
                              <textarea
                                id="bio"
                                rows={3}
                                defaultValue="I'm a software developer passionate about creating intuitive and accessible user interfaces."
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md text-gray-900 dark:text-gray-100"
                              />
                            </div>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                              Brief description for your profile.
                            </p>
                          </div>
                          
                          <div>
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Change Password
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "appearance" && (
                    <div className="space-y-6">
                      <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">Theme</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                          onClick={() => handleThemeChange("light")}
                          className={`flex items-center justify-center p-4 border-2 rounded-lg ${
                            theme === "light"
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                              : "border-gray-200 dark:border-gray-700"
                          }`}
                        >
                          <div className="flex flex-col items-center">
                            <Sun size={24} className="text-yellow-500 mb-2" />
                            <span className="text-gray-800 dark:text-gray-200">Light</span>
                          </div>
                        </button>
                        <button
                          onClick={() => handleThemeChange("dark")}
                          className={`flex items-center justify-center p-4 border-2 rounded-lg ${
                            theme === "dark"
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                              : "border-gray-200 dark:border-gray-700"
                          }`}
                        >
                          <div className="flex flex-col items-center">
                            <Moon size={24} className="text-indigo-500 mb-2" />
                            <span className="text-gray-800 dark:text-gray-200">Dark</span>
                          </div>
                        </button>
                        <button
                          onClick={() => handleThemeChange("system")}
                          className={`flex items-center justify-center p-4 border-2 rounded-lg ${
                            theme === "system"
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                              : "border-gray-200 dark:border-gray-700"
                          }`}
                        >
                          <div className="flex flex-col items-center">
                            <Monitor size={24} className="text-gray-500 mb-2" />
                            <span className="text-gray-800 dark:text-gray-200">System</span>
                          </div>
                        </button>
                      </div>

                      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">Accessibility</h2>
                        <div className="mt-4 space-y-4">
                          <div className="flex items-center justify-between">
                            <label className="text-sm text-gray-700 dark:text-gray-300">
                              Reduce animations
                            </label>
                            <ToggleSwitch enabled={false} onChange={() => {}} />
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="text-sm text-gray-700 dark:text-gray-300">
                              High contrast mode
                            </label>
                            <ToggleSwitch enabled={false} onChange={() => {}} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "notifications" && (
                    <div className="space-y-6">
                      <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">Notification Preferences</h2>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              In-app notifications
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Receive notifications within the application
                            </p>
                          </div>
                          <ToggleSwitch 
                            enabled={showNotifications} 
                            onChange={setShowNotifications} 
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Email notifications
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Receive notifications via email
                            </p>
                          </div>
                          <ToggleSwitch 
                            enabled={emailNotifications} 
                            onChange={setEmailNotifications} 
                          />
                        </div>
                      </div>

                      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">Notify me about</h2>
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center">
                            <input
                              id="updates"
                              name="updates"
                              type="checkbox"
                              defaultChecked={true}
                              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="updates" className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                              Product updates and announcements
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="tips"
                              name="tips"
                              type="checkbox"
                              defaultChecked={true}
                              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="tips" className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                              Tips and best practices
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="security"
                              name="security"
                              type="checkbox"
                              defaultChecked={true}
                              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="security" className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                              Security alerts
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "privacy" && (
                    <div className="space-y-6">
                      <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">Privacy & Data Usage</h2>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Share usage data
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Help improve the application by sharing anonymous usage data
                            </p>
                          </div>
                          <ToggleSwitch 
                            enabled={shareUsageData} 
                            onChange={setShareUsageData} 
                          />
                        </div>
                      </div>

                      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">Data Management</h2>
                        <div className="mt-4 space-y-4">
                          <button
                            type="button"
                            className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            <Database size={16} className="mr-2 text-gray-500" />
                            Download my data
                          </button>
                          <button
                            type="button"
                            className="flex items-center px-4 py-2 border border-red-300 dark:border-red-700 rounded-md shadow-sm text-sm font-medium text-red-700 dark:text-red-400 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <X size={16} className="mr-2" />
                            Delete account
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "language" && (
                    <div className="space-y-6">
                      <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">Language Settings</h2>
                      <div className="max-w-xs">
                        <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Display language
                        </label>
                        <select
                          id="language"
                          name="language"
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md text-gray-900 dark:text-gray-100"
                        >
                          <option value="english">English</option>
                          <option value="spanish">Spanish</option>
                          <option value="french">French</option>
                          <option value="german">German</option>
                          <option value="chinese">Chinese</option>
                          <option value="japanese">Japanese</option>
                        </select>
                      </div>

                      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">Regional Settings</h2>
                        <div className="mt-4 max-w-xs">
                          <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Time zone
                          </label>
                          <select
                            id="timezone"
                            name="timezone"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md text-gray-900 dark:text-gray-100"
                            defaultValue="UTC"
                          >
                            <option value="UTC">UTC (Coordinated Universal Time)</option>
                            <option value="EST">EST (Eastern Standard Time)</option>
                            <option value="CST">CST (Central Standard Time)</option>
                            <option value="MST">MST (Mountain Standard Time)</option>
                            <option value="PST">PST (Pacific Standard Time)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Save button */}
                  <div className="mt-8 flex items-center justify-between">
                    <div className="flex items-center">
                      {savedMessage && (
                        <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                          <Check size={16} className="mr-1" />
                          {savedMessage}
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={saveSettings}
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;