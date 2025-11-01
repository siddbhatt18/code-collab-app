const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Socket.IO setup
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Store active rooms and their code states
const rooms = new Map();

// Socket event handlers
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Join a collaboration room
  socket.on('join-room', ({ roomId, username }) => {
    socket.join(roomId);
    
    // Initialize room if it doesn't exist
    if (!rooms.has(roomId)) {
      rooms.set(roomId, {
        code: '// Start coding...',
        language: 'javascript',
        users: new Map()
      });
    }

    const room = rooms.get(roomId);
    room.users.set(socket.id, { username, socketId: socket.id });

    // Send current code state to the new user
    socket.emit('load-code', {
      code: room.code,
      language: room.language
    });

    // Notify others about new user
    socket.to(roomId).emit('user-joined', {
      username,
      socketId: socket.id,
      users: Array.from(room.users.values())
    });

    // Send current users list to the new user
    socket.emit('users-list', Array.from(room.users.values()));

    console.log(`${username} joined room: ${roomId}`);
  });

  // Handle code changes
  socket.on('code-change', ({ roomId, code, language }) => {
    if (rooms.has(roomId)) {
      const room = rooms.get(roomId);
      room.code = code;
      if (language) room.language = language;
      
      // Broadcast to all other users in the room
      socket.to(roomId).emit('code-update', { code, language });
    }
  });

  // Handle language change
  socket.on('language-change', ({ roomId, language }) => {
    if (rooms.has(roomId)) {
      rooms.get(roomId).language = language;
      socket.to(roomId).emit('language-update', { language });
    }
  });

  // Handle cursor position (optional feature)
  socket.on('cursor-move', ({ roomId, position, username }) => {
    socket.to(roomId).emit('cursor-update', { position, username, socketId: socket.id });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    
    // Remove user from all rooms
    rooms.forEach((room, roomId) => {
      if (room.users.has(socket.id)) {
        const user = room.users.get(socket.id);
        room.users.delete(socket.id);
        
        // Notify others
        io.to(roomId).emit('user-left', {
          username: user.username,
          socketId: socket.id,
          users: Array.from(room.users.values())
        });

        // Clean up empty rooms
        if (room.users.size === 0) {
          rooms.delete(roomId);
        }
      }
    });
  });
});

// REST API endpoints
app.get('/health', (req, res) => {
  res.json({ status: 'ok', rooms: rooms.size });
});

// GitHub API endpoints (Optional)
app.post('/api/github/gist', async (req, res) => {
  try {
    const { code, description, filename } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'GitHub token required' });
    }

    const axios = require('axios');
    const response = await axios.post(
      'https://api.github.com/gists',
      {
        description: description || 'Code from Web Editor',
        public: false,
        files: {
          [filename || 'code.js']: {
            content: code
          }
        }
      },
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json'
        }
      }
    );

    res.json({ success: true, gist: response.data });
  } catch (error) {
    console.error('GitHub API error:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || 'Failed to create gist' });
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});