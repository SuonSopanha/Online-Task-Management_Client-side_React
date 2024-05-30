import React, { useState, useEffect, useContext } from "react";
import { FaUser, FaUsers } from "react-icons/fa";
import LoadingBalls from "../../utils/loading";
import MilestoneModal from "./milestoneModal";

import {
  sortByPriority,
  sortByDueDate,
  sortByStatus,
  sortByWorkHoursRequired,
  sortByTaskName,
  sortByID,
} from "../../utils/sortTask";
import { modalContext } from "../part/test";
import { mytaskContext } from "../pages/myTask";
import { apiRequest } from "../../api/api";
import { useQuery } from "@tanstack/react-query";

const TaskBoard = () => {
  const { openModal, setModalTask, setMilestoneData, tabID } =
    useContext(modalContext);
  const { sortCriteria } = useContext(mytaskContext);

  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [milestoneinit, setMilestone] = useState({});

  const onMilestoneModalClose = () => {
    setIsMilestoneModalOpen(false);
  };

  const onMilestoneModalOpen = () => {
    setIsMilestoneModalOpen(true);
  };

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
        console.log("Name sort");
        return sortByTaskName(tasks);
      // Add more cases for other criteria as needed
      default:
        return sortByID(tasks);
    }
  };

  const {
    data: milestoneList,
    isLoading: milestoneLoading,
    error: milestoneError,
  } = useQuery({
    queryKey: ["taskBoard_milestone"],
    queryFn: fetchMilestones,
  });

  const {
    data: taskList,
    isLoading: taskListLoading,
    error: taskListError,
  } = useQuery({
    queryKey: ["taskBoard_taskList"],
    queryFn: fetchTask,
  });

  async function fetchTask() {
    const [response1] = await Promise.all([
      apiRequest("get", "api/v1/my-tasks"),
    ]);

    return [...response1.data];
  }

  async function fetchMilestones() {
    const response = await apiRequest("get", "/api/v1/milestones");
    return response.data;
  }

  let sortedTaskList = [];

  if (!taskListLoading && Array.isArray(taskList)) {
    sortedTaskList = sortTasks(taskList, sortCriteria);
  }

  if (milestoneLoading) {
    return (
      <div className="flex justify-center items-center h-72">
        <LoadingBalls />
      </div>
    );
  }

  if (milestoneError || taskListError) {
    return <p>Error: {milestoneError || taskListError}</p>;
  }

  return (
    <div className="container mx-auto mt-6 overflow-x-auto">
      <h1 className="text-2xl ml-4 font-semibold mb-4">Task Board</h1>
      <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
        <div className="w-full lg:w-1/3 bg-glasses backdrop-blur-12 rounded-xl p-3">
          <button className="text-lg font-semibold mb-4">Task</button>
          <div className="flex flex-col space-y-2">
            {taskListLoading
              ? null
              : taskList
                  .filter((task) => task.milestone_id === null)
                  .map((task) => (
                    <button
                      key={task.id}
                      className="flex justify-center items-center transition duration-300 transform hover:scale-105"
                      onClick={() => {
                        setModalTask(task);
                        setMilestoneData(milestoneList);
                        openModal();
                      }}
                    >
                      <div className="flex flex-col bg-violet-400 pt-2 pb-1 px-2 rounded-md text-white w-full mx-auto my-auto">
                        <div className="flex flex-row space-x-1 items-center">
                          <span>
                            {task.project_id !== null ? (
                              <FaUsers className="text-white text-xs" />
                            ) : (
                              <FaUser className="text-white text-xs" />
                            )}
                          </span>
                          {task.project_id !== null ? (
                            <span className="text-xs">
                              {task.project
                                ? task.project.project_name
                                : "Team"}
                            </span>
                          ) : (
                            <span className="text-xs">Only Me</span>
                          )}
                        </div>
                        <div>
                          <p className="flex justify-start text-sm font-bold mt-1 mb-1">
                            {task.task_name}
                          </p>
                        </div>
                        <div className="mb-1 flex flex-row justify-start left-0"></div>
                        <div className="text-xs flex space-x-1">
                          <span className="px-1.5 py-0.5 font-semibold leading-tight text-green-700 bg-green-100 rounded-lg text-xs">
                            {task.priority}
                          </span>
                          <span className="px-1.5 py-0.5 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-lg text-xs">
                            {task.status}
                          </span>
                        </div>
                        <div className="text-xs pt-0.5 items-end flex justify-end">
                          DueDate: {task.due_date}
                        </div>
                      </div>
                    </button>
                  ))}
          </div>
        </div>

        {milestoneList.map((milestone, index) => (
          <div
            key={index}
            className="w-full lg:w-1/3 bg-glasses backdrop-blur-12 rounded-xl p-3"
          >
            <button
              onClick={async () => {
                await setMilestone(milestone);
                onMilestoneModalOpen();
              }}
              className="text-lg font-semibold mb-4"
            >
              {milestone.milestone_name}
            </button>
            <div className="flex flex-col space-y-2">
              {taskListLoading
                ? null
                : taskList
                    .filter((task) => task.milestone_id === milestone.id)
                    .map((task) => (
                      <button
                        key={task.id}
                        className="flex justify-center items-center transition duration-300 transform hover:scale-105"
                        onClick={() => {
                          setModalTask(task);
                          setMilestoneData(milestoneList);
                          openModal();
                        }}
                      >
                        <div className="flex flex-col bg-blue-400 pt-2 pb-1 px-2 rounded-md text-white w-full mx-auto my-auto">
                          <div className="flex flex-row space-x-1 items-center">
                            <span>
                              {task.project_id !== null ? (
                                <FaUsers className="text-white text-xs" />
                              ) : (
                                <FaUser className="text-white text-xs" />
                              )}
                            </span>
                            {task.project_id !== null ? (
                              <span className="text-xs">
                                {task.project
                                  ? task.project.project_name
                                  : "Team"}
                              </span>
                            ) : (
                              <span className="text-xs">Only Me</span>
                            )}
                          </div>
                          <div>
                            <p className="flex justify-start text-sm font-bold mt-1 mb-1">
                              {task.task_name}
                            </p>
                          </div>
                          <div className="mb-1 flex flex-row justify-start left-0"></div>
                          <div className="text-xs flex space-x-1">
                            <span className="px-1.5 py-0.5 font-semibold leading-tight text-green-700 bg-green-100 rounded-lg text-xs">
                              {task.priority}
                            </span>
                            <span className="px-1.5 py-0.5 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-lg text-xs">
                              {task.status}
                            </span>
                          </div>
                          <div className="text-xs pt-0.5 items-end flex justify-end">
                            DueDate: {task.due_date}
                          </div>
                        </div>
                      </button>
                    ))}
            </div>
          </div>
        ))}
      </div>
      {isMilestoneModalOpen && (
        <MilestoneModal
          onClose={onMilestoneModalClose}
          initialValue={milestoneinit}
        />
      )}
    </div>
  );
};

export default TaskBoard;
