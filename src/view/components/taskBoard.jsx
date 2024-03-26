// TaskBoard.js
import React, { useState, useEffect, useContext } from "react";

import { FaUser, FaUsers } from "react-icons/fa";

import { auth } from "../../firebase/config";

import {
  getRtTaskByUserID,
  getRtTaskByAssigneeID,
} from "../../firebase/taskCRUD";
import LoadingBalls from "../../utils/loading";
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

const TaskBoard = () => {
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { openModal, isModalOpen, setModalTask } = useContext(modalContext);
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
        return sortByID(tasks);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, you can update the component state or perform other actions.
        console.log("User is signed in:", user);

        getRtTaskByUserID(auth.currentUser.uid, setTaskList);
        getRtTaskByAssigneeID(auth.currentUser.uid, setTaskList);

        setLoading(false);
      } else {
        // User is signed out.
        setError(true);
        console.log("User is signed out");
      }
    });

    return () => {
      // Unsubscribe the listener when the component unmounts
      unsubscribe();
    };
  }, []); // Empty dependency array to run the effect only once on component mount // Empty dependency array to run the effect only once on component mount // Empty dependency array to run the effect only once on component mount

  let sortTask = [];

  useEffect(() => {
    sortTask = [...sortTasks(taskList, sortCriteria)];
    setTaskList(sortTask);
  }, [sortCriteria]);

  if (loading) {
    return <LoadingBalls />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  const Team = "Team";

  return (
    <div className="container mx-auto mt-6">
      <h1 className="text-2xl ml-4 font-semibold mb-4">Task Board</h1>

      <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
        <div className="w-full lg:w-1/3 bg-glasses backdrop-blur-12 rounded-xl p-3">
          <h2 className="text-lg font-semibold mb-4">To Do</h2>
          <div className="flex flex-col space-y-2">
            {taskList
              .filter((task) => task.task_category === "To Do")
              .map((task) => (
                <button
                  key={task.id}
                  className="flex justify-center items-center transition duration-300 transform hover:scale-105"
                  onClick={() => {
                    setModalTask(task);
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
                          {task.project ? task.project.project_name : "Team"}
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
        <div className="w-full lg:w-1/3 bg-glasses backdrop-blur-12 rounded-xl p-3">
          <h2 className="text-lg font-semibold mb-4">Working</h2>
          <div className="flex flex-col space-y-2">
            {taskList
              .filter((task) => task.task_category === "Working")
              .map((task) => (
                <button
                  key={task.id}
                  className="flex justify-center items-center transition duration-300 transform hover:scale-105"
                  onClick={() => {
                    setModalTask(task);
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
                          {task.project ? task.project.project_name : "Team"}
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
        <div className="w-full lg:w-1/3 bg-glasses backdrop-blur-12 rounded-xl p-3">
          <h2 className="text-lg font-semibold mb-4">Done</h2>
          <div className="flex flex-col space-y-2">
            {taskList
              .filter((task) => task.task_category === "Done")
              .map((task) => (
                <button
                  key={task.id}
                  className="flex justify-center items-center transition duration-300 transform hover:scale-105"
                  onClick={() => {
                    setModalTask(task);
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
                          {task.project ? task.project.project_name : "Team"}
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
      </div>
    </div>
  );
};

export default TaskBoard;
