// src/Modal.js
import React from "react";
import { useState, useEffect } from "react";

import {
  FaCheckCircle,
  FaClock,
  FaSave,
  FaSortDown,
  FaTimesCircle,
  FaTrash,
  FaTrashRestore,
  FaCalendarAlt,
  FaClipboardList
} from "react-icons/fa";

import EditableBox from "./editableBox";
import DropdownButton from "./dropdownState";
import CompleteBox from "./modalComponents/completebox";
import TaskName from "./modalComponents/taskName";
import TaskAssignee from "./modalComponents/taskAssignee";
import TaskDueDate from "./modalComponents/taskDueDate";
import TaskStatus from "./modalComponents/taskStatus";
import TaskProjectbox from "./modalComponents/taskProjectbox";
import NumberInput from "./modalComponents/numberInput";
import Timer from "./modalComponents/timer";
import TagInput from "./modalComponents/taskTag";


import { auth } from "../../firebase/config";
import { updateRtTaskByID, deleteRtTaskByID ,createRtTask} from "../../firebase/taskCRUD";
import { createNotification } from "../../firebase/notification";

const CreateTaskModal = ({ isOpen, isClose, taskData }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [task, setTask] = useState(taskData ? taskData : {});

  let newData = {}


  const timestamp = Date.now();
  const formattedDate = new Date(timestamp).toLocaleDateString("en-KH", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-KH", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
    });
  };

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setIsModalOpen(false);
    isClose();
  };

  const handleTaskNameChange = (newName) => {
    newData.task_name = newName;
    setTask({ ...task, task_name: newName });
    console.log(task.name);
  };

  const onCompletedChange = (complete) => {
    newData.complete = complete;
    setTask({ ...task, complete: complete });
  };

  const onAssigneeChange = (newAssignee) => {
    newData.assignee_id = newAssignee;
    setTask({ ...task, assignee_id: newAssignee });
    console.log(task.assignee_id);
  };

  const onDescriptionChange = (newDescription) => {
    newData.description = newDescription;
    setTask({ ...task, description: newDescription });
    console.log(task.description);
  };

  const onDueDateChange = (newDueDate) => {
    newData.due_date = formatDate(newDueDate);
    setTask({ ...task, due_date: formatDate(newDueDate)});
    console.log(task.due_date);
  };

  const onProjectChange = (newProject) => {
    newData.project_id = newProject;
    setTask({ ...task, project_id: newProject });
    console.log(task.project_id);
  };

  const onHourRequiredChange = (newHourRequired) => {
    newData.work_hour_required = newHourRequired;
    setTask({ ...task, work_hour_required: newHourRequired });
    console.log(task.work_hour_required);
  };

  const onCategoryChange = (newCategory) => {
    newData.task_category = newCategory;
    setTask({ ...task, task_category: newCategory });
    console.log(task.task_category);
  };

  const onChangeStatusAndPrority = (number, state) => {
    if (number === 1) {
      newData.staus = state;
      setTask({ ...task, status: state });
      console.log(task.status);
    }
    if (number === 2) {
      newData.priority = state;
      setTask({ ...task, priority: state });
      console.log(task.priority);
    }
  };

  const currentDate = new Date();

  // Get the current time in 12-hour format with AM/PM
  const currentTime = currentDate.toLocaleTimeString("en-KH", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  // Get the current date in MM/DD/YYYY format
  const currentDateFormatted = currentDate.toLocaleDateString("en-KH", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const onSaveButton = async () => {
    const newFeild =  {
      project_id:task.project_id,
      user_id: auth.currentUser.uid,
      task_name:task.task_name,
      description:task.description,
      due_date:task.due_date,
      task_category:task.task_category,
      tracking:task.tracking,
      work_hour_required:task.work_hour_required,
      status:task.status,
      priority:task.priority,
      assignee_id:task.assignee_id,
      assignee_dates: formattedDate,
      complete:task.complete,
      complete_date:task.complete_date,
    };

    const newNoti = {
      Date: formattedDate,
      time: currentTime,
      user_id: auth.currentUser.uid,
      notification_type: "task assign",
      notification_content: task.task_name + " has been assign",
      source : {
        id: auth.currentUser.uid,
        type: 1
      }

    }
    console.log(task)
    console.log(task);
    await createRtTask(task);
    console.log(newNoti)
    await createNotification(newNoti)
    handleClose();
  };


  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-10 top-12 flex items-center justify-center bg-gray-800 bg-opacity-50 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="w-full sm:w-screen max-h-3xl max-w-2xl mx-auto my-4 mt-48">
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg outline-none focus:outline-none">
              <div className="flex items-center justify-between p-2 border-b-2 border-solid border-gray-500 rounded-t">
                <CompleteBox
                  IsComplete={taskData.complete}
                  OnChange={onCompletedChange}
                  className="ml-2"
                />
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-gray-600 text-lg leading-none font-semibold items-center"
                  onClick={handleClose}
                >
                  <FaTimesCircle className="w-6 h-6 hover:text-black" />
                </button>
              </div>
              <div className="flex items-center justify-between px-2 py-3 border-b-2 border-solid border-gray-500 rounded-t">
                <TaskName
                  name={taskData.task_name}
                  onNameChange={handleTaskNameChange}
                />
                {/* <DropdownButton
                  type={"category"}
                  initState={taskData.task_category}
                  handleChange={onCategoryChange}
                /> */}

                <select
                  className="border-0 text-gray-600 text-lg leading-none rounded-md font-semibold hover:text-black"
                  onChange={(e) => onCategoryChange(e.target.value)}
                >
                  <option value={taskData.milestone[0].milestone_name}>
                    {taskData.milestone[0].milestone_name}
                  </option>
                  {taskData.milestone.map((taskMilestone) => (
                    <option value={taskMilestone.milestone_name}>
                      {taskMilestone.milestone_name}
                    </option>
                  ))}
                </select>


              </div>
              <div className="flex flex-row justify-start space-x-5 border-b text-sm sm:text-base border-gray-500 p-3 items-center">
                <FaCalendarAlt size={16} className="-mr-2" />
                <div className="flex items-center w-20 font-semibold">
                  DueDate
                </div>
                <TaskDueDate
                  DueDate={taskData.due_date}
                  OnChange={onDueDateChange}
                />
                <FaCalendarAlt size={16} className="-mr-4" />
                <div className="flex items-center w-20 font-semibold ">
                  StartDate
                </div>
                <TaskDueDate
                  DueDate={taskData.due_date}
                  OnChange={onDueDateChange}
                />
              </div>
              <div className="flex flex-row justify-start space-x-5 border-b text-sm sm:text-base border-gray-500 p-3 items-center">
                <div className="flex items-center w-20 font-semibold text-xs">
                  Hour Required
                </div>
                <NumberInput
                  init={taskData.work_hour_required}
                  OnChange={onHourRequiredChange}
                />
                <div className="flex items-center w-10 font-semibold text-xs">
                  Timer
                </div>
                <Timer />
              </div>
              <div className="flex flex-row justify-start space-x-5  text-sm sm:text-base border-gray-500 p-3 items-center">
                <TaskStatus
                  StatusState={taskData.status}
                  PrioritySate={taskData.priority}
                  OnChange={onChangeStatusAndPrority}
                />
              </div>
              <div className="flex flex-row justify-start space-x-5 border-b text-sm sm:text-base border-gray-500 p-3 items-center">

              </div>
              <div className="flex-col justify-start space-y-3 border-b text-sm sm:text-base border-gray-500 p-3 items-start">
                <div className="flex items-center w-24 font-semibold">
                  Description
                </div>
                <EditableBox
                  init={taskData.description}
                  OnChange={onDescriptionChange}
                  className="w-full"
                ></EditableBox>
              </div>
              <div className="flex items-center justify-end space-x-2 p-6 border-t border-solid border-gray-300 rounded-b">
                <div className="flex flex-row px-2 py-1 justify-center items-center bg-blue-500 hover:bg-blue-800 rounded-lg">
                  <FaSave className="w-3 h-3 text-white" />
                  <button
                    className="text-white background-transparent font-bold uppercase px-1 py-1 text-sm outline-none focus:outline-none  ease-linear transition-all duration-150"
                    type="button"
                    onClick={onSaveButton}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTaskModal;
