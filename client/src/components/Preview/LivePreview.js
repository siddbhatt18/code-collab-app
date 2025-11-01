import React, { useEffect, useRef, useState } from 'react';
import './LivePreview.css';

const LivePreview = ({ code, language }) => {
  const iframeRef = useRef(null);
  const [error, setError] = useState(null);
  const [iframeReady, setIframeReady] = useState(false);

  // Handle iframe load
  const handleIframeLoad = () => {
    setIframeReady(true);
  };

  useEffect(() => {
    if (iframeReady && (language === 'html' || language === 'javascript' || language === 'css')) {
      updatePreview();
    }
  }, [code, language, iframeReady]);

  const updatePreview = () => {
    try {
      setError(null);
      const iframe = iframeRef.current;
      
      if (!iframe) {
        console.warn('Iframe ref is null');
        return;
      }

      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (!iframeDoc) {
        console.warn('Cannot access iframe document');
        return;
      }
      
      let htmlContent = '';

      if (language === 'html') {
        htmlContent = code;
      } else if (language === 'javascript') {
        htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                padding: 20px;
                background: #f5f5f5;
                margin: 0;
              }
              #output {
                background: white;
                padding: 15px;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                min-height: 100px;
              }
              .console-log {
                margin: 5px 0;
                padding: 8px;
                background: #f0f0f0;
                border-radius: 4px;
                border-left: 3px solid #667eea;
                font-family: 'Courier New', monospace;
                font-size: 14px;
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              .console-error {
                margin: 5px 0;
                padding: 10px;
                background: #fee;
                color: #c53030;
                border-radius: 4px;
                border-left: 3px solid #f56565;
                font-family: 'Courier New', monospace;
                font-size: 14px;
              }
              .output-header {
                color: #718096;
                font-size: 12px;
                margin-bottom: 10px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              }
            </style>
          </head>
          <body>
            <div id="output">
              <div class="output-header">Console Output:</div>
            </div>
            <script>
              (function() {
                const outputDiv = document.getElementById('output');
                
                // Capture console.log
                const originalLog = console.log;
                console.log = function(...args) {
                  const message = args.map(arg => {
                    if (typeof arg === 'object' && arg !== null) {
                      try {
                        return JSON.stringify(arg, null, 2);
                      } catch (e) {
                        return String(arg);
                      }
                    }
                    return String(arg);
                  }).join(' ');
                  
                  const logDiv = document.createElement('div');
                  logDiv.className = 'console-log';
                  logDiv.textContent = message;
                  outputDiv.appendChild(logDiv);
                  originalLog.apply(console, args);
                };
                
                // Capture console.error
                const originalError = console.error;
                console.error = function(...args) {
                  const message = args.map(arg => String(arg)).join(' ');
                  const errorDiv = document.createElement('div');
                  errorDiv.className = 'console-error';
                  errorDiv.textContent = 'Error: ' + message;
                  outputDiv.appendChild(errorDiv);
                  originalError.apply(console, args);
                };
                
                // Capture runtime errors
                window.onerror = function(msg, url, lineNo, columnNo, error) {
                  const errorDiv = document.createElement('div');
                  errorDiv.className = 'console-error';
                  errorDiv.textContent = 'Runtime Error: ' + msg;
                  outputDiv.appendChild(errorDiv);
                  return false;
                };
                
                // Execute user code
                try {
                  ${code}
                } catch(e) {
                  console.error(e.message);
                }
              })();
            </script>
          </body>
          </html>
        `;
      } else if (language === 'css') {
        htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              body {
                padding: 20px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              }
              ${code}
            </style>
          </head>
          <body>
            <div class="preview-content">
              <h1>CSS Preview</h1>
              <h2>Subheading Example</h2>
              <p>This is a paragraph to demonstrate your CSS styles. You can add classes and style various elements.</p>
              <button>Button Element</button>
              <div class="box">
                <p>Box Element</p>
              </div>
              <ul>
                <li>List item 1</li>
                <li>List item 2</li>
                <li>List item 3</li>
              </ul>
              <a href="#" onclick="return false;">Link Element</a>
            </div>
          </body>
          </html>
        `;
      }

      // Write to iframe
      iframeDoc.open();
      iframeDoc.write(htmlContent);
      iframeDoc.close();
    } catch (err) {
      console.error('Preview error:', err);
      setError(err.message);
    }
  };

  const isPreviewable = ['html', 'javascript', 'css'].includes(language);

  return (
    <div className="live-preview-container">
      <div className="preview-toolbar">
        <span className="preview-title">🔍 Live Preview</span>
        {!isPreviewable && (
          <span className="preview-notice">
            Preview only available for HTML, CSS, and JavaScript
          </span>
        )}
      </div>
      
      {error && (
        <div className="preview-error">
          <strong>Preview Error:</strong> {error}
        </div>
      )}
      
      <div className="preview-content">
        {isPreviewable ? (
          <iframe
            ref={iframeRef}
            title="preview"
            className="preview-iframe"
            sandbox="allow-scripts allow-same-origin"
            onLoad={handleIframeLoad}
          />
        ) : (
          <div className="preview-placeholder">
            <div className="placeholder-content">
              <span className="placeholder-icon">📝</span>
              <h3>No Preview Available</h3>
              <p>Select HTML, CSS, or JavaScript to see live preview</p>
              <div className="supported-languages">
                <span className="lang-badge">HTML</span>
                <span className="lang-badge">CSS</span>
                <span className="lang-badge">JavaScript</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePreview;