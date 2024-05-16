import React from "react";
import { Link } from "react-router-dom";
import { formattedDate } from "../../utils/formatDate";
import { FaCheckCircle, FaClipboard, FaClipboardList, FaUsers, FaProjectDiagram, FaChartLine } from "react-icons/fa";

const AdminDashboard = () => {
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

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-2 p-4 mt-0">
          <li className="bg-glasses backdrop-blur-12 px-2 py-6 rounded flex justify-center items-center transition duration-300 transform hover:scale-105">
            <span className="mr-2">
              <FaUsers />
            </span>
            <span className="text-sm m-1">Teams :</span>
            <span className="text-3xl font-semibold mx-3 transition duration-300 transform hover:scale-125 hover:text-blue-600">
              1
            </span>
          </li>
          <li className="bg-glasses backdrop-blur-12 px-2 py-6 rounded flex justify-center items-center transition duration-300 transform hover:scale-105">
            <span className="mr-2">
              <FaProjectDiagram />
            </span>
            <span className="text-sm m-1">Projects :</span>
            <span className="text-3xl font-semibold mx-3 transition duration-300 transform hover:scale-125 hover:text-blue-600">
              1
            </span>
          </li>
          <li className="bg-glasses backdrop-blur-12 px-2 py-6 rounded flex justify-center items-center transition duration-300 transform hover:scale-105">
            <span className="mr-2">
              <FaChartLine />
            </span>
            <span className="text-sm m-1">Reports :</span>
            <span className="text-3xl font-semibold mx-3 transition duration-300 transform hover:scale-125 hover:text-blue-600">
              1
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminDashboard;
