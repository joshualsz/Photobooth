import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth Context
import { AuthProvider } from './context/AuthContext';
import { PhotoboothProvider } from './context/PhotoboothContext';

// Page components
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import CapturePage from './pages/CapturePage';
import SelectionPage from './pages/SelectionPage';
import DesignPage from './pages/DesignPage';
import SharePage from './pages/SharePage';
import MyPhotosPage from './pages/MyPhotosPage';

// Common components
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// CSS
import './styles/global.css';
import './styles/photostrip.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <PhotoboothProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/capture" element={<CapturePage />} />
                <Route path="/selection" element={<SelectionPage />} />
                <Route path="/design" element={<DesignPage />} />
                <Route path="/share" element={<SharePage />} />
                <Route 
                  path="/my-photos" 
                  element={
                    <ProtectedRoute>
                      <MyPhotosPage />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </PhotoboothProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;