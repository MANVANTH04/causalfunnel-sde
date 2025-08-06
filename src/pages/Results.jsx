import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuizResultCharts from "../Components/QuizResultsCharts";
import QuizReviewList from "../Components/QuizReviewlist";
import QuizActions from "../Components/QuizActions";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    score = 0,
    questions = [],
    userAnswers = [],
    categoryCorrectness = {},
    totalTime = 0,
  } = location.state || {};

  // Redirect to /test if no data is available
  useEffect(() => {
    if (!location.state) {
      navigate("/test");
    }
  }, [location.state, navigate]);

  const handleDownload = () => {
    const content = `Quiz Results\n\nScore: ${score}/${questions.length}\n\n` +
      userAnswers
        .map(
          (item, idx) =>
            `Q${idx + 1}: ${item.question}\nYour Answer: ${item.selected}\nCorrect Answer: ${item.correct}\n`
        )
        .join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "quiz_results.txt";
    link.click();
  };

  const handleRestart = () => {
    navigate("/test");
  };

  return (
    <div className="results-screen">
      <h2 className="title">🎉 Quiz Completed!</h2>
      <p className="score">
        You scored <strong>{score}</strong> out of <strong>{questions.length}</strong> (
        {((score / (questions.length || 1)) * 100).toFixed(2)}%)
      </p>
      <p>⏱️ Time Taken: <strong>{totalTime} seconds</strong></p>

      <QuizResultCharts categoryCorrectness={categoryCorrectness} />
      <QuizReviewList userAnswers={userAnswers} />
      <QuizActions onRestart={handleRestart} onDownload={handleDownload} />
    </div>
  );
}

export default Results;