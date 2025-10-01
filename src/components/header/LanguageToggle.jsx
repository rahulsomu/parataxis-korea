import React from "react";
import "./LanguageToggle.css";

const LanguageToggle = ({ language, onToggle }) => {
  const handleToggle = (newLanguage) => {
    if (newLanguage !== language) {
      onToggle(newLanguage);
    }
  };

  return (
    <div className="language-toggle">
      <button
        className={`toggle-btn ${language === "kr" ? "active" : ""}`}
        onClick={() => handleToggle("kr")}
        disabled={language === "kr"}
      >
        KR
      </button>
      <button
        className={`toggle-btn ${language === "en" ? "active" : ""}`}
        onClick={() => handleToggle("en")}
        disabled={language === "en"}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
