import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const PieChartRate = ({ data, title }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No data available</p>;
  }

  // console.log(title);
  //   const total = data.reduce((acc, item) => acc + item.count, 0);
  const total = data.reduce((acc, item) => acc + item.quantity, 0);
  console.log(total);

  //   const category = data.map((item) => item.category);
  //   const counts = data.map((item) => item.count);

  const completeTask = data.reduce((acc, item) => {
    if (item.status === "Completed") {
      return acc + item.quantity;
    }
    return acc;
  }, 0);

  console.log(completeTask);

  const completedPercentage = Math.round((completeTask / total) * 100);

  const inCompletedPercentage = Math.round(
    ((total - completeTask) / total) * 100
  );

  const filteredData = [
    { status: "Others", quantity: inCompletedPercentage },
    { status: "Completed", quantity: completedPercentage },
  ];

  const chartData = {
    labels: filteredData.map(
      (item, index) => `${item.status} - ${item.quantity}%`
    ),
    datasets: [
      {
        label: "Task Status",
        data: filteredData.map((item) => item.quantity),
        backgroundColor: ["rgba(255, 99, 132, 0.8)", "rgba(75, 192, 192, 0.8)"],
        borderColor: ["rgba(255,65,90, 1)", "rgba(32,178,170, 1)"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        onClick: null,
      },
      title: {
        display: true,
        text: title,
        fontSize: 16, // Adjust the title font size
      },
    },
    elements: {
      arc: {
        borderWidth: 0.5, // Adjust the border width of each segment
      },
    },
    tooltips: {
      bodyFontSize: 12, // Adjust the tooltip body font size
    },
  };

  return (
    <div className="flex justify-center items-center w-full h-[300px]">
      {" "}
      {/* Increase the height of the container */}
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChartRate;
