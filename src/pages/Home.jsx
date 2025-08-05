import {useNavigate} from 'react-router-dom'
import "../style.css";

const Home = () => {

  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">🚀 Welcome to the Ultimate Quiz!</h1>
      <p className="home-description">
        Challenge yourself with 15 fast-paced multiple choice questions. Can you beat the timer and get a perfect score?
      </p>
      <button className="home-start-btn" onClick={() => navigate("/test")}>Start Quiz</button>
    </div>
  )
}

export default Home