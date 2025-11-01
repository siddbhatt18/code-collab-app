import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import LanguageSelector from './LanguageSelector';
import { getLanguageConfig } from '../../utils/languageConfig';
import { THEMES } from '../../utils/constants';
import './CodeEditor.css';

const CodeEditor = ({ 
  code, 
  language, 
  onChange, 
  onLanguageChange,
  theme = THEMES.DARK,
  readOnly = false 
}) => {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Configure editor options
    editor.updateOptions({
      fontSize: 14,
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      automaticLayout: true,
    });
  };

  const handleEditorChange = (value) => {
    if (onChange && !readOnly) {
      onChange(value || '');
    }
  };

  const languageConfig = getLanguageConfig(language);

  return (
    <div className="code-editor-container">
      <div className="editor-toolbar">
        <LanguageSelector
          selectedLanguage={language}
          onChange={onLanguageChange}
          disabled={readOnly}
        />
        <div className="editor-info">
          <span className="editor-label">Monaco Editor</span>
        </div>
      </div>
      
      <div className="editor-wrapper">
        <Editor
          height="100%"
          language={languageConfig.monaco}
          value={code}
          theme={theme}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            readOnly: readOnly,
            selectOnLineNumbers: true,
            roundedSelection: false,
            cursorStyle: 'line',
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;