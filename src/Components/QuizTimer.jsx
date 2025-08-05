// components/QuizTimer.jsx
import React from "react";

const QuizTimer = ({ timeLeft }) => {
  const dashArray = `${(timeLeft / 15) * 100}, 100`;

  return (
    <div className="circle-timer">
      <svg viewBox="0 0 36 36" className="circular-chart">
        <path
          className="circle-bg"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="circle"
          strokeDasharray={dashArray}
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="18" y="20.35" className="timer-text" textAnchor="middle">
          {timeLeft}s
        </text>
      </svg>
    </div>
  );
};

export default QuizTimer;