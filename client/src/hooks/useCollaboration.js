import { useState, useEffect, useCallback } from 'react';
import socketService from '../services/socket';

export const useCollaboration = (roomId, username) => {
  const [users, setUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!roomId || !username) return;

    const socket = socketService.connect();

    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('join-room', { roomId, username });
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('users-list', (usersList) => {
      setUsers(usersList);
    });

    socket.on('user-joined', ({ username: newUser, users: updatedUsers }) => {
      setUsers(updatedUsers);
    });

    socket.on('user-left', ({ username: leftUser, users: updatedUsers }) => {
      setUsers(updatedUsers);
    });

    return () => {
      socketService.disconnect();
    };
  }, [roomId, username]);

  const sendCodeChange = useCallback((code, language) => {
    socketService.emit('code-change', { roomId, code, language });
  }, [roomId]);

  const sendLanguageChange = useCallback((language) => {
    socketService.emit('language-change', { roomId, language });
  }, [roomId]);

  return {
    users,
    isConnected,
    sendCodeChange,
    sendLanguageChange
  };
};