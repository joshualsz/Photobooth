import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Create Memorable Photostrips in Seconds</h1>
        <p className="text-xl text-gray-600 mb-8">
          Capture, customize, and share beautiful photostrips with our easy-to-use photo booth app.
          No external hardware needed - just your device's camera!
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Link 
            to="/capture" 
            className="px-8 py-3 bg-purple-600 text-white text-lg font-medium rounded-md hover:bg-purple-700 transition-colors"
          >
            Start Photo Session
          </Link>
          
          {!currentUser && (
            <Link 
              to="/auth" 
              className="px-8 py-3 bg-white text-purple-600 text-lg font-medium rounded-md border-2 border-purple-600 hover:bg-purple-50 transition-colors"
            >
              Sign Up to Save Photos
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-purple-600 text-4xl mb-4">📸</div>
            <h3 className="text-xl font-semibold mb-2">Capture Moments</h3>
            <p className="text-gray-600">
              Take up to 8 photos with our automatic timer, giving you plenty of time to pose and be creative.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-purple-600 text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">Customize Your Strip</h3>
            <p className="text-gray-600">
              Choose your favorite photos, apply filters, add borders, and personalize with text.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-purple-600 text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2">Share Instantly</h3>
            <p className="text-gray-600">
              Download your photostrip, save to your account, or share directly to social media.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;