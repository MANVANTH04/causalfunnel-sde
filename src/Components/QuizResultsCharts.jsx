import React from "react";
import { Pie, Bar } from "react-chartjs-2";

const QuizResultCharts = ({ categoryCorrectness }) => {
  // ✅ SAFETY CHECK
  if (!categoryCorrectness || Object.keys(categoryCorrectness).length === 0) {
    return <p>No chart data available.</p>;
  }

  const pieData = {
    labels: Object.keys(categoryCorrectness),
    datasets: [
      {
        label: "% Correct",
        data: Object.values(categoryCorrectness).map((d) =>
          ((d.correct / d.total) * 100).toFixed(2)
        ),
        backgroundColor: ["#4ade80", "#60a5fa", "#facc15", "#f87171", "#a78bfa"],
      },
    ],
  };

  const barData = {
    labels: Object.keys(categoryCorrectness),
    datasets: [
      {
        label: "Correct Answers",
        data: Object.values(categoryCorrectness).map((d) => d.correct),
        backgroundColor: "#60a5fa",
      },
    ],
  };

  return (
    <div className="chart-container">
      <div className="chart-box" style={{ width: "45%" }}>
        <h3 className="bluee">📊 Category Accuracy</h3>
        <Pie data={pieData} />
      </div>
      <div className="chart-box" style={{ width: "45%" }}>
        <h3 className="bluee">📈 Correct Answers by Category</h3>
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default QuizResultCharts;