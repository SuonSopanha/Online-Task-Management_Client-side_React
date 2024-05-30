import React from "react";
import { Bar } from "react-chartjs-2";

const VerticalBarChart = ({ data, title}) => {
  //coordinate
  //   const labels = Utils.months({count: DATA_COUNT});
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No data available</p>;

    console.log(data);
}

  // const status = data.map((item) => item.status);
  // const quantity = data.map((item) => item.quantity);

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const colors = [
    {
      backgroundColor: "rgba(54, 162, 235, 0.4)",
      borderColor: "rgba(54, 162, 235, 1)",
    },
    {
      backgroundColor: "rgba(75, 192, 192, 0.4)",
      borderColor: "rgba(75, 192, 192, 1)",
    },
    {
      backgroundColor: "rgba(255, 99, 132, 0.4)",
      borderColor: "rgba(255, 99, 132, 1)",
    },
  ];

  const datasets = data.map((item, index) => ({
    label: item.status,
    data: item.quantity,
    backgroundColor: colors[index % colors.length].backgroundColor,
    borderColor: colors[index % colors.length].borderColor,
    borderWidth: 1,
  }));
  const barData = {
    labels: month,
    datasets: datasets,
  };
  // const barData = {
  //   labels: month,
  //   datasets: [
  //     {
  //       label:status[0],
  //       data: quantity[0],
  //       backgroundColor: "rgba(54, 162, 235, 0.4)",
  //       borderColor: "rgba(54, 162, 235, 1)",
  //       borderWidth: 1,
  //     },
  //     {
  //       label:status[1],
  //       data: quantity[1],
  //       backgroundColor: "rgb(75, 192, 192, 0.4)",
  //       borderColor: "rgb(75, 192, 192)",
  //       borderWidth: 1,
  //     },
  //     {
  //       label: status[2],
  //       data: quantity[2],
  //       backgroundColor: "rgba(255, 99, 132, 0.4)",
  //       borderColor: "rgba(255, 99, 132, 1)",
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        onClick: null,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        stacked: false,
        barPercentage: 0.6,
        categoryPercentage: 0.7, // Ensure that bars are stacked side by side
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex w-full h-[300px] justify-center items-center">
      <Bar data={barData} options={options} />
    </div>
  );
};

export default VerticalBarChart;
