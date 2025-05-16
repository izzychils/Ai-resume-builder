import { 
  Home, 
  FileText, 
  Plus, 
  Palette, 
  Mail, 
  Settings, 
  X 
} from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { name: "Dashboard", icon: <Home size={20} />, href: "/dashboard" },
    { name: "My Resumes", icon: <FileText size={20} />, href: "/resumes" },
    { name: "Create Resume", icon: <Plus size={20} />, href: "/resume-builder" },
    { name: "Templates", icon: <Palette size={20} />, href: "/templates" },
    { name: "Cover Letter", icon: <Mail size={20} />, href: "/cover-letter" },
    { name: "Settings", icon: <Settings size={20} />, href: "/settings" }
  ];
  
  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-30 h-full w-64 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between h-16 border-b border-gray-200 dark:border-gray-700 px-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Menu</h2>
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="mt-6">
          <ul className="space-y-2 px-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="flex items-center p-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="mr-3 text-gray-500 dark:text-gray-400">{item.icon}</span>
                  <span>{item.name}</span>
                </a>
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