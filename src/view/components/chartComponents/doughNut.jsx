import React from "react";
import { Doughnut } from "react-chartjs-2";
import 'chartjs-plugin-datalabels'; // Import the datalabels plugin

const DoughnutChart = ({ data, title, info }) => {
    if (!Array.isArray(data) || data.length === 0) {
        return <p>No data available</p>;
    }
    const chartData = {
        labels: data.map((item, index) => `${item.status} - ${item.quantity} ` + info),
        datasets: [{
            label: 'Task Status',
            data: data.map(item => item.quantity),
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)',
            ],
            hoverOffset: 4,
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'right',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'rect', 
                }, 
                onClick: null,
            },
            title: {
                display: true,
                text: title,  
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}`;
                    },
                },
            },
        },
    };

    return (
        <div className="flex w-full h-[300px] justify-center items-center">
            <Doughnut data={chartData} options={options} />
        </div>
    );
};

export default DoughnutChart;
