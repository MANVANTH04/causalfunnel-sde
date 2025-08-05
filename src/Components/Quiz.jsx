import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import QuizStart from "../components/QuizStart";
import QuizQuestion from "../components/QuizQuestion";
import QuizProgressBar from "../components/QuizProgressBar";

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
  const [timeLeft, setTimeLeft] = useState(15);
  const [showStart, setShowStart] = useState(true);
  const [userAnswers, setUserAnswers] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const fetched = useRef(false);
  const navigate = useNavigate();

  const restartQuiz = async () => {
    setLoading(true);
    setQuestions([]);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setTimeLeft(15);
    setUserAnswers([]);
    setStartTime(Date.now());

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
          category: q.category || "General",
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
            options: shuffleOptions(
              decodeHTML(q.correct_answer),
              q.incorrect_answers.map(decodeHTML)
            ),
            category: q.category || "General",
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
          setSelected("timeout");
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

  useEffect(() => {
  if (!showStart && questions.length > 0 && current >= questions.length) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    confetti();

    const categoryCorrectness = {};
    userAnswers.forEach((item) => {
      const cat = item.category || "General";
      if (!categoryCorrectness[cat]) categoryCorrectness[cat] = { correct: 0, total: 0 };
      if (item.selected === item.correct) categoryCorrectness[cat].correct++;
      categoryCorrectness[cat].total++;
    });

    const totalTime = Math.floor((Date.now() - startTime) / 1000);

    navigate("/results", {
      state: {
        score,
        questions,
        userAnswers,
        categoryCorrectness,
        totalTime,
      },
    });
  }
}, [current, questions.length, showStart]);





  const handleAnswer = (choice) => {
    if (selected) return;
    const currentQ = questions[current];
    const isCorrect = choice === currentQ.correct;
    if (isCorrect) setScore((prev) => prev + 1);

    setUserAnswers((prev) => [
      ...prev,
      {
        question: currentQ.question,
        selected: choice,
        correct: currentQ.correct,
        category: currentQ.category,
      },
    ]);

    setSelected(choice);
    setTimeout(() => {
      setSelected(null);
      setCurrent(current + 1);
      setTimeLeft(15);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="quiz-container center">
        <div className="loader"></div>
      </div>
    );
  }

  if (showStart) {
    return (
      <QuizStart onStart={() => {
        setShowStart(false);
        setStartTime(Date.now());
      }} />
    );
  }

  const q = questions[current];

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <QuizQuestion
          question={q}
          index={current}
          total={questions.length}
          selected={selected}
          score={score}
          timeLeft={timeLeft}
          handleAnswer={handleAnswer}
        />
        <QuizProgressBar current={current} total={questions.length} />
      </div>
    </div>
  );
}

export default Quiz;