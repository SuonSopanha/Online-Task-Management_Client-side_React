import React, { useState, useEffect, useContext } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import LoadingBalls from "../../utils/loading";

import { modalContext } from "../part/test";
import { apiRequest } from "../../api/api";
import { useQuery } from "@tanstack/react-query";

const mockTaskList = [
  {
    id: 1,
    task_name: "Task 1",
    due_date: "05/10/2024", // Format: MM/DD/YYYY
  },
  {
    id: 2,
    task_name: "Task 2",
    due_date: "05/15/2024",
  },
  // Add more mock tasks as needed
];

const TaskCalender = () => {
  // const [taskList, setTaskList] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const getDaysInMonth = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  };

  const { openModal, setModalTask } = useContext(modalContext);

  const {
    data: taskList,
    isLoading: taskListLoading,
    error: taskListError,
  } = useQuery({
    queryKey: ["taskCalendar_taskList"],
    queryFn: fetchTask,
  });

  async function fetchTask (){
    const [response1, response2] = await Promise.all([
      apiRequest("get", "api/v1/tasks-by-assignee"),
      apiRequest("get", "api/v1/tasks-by-owner")
    ]);
    
    return [...response1.data, ...response2.data];
  }

  
  // useEffect (() => {

  //   const fetchTask = async () => {
  //     try {

  //       const [ response1, response2 ] = await Promise.all([
  //         apiRequest("get", "api/v1/tasks-by-assignee"),
  //         apiRequest("get", "api/v1/tasks-by-owner")
  //       ]);

  //       const taskList = [...response1.data, ...response2.data];
  //       setTaskList(taskList);
  //       setLoading(false);

  //       console.log(taskList);
  //     }catch(error) {
  //       console.error("Error fetching task:", error);
  //     }
  //   }

  //   fetchTask();
  // }, []);

  if (taskListLoading) {
    return (
      <div className="flex justify-center items-center h-72">
        <LoadingBalls />
      </div>
    );
  }

  if (taskListError) {
    return <p>Error: {taskListError}</p>;
  }

  return (
    <div className="container mx-auto mt-2">
      <div className="flex justify-start items-center mb-4 ml-4 space-x-3">
        <button
          onClick={prevMonth}
          className="flex items-center px-1 py-1 bg-blue-500 bg-opacity-80 text-white rounded hover:bg-blue-700"
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={nextMonth}
          className="flex items-center px-1 py-1 bg-blue-500 bg-opacity-80 text-white rounded hover:bg-blue-700"
        >
          <FaChevronRight />
        </button>
        <h2 className="text-sm font-semibold text-gray-500">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
      </div>
      <div className="grid grid-cols-7">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-sm text-gray-500 font-semibold mb-2 rounded-lg transition duration-300 transform hover:scale-110 hover:bg-blue-300 bg-opacity-20 "
          >
            {day}
          </div>
        ))}
        {getDaysInMonth().map((date) => (
          <div
            key={date}
            className="text-center border-1 border-gray-400 w-42 h-40 w-5/7 sm:w-1/7 overflow-hidden transition duration-300 transform hover:scale-110 hover:bg-gray-50 bg-opacity-20 hover:border hover:border-blue-500 hover:text-blue-500"
          >
            <div className="flex flex-col items-start p-2">
              <span className="text-sm font-semibold">
                {format(date, "d")}
              </span>
              {taskList.map((task) => {
                let calenderDate = format(date, "MM/dd/yyyy");
                if (task.due_date === calenderDate) {
                  return (
                    <button
                      key={task.id}
                      className="mt-1 transform transition-transform hover:scale-105"
                      onClick={() => {
                        openModal();
                        setModalTask(task);
                      }}
                    >
                      <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 hover:bg-red-300 rounded-sm whitespace-nowrap transition duration-300 transform hover:scale-105">
                        {task.task_name}
                      </span>
                    </button>
                  );
                }
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskCalender;
