import React, { useState } from 'react';
import axios from 'axios';

export default function AuthModal({ isOpen, onClose, onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/api/users/login' : '/api/users/register';
      const data = isLogin 
        ? { username: formData.username, password: formData.password }
        : formData;

      const response = await axios.post(`http://localhost:5000${endpoint}`, data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        onLogin(response.data.user);
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    // Create a demo token for demonstration
    const demoToken = 'demo-token-' + Date.now();
    localStorage.setItem('token', demoToken);
    onLogin({ username: 'demo', role: 'developer' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {isLogin ? 'Login' : 'Register'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>

        <div className="mt-4 pt-4 border-t">
          <button
            onClick={handleDemoLogin}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Demo Login (No Registration Required)
          </button>
        </div>
      </div>
    </div>
  );
}







