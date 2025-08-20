import React, { useState } from 'react';
import './ShareModal.css';

const ShareModal = ({ isOpen, onClose, qrCodeDataUrl, text }) => {
  const [copySuccess, setCopySuccess] = useState('');

  if (!isOpen) return null;

  const shareImageToSocial = async (platform) => {
    if (!qrCodeDataUrl) {
      setCopySuccess('QR Code not ready. Please try again.');
      return;
    }

    try {
      // Convert data URL to blob for sharing
      const response = await fetch(qrCodeDataUrl);
      const blob = await response.blob();
      const file = new File([blob], 'qrcode.png', { type: 'image/png' });

      // Check if Web Share API is supported and can share files
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'QR Code',
          text: `Check out this QR Code for: ${text}`,
          files: [file]
        });
        return;
      }
    } catch (error) {
      console.log('Native sharing failed, using fallback');
    }

    // Fallback for different platforms
    const shareText = `Check out this QR Code I generated for: ${text}`;
    
    switch (platform) {
      case 'whatsapp':
        // For WhatsApp, we'll share the text and prompt to upload image manually
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' (Image will be attached separately)')}`;
        window.open(whatsappUrl, '_blank');
        setCopySuccess('WhatsApp opened! You can manually attach the downloaded QR code image.');
        break;
        
      case 'email':
        const subject = 'Check out this QR Code!';
        const body = `Hi,\n\nI generated this QR Code for: ${text}\n\nPlease find the QR code image attached.\n\nBest regards`;
        const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(emailUrl);
        setCopySuccess('Email opened! You can attach the downloaded QR code image.');
        break;
        
      case 'instagram':
        setCopySuccess('Download the QR code and upload it to Instagram manually.');
        setTimeout(() => window.open('https://instagram.com', '_blank'), 1000);
        break;
        
      case 'snapchat':
        setCopySuccess('Download the QR code and upload it to Snapchat manually.');
        setTimeout(() => window.open('https://web.snapchat.com', '_blank'), 1000);
        break;
        
      default:
        setCopySuccess('Download the QR code to share it manually.');
    }
    
    setTimeout(() => setCopySuccess(''), 4000);
  };

  const copyQRContent = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess('QR Code content copied to clipboard!');
      setTimeout(() => setCopySuccess(''), 3000);
    });
  };

  const downloadQRImage = () => {
    if (qrCodeDataUrl) {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = qrCodeDataUrl;
      link.click();
      setCopySuccess('QR Code downloaded successfully!');
      setTimeout(() => setCopySuccess(''), 3000);
    }
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: '💬',
      action: () => shareImageToSocial('whatsapp')
    },
    {
      name: 'Email',
      icon: '�',
      action: () => shareImageToSocial('email')
    },
    {
      name: 'Instagram',
      icon: '📷',
      action: () => shareImageToSocial('instagram')
    },
    {
      name: 'Snapchat',
      icon: '👻',
      action: () => shareImageToSocial('snapchat')
    },
    {
      name: 'Copy Content',
      icon: '📋',
      action: copyQRContent
    },
    {
      name: 'Download',
      icon: '💾',
      action: downloadQRImage
    }
  ];

  return (
    <div className="share-modal-overlay" onClick={onClose}>
      <div className="share-modal" onClick={(e) => e.stopPropagation()}>
        <div className="share-modal-header">
          <h3>Share QR Code</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="share-content">
          {qrCodeDataUrl && (
            <div className="qr-preview">
              <img src={qrCodeDataUrl} alt="QR Code" className="qr-preview-image" />
              <p className="share-text">Share this QR Code: <strong>{text}</strong></p>
            </div>
          )}
          
          <div className="share-options">
            {shareOptions.map((option, index) => (
              <button
                key={index}
                className="share-option"
                onClick={option.action}
              >
                <span className="share-icon">{option.icon}</span>
                <span className="share-name">{option.name}</span>
              </button>
            ))}
          </div>
          
          {copySuccess && (
            <div className="copy-success">{copySuccess}</div>
          )}
          
          <div className="share-tip">
            <p>💡 <strong>Tip:</strong> For best results, download the QR code and manually share the image on social platforms.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
