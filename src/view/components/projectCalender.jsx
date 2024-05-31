// Calendar.js
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

import { modalContext } from "../part/test";
import { apiRequest } from "../../api/api";
import { useQuery } from "@tanstack/react-query";

const ProjectCalender = () => {
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

  const { tabID, setTabID, openProjectModal, setModalTask } =
    useContext(modalContext);

  const {
    data: taskList,
    isLoading: taskLoading,
    error: taskError,
  } = useQuery({
    queryKey: ["projectCalendar_taskList"],
    queryFn: fetchTasks,
  });

  async function fetchTasks() {
    const response = await apiRequest(
      "get",
      "api/v1/tasks?project_id[eq]=" + tabID
    );
    console.log(response);
    return response.data;
  }

  if (taskError) {
    return <p>Error: {taskError}</p>;
  }

  return (
    <div className="container mx-auto mt-2">
      <div className="flex justify-start items-center mb-4 ml-4 space-x-3">
        <button
          onClick={prevMonth}
          className="flex items-center px-1 py-1 bg-blue-500 bg-opacity-80 text-white rounded"
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={nextMonth}
          className="flex items-center px-1 py-1 bg-blue-500 bg-opacity-80 text-white rounded"
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
            className="text-center text-sm text-gray-500 font-semibold mb-2"
          >
            {day}
          </div>
        ))}
        {getDaysInMonth().map((date) => (
          <div
            key={date}
            className="text-center border-1 border-gray-400 w-42 h-40 w-5/7 sm:w-1/7 overflow-hidden"
          >
            <div className="flex flex-col items-start p-2">
              <span className="text-sm font-semibold">{format(date, "d")}</span>
              {taskLoading
                ? null
                : taskList.map((task) => {
                    console.log(task);
                    let calenderDate = format(date, "MM/dd/yyyy");
                    if (task.due_date === calenderDate) {
                      return (
                        <button
                          key={task.id}
                          className="mt-1"
                          onClick={() => {
                            openProjectModal();
                            setModalTask(task);
                          }}
                        >
                          <span class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm whitespace-nowrap">
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

export default ProjectCalender;
