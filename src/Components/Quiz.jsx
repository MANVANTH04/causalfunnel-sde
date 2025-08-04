import { useEffect, useState, useRef } from "react";

const QUIZ_API = "https://opentdb.com/api.php?amount=15&type=multiple";

function decodeHTML(str) {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

function shuffleOptions(correct, incorrect) {
  return [...incorrect, correct].sort(() => Math.random() - 0.5);
}

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const fetched = useRef(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showStart, setShowStart] = useState(true);
  const restartQuiz = async () => {
  setLoading(true);
  setQuestions([]);
  setCurrent(0);
  setScore(0);
  setSelected(null);
  setTimeLeft(15);

  try {
    const res = await fetch(QUIZ_API);
    const data = await res.json();
    if (data.response_code === 0) {
      const parsed = data.results.map((q) => ({
        question: decodeHTML(q.question),
        correct: decodeHTML(q.correct_answer),
        options: shuffleOptions(
          decodeHTML(q.correct_answer),
          q.incorrect_answers.map(decodeHTML)
        ),
      }));
      setQuestions(parsed);
      setLoading(false);
    } else {
      throw new Error("Invalid response");
    }
  } catch (err) {
    console.error(err);
    alert("Error restarting quiz");
  }
};

useEffect(() => {
  if (fetched.current) return; 
  fetched.current = true;

  const fetchQuiz = async () => {
    try {
      const res = await fetch(QUIZ_API);
      const data = await res.json();
      if (data.response_code === 0) {
        const parsed = data.results.map((q) => ({
          question: decodeHTML(q.question),
          correct: decodeHTML(q.correct_answer),
          options: shuffleOptions(decodeHTML(q.correct_answer), q.incorrect_answers.map(decodeHTML))
        }));
        setQuestions(parsed);
        setLoading(false);
      } else {
        throw new Error("Invalid response");
      }
    } catch (err) {
      console.error(err);
      alert("Error loading quiz");
    }
  };

  fetchQuiz();
}, []);

useEffect(() => {
  if (!questions.length || selected) return;

  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev === 1) {
        // Auto-advance to next question
        setSelected("timeout"); // fake selected to disable buttons
        setTimeout(() => {
          setSelected(null);
          setCurrent((prev) => prev + 1);
          setTimeLeft(15);
        }, 1000);
        clearInterval(timer);
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer); 
}, [questions, current, selected]);



const handleAnswer = (choice) => {
  if (selected) return;
  if (choice === questions[current].correct) {
    setScore(score + 1);
  }
  setSelected(choice);
  setTimeout(() => {
    setSelected(null);
    setCurrent(current + 1);
    setTimeLeft(15); 
  }, 1000);
};

  if (loading) return (
  <div className="flex justify-center items-center min-h-screen bg-gray-900">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
  </div>
);
 if (current >= questions.length)
  return (
    <div className="text-white text-center mt-10">
      <h2 className="text-3xl font-bold mb-2">🎉 Quiz Completed!</h2>
      <p className="text-xl">You scored <span className="font-semibold">{score}</span> out of <span className="font-semibold">{questions.length}</span></p>
      <p className="text-lg mt-2 text-green-400">{((score / questions.length) * 100).toFixed(2)}%</p>

      <button
        onClick={restartQuiz}
        className="mt-6 bg-blue-600 px-6 py-2 rounded hover:bg-blue-700"
      >
        🔄 Restart Quiz
      </button>
    </div>
  );

  const q = questions[current];

  if (showStart) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white bg-gray-900 p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">🚀 Welcome to the Quiz!</h1>
      <p className="text-lg mb-6">You’ll have 15 seconds per question. Let’s test your skills!</p>
      <button
        onClick={() => setShowStart(false)}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white text-lg transition-all duration-300"
      >
        Start Quiz
      </button>
    </div>
  );
}

 return (
  <div className="max-w-xl mx-auto mt-10 text-white p-4">
    <div className="flex justify-between items-center mb-4">
      <span className="text-sm text-gray-400">Time Left: {timeLeft}s</span>
      <span className="text-sm text-gray-400">Score: {score}</span>
    </div>
    <div className="transition-all duration-300 ease-in-out">
    <h2 className="text-xl font-bold mb-4">Q{current + 1}: {q.question}</h2>

    <div className="grid gap-4">
      {q.options.map((option, idx) => (
        <button
          key={idx}
          onClick={() => handleAnswer(option)}
          disabled={selected}
          className={`p-3 rounded text-left text-white font-medium transition duration-200
            ${selected
              ? option === q.correct
                ? "bg-green-600"
                : option === selected
                ? "bg-red-600"
                : "bg-gray-700"
              : "bg-gray-800 hover:bg-gray-600 hover:scale-105"
            }`}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
  </div>
);
}

export default Quiz;