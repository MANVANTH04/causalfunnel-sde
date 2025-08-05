import QuizTimer from "./QuizTimer";

function QuizQuestion({
  question,
  index,
  total,
  selected,
  score,
  timeLeft,
  handleAnswer,
}) {
  if (!question) return null; // 👈 prevent crash if question is not ready

  return (
    <>
      <div className="quiz-header">
        <QuizTimer timeLeft={timeLeft} />
        <div className="quiz-score">🎯 Score: {score}</div>
      </div>

      <div className="question-meta">
        <p className="question-number">Question {index + 1} of {total}</p>
        <p className="question-category">📚 Category: {question.category}</p>
      </div>

      <h2 className="quiz-question">Q{index + 1}: {question.question}</h2>

      <div className="quiz-options">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(option)}
            disabled={selected || selected === "timeout"}
            className={`quiz-option ${
              selected
                ? option === question.correct
                  ? "correct"
                  : option === selected
                  ? "wrong"
                  : "disabled"
                : ""
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );
}

export default QuizQuestion;