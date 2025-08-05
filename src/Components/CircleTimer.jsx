import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function CircleTimer({ timeLeft }) {
  const percentage = (timeLeft / 15) * 100;

  return (
    <div style={{ width: 60, height: 60 }}>
      <CircularProgressbar
        value={percentage}
        text={`${timeLeft}s`}
        styles={buildStyles({
          textColor: 'white',
          pathColor: '#3b82f6',
          trailColor: '#1f2937',
          textSize: '18px',
        })}
      />
    </div>
  );
}

export default CircleTimer;