import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NewReview from './pages/NewReview';
import Analytics from './pages/Analytics';
import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import AuthModal from './components/AuthModal';
import './styles/globals.css';

export default function App(){
  const [showDemoInfo, setShowDemoInfo] = useState(false);
  const [demoMode, setDemoMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const toggleDemoInfo = () => {
    setShowDemoInfo(!showDemoInfo);
  };

  const toggleDemoMode = () => {
    setDemoMode(!demoMode);
  };

  const handleLogin = (userData, token) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('token', token);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="flex">
        <aside className="w-60 bg-gradient-to-b from-sky-800 to-cyan-800 text-white p-6 min-h-screen">
          <h2 className="text-2xl font-bold mb-6">AI Review</h2>
          <nav className="space-y-3">
            <Link to="/" className="block py-2 px-3 rounded hover:bg-white/10">Dashboard</Link>
            <Link to="/new" className="block py-2 px-3 rounded hover:bg-white/10">New Review</Link>
            <Link to="/analytics" className="block py-2 px-3 rounded hover:bg-white/10">Analytics</Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="block py-2 px-3 rounded hover:bg-white/10">Admin Dashboard</Link>
            )}
            <Link to="/about" className="block py-2 px-3 rounded hover:bg-white/10">About</Link>
          </nav>
        </aside>
        <main className="flex-1 p-8">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold">AI Code Review Assistant</h1>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">
                    Welcome, {user?.username} ({user?.role})
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setShowAuthModal(true)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => setShowAuthModal(true)}
                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors"
                  >
                    Register
                  </button>
                </div>
              )}
              <div className="relative">
                <button
                  onClick={toggleDemoInfo}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    demoMode 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl' 
                      : 'bg-gray-600 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {demoMode ? 'Demo • Interview-ready' : 'Live Mode • Production'}
                </button>
                
                {showDemoInfo && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border p-4 z-50">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-800">Application Status</h3>
                      <button 
                        onClick={toggleDemoInfo}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${demoMode ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                        <span className="text-sm text-gray-600">
                          {demoMode ? 'Demo Mode Active' : 'Live Mode Active'}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <p className="mb-2">
                          <strong>Current Features:</strong>
                        </p>
                        <ul className="list-disc ml-4 space-y-1">
                          <li>AI-powered code analysis with Gemini</li>
                          <li>Security vulnerability detection</li>
                          <li>Automated test generation</li>
                          <li>Real-time analytics dashboard</li>
                          <li>Multi-language support</li>
                          <li>User authentication & RBAC</li>
                          <li>Microservices architecture</li>
                        </ul>
                      </div>
                      
                      <div className="pt-2 border-t">
                        <button
                          onClick={toggleDemoMode}
                          className="w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium transition-colors"
                        >
                          Switch to {demoMode ? 'Live' : 'Demo'} Mode
                        </button>
                      </div>
                      
                      <div className="text-xs text-gray-500 pt-2 border-t">
                        <p><strong>Version:</strong> 2.0.0 (Microservices)</p>
                        <p><strong>AI Provider:</strong> Google Gemini 2.5 Flash</p>
                        <p><strong>Architecture:</strong> Microservices</p>
                        <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/new" element={<NewReview/>} />
            <Route path="/analytics" element={<Analytics/>} />
            <Route path="/admin" element={<AdminDashboard/>} />
            <Route path="/about" element={<About/>} />
          </Routes>
        </main>
      </div>
      
      {/* Authentication Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}
