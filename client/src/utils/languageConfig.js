export const getLanguageConfig = (language) => {
  const configs = {
    javascript: {
      monaco: 'javascript',
      extension: '.js',
      aceMode: 'javascript'
    },
    typescript: {
      monaco: 'typescript',
      extension: '.ts',
      aceMode: 'typescript'
    },
    python: {
      monaco: 'python',
      extension: '.py',
      aceMode: 'python'
    },
    java: {
      monaco: 'java',
      extension: '.java',
      aceMode: 'java'
    },
    cpp: {
      monaco: 'cpp',
      extension: '.cpp',
      aceMode: 'c_cpp'
    },
    html: {
      monaco: 'html',
      extension: '.html',
      aceMode: 'html'
    },
    css: {
      monaco: 'css',
      extension: '.css',
      aceMode: 'css'
    },
    json: {
      monaco: 'json',
      extension: '.json',
      aceMode: 'json'
    }
  };

  return configs[language] || configs.javascript;
};