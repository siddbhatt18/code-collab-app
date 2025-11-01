import React from 'react';
import './Layout.css';

const Header = ({ roomId, username, onlineUsers, isConnected }) => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <svg className="logo-icon" width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M8 3L4 7L8 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 3L20 7L16 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 3L10 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="logo-text">CodeCollab</span>
        </div>
        
        {roomId && (
          <div className="room-info">
            <span className="room-label">Room</span>
            <span className="room-id">{roomId}</span>
          </div>
        )}
      </div>
      
      <div className="header-right">
        <div className="header-stats">
          <div className="stat-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M6 21C6 17.134 8.686 14 12 14C15.314 14 18 17.134 18 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>{username}</span>
          </div>
          
          <div className="stat-item">
            <div className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`}></div>
            <span>{isConnected ? 'Online' : 'Offline'}</span>
          </div>
          
          <div className="stat-item users">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="2"/>
              <circle cx="15" cy="10" r="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M3 21C3 17.686 5.686 15 9 15C12.314 15 15 17.686 15 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M15 19C15 16.791 16.791 15 19 15C21.209 15 23 16.791 23 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>{onlineUsers}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;