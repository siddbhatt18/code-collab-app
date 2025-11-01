import React, { useState } from 'react';
import ActiveUsers from './ActiveUsers';
import Button from '../Common/Button';
import './CollaborationPanel.css';

const CollaborationPanel = ({ 
  users, 
  roomId, 
  onShareRoom,
  onSaveToGist 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyRoomId = () => {
    const roomUrl = `${window.location.origin}?room=${roomId}`;
    navigator.clipboard.writeText(roomUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="collaboration-panel">
      <div className="panel-section">
        <h3 className="section-title">🔗 Share Room</h3>
        <div className="room-share">
          <input 
            type="text" 
            value={roomId} 
            readOnly 
            className="room-input"
          />
          <Button 
            onClick={handleCopyRoomId}
            variant={copied ? 'success' : 'primary'}
            size="small"
          >
            {copied ? '✓ Copied!' : '📋 Copy'}
          </Button>
        </div>
        <p className="share-hint">
          Share this room ID with others to collaborate in real-time
        </p>
      </div>

      <div className="panel-section">
        <ActiveUsers users={users} />
      </div>

      <div className="panel-section">
        <h3 className="section-title">💾 Actions</h3>
        <div className="action-buttons">
          <Button 
            onClick={onSaveToGist}
            variant="secondary"
            icon="📤"
          >
            Save to GitHub Gist
          </Button>
        </div>
        <p className="action-hint">
          Optional: Connect GitHub to save your code
        </p>
      </div>
    </div>
  );
};

export default CollaborationPanel;