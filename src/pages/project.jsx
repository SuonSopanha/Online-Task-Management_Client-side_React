import React from "react";
import { useState } from "react";

import { FaPlus } from "react-icons/fa";

import ProjectList from "../components/projectList";
import TaskCalender from "../components/taskCalender";
import TaskBoard from "../components/taskBoard";
import Dropdown from "../components/dropDown";

const Project = () => {
  const [activeTab, setActiveTab] = useState("List");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full h-fit bg-glasses backdrop-blur-12 rounded-lg">
      {/* Header */}
      <div className="flex flex-row justify-start border-b border-gray-500  ">
        <div className="flex items-center p-3 ml-1">
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
        </div>
        <div className="text-sm font-medium text-gray-500 flex flex-col justify-between">
          <h1 className="text-lg font-semibold text-gray-500 pt-3 pb-1 px-1">
            Project
          </h1>
          <div>
            <ul className="flex flex-wrap -mb-px">
              <li className="me-2">
                <a
                  href="#"
                  className={`inline-block px-3 py-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                    activeTab === "List"
                      ? "text-blue-600 border-blue-600"
                      : ""
                  }`}
                  onClick={() => handleTabClick("List")}
                >
                  List
                </a>
              </li>
              <li className="me-2">
                <a
                  href="#"
                  className={`inline-block px-3  py-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                    activeTab === "Calender"
                      ? "text-blue-600 border-blue-600"
                      : ""
                  }`}
                  onClick={() => handleTabClick("Calender")}
                  aria-current={
                    activeTab === "Calender" 
                  }
                >
                  Calendar
                </a>
              </li>
              <li className="me-2">
                <a
                  href="#"
                  className={`inline-block px-3 py-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                    activeTab === "Board"
                      ? "text-blue-600 border-blue-600"
                      : ""
                  }`}
                  onClick={() => handleTabClick("Board")}
                >
                  Board
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Body content */}
      <div>
        <div className="flex items-center justify-between m-4">
          
          <div className="flex items-center space-x-2">
            <Dropdown parent={"Filter"} children={["Today", "This Week", "This Month", "Default"]}/>
            <Dropdown parent={"Sort By"} children={["Name", "Date", "Priority", "Status", "Assignee","Default"]}/>
          </div>
                  
          <button
            type="button"
            className="px-3 py-2 mr-3 gap-x-1.5 rounded-md text-white bg-blue-500 bg-opacity-80  hover:bg-blue-600 flex items-center text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300"
          >
            <FaPlus className="w-3 h-3" />
            <div className="ml-2">Create Task</div>
            
          </button>
        </div>

        
        {activeTab === "List" && <ProjectList/>}
        {activeTab === "Calender" && <TaskCalender />}
        {activeTab === "Board" && <TaskBoard />}
      </div>
    </div>
  );
};

export default Project;