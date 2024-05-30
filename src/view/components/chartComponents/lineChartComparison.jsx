import React from "react";
import { Line } from "react-chartjs-2";

const LineChartComparison = ({ data1, data2, title }) => {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const lineData = {
    labels: month,
    datasets: [
      {
        label: "Previous Year",
        data: data1,
        fill: false,
        lineTension: 0.4,
        backgroundColor: "rgb(148,0,211, 0.4)",
        borderColor: "rgb(148,0,211, 1)",
        cubicInterpolationMode: "monotone",
        pointStyle: "circle",
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: "rgb(139,0,139)",
        pointHoverBackgroundColor: "rgb(255, 255, 255)",
      },
      {
        label: "Current Year",
        data: data2,
        fill: false,
        lineTension: 0.4,
        backgroundColor: "rgba(255, 165, 0,0.4)",
        borderColor: "rgba(255, 165, 0,1)",
        cubicInterpolationMode: "monotone",
        pointStyle: "circle",
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: "rgb(210,105,30)",
        pointHoverBackgroundColor: "rgb(255, 255, 255)",
      },
    ],
  };

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
      datalabels: {
        display: true,
        formatter: (value, context) => {
          return value + " tasks";
        },
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <div className="flex justify-center items-center w-full h-[300px]">
        <Line data={lineData} options={options} />
      </div>
    </div>
  );
};

export default LineChartComparison;
