import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = ({ toggleSidebar }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side: Logo and mobile menu button */}
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle sidebar"
            >
              <Menu size={24} />
            </button>
            <div className="ml-4 md:ml-0 font-bold text-xl md:text-2xl">AI Resume Builder</div>
          </div>
          
          {/* Right side: Theme toggle and user avatar */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                aria-label="User menu"
              >
                <User size={18} />
              </button>
              
              {/* User dropdown menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                  <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</a>
                  <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Settings</a>
                  <a href="#logout" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;