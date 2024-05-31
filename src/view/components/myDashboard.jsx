import React from "react";
import { useState, useEffect } from "react";

import { FaCheckCircle, FaClipboard, FaClipboardList } from "react-icons/fa";

import BarChart from "./chartComponents/barChart";
import BarChartCompare from "./chartComponents/barChartCompare";
import PieChart from "./chartComponents/pieChart";
import LineChart from "./chartComponents/lineChart";
import LineChartCompare from "./chartComponents/lineChartCompare";
import RadarChart from "./chartComponents/radarChart";
import LineAverage from "./chartComponents/lineAverage";

import  DoughnutChart from "./chartComponents/doughNut";
import PieChartRate from "./chartComponents/pieChartRate";
import VerticalBarChart from "./chartComponents/verticalBarChart";
import LineChartComparison from "./chartComponents/lineChartComparison";




import { formattedDate } from "../../utils/formatDate";


// Mock data for Doghnut and Pie
const doughnutMockData = [
  { status: "In Progress", quantity: 5 },
  { status: "Completed", quantity: 7 },
  { status: "Incompleted", quantity: 2 },
  { status: "Not Started", quantity: 3 },
];

//Bar
const barMockData = [
  { status: "All", quantity: [30, 20, 40, 50, 60, 70, 80] },
  { status: "Completed", quantity: [20, 10, 25, 40, 50, 65, 78] },
  { status: "Incompleted", quantity: [10, 10, 15, 10, 10, 5, 12] },
];

//Mock data for Line
const previous = [
  10, 80, 60, 100, 68, 23, 97, 51, 23, 48, 15, 39
];

const current = [
  90, 64, 49, 33, 167, 76, 23, 83, 54, 72, 19, 203
];


const MyDashboard = () => {
  const [userName, setUserName] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [taskCount, setTaskCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [uncompletedTaskCount, setUncompletedTaskCount] = useState(0);
  const [taskStatusCounts, setTaskStatusCounts] = useState([]);
  const [taskCategoryCounts, setTaskCategoryCounts] = useState([]);
  const [completedTaskCountsInPriority, setCompletedTaskCountsInPriority] = useState([]);
  const [taskPriorityCounts, setTaskPriorityCounts] = useState([]);
  const [taskassignee_dateCounts, setTaskassignee_dateCounts] = useState([]);
  const [taskDueDateCompleteCount,setTaskDueDateCompleteCounts] = useState([]);
  const [taskCategoryAverages, setTaskCategoryAverages] = useState([]);
  const [monthlyWorkHours, setMonthlyWorkHours] = useState([]);

  //MockData
  const [doughnutData, setdoughnutData] = useState(doughnutMockData);

  const [barData, setBarData] = useState(barMockData);

  const [previousYear, setPreviousYear] = useState(previous);
  const [currentYear, setCurrentYear] = useState(current);


  const convertMonthNumberToName = (monthNumber) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];


  
    // Check if monthNumber is valid
    if (monthNumber >= 1 && monthNumber <= 12) {
      return months[monthNumber - 1];
    }

    if (monthNumber === 0){
      return "Dec"
    }
  
    return "Unknown";
  };

  const getMonthOrder = (month) => {
    const order = {
      Jan: 1,
      Feb: 2,
      Mar: 3,
      Apr: 4,
      May: 5,
      Jun: 6,
      Jul: 7,
      Aug: 8,
      Sep: 9,
      Oct: 10,
      Nov: 11,
      Dec: 12,
    };

    return order[month] || 999; // Use 999 for unknown months
  };


  return (
    <div className="flex flex-col">
      <div className=" flex justify-between items-center text-2xl bg-glasses backdrop-blur-12 font-semibold p-4 m-2 rounded-lg">
        <div className="flex items-center justify-start">
          <div class="relative w-12 h-12 rounded-full md:block">
            <img
              class="object-cover w-full h-full rounded-full"
              src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
              alt=""
              loading="lazy"
            />
            <div
              class="absolute inset-0 rounded-full shadow-inner"
              aria-hidden="true"
            ></div>
          </div>
          <div>
            <p className="ml-2">{userName}</p>
            <p className="ml-2">Dashboard</p>
          </div>
        </div>
        <div className="flex items-center justify-end">
          {/*today Date*/}
          <p className="text-sm">{formattedDate}</p>
        </div>
      </div>

      <div className=" m-1 p-1 rounded">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-2">
          <li className="bg-glasses backdrop-blur-12 px-2 py-6 rounded flex justify-center items-center transition duration-300 transform hover:scale-105">
            <span className="mr-2">
              <FaCheckCircle />
            </span>
            <span className="text-sm m-1">Total Task :</span>
            <span className="text-3xl font-semibold mx-3 transition duration-300 transform hover:scale-125 hover:text-blue-600">
              {completedTaskCount}
            </span>
          </li>
          <li className="bg-glasses backdrop-blur-12 px-2 py-6  rounded flex justify-center items-center transition duration-300 transform hover:scale-105">
            <span className="mr-2">
              <FaClipboard />
            </span>
            <span className="text-sm m-1">Total Project :</span>
            <span className="text-3xl font-semibold mx-3 transition duration-300 transform hover:scale-125 hover:text-blue-600">{taskCount}</span>
          </li>
          <li className="bg-glasses backdrop-blur-12 px-2 py-6  rounded flex justify-center items-center transition duration-300 transform hover:scale-105">
            <span className="mr-2">
              <FaClipboardList />
            </span>
            <span className="text-sm m-1">Total Organization :</span>
            <span className="text-3xl font-semibold mx-3 transition duration-300 transform hover:scale-125 hover:text-blue-600">
              {uncompletedTaskCount}
            </span>
          </li>
        </ul>

        {/* Chart */}

        <ul className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <li className=" bg-glasses backdrop-blur-lg p-2 rounded transition duration-300 transform hover:scale-105">
            {/* <BarChart Data={taskStatusCounts} /> */}

            <DoughnutChart data={doughnutData} title={"Task Category Distribution"} info={"tasks"}/>
          </li>
          <li className="bg-glasses backdrop-blur-lg p-2 rounded transition duration-300 transform hover:scale-105">
            {/* <BarChartCompare
              Data1={taskPriorityCounts}
              Data2={completedTaskCountsInPriority}
            /> */}
            <PieChartRate data={doughnutData}
            title={"Task Completion Rate"} />
          </li>
          <li className="bg-glasses backdrop-blur-lg p-2 rounded transition duration-300 transform hover:scale-105">
            {/* <PieChart Data={taskCategoryCounts} /> */}
            <VerticalBarChart data={barData} title={"Task Visualization Chart"}/>
          </li>
          <li className="bg-glasses backdrop-blur-lg p-2 rounded transition duration-300 transform hover:scale-105">
            {/* <LineChart Data={taskassignee_dateCounts} /> */}
            <LineChartComparison data1={previousYear} data2={currentYear} title={"Task Fluctuation Graph"} />
          </li>
          {/* <li className="bg-glasses backdrop-blur-lg p-2 rounded transition duration-300 transform hover:scale-105">
            <LineChartCompare Data={monthlyWorkHours}/>
          </li>
          <li className="bg-glasses backdrop-blur-lg p-2 rounded transition duration-300 transform hover:scale-105">
            <LineAverage Data={taskCategoryAverages}/>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default MyDashboard;
