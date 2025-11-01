import React, { useState } from 'react';
import Button from '../Common/Button';
import './GitHubPanel.css';

const GitHubPanel = ({ onSaveGist, code, language }) => {
  const [token, setToken] = useState(localStorage.getItem('github_token') || '');
  const [filename, setFilename] = useState('code.js');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState(null);

  const handleSaveToken = () => {
    localStorage.setItem('github_token', token);
    setResult({ type: 'success', message: 'Token saved successfully!' });
    setTimeout(() => setResult(null), 3000);
  };

  const handleSaveGist = async () => {
    if (!token) {
      setResult({ type: 'error', message: 'Please add your GitHub token first' });
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/github/gist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          code,
          description: description || 'Code from CodeCollab',
          filename: filename || 'code.js'
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setResult({ 
          type: 'success', 
          message: 'Gist created successfully!',
          url: data.gist.html_url
        });
      } else {
        setResult({ type: 'error', message: data.error || 'Failed to create gist' });
      }
    } catch (error) {
      setResult({ type: 'error', message: error.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="github-panel">
      <h3 className="panel-title">🐙 GitHub Integration</h3>
      
      <div className="github-section">
        <label htmlFor="token">GitHub Personal Access Token:</label>
        <input
          id="token"
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="ghp_xxxxxxxxxxxx"
          className="github-input"
        />
        <Button onClick={handleSaveToken} size="small">
          Save Token
        </Button>
        <p className="github-hint">
          Create a token at{' '}
          <a 
            href="https://github.com/settings/tokens" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            GitHub Settings
          </a>
          {' '}with 'gist' scope
        </p>
      </div>

      <div className="github-section">
        <label htmlFor="filename">Filename:</label>
        <input
          id="filename"
          type="text"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          placeholder="code.js"
          className="github-input"
        />
      </div>

      <div className="github-section">
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional description"
          className="github-input"
        />
      </div>

      <Button 
        onClick={handleSaveGist} 
        disabled={saving || !token}
        variant="success"
      >
        {saving ? 'Saving...' : '💾 Save as Gist'}
      </Button>

      {result && (
        <div className={`github-result ${result.type}`}>
          <p>{result.message}</p>
          {result.url && (
            <a href={result.url} target="_blank" rel="noopener noreferrer">
              View Gist →
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default GitHubPanel;