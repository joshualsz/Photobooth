import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePhotobooth } from '../../context/PhotoboothContext';

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isCapturing, setIsCapturing] = useState(false);
  const navigate = useNavigate();
  
  const { capturedPhotos, setCapturedPhotos, clearSession } = usePhotobooth();
  
  // Initialize camera
  useEffect(() => {
    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "user" }, 
          audio: false 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };
    
    setupCamera();
    
    // Cleanup function to stop all video streams when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Timer effect
  useEffect(() => {
    let timerId;
    
    if (isCapturing && timeLeft > 0) {
      timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (isCapturing && timeLeft === 0) {
      capturePhoto();
    }
    
    return () => clearTimeout(timerId);
  }, [isCapturing, timeLeft]);

  const startCapture = () => {
    setIsCapturing(true);
    setTimeLeft(15);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw the current video frame on the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to data URL and add to captured photos
      const photoData = canvas.toDataURL('image/png');
      setCapturedPhotos([...capturedPhotos, photoData]);
      
      // Check if we should continue or finish
      if (currentFrame < 7) {
        setCurrentFrame(currentFrame + 1);
        setTimeLeft(15);
      } else {
        setIsCapturing(false);
        // Move to selection page when all frames are captured
        navigate('/selection');
      }
    }
  };

  return (
    <div className="camera-container">
      <h2 className="text-2xl font-bold mb-4">Photo Booth</h2>
      <p className="text-lg mb-4">Frame {currentFrame + 1} of 8</p>
      
      {isCapturing && (
        <div className="timer">
          <p>Smile! Photo in: {timeLeft} seconds</p>
        </div>
      )}
      
      <div className="video-container">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className="camera-video"
        />
      </div>
      
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      <div className="controls">
        {!isCapturing && currentFrame === 0 ? (
          <button onClick={startCapture} className="start-btn">
            Start Photo Session
          </button>
        ) : !isCapturing && currentFrame > 0 ? (
          <button onClick={startCapture} className="continue-btn">
            Continue ({8 - currentFrame} frames left)
          </button>
        ) : null}
      </div>
      
      <div className="thumbnails">
        {capturedPhotos.map((photo, index) => (
          <img 
            key={index} 
            src={photo} 
            alt={`Frame ${index + 1}`} 
            className="thumbnail" 
          />
        ))}
      </div>
    </div>
  );
};

export default CameraCapture;