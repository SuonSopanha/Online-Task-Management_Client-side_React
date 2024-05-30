import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const PieChartCompare = ({ data, title, backgroundColor, borderColor }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No data available</p>;
  }

  // console.log(title);
  //   const total = data.reduce((acc, item) => acc + item.count, 0);
  const total = data.reduce((acc, item) => acc + item.quantity, 0);
  console.log(total);

  const endedProjectStage = data.reduce((acc, item) => {
    if (item.status === "New") {
      return acc + item.quantity;
    }
    return acc;
  }, 0);

  const onProjectStage = data.reduce((acc, item) => {
    if (item.status === "Old") {
      return acc + item.quantity;
    }
    return acc;
  }, 0);

  const endedPercentage = Math.round((endedProjectStage / total) * 100);
  const onPercentage = Math.round((onProjectStage / total) * 100);


  const filteredData = [
    { status: "Old", quantity: onPercentage },
    { status: "New", quantity: endedPercentage },
    
  ];

  const chartData = {
    labels: filteredData.map(
      (item, index) => `${item.status} - ${item.quantity}%`
    ),
    datasets: [
      {
        label:"Task Status",
        data: filteredData.map((item) => item.quantity),
        backgroundColor: backgroundColor || [
          "rgba(75, 192, 192, 0.8)",
          "rgb(255, 205, 86)"
        ],
        borderColor: borderColor || [
          "rgba(32,178,170, 1)",
          "rgb(255, 205, 8)"
        ],
        borderWidth: 1,
        
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

export default PieChartCompare;
