import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Explanation from './components/Explanation';
import LearnMore from './components/LearnMore';
import ThemeToggle from './components/ThemeToggle';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [text, setText] = useState('https://www.google.com');
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleDownload = () => {
    const svg = document.getElementById('qr-code-svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = 'qr-code.png';
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    }
  };

  return (
    <div className="App" data-theme={theme}>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <header className="App-header">
        <h1>QR Code Genie</h1>
        <p>Enter text or a URL below to generate a QR code in real-time.</p>
      </header>
      <main className="main-content">
        <div className="input-section">
          <textarea
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Type something..."
          />
        </div>
        <div className="qr-code-section">
          {text && (
            <div className="qr-code-container">
              <QRCodeSVG
                id="qr-code-svg"
                value={text}
                size={256}
                level={"H"}
                includeMargin={true}
              />
            </div>
          )}
          <button className="download-btn" onClick={handleDownload}>
            Download QR Code
          </button>
        </div>
        <Explanation text={text} />
        <LearnMore />
      </main>
      <Footer />
    </div>
  );
}

export default App;
