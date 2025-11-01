import React, { useState, useEffect } from 'react';
import Split from 'react-split';
import Header from './components/Layout/Header';
import CodeEditor from './components/Editor/CodeEditor';
import LivePreview from './components/Preview/LivePreview';
import CollaborationPanel from './components/Collaboration/CollaborationPanel';
import GitHubPanel from './components/GitHub/GitHubPanel';
import { useCollaboration } from './hooks/useCollaboration';
import socketService from './services/socket';
import { DEFAULT_CODE, THEMES } from './utils/constants';
import './App.css';

function App() {
  // Generate or get room ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const roomIdFromUrl = urlParams.get('room');
  
  const [roomId] = useState(() => {
    if (roomIdFromUrl) return roomIdFromUrl;
    return 'room-' + Math.random().toString(36).substr(2, 9);
  });

  const [username] = useState(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) return savedUsername;
    const newUsername = 'User' + Math.floor(Math.random() * 1000);
    localStorage.setItem('username', newUsername);
    return newUsername;
  });

  const [code, setCode] = useState(DEFAULT_CODE.javascript);
  const [language, setLanguage] = useState('javascript');
  const [showGitHub, setShowGitHub] = useState(false);
  const [theme] = useState(THEMES.DARK);

  const { users, isConnected, sendCodeChange, sendLanguageChange } = useCollaboration(roomId, username);

  // Listen for code updates from other users
  useEffect(() => {
    const handleCodeUpdate = ({ code: newCode, language: newLang }) => {
      setCode(newCode);
      if (newLang) setLanguage(newLang);
    };

    const handleLoadCode = ({ code: initialCode, language: initialLang }) => {
      setCode(initialCode);
      setLanguage(initialLang);
    };

    const handleLanguageUpdate = ({ language: newLang }) => {
      setLanguage(newLang);
      setCode(DEFAULT_CODE[newLang] || '');
    };

    socketService.on('code-update', handleCodeUpdate);
    socketService.on('load-code', handleLoadCode);
    socketService.on('language-update', handleLanguageUpdate);

    return () => {
      socketService.off('code-update', handleCodeUpdate);
      socketService.off('load-code', handleLoadCode);
      socketService.off('language-update', handleLanguageUpdate);
    };
  }, []);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    sendCodeChange(newCode, language);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(DEFAULT_CODE[newLanguage] || '');
    sendLanguageChange(newLanguage);
  };

  const handleShareRoom = () => {
    const roomUrl = `${window.location.origin}?room=${roomId}`;
    navigator.clipboard.writeText(roomUrl);
    alert('Room URL copied to clipboard!');
  };

  // Update URL without reload
  useEffect(() => {
    const url = new URL(window.location);
    url.searchParams.set('room', roomId);
    window.history.replaceState({}, '', url);
  }, [roomId]);

  return (
    <div className="app">
      <Header 
        roomId={roomId}
        username={username}
        onlineUsers={users.length}
        isConnected={isConnected}
      />

      <div className="app-content">
        <Split
          className="split-horizontal"
          sizes={[70, 30]}
          minSize={[400, 200]}
          gutterSize={8}
          cursor="col-resize"
        >
          <div className="editor-section">
            <Split
              className="split-vertical"
              direction="vertical"
              sizes={[60, 40]}
              minSize={[200, 150]}
              gutterSize={8}
              cursor="row-resize"
            >
              <CodeEditor
                code={code}
                language={language}
                onChange={handleCodeChange}
                onLanguageChange={handleLanguageChange}
                theme={theme}
              />
              <LivePreview 
                code={code} 
                language={language}
              />
            </Split>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-tabs">
              <button
                className={`tab ${!showGitHub ? 'active' : ''}`}
                onClick={() => setShowGitHub(false)}
              >
                👥 Collaboration
              </button>
              <button
                className={`tab ${showGitHub ? 'active' : ''}`}
                onClick={() => setShowGitHub(true)}
              >
                🐙 GitHub
              </button>
            </div>

            <div className="sidebar-content">
              {!showGitHub ? (
                <CollaborationPanel
                  users={users}
                  roomId={roomId}
                  onShareRoom={handleShareRoom}
                  onSaveToGist={() => setShowGitHub(true)}
                />
              ) : (
                <GitHubPanel
                  code={code}
                  language={language}
                />
              )}
            </div>
          </div>
        </Split>
      </div>
    </div>
  );
}

export default App;