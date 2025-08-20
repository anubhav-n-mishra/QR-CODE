import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import Explanation from './components/Explanation';
import ThemeToggle from './components/ThemeToggle';
import Footer from './components/Footer';
import LearnMore from './components/LearnMore';
import Contact from './components/Contact';
import ShareModal from './components/ShareModal';
import './App.css';

function App() {
  const [text, setText] = useState('https://github.com/anubhav-n-mishra/QR-CODE');
  const [theme, setTheme] = useState('light');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const qrRef = useRef();

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const downloadQRCode = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL();
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = url;
      link.click();
    }
  };

  const getQRCodeDataUrl = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      return canvas.toDataURL('image/png', 1.0);
    }
    return null;
  };

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  return (
    <div className="App" data-theme={theme}>
      <header className="App-header">
        <div className="navbar-brand">
          <h1>QR Code Explainer</h1>
        </div>
        
        <div className="navbar-actions">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </header>

      <main className="main-content">
        <div className="input-section">
          <label htmlFor="qr-input" className="input-label">
            📝 Enter your content
          </label>
          <textarea
            id="qr-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text, URL, or any content to generate a QR code..."
            maxLength={2000}
          />
        </div>

        {text && (
          <div className="content-grid">
            <div className="qr-section-wrapper">
              <div className="qr-code-section">
                <div className="qr-code-container" ref={qrRef}>
                  <QRCode
                    value={text}
                    size={200}
                    level="M"
                    includeMargin={true}
                  />
                </div>
                <div className="qr-actions">
                  <button onClick={downloadQRCode} className="download-btn">
                    📥 Download QR Code
                  </button>
                  <button onClick={handleShare} className="share-btn">
                    📤 Share QR Code
                  </button>
                </div>
              </div>
            </div>
            
            <div className="explanation-wrapper">
              <Explanation text={text} />
            </div>
          </div>
        )}

        <LearnMore />
        <Contact />
      </main>

      <Footer />
      
      <ShareModal 
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        qrCodeDataUrl={getQRCodeDataUrl()}
        text={text}
      />
    </div>
  );
}

export default App;
