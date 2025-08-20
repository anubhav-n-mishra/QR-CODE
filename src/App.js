import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import Explanation from './components/Explanation';
import ThemeToggle from './components/ThemeToggle';
import Footer from './components/Footer';
import LearnMore from './components/LearnMore';
import './App.css';

function App() {
  const [text, setText] = useState('https://github.com/anubhav-n-mishra/QR-CODE');
  const [theme, setTheme] = useState('light');
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

  return (
    <div className="App" data-theme={theme}>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      
      <header className="App-header">
        <h1>QR Code Genie</h1>
        <p>Generate QR codes instantly and learn how they work!</p>
      </header>

      <main className="main-content">
        <div className="input-section">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text, URL, or any content to generate a QR code..."
            maxLength={2000}
          />
        </div>

        {text && (
          <div className="qr-code-section">
            <div className="qr-code-container" ref={qrRef}>
              <QRCode
                value={text}
                size={200}
                level="M"
                includeMargin={true}
              />
            </div>
            <button onClick={downloadQRCode} className="download-btn">
              Download QR Code
            </button>
          </div>
        )}

        {text && <Explanation text={text} />}
        
        <LearnMore />
      </main>

      <Footer />
    </div>
  );
}

export default App;
