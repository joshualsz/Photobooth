import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db } from '../../services/firebase';
import { usePhotobooth } from '../../context/PhotoboothContext';
import { useAuth } from '../../context/AuthContext';

const SharePage = () => {
  const navigate = useNavigate();
  const { photostrip } = usePhotobooth();
  const { currentUser } = useAuth();
  const [downloadLink, setDownloadLink] = useState('');
  const [shareLink, setShareLink] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  useEffect(() => {
    if (!photostrip) {
      navigate('/capture');
      return;
    }
    
    // Create download link
    const linkElement = document.createElement('a');
    linkElement.href = photostrip;
    linkElement.download = `photostrip_${new Date().getTime()}.png`;
    setDownloadLink(linkElement);
  }, [photostrip, navigate]);
  
  const handleDownload = () => {
    if (downloadLink) {
      downloadLink.click();
    }
  };
  
  const handleSaveToAccount = async () => {
    if (!currentUser) {
      // Redirect to auth page if not logged in
      navigate('/auth', { 
        state: { 
          redirectTo: '/share'
        } 
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Upload to Firebase Storage
      const storageRef = ref(storage, `photostrips/${currentUser.uid}/${new Date().getTime()}.png`);
      const snapshot = await uploadString(storageRef, photostrip, 'data_url');
      const url = await getDownloadURL(snapshot.ref);
      
      // Save reference to Firestore
      await addDoc(collection(db, 'photostrips'), {
        userId: currentUser.uid,
        imageUrl: url,
        createdAt: serverTimestamp(),
      });
      
      // Set share link
      setShareLink(url);
    } catch (error) {
      console.error("Error saving photostrip:", error);
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleShareSocial = (platform) => {
    let shareUrl;
    
    // Use the stored URL if available, otherwise use a placeholder
    const urlToShare = shareLink || window.location.href;
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(urlToShare)}&text=Check out my photostrip!`;
        break;
      case 'instagram':
        // Instagram doesn't have a web share API, show info message instead
        alert('To share on Instagram, please download the image and upload it through the Instagram app.');
        return;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };
  
  return (
    <div className="share-container">
      <h2 className="text-2xl font-bold mb-4">Your Photostrip is Ready!</h2>
      
      <div className="photostrip-display">
        <img src={photostrip} alt="Your photostrip" />
      </div>
      
      <div className="action-buttons">
        <button onClick={handleDownload} className="download-btn">
          Download
        </button>
        
        <button 
          onClick={handleSaveToAccount} 
          disabled={isUploading}
          className="save-btn"
        >
          {isUploading ? 'Saving...' : 'Save to My Account'}
        </button>
      </div>
      
      <div className="share-options">
        <h3>Share on Social Media</h3>
        <div className="social-buttons">
          <button onClick={() => handleShareSocial('facebook')} className="facebook-btn">
            Facebook
          </button>
          <button onClick={() => handleShareSocial('twitter')} className="twitter-btn">
            Twitter
          </button>
          <button onClick={() => handleShareSocial('instagram')} className="instagram-btn">
            Instagram
          </button>
        </div>
      </div>
      
      <div className="navigation">
        <button onClick={() => navigate('/')} className="home-btn">
          Create Another
        </button>
      </div>
    </div>
  );
};

export default SharePage;