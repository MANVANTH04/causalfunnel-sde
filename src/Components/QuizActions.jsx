// components/QuizActions.jsx
import React from "react";

const QuizActions = ({ onRestart, onDownload }) => {
  return (
    <div className="result-actions">
      <button onClick={onRestart} className="restart-btn">🔄 Restart Quiz</button>
      <button onClick={onDownload} className="restart-btn">📄 Download PDF</button>
    </div>
  );
};

export default QuizActions;