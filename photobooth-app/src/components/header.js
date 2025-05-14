import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-purple-600">PhotoBooth App</Link>
        
        <nav className="flex items-center space-x-4">
          <Link to="/" className="px-3 py-2 text-gray-600 hover:text-purple-600">
            Home
          </Link>
          
          {currentUser ? (
            <>
              <Link to="/my-photos" className="px-3 py-2 text-gray-600 hover:text-purple-600">
                My Photos
              </Link>
              <div className="flex items-center ml-4">
                <span className="text-sm text-gray-700 mr-3">
                  {currentUser.email}
                </span>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link 
              to="/auth" 
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;