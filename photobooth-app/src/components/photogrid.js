import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePhotobooth } from '../../context/PhotoboothContext';

const PhotoGrid = () => {
  const navigate = useNavigate();
  const { capturedPhotos, selectedPhotos, setSelectedPhotos } = usePhotobooth();
  
  React.useEffect(() => {
    // Redirect back to capture if no photos found
    if (capturedPhotos.length === 0) {
      navigate('/capture');
    }
  }, [capturedPhotos, navigate]);
  
  const togglePhotoSelection = (index) => {
    if (selectedPhotos.includes(index)) {
      // Remove from selection
      setSelectedPhotos(selectedPhotos.filter(i => i !== index));
    } else if (selectedPhotos.length < 4) {
      // Add to selection (max 4)
      setSelectedPhotos([...selectedPhotos, index]);
    }
  };
  
  const proceedToDesign = () => {
    if (selectedPhotos.length === 4) {
      navigate('/design');
    }
  };
  
  return (
    <div className="selection-container">
      <h2 className="text-2xl font-bold mb-2">Select 4 Photos for Your Photostrip</h2>
      <p className="text-gray-600 mb-6">Choose your favorite 4 out of 8 photos</p>
      
      <div className="photo-grid">
        {capturedPhotos.map((photo, index) => (
          <div 
            key={index} 
            className={`photo-item ${selectedPhotos.includes(index) ? 'selected' : ''}`}
            onClick={() => togglePhotoSelection(index)}
          >
            <img src={photo} alt={`Photo ${index + 1}`} />
            <div className="selection-overlay">
              {selectedPhotos.includes(index) && (
                <span className="selection-number">
                  {selectedPhotos.indexOf(index) + 1}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="selection-controls">
        <button 
          onClick={() => navigate('/capture')} 
          className="back-btn"
        >
          Retake Photos
        </button>
        <button 
          onClick={proceedToDesign}
          disabled={selectedPhotos.length !== 4}
          className="next-btn"
        >
          Create Photostrip ({selectedPhotos.length}/4 selected)
        </button>
      </div>
    </div>
  );
};

export default PhotoGrid;