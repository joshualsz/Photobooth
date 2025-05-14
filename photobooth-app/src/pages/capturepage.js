import React, { useEffect } from 'react';
import CameraCapture from '../components/Camera/CameraCapture';
import { usePhotobooth } from '../context/PhotoboothContext';

const CapturePage = () => {
  const { clearSession } = usePhotobooth();
  
  // Clear any existing session when starting a new capture
  useEffect(() => {
    clearSession();
  }, [clearSession]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <CameraCapture />
    </div>
  );
};

export default CapturePage;