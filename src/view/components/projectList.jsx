import React from "react";

import { FaCheckCircle, FaMinusCircle } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";

import { auth } from "../../firebase/config";
import { apiRequest } from "../../api/api";
import { useQuery } from "@tanstack/react-query";

import { getRtTaskByProjectID } from "../../firebase/taskCRUD";
import { getUserFullNameById } from "../../firebase/usersCRUD";
import LoadingBalls from "../../utils/loading";
import UserProfilePic from "../../utils/photoGenerator";
import {
  sortByPriority,
  sortByDueDate,
  sortByStatus,
  sortByWorkHoursRequired,
  sortByTaskName,
  sortByID,
  sortByAssignDate,
} from "../../utils/sortTask";

import { modalContext } from "../part/test";
import { projectTaskContext } from "../pages/project";
import { id } from "date-fns/locale";

const ProjectList = () => {
  const { tabID, setTabID, openProjectModal, setModalTask, setProjectStage } =
    useContext(modalContext);

  const { sortCriteria } = useContext(projectTaskContext);

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
    data: projectStageList,
    isLoading: projectStageListLoading,
    error: projectStageListError,
  } = useQuery({
    queryKey: ["projectList_projectStageList"],
    queryFn: fetchprojectStages,
  });

  const {
    data: taskList,
    isLoading: taskLoading,
    error: taskError,
  } = useQuery({
    queryKey: ["projectList_taskList"],
    queryFn: fetchTasks,
  });

  async function fetchprojectStages() {
    const response = await apiRequest(
      "get",
      "api/v1/project-stages?project_id[eq]=" + tabID
    );
    console.log(response);
    console.log(tabID);
    return response.data;
  }

  async function fetchTasks() {
    const response = await apiRequest(
      "get",
      "api/v1/tasks-by-project-id/" + tabID
    );
    console.log(response);
    return response.data;
  }

  let sortedTaskList = [];

  if (!taskLoading && Array.isArray(taskList)) {
    sortedTaskList = sortTasks(taskList, sortCriteria);
  }

  if (projectStageListLoading || taskLoading) {
    return (
      <div className="flex justify-center items-center h-72">
        <LoadingBalls />
      </div>
    );
  }

  if (projectStageListError || taskError) {
    return <p>Error: {projectStageListError || taskError}</p>;
  }

  return (
    <>
      <section class="container mx-auto px-6 pb-2 font-mono">
        <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          {console.log(taskList)}
          <div class="w-full overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="text-md font-semibold tracking-wide text-left text-gray-900 uppercase border-b border-gray-600">
                  <th class="px-4 py-3">Task Name</th>
                  <th class="px-4 py-3 w-1/4">Assignee</th>
                  <th class="px-4 py-3 w-1/12">Status</th>
                  <th class="px-4 py-3 w-1/12">Priority</th>
                  <th class="px-4 py-3 w-1/6">Due Date</th>
                </tr>
              </thead>
              <tbody class="">
                {taskList.map((task, index) => (
                  <tr key={index} class="text-gray-700">
                    <td class="px-4 py-2 border">
                      <button
                        onClick={() => {
                          console.log("Selected Task", task);
                          
                          setModalTask(task);
                          setProjectStage(projectStageList);
                          openProjectModal();
                        }}
                      >
                        <div class="flex justify-center items-center text-sm">
                          {task.complete ? (
                            <FaCheckCircle className="text-emerald-500 mr-2" />
                          ) : (
                            <FaMinusCircle className=" text-violet-600 mr-2" />
                          )}

                          <div className="flex flex-col justify-center items-center">
                            <p class="font-semibold text-black whitespace-nowrap">
                              {task.task_name}
                            </p>
                          </div>
                        </div>
                      </button>
                    </td>
                    <td className="px-4 py-2 text-ms font-semibold border">
                      <div className="flex items-center text-sm">
                        <div className="flex flex-row items-center space-x-2 justify-center">
                          <div className="flex flex-row items-center justify-center w-6 h-6 rounded-full md:block">
                            {task.assignee_photo != null ? (
                              <img
                                className="object-cover w-full h-full rounded-full"
                                src={task.assignee_photo}
                                alt=""
                                loading="lazy"
                              />
                            ) : (
                              <UserProfilePic
                                className="w-2 h-2 items-center"
                                name={task.assignee_name}
                                size={6}
                              />
                            )}
                          </div>
                          <div className="ml-2">
                            <span>{task.assignee_name}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td class="px-4 py-2 text-xs border">
                      <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm whitespace-nowrap">
                        {task.status}
                      </span>
                    </td>
                    <td class="px-4 py-2 text-xs border">
                      <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                        {task.priority}
                      </span>
                    </td>
                    <td class="px-4 py-2 text-sm border">{task.due_date}</td>
                  </tr>
                ))}

                {projectStageList.map((stage, index) => (
                  <React.Fragment key={index}>
                    <tbody class="text-gray-700">
                      <td class="px-4 py-2 border" colSpan="5">
                        <div class="flex justify-center items-center text-sm">
                          <div className="flex flex-col justify-center items-center">
                            <p class="font-semibold text-lg text-black whitespace-nowrap">
                              {stage.stage_name}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tbody>
                    {taskList.map((task, index) => (
                      <tr key={index} class="text-gray-700">
                        {console.log(task)}
                        <td class="px-4 py-2 border">
                          <button
                            onClick={() => {
                              console.log("Selected Task", task);

                              setModalTask(task);
                              setProjectStage(projectStageList);
                              openProjectModal();
                            }}
                          >
                            <div class="flex justify-center items-center text-sm">
                              {task.complete ? (
                                <FaCheckCircle className="text-emerald-500 mr-2" />
                              ) : (
                                <FaMinusCircle className=" text-violet-600 mr-2" />
                              )}

                              <div className="flex flex-col justify-center items-center">
                                <p class="font-semibold text-black whitespace-nowrap">
                                  {task.task_name}
                                </p>
                              </div>
                            </div>
                          </button>
                        </td>
                        <td className="px-4 py-2 text-ms font-semibold border">
                          <div className="flex items-center text-sm">
                            <div className="flex flex-row items-center space-x-2 justify-center">
                              <div className="flex flex-row items-center justify-center w-6 h-6 rounded-full md:block">
                                {task.assignee_photo != null ? (
                                  <img
                                    className="object-cover w-full h-full rounded-full"
                                    src={task.assignee_photo}
                                    alt=""
                                    loading="lazy"
                                  />
                                ) : (
                                  <UserProfilePic
                                    className="w-2 h-2 items-center"
                                    name={task.assignee_name}
                                    size={6}
                                  />
                                )}
                              </div>
                              <div className="ml-2">
                                <span>{task.assignee_name}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td class="px-4 py-2 text-xs border">
                          <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm whitespace-nowrap">
                            {task.status}
                          </span>
                        </td>
                        <td class="px-4 py-2 text-xs border">
                          <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                            {task.priority}
                          </span>
                        </td>
                        <td class="px-4 py-2 text-sm border">
                          {task.due_date}
                        </td>
                      </tr>
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

export default ProjectList;
