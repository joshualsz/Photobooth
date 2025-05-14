import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const MyPhotosPage = () => {
  const [photostrips, setPhotostrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  
  useEffect(() => {
    const fetchUserPhotostrips = async () => {
      try {
        const userId = currentUser.uid;
        const q = query(collection(db, 'photostrips'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        
        const fetchedPhotostrips = [];
        querySnapshot.forEach((doc) => {
          fetchedPhotostrips.push({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date()
          });
        });
        
        // Sort by creation date (newest first)
        fetchedPhotostrips.sort((a, b) => b.createdAt - a.createdAt);
        setPhotostrips(fetchedPhotostrips);
      } catch (err) {
        console.error('Error fetching photostrips:', err);
        setError('Failed to load your photos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserPhotostrips();
  }, [currentUser]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">Loading your photostrips...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">My Photostrips</h1>
      
      {photostrips.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-6">You haven't created any photostrips yet.</p>
          <Link 
            to="/capture" 
            className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Create Your First Photostrip
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photostrips.map((strip) => (
            <div key={strip.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-2">
                  {strip.createdAt.toLocaleDateString()}
                </p>
                <div className="aspect-w-2 aspect-h-3 mb-4">
                  <img 
                    src={strip.imageUrl} 
                    alt="Photostrip" 
                    className="object-cover h-full w-full rounded-md"
                  />
                </div>
                <div className="flex justify-between">
                  <a 
                    href={strip.imageUrl} 
                    download
                    className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                  >
                    Download
                  </a>
                  <button 
                    className="px-4 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                    onClick={() => window.open(strip.imageUrl, '_blank')}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPhotosPage;