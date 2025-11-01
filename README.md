# CodeCollab - Real-time Collaborative Code Editor

<div align="center">

![CodeCollab Logo](https://img.shields.io/badge/Code-Collab-2563eb?style=for-the-badge&logo=visual-studio-code&logoColor=white)

**A modern, minimal, and collaborative code editor built with React and Node.js**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-18.2.0-61dafb)](https://reactjs.org/)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Configuration](#configuration)
- [License](#license)
- [Contact](#contact)

---

## 🌟 Overview

**CodeCollab** is a real-time collaborative code editor that allows multiple users to write and edit code simultaneously. With built-in live preview for web languages, syntax highlighting powered by Monaco Editor, and optional GitHub integration, it's perfect for pair programming, coding interviews, teaching, or collaborative development.

### Why CodeCollab?

- 🚀 **Zero Setup for Collaborators** - Share a room link and start coding instantly
- 🎨 **Clean & Minimal UI** - Distraction-free interface with blue and white theme
- ⚡ **Real-time Sync** - See changes as they happen with WebSocket technology
- 🌐 **Live Preview** - Instant preview for HTML, CSS, and JavaScript
- 🔒 **Beginner Friendly** - No complex configuration required
- 💾 **Optional GitHub Integration** - Save your work as GitHub Gists

---

## ✨ Features

### Core Features (No API Required)

- ✅ **Real-time Collaboration**
  - Multiple users can code together in the same room
  - See active users and their online status
  - Automatic room creation and joining
  - Live cursor tracking and code synchronization

- ✅ **Monaco Editor Integration**
  - Powered by VS Code's editor engine
  - IntelliSense and auto-completion
  - Syntax highlighting for all major languages
  - Customizable themes (Dark, Light, High Contrast)

- ✅ **Live Preview Panel**
  - Real-time HTML rendering
  - JavaScript console output capture
  - CSS preview with demo elements
  - Error handling and display

- ✅ **Multi-Language Support**
  - JavaScript
  - TypeScript
  - Python
  - Java
  - C++
  - HTML
  - CSS
  - JSON

- ✅ **User Management**
  - Automatic username generation
  - Active users list
  - Connection status indicators
  - User avatars

### Optional Features (Requires API Keys)

- 🔧 **GitHub Integration**
  - Save code as private GitHub Gists
  - Version control integration
  - Easy sharing via Gist URLs

---

## 🛠 Tech Stack

### Frontend
- **React.js** (v18.2.0) - UI framework
- **Monaco Editor** - Code editor component
- **Socket.io-client** - Real-time communication
- **React-Split** - Resizable panels
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.io** - WebSocket server
- **CORS** - Cross-origin resource sharing

### Development Tools
- **Nodemon** - Auto-restart server
- **Create React App** - React boilerplate
- **dotenv** - Environment variables

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher)
- **Git** (optional, for cloning)

### Check Installation

```bash
node --version
# Should output: v14.0.0 or higher

npm --version
# Should output: v6.0.0 or higher
```

### Install Node.js

If not installed, download from [nodejs.org](https://nodejs.org/)

---

## 🚀 Installation

### Method 1: Clone from GitHub (if available)

```bash
# Clone the repository
git clone https://github.com/yourusername/code-collab.git

# Navigate to project directory
cd code-collab
```

### Method 2: Manual Setup

Follow the project structure to create all files as shown in the [Project Structure](#project-structure) section.

### Install Dependencies

#### 1. Install Server Dependencies

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install
```

**Installed packages:**
- express
- socket.io
- cors
- dotenv
- axios
- nodemon (dev dependency)

#### 2. Install Client Dependencies

```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
npm install
```

**Installed packages:**
- react & react-dom
- @monaco-editor/react
- socket.io-client
- axios
- react-split

---

## 🎮 Running the Application

You need to run both the server and client simultaneously.

### Quick Start

#### Terminal 1 - Start the Server

```bash
cd server
npm run dev
```

**Expected output:**
```
[nodemon] starting `node src/server.js`
Server running on port 5000
```

#### Terminal 2 - Start the Client

```bash
cd client
npm start
```

**Expected output:**
```
Compiled successfully!

You can now view code-editor-client in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

### Alternative: Run Both with One Command

#### Option 1: Install concurrently (Recommended)

```bash
# In project root
npm init -y
npm install concurrently --save-dev
```

Add to `package.json` in root:

```json
{
  "scripts": {
    "server": "cd server && npm run dev",
    "client": "cd client && npm start",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  }
}
```

Then run:

```bash
npm run dev
```

#### Option 2: Use shell script

Create `start.sh` in root:

```bash
#!/bin/bash
cd server && npm run dev &
cd client && npm start
```

Make executable and run:

```bash
chmod +x start.sh
./start.sh
```

### Stopping the Application

Press `Ctrl + C` in each terminal window to stop the servers.

---

## 📁 Project Structure

```
code-editor/
│
├── client/                          # React Frontend Application
│   ├── public/
│   │   ├── index.html              # HTML template
│   │   └── favicon.ico             # App icon
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Editor/
│   │   │   │   ├── CodeEditor.jsx           # Main code editor component
│   │   │   │   ├── CodeEditor.css
│   │   │   │   └── LanguageSelector.jsx     # Language dropdown
│   │   │   │
│   │   │   ├── Preview/
│   │   │   │   ├── LivePreview.jsx          # Live preview panel
│   │   │   │   └── LivePreview.css
│   │   │   │
│   │   │   ├── Collaboration/
│   │   │   │   ├── CollaborationPanel.jsx   # Collaboration features
│   │   │   │   ├── CollaborationPanel.css
│   │   │   │   ├── ActiveUsers.jsx          # Active users list
│   │   │   │   └── ActiveUsers.css
│   │   │   │
│   │   │   ├── GitHub/
│   │   │   │   ├── GitHubPanel.jsx          # GitHub integration (optional)
│   │   │   │   └── GitHubPanel.css
│   │   │   │
│   │   │   ├── Layout/
│   │   │   │   ├── Header.jsx               # App header
│   │   │   │   └── Layout.css
│   │   │   │
│   │   │   └── Common/
│   │   │       ├── Button.jsx               # Reusable button component
│   │   │       └── Button.css
│   │   │
│   │   ├── hooks/
│   │   │   ├── useCollaboration.js          # Collaboration logic hook
│   │   │   └── useCodeExecution.js          # Code execution hook
│   │   │
│   │   ├── services/
│   │   │   ├── socket.js                    # Socket.io client service
│   │   │   └── githubService.js             # GitHub API service (optional)
│   │   │
│   │   ├── utils/
│   │   │   ├── languageConfig.js            # Language configurations
│   │   │   └── constants.js                 # App constants
│   │   │
│   │   ├── styles/
│   │   │   └── global.css                   # Global styles
│   │   │
│   │   ├── App.jsx                          # Main App component
│   │   ├── App.css                          # App styles
│   │   └── index.js                         # React entry point
│   │
│   ├── package.json                 # Client dependencies
│   ├── .env                        # Environment variables
│   └── .env.example                # Environment template
│
├── server/                         # Node.js Backend Application
│   ├── src/
│   │   ├── socket/
│   │   │   └── socketHandler.js            # Socket event handlers
│   │   │
│   │   ├── services/
│   │   │   └── collaborationService.js     # Collaboration logic
│   │   │
│   │   └── server.js                       # Main server file
│   │
│   ├── package.json                # Server dependencies
│   ├── .env                       # Environment variables
│   └── .env.example               # Environment template
│
├── .gitignore                     # Git ignore file
├── README.md                      # This file
└── LICENSE                        # MIT License

```

### Key Files Explained

| File | Purpose |
|------|---------|
| `client/src/App.jsx` | Main React component, handles state and layout |
| `server/src/server.js` | Express server with Socket.io integration |
| `client/src/services/socket.js` | WebSocket client service |
| `client/src/components/Editor/CodeEditor.jsx` | Monaco editor wrapper |
| `client/src/components/Preview/LivePreview.jsx` | Live preview iframe handler |
| `client/src/hooks/useCollaboration.js` | Real-time collaboration logic |

---

## 📖 Usage Guide

### 1. Starting a New Coding Session

1. Open the application at `http://localhost:3000`
2. You'll be automatically assigned:
   - A random username (e.g., "User123")
   - A unique room ID (e.g., "room-abc123")
3. Start coding immediately!

### 2. Inviting Collaborators

**Method A: Share Room URL**
1. Copy the URL from your browser (e.g., `http://localhost:3000?room=room-abc123`)
2. Send it to your collaborators
3. They open the link and join your room automatically

**Method B: Share Room ID**
1. Click the "Copy" button in the Collaboration panel
2. Send the room URL to others
3. They can paste it in their browser

### 3. Changing Programming Language

1. Use the dropdown in the editor toolbar
2. Select from: JavaScript, TypeScript, Python, Java, C++, HTML, CSS, JSON
3. The editor will update syntax highlighting
4. All collaborators will see the language change

### 4. Using Live Preview

**For HTML:**
- Write HTML code
- See instant preview in the right panel
- Includes CSS and JavaScript if embedded

**For JavaScript:**
- Write JavaScript code
- See `console.log()` output in preview
- Errors are displayed in red

**For CSS:**
- Write CSS rules
- See styled demo elements
- Preview updates in real-time

**Note:** Live preview only works for HTML, CSS, and JavaScript

### 5. Saving to GitHub (Optional)

1. Create a GitHub Personal Access Token:
   - Go to https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Select scope: `gist`
   - Copy the token

2. In CodeCollab:
   - Click the "GitHub" tab
   - Paste your token
   - Click "Save Token"
   - Enter filename and description
   - Click "Save as Gist"

3. View your Gist:
   - Click the provided link
   - Share with others
   - Fork or clone as needed

### 6. Collaboration Features

**Active Users List:**
- See all users in the room
- Your name is highlighted
- Green dot indicates online status

**Real-time Sync:**
- Code changes sync instantly
- Language changes sync automatically
- All users see the same content

**Room Persistence:**
- Rooms exist as long as users are connected
- Code is preserved during the session
- Last user leaving clears the room

---

## ⚙️ Configuration

### Environment Variables

#### Server Configuration (`server/.env`)

```env
# Server Port
PORT=5000

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000

# GitHub Integration (Optional)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

#### Client Configuration (`client/.env`)

```env
# API Endpoints
REACT_APP_SOCKET_URL=http://localhost:5000
REACT_APP_API_URL=http://localhost:5000

# GitHub (Optional)
REACT_APP_GITHUB_OAUTH_URL=https://github.com/login/oauth/authorize
```

### Customization

#### Change Default Theme

Edit `client/src/utils/constants.js`:

```javascript
export const THEMES = {
  DARK: 'vs-dark',    // Default
  LIGHT: 'light',
  HC_BLACK: 'hc-black'
};
```

#### Change Default Language

Edit `client/src/App.jsx`:

```javascript
const [language, setLanguage] = useState('javascript'); // Change to 'python', 'html', etc.
```

#### Modify Color Scheme

Edit `client/src/styles/global.css`:

```css
:root {
  --primary-blue: #2563eb;     /* Change primary color */
  --primary-blue-dark: #1e40af;
  /* ... other colors */
}
```

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2024 CodeCollab

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

See [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Contact

- Siddharth Bhattacharya - [LinkedIn](https://www.linkedin.com/in/siddharth-bhattacharya-8b9710247/) |  [Github](https://github.com/siddbhatt18/)

---

**Made with ❤️ by developers, for developers**
