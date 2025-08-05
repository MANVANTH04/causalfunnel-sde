// components/QuizReviewList.jsx
import React from "react";

const QuizReviewList = ({ userAnswers }) => {
  return (
    <div className="question-review">
      {userAnswers.map((item, idx) => {
        const isCorrect = item.selected === item.correct;
        return (
          <div key={idx} className="question-card">
            <h3 className="question-text">Q{idx + 1}: {item.question}</h3>
            <div className="answer-block">
              <span className={`answer-icon ${isCorrect ? "correct" : "wrong"}`}>
                {isCorrect ? "✅" : "❌"}
              </span>
              <p>
                <strong>Your Answer:</strong>{" "}
                <span style={{ color: isCorrect ? "green" : "red" }}>{item.selected}</span>
              </p>
            </div>
            {!isCorrect && (
              <p>
                <strong>Correct Answer:</strong>{" "}
                <span style={{ color: "green" }}>{item.correct}</span>
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default QuizReviewList;