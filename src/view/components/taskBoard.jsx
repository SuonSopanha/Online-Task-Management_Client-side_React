import React, { useState, useEffect, useContext } from "react";
import { FaUser, FaUsers } from "react-icons/fa";
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
import { apiRequest } from "../../api/api";

// Define mock data
const mockTaskData = [
  {
    id: "1",
    task_name: "Task 1",
    task_category: "To Do",
    project_id: null,
    priority: "High",
    status: "Incomplete",
    due_date: "2024-05-01",
  },
  {
    id: "2",
    task_name: "Task 1",
    task_category: "To Do",
    project_id: null,
    priority: "High",
    status: "Incomplete",
    due_date: "2024-05-01",
  },
  {
    id: "3",
    task_name: "Task 1",
    task_category: "In Progress",
    project_id: null,
    priority: "High",
    status: "Incomplete",
    due_date: "2024-05-01",
  },
  {
    id: "4",
    task_name: "Task 1",
    task_category: "Done",
    project_id: null,
    priority: "High",
    status: "Incomplete",
    due_date: "2024-05-01",
  },
  // Add more mock tasks as needed
];

const TaskBoard = () => {
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [milestoneList, setMilestoneList] = useState([]);

  const { openModal, setModalTask } = useContext(modalContext);
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
        console.log("Name sort");
        return sortByTaskName(tasks);
      // Add more cases for other criteria as needed
      default:
        return sortByID(tasks);
    }
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const milestoneRespone = await apiRequest(
          "get",

          "/api/v1/milestones"
        );
        const milestones = milestoneRespone.data;
        setMilestoneList(milestones);

        setLoading(false);
      };

      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // useEffect(() => {
  //   // Simulating fetching data from Firebase
  //   const fetchTaskData = async () => {
  //     try {
  //       // Apply sorting based on criteria
  //       const sortedTasks = sortTasks(mockTaskData, sortCriteria);
  //       setTaskList(sortedTasks);
  //     } catch (error) {
  //       setError(error);
  //     }
  //   };

  //   fetchTaskData();
  // }, [sortCriteria]);

  useEffect(() => {

    const fetchTask = async () => {
      try {
        const [response1, response2] = await Promise.all([
          apiRequest("get", "api/v1/tasks-by-assignee"),
          apiRequest("get", "api/v1/tasks-by-owner")
        ]);

        const taskList = [...response1.data, ...response2.data];

        setTaskList(taskList);
        setLoading(false);
        console.log(taskList);
      }catch(error) {
        console.error("Error fetching task:", error);
      }
    }
    fetchTask();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-72">
        <LoadingBalls />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const milestone = [
    {
      milestoneName: "To Do",
      tasks: taskList.filter((task) => task.task_category === "To Do"),
    },
    {
      milestoneName: "In Progress",
      tasks: taskList.filter((task) => task.task_category === "In Progress"),
    },
    {
      milestoneName: "Done",
      tasks: taskList.filter((task) => task.task_category === "Done"),
    },
    // Add more milestones if necessary
  ];

  return (
    <div className="container mx-auto mt-6 overflow-x-auto">
      <h1 className="text-2xl ml-4 font-semibold mb-4">Task Board</h1>
      <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
        {milestoneList.map((milestone, index) => (
          <div
            key={index}
            className="w-full lg:w-1/3 bg-glasses backdrop-blur-12 rounded-xl p-3"
          >
            <h2 className="text-lg font-semibold mb-4">
              {milestone.milestone_name}
            </h2>
            <div className="flex flex-col space-y-2">
              {taskList.map((task) => (
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
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
