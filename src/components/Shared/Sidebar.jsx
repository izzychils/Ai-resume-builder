import { Home, FileText, Plus, Palette, Mail, Settings, X, CreditCard } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
    { name: "My Resumes", icon: <FileText size={20} />, path: "/resumes" },
    { name: "Create Resume", icon: <Plus size={20} />, path: "/resume-builder" },
    { name: "Templates", icon: <Palette size={20} />, path: "/templates" },
    { name: "Cover Letter", icon: <Mail size={20} />, path: "/cover-letter" },
    // { name: "Profile", icon: <User size={20} />, path: "/profile" },
    { 
      name: "Subscription", 
      icon: <CreditCard size={20} />, 
      path: "/subscription",
      highlight: true 
    },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" }
  ];
  
  // Handle navigation based on device size
  const handleNavigation = (path) => {
    navigate(path);
    
    // Only close the sidebar on mobile screens
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };
  
  return (
    <>
      {/* Semi-transparent overlay for mobile only - doesn't block content */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-20 bg-black bg-opacity-30"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 h-full w-64 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 border-b border-gray-200 dark:border-gray-700 px-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Menu</h2>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="mt-6">
          <ul className="space-y-2 px-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors text-left ${
                    location.pathname === item.path
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <span
                    className={`mr-3 ${
                      location.pathname === item.path
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 AI Resume Builder
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;