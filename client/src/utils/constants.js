export const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

export const LANGUAGES = [
  { id: 'javascript', name: 'JavaScript', icon: '🟨' },
  { id: 'typescript', name: 'TypeScript', icon: '🔷' },
  { id: 'python', name: 'Python', icon: '🐍' },
  { id: 'java', name: 'Java', icon: '☕' },
  { id: 'cpp', name: 'C++', icon: '⚙️' },
  { id: 'html', name: 'HTML', icon: '🌐' },
  { id: 'css', name: 'CSS', icon: '🎨' },
  { id: 'json', name: 'JSON', icon: '📋' },
];

export const DEFAULT_CODE = {
  javascript: `// Welcome to CodeCollab!
// Write JavaScript code and see output in the preview panel

console.log("Hello, World!");

// Example: Calculate sum
function sum(a, b) {
  return a + b;
}

console.log("Sum of 5 + 3 =", sum(5, 3));

// Example: Array operations
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);

// Try your own code below!
`,

  typescript: `// Welcome to CodeCollab!
// TypeScript example

const greeting: string = "Hello, World!";
console.log(greeting);

interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "John Doe",
  age: 30
};

console.log("User:", user);
`,

  python: `# Welcome to CodeCollab!
# Python code editor (preview not available)

print("Hello, World!")

def greet(name):
    return f"Hello, {name}!"

print(greet("Python Developer"))

# Try your own code below!
`,

  java: `// Welcome to CodeCollab!
// Java code editor (preview not available)

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        String name = "Java Developer";
        System.out.println("Welcome, " + name);
    }
}
`,

  cpp: `// Welcome to CodeCollab!
// C++ code editor (preview not available)

#include <iostream>
#include <string>

int main() {
    std::cout << "Hello, World!" << std::endl;
    
    std::string name = "C++ Developer";
    std::cout << "Welcome, " << name << std::endl;
    
    return 0;
}
`,

  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CodeCollab - Live Preview</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            min-height: 100vh;
            padding: 2rem;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 3rem;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(37, 99, 235, 0.1);
        }
        
        h1 {
            color: #2563eb;
            margin-bottom: 1rem;
            font-size: 2.5rem;
        }
        
        p {
            color: #64748b;
            line-height: 1.7;
            margin-bottom: 1.5rem;
        }
        
        button {
            background: #2563eb;
            color: white;
            border: none;
            padding: 12px 28px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.2s;
        }
        
        button:hover {
            background: #1e40af;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }
        
        .badge {
            display: inline-block;
            background: #eff6ff;
            color: #2563eb;
            padding: 0.5rem 1rem;
            border-radius: 50px;
            font-size: 0.875rem;
            font-weight: 600;
            margin-top: 1rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Welcome to CodeCollab!</h1>
        <p>This is a live HTML preview. Edit the code and see changes in real-time!</p>
        <button onclick="alert('Hello from CodeCollab!')">Click Me!</button>
        <div class="badge">✨ Clean & Minimal Design</div>
    </div>
</body>
</html>
`,

  css: `/* Welcome to CodeCollab! */
/* Edit CSS and see live preview */

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    min-height: 100vh;
    padding: 2rem;
}

.preview-content {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 3rem;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(37, 99, 235, 0.1);
}

h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #2563eb;
    font-weight: 700;
}

h2 {
    font-size: 1.75rem;
    margin: 2rem 0 1rem;
    color: #1e40af;
    font-weight: 600;
}

p {
    line-height: 1.7;
    margin-bottom: 1rem;
    color: #64748b;
}

button {
    background: #2563eb;
    color: white;
    border: none;
    padding: 12px 28px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.2s ease;
    margin: 1rem 0;
}

button:hover {
    background: #1e40af;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.box {
    background: #eff6ff;
    padding: 1.5rem;
    margin: 1.5rem 0;
    border-radius: 12px;
    border-left: 4px solid #2563eb;
}

.box p {
    color: #1e40af;
    font-weight: 500;
    margin: 0;
}

ul {
    list-style: none;
    padding: 0;
    margin: 1rem 0;
}

li {
    padding: 0.75rem 0;
    padding-left: 1.5rem;
    position: relative;
    color: #64748b;
}

li:before {
    content: "→";
    position: absolute;
    left: 0;
    color: #2563eb;
    font-weight: bold;
}

a {
    color: #2563eb;
    text-decoration: none;
    font-weight: 600;
    border-bottom: 2px solid #dbeafe;
    transition: all 0.2s ease;
}

a:hover {
    border-bottom-color: #2563eb;
    color: #1e40af;
}
`,

  json: `{
  "name": "CodeCollab",
  "version": "1.0.0",
  "description": "Real-time collaborative code editor",
  "theme": "Blue & White Minimal",
  "features": [
    "Real-time collaboration",
    "Live preview",
    "Multi-language support",
    "GitHub integration",
    "Clean minimal UI"
  ],
  "languages": {
    "web": ["HTML", "CSS", "JavaScript"],
    "programming": ["Python", "Java", "C++"],
    "data": ["JSON"]
  },
  "design": {
    "primaryColor": "#2563eb",
    "style": "Minimal & Clean",
    "typography": "System fonts"
  },
  "license": "MIT"
}
`
};

export const THEMES = {
  DARK: 'vs-dark',
  LIGHT: 'light',
  HC_BLACK: 'hc-black'
};