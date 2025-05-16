import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
// import Navbar from './components/Shared/Navbar';
// import Sidebar from './components/Shared/Sidebar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder';
import Templates from './pages/Templates';
import CoverLetter from './pages/CoverLetter';
import Login from './pages/Login';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock authentication for demo purposes
  useEffect(() => {
    // Check if user was previously logged in using localStorage
    const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsAuthenticated(userLoggedIn);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogin = () => {
    // Set auth state and save to localStorage
    setIsAuthenticated(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    // Clear auth state and localStorage
    setIsAuthenticated(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
          {/* Sidebar - Only show if authenticated */}
          {/* {isAuthenticated && (
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          )} */}

          {/* Main Content */}
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Top Navigation - Only show if authenticated */}
            {/* {isAuthenticated && (
              <Navbar 
                toggleSidebar={toggleSidebar} 
                sidebarOpen={sidebarOpen} 
                onLogout={handleLogout}
              />
            )} */}

            {/* Page Content */}
            <main className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="/" element={isAuthenticated ? <Dashboard /> : <Home />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route
                  path="/dashboard"
                  element={isAuthenticated ? <Dashboard /> : <Login onLogin={handleLogin} />}
                />
                <Route
                  path="/resume-builder"
                  element={isAuthenticated ? <ResumeBuilder /> : <Login onLogin={handleLogin} />}
                />
                <Route
                  path="/templates"
                  element={isAuthenticated ? <Templates /> : <Login onLogin={handleLogin} />}
                />
                <Route
                  path="/cover-letter"
                  element={isAuthenticated ? <CoverLetter /> : <Login onLogin={handleLogin} />}
                />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;