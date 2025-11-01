import React from 'react';
import { LANGUAGES } from '../../utils/constants';

const LanguageSelector = ({ selectedLanguage, onChange, disabled }) => {
  return (
    <div className="language-selector">
      <label htmlFor="language">Language:</label>
      <select
        id="language"
        value={selectedLanguage}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="language-select"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.id} value={lang.id}>
            {lang.icon} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;