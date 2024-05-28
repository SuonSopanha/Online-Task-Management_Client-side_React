import React, { useState, useContext, useEffect } from "react";
import {
  FaCheckCircle,
  FaMinusCircle,
  FaUsers,
  FaUser,
  FaSortDown,
} from "react-icons/fa";
import TaskModal from "./taskModal";
import SendMessageModal from "./sendMessageModal";

import LoadingBalls from "../../utils/loading";
import {
  sortByPriority,
  sortByDueDate,
  sortByStatus,
  sortByTaskName,
  sortByID,
  sortByAssignDate
} from "../../utils/sortTask";
import { modalContext } from "../part/test";
import { mytaskContext } from "../pages/myTask";
import api, { apiRequest } from "../../api/api";

import UserProfilePic from "../../utils/photoGenerator";
import { useQuery } from "@tanstack/react-query";



const TaskList = () => {

  const { openModal, isModalOpen, setModalTask, closeCreateModal,setMilestoneData } =
    useContext(modalContext);
  const { sortCriteria } = useContext(mytaskContext);

  const sortTasks = (tasks, criteria) => {
    switch (criteria) {
      case "Due_Date":
        console.log("Due_Date sort");
        return sortByDueDate(tasks);
      case "Priority":
        console.log("Priority sort");
        return sortByPriority(tasks);
      case "Status":
        console.log("Status sort");
        return sortByStatus(tasks);
      case "Name":
        console.log("naem sort");
        return sortByTaskName(tasks);
      // Add more cases for other criteria as needed
      default:
        return sortByAssignDate;
    }
  };

  const {
    data: milestoneList,
    isLoading: milestoneLoading,
    error: milestoneError,
  } = useQuery({
    queryKey: ["taskList_milestone"],
    queryFn: fetchMilestones,
  });

  const {
    data: taskList,
    isLoading: taskLoading,
    error: taskError, 
  } = useQuery({
    queryKey: ["taskList_taskList"],
    queryFn: fetchTasks,
  });

  async function fetchMilestones() {
    const response = await apiRequest("get", "/api/v1/milestones");
    return response.data;
  }

  async function fetchTasks() {
    const [response1] = await Promise.all([
      apiRequest("get", "api/v1/my-tasks"),
    ]);
    return [...response1.data];
  }



  let sortedTaskList = [];

  if(!taskLoading){
    sortedTaskList = sortTasks(taskList, sortCriteria);
  }



  if (milestoneLoading || taskLoading) {
    return (
      <div className="flex justify-center items-center h-72">
        <LoadingBalls />
      </div>
    );
  }

  if (milestoneError || taskError) {
    return <p>Error: {milestoneError || taskError}</p>;
  }

  const priorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "yellow";
      case "Medium":
        return "green";
      case "Low":
        return "blue";
      case "Critical":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <>
      <section className="container mx-auto px-6 pb-2 font-mono">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 uppercase border-b bg- border-gray-600">
                  <th className="px-4 py-3">Task Name</th>
                  <th className="px-4 py-3 w-1/6">Visibility</th>
                  <th className="px-4 py-3 w-1/6">Priority</th>
                  <th className="px-4 py-3 w-1/4">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {taskList.map((task, index) => (
                  <tr key={index} className="text-gray-700">
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => {
                          openModal();
                          setModalTask(task);
                          setMilestoneData(milestoneList);
                        }}
                      >
                        <div className="flex justify-center items-center text-sm">
                          {task.complete ? (
                            <FaCheckCircle className="text-emerald-500 mr-2" />
                          ) : (
                            <FaMinusCircle className=" text-violet-600 mr-2" />
                          )}

                          <div className="flex flex-col justify-center items-center">
                            <p className="font-semibold text-black whitespace-nowrap transform transition-transform hover:scale-105">
                              {task.task_name}
                            </p>
                          </div>
                        </div>
                      </button>
                    </td>

                    <td className="px-4 py-2 text-ms font-semibold border">
                      <div className="flex items-center text-sm">
                        <div className="flex items- center relative w-4 h-4 mr-3 rounded-full md:block">
                          {task.project_id !== null ? <FaUsers /> : <FaUser />}
                          <div
                            className="absolute inset-0 rounded-full shadow-inner"
                            aria-hidden="true"
                          ></div>
                        </div>
                        {task.project_id !== null ? (
                          <span className="text-x whitespace-nowrap">
                            {task.project ? task.project.project_name : "Team"}
                          </span>
                        ) : (
                          <span className="text-xs">Only Me</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2 text-xs border">
                      <span
                        className={`px-2 py-1 whitespace-nowrap font-semibold leading-tight text-${priorityColor(
                          task.priority
                        )}-700 rounded-sm bg-${priorityColor(
                          task.priority
                        )}-100`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm border">
                      {task.due_date}
                    </td>
                  </tr>
                ))}
                {/* Render milestone */}
                {milestoneList.map((milestone, index) => (
                  <React.Fragment key={index}>
                    <tr className="text-gray-700">
                      <td colSpan="4">
                        <div className="flex justify-between items-center">
                          <h1 className="px-4 py-2 text-xxl font-semibold">
                            {milestone.milestone_name}
                          </h1>
                          <div className="px-4 py-2">
                            <button className="">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    {/* Render tasks under milestone */}
                    {taskList.map((task, taskIndex) => (
                      <React.Fragment key={taskIndex}>
                        {/* Render tasks */}
                        <tr className="text-gray-700">
                          <td className="px-4 py-2 border">
                            <button
                              onClick={() => {
                                openModal();
                                setModalTask(task);
                                setMilestoneData(milestoneList)
                              }}
                            >
                              <div className="flex justify-center items-center text-sm">
                                {task.complete ? (
                                  <FaCheckCircle className="text-emerald-500 mr-2" />
                                ) : (
                                  <FaMinusCircle className=" text-violet-600 mr-2" />
                                )}

                                <div className="flex flex-col justify-center items-center">
                                  <p className="font-semibold text-black whitespace-nowrap transform transition-transform hover:scale-105">
                                    {task.task_name}
                                  </p>
                                </div>
                              </div>
                            </button>
                          </td>

                          <td className="px-4 py-2 text-ms font-semibold border">
                            <div className="flex items-center text-sm">
                              <div className="flex items- center relative w-4 h-4 mr-3 rounded-full md:block">
                                {task.project_id !== null ? (
                                  <FaUsers />
                                ) : (
                                  <FaUser />
                                )}
                                <div
                                  className="absolute inset-0 rounded-full shadow-inner"
                                  aria-hidden="true"
                                ></div>
                              </div>
                              {task.project_id !== null ? (
                                <span className="text-x whitespace-nowrap">
                                  {task.project
                                    ? task.project.project_name
                                    : "Team"}
                                </span>
                              ) : (
                                <span className="text-xs">Only Me</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-2 text-xs border">
                            <span
                              className={`px-2 py-1 whitespace-nowrap font-semibold leading-tight text-${priorityColor(
                                task.priority
                              )}-700 rounded-sm bg-${priorityColor(
                                task.priority
                              )}-100`}
                            >
                              {task.priority}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-sm border">
                            {task.due_date}
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default TaskList;
