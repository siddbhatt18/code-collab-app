import React from 'react';
import './ActiveUsers.css';

const ActiveUsers = ({ users, currentUserId }) => {
  return (
    <div className="active-users">
      <h3 className="users-title">👥 Active Users ({users.length})</h3>
      <div className="users-list">
        {users.map((user) => (
          <div 
            key={user.socketId} 
            className={`user-item ${user.socketId === currentUserId ? 'current-user' : ''}`}
          >
            <div className="user-avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <span className="user-name">
                {user.username}
                {user.socketId === currentUserId && ' (You)'}
              </span>
            </div>
            <div className="user-status">🟢</div>
          </div>
        ))}
        
        {users.length === 0 && (
          <div className="no-users">
            <p>No other users in this room</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveUsers;