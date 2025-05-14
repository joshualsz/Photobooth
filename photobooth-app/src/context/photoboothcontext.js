import React, { createContext, useState, useContext } from 'react';

const PhotoboothContext = createContext();

export const usePhotobooth = () => useContext(PhotoboothContext);

export const PhotoboothProvider = ({ children }) => {
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [photostrip, setPhotostrip] = useState(null);
  const [designSettings, setDesignSettings] = useState({
    layout: 'vertical',
    borderColor: '#ffffff',
    borderWidth: 10,
    filterType: 'none',
    backgroundColor: '#000000',
    text: '',
    textColor: '#ffffff',
    textFont: 'Arial'
  });

  const clearSession = () => {
    setCapturedPhotos([]);
    setSelectedPhotos([]);
    setPhotostrip(null);
    setDesignSettings({
      layout: 'vertical',
      borderColor: '#ffffff',
      borderWidth: 10,
      filterType: 'none',
      backgroundColor: '#000000',
      text: '',
      textColor: '#ffffff',
      textFont: 'Arial'
    });
  };

  const value = {
    capturedPhotos,
    setCapturedPhotos,
    selectedPhotos,
    setSelectedPhotos,
    photostrip,
    setPhotostrip,
    designSettings,
    setDesignSettings,
    clearSession
  };

  return (
    <PhotoboothContext.Provider value={value}>
      {children}
    </PhotoboothContext.Provider>
  );
};

export default PhotoboothProvider;