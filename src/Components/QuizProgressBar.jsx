// components/QuizProgressBar.jsx
import React from "react";

const QuizProgressBar = ({ current, total }) => {
  const percentage = ((current + 1) / total) * 100;

  return (
    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default QuizProgressBar;