// components/QuizStart.jsx
import React from "react";

const QuizStart = ({ onStart }) => {
  return (
    <div className="quiz-container center">
      <h1 className="start-title">🚀 Welcome to the Quiz!</h1>
      <p className="start-description">
        You’ll have 15 seconds per question. Let’s test your skills!
      </p>
      <button className="btn" onClick={onStart}>
        Start Quiz
      </button>
    </div>
  );
};

export default QuizStart;