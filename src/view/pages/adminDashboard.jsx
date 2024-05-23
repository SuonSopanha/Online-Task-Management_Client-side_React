import React from "react";
import { Link } from "react-router-dom";
import { formattedDate } from "../../utils/formatDate";
import { useEffect, useState } from "react";
import LoadingBalls from "../../utils/loading";
import {
  FaCheckCircle,
  FaClipboard,
  FaClipboardList,
  FaUsers,
  FaProjectDiagram,
  FaChartLine,
} from "react-icons/fa";

import { apiRequest } from "../../api/api";
import { useQuery } from "@tanstack/react-query";

import BarChart from "../components/chartComponents/barChart";
import BarChartCompare from "../components/chartComponents/barChartCompare";
import PieChart from "../components/chartComponents/pieChart";
import LineChart from "../components/chartComponents/lineChart";
import LineChartCompare from "../components/chartComponents/lineChartCompare";
import RadarChart from "../components/chartComponents/radarChart";
import LineAverage from "../components/chartComponents/lineAverage";

const AdminDashboard = () => {
  
  const {
    data: statistics,
    isLoading: statisticsLoading,
    error: statisticsError,
  } = useQuery({
    queryKey: ["statistics"],
    queryFn: fetchStatistics,
  });

  async function fetchStatistics() {
    const response = await apiRequest("get", "api/admin/statistics");
    return response.data;
  }

  if (statisticsError)
    return <div>Error: {statisticsError}</div>;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await apiRequest("get", "api/admin/statistics");
  //       setData(data.data);
  //       setloading(false);
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  if (statisticsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingBalls />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col h-fit">
        <div className="flex justify-between items-center text-2xl bg-glasses backdrop-blur-12 font-semibold p-4 m-2 rounded-lg">
          <div className="flex items-center justify-start">
            <div className="relative w-12 h-12 rounded-full md:block">
              <img
                className="object-cover w-full h-full rounded-full"
                src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt="Admin"
                loading="lazy"
              />
              <div
                className="absolute inset-0 rounded-full shadow-inner"
                aria-hidden="true"
              ></div>
            </div>
            <div>
              <p className="ml-2">Admin</p>
              <p className="ml-2">Dashboard</p>
            </div>
          </div>
          <div className="flex items-center justify-end">
            {/* Today Date */}
            <p className="text-sm">{formattedDate}</p>
          </div>
        </div>
        <div className="flex justify-between items-center bg-glasses backdrop-blur-12 font-semibold p-4 m-2 rounded-lg">
          <nav className="flex space-x-4">
            <Link
              to="/overview"
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              Overview
            </Link>
            <Link
              to="/reports"
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              Reports
            </Link>
            <Link
              to="/adminOrg"
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              Organization
            </Link>
            <Link
              to="/adminUser"
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              Users
            </Link>
            <Link
              to="/support"
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              Support
            </Link>
          </nav>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-2 p-4 mt-0 text-white">
          <li className="bg-gradient-to-r from-blue-600 to-blue-400 px-2 py-6 rounded flex justify-center items-center transition duration-300 transform hover:scale-105">
            <span className="mr-2">
              <FaUsers />
            </span>
            <span className="text-sm m-1">User :</span>
            <span className="text-3xl font-semibold mx-3 transition duration-300 transform hover:scale-125 hover:text-blue-600">
              {statistics.userCount}
            </span>
          </li>
          <li className="bg-gradient-to-r from-green-600 to-green-500 backdrop-blur-md px-2 py-6 rounded flex justify-center items-center transition duration-300 transform hover:scale-105">
            <span className="mr-2">
              <FaProjectDiagram />
            </span>
            <span className="text-sm m-1">Active User :</span>
            <span className="text-3xl font-semibold mx-3 transition duration-300 transform hover:scale-125 hover:text-blue-600">
              {statistics.activeUserCount}
            </span>
          </li>

          <li className="bg-gradient-to-r from-orange-600 to-orange-400 px-2 py-6 rounded flex justify-center items-center transition duration-300 transform hover:scale-105">
            <span className="mr-2">
              <FaChartLine />
            </span>
            <span className="text-sm m-1">New User :</span>
            <span className="text-3xl font-semibold mx-3 transition duration-300 transform hover:scale-125 hover:text-blue-600">
              {statistics.newUserCount}
            </span>
          </li>
        </ul>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-2 p-4 mt-0 text-white">
          <li className="bg-gradient-to-r from-blue-600 to-blue-400 px-2 py-6 rounded flex justify-center items-center transition duration-300 transform hover:scale-105">
            <span className="mr-2">
              <FaUsers />
            </span>
            <span className="text-sm m-1">Task :</span>
            <span className="text-3xl font-semibold mx-3 transition duration-300 transform hover:scale-125 hover:text-blue-600">
              {statistics.taskCount}
            </span>
          </li>
          <li className="bg-gradient-to-r from-green-600 to-green-500 backdrop-blur-md px-2 py-6 rounded flex justify-center items-center transition duration-300 transform hover:scale-105">
            <span className="mr-2">
              <FaProjectDiagram />
            </span>
            <span className="text-sm m-1">Projects :</span>
            <span className="text-3xl font-semibold mx-3 transition duration-300 transform hover:scale-125 hover:text-blue-600">
              {statistics.projectCount}
            </span>
          </li>

          <li className="bg-gradient-to-r from-orange-600 to-orange-400 px-2 py-6 rounded flex justify-center items-center transition duration-300 transform hover:scale-105">
            <span className="mr-2">
              <FaChartLine />
            </span>
            <span className="text-sm m-1">Organization :</span>
            <span className="text-3xl font-semibold mx-3 transition duration-300 transform hover:scale-125 hover:text-blue-600">
              {statistics.organizationCount}
            </span>
          </li>
        </ul>

        <div className="w-full -mt-4 p-2 items-center">
          <ul className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <li className=" bg-glasses backdrop-blur-lg p-2 rounded transition duration-300 transform hover:scale-105">
              <BarChart Data={[]} />
            </li>
            <li className="bg-glasses backdrop-blur-lg p-2 rounded transition duration-300 transform hover:scale-105">
              <BarChartCompare Data1={[]} Data2={[]} />
            </li>
            <li className="bg-glasses backdrop-blur-lg p-2 rounded transition duration-300 transform hover:scale-105">
              <PieChart Data={[]} />
            </li>
            <li className="bg-glasses backdrop-blur-lg p-2 rounded transition duration-300 transform hover:scale-105">
              <LineChart Data={[]} />
            </li>
            <li className="bg-glasses backdrop-blur-lg p-2 rounded transition duration-300 transform hover:scale-105">
              <LineChartCompare Data={[]} />
            </li>
            <li className="bg-glasses backdrop-blur-lg p-2 rounded transition duration-300 transform hover:scale-105">
              <LineAverage Data={[]} />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
