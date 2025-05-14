import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { usePhotobooth } from '../../context/PhotoboothContext';

const PhotostripDesigner = () => {
  const navigate = useNavigate();
  const { 
    capturedPhotos, 
    selectedPhotos, 
    designSettings, 
    setDesignSettings, 
    setPhotostrip 
  } = usePhotobooth();
  
  const [isGenerating, setIsGenerating] = useState(false);
  
  useEffect(() => {
    // Redirect if no photos are selected
    if (selectedPhotos.length !== 4) {
      navigate('/selection');
    }
  }, [selectedPhotos, navigate]);
  
  const handleDesignChange = (property, value) => {
    setDesignSettings({
      ...designSettings,
      [property]: value
    });
  };

  const generatePhotostrip = async () => {
    setIsGenerating(true);
    
    try {
      const element = document.getElementById('photostrip-preview');
      const canvas = await html2canvas(element, { useCORS: true });
      
      // Convert to data URL
      const dataUrl = canvas.toDataURL('image/png');
      setPhotostrip(dataUrl);
      
      // Navigate to share page
      navigate('/share');
    } catch (error) {
      console.error("Error generating photostrip:", error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="designer-container">
      <h2 className="text-2xl font-bold mb-4">Design Your Photostrip</h2>
      
      <div className="design-workspace">
        <div className="design-controls">
          {/* Layout options */}
          <div className="control-group">
            <h3>Layout</h3>
            <div className="radio-options">
              <label>
                <input
                  type="radio"
                  name="layout"
                  value="vertical"
                  checked={designSettings.layout === 'vertical'}
                  onChange={(e) => handleDesignChange('layout', e.target.value)}
                />
                Vertical
              </label>
              <label>
                <input
                  type="radio"
                  name="layout"
                  value="horizontal"
                  checked={designSettings.layout === 'horizontal'}
                  onChange={(e) => handleDesignChange('layout', e.target.value)}
                />
                Horizontal
              </label>
            </div>
          </div>
          
          {/* Border options */}
          <div className="control-group">
            <h3>Border</h3>
            <input
              type="color"
              value={designSettings.borderColor}
              onChange={(e) => handleDesignChange('borderColor', e.target.value)}
            />
            <input
              type="range"
              min="0"
              max="30"
              value={designSettings.borderWidth}
              onChange={(e) => handleDesignChange('borderWidth', parseInt(e.target.value))}
            />
          </div>
          
          {/* Filter options */}
          <div className="control-group">
            <h3>Filter</h3>
            <select
              value={designSettings.filterType}
              onChange={(e) => handleDesignChange('filterType', e.target.value)}
            >
              <option value="none">None</option>
              <option value="grayscale">Black & White</option>
              <option value="sepia">Sepia</option>
              <option value="invert">Negative</option>
            </select>
          </div>
          
          {/* Background color */}
          <div className="control-group">
            <h3>Background</h3>
            <input
              type="color"
              value={designSettings.backgroundColor}
              onChange={(e) => handleDesignChange('backgroundColor', e.target.value)}
            />
          </div>
          
          {/* Text options */}
          <div className="control-group">
            <h3>Caption</h3>
            <input
              type="text"
              value={designSettings.text}
              onChange={(e) => handleDesignChange('text', e.target.value)}
              placeholder="Add a caption..."
            />
            <input
              type="color"
              value={designSettings.textColor}
              onChange={(e) => handleDesignChange('textColor', e.target.value)}
            />
            <select
              value={designSettings.textFont}
              onChange={(e) => handleDesignChange('textFont', e.target.value)}
            >
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
              <option value="Courier New">Courier New</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Comic Sans MS">Comic Sans MS</option>
            </select>
          </div>
        </div>
        
        {/* Live preview */}
        <div className="photostrip-preview-container">
          <div 
            id="photostrip-preview"
            className={`photostrip ${designSettings.layout}`}
            style={{ 
              backgroundColor: designSettings.backgroundColor,
              padding: `${designSettings.borderWidth}px`,
              borderColor: designSettings.borderColor
            }}
          >
            {selectedPhotos.map((photoIndex) => (
              <div key={photoIndex} className="strip-photo">
                <img 
                  src={capturedPhotos[photoIndex]} 
                  alt={`Selected ${photoIndex + 1}`} 
                  style={{ 
                    filter: designSettings.filterType !== 'none' ? `${designSettings.filterType}(100%)` : 'none'
                  }}
                />
              </div>
            ))}
            {designSettings.text && (
              <div 
                className="photostrip-caption"
                style={{ 
                  color: designSettings.textColor,
                  fontFamily: designSettings.textFont
                }}
              >
                {designSettings.text}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="designer-controls">
        <button 
          onClick={() => navigate('/selection')} 
          className="back-btn"
        >
          Back to Selection
        </button>
        <button 
          onClick={generatePhotostrip}
          disabled={isGenerating}
          className="generate-btn"
        >
          {isGenerating ? 'Generating...' : 'Generate Photostrip'}
        </button>
      </div>
    </div>
  );
};

export default PhotostripDesigner;