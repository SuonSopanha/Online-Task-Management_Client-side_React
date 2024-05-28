// src/Modal.js
import React from "react";
import { useState, useEffect, useContext } from "react";

import {
  FaCheckCircle,
  FaClock,
  FaSave,
  FaSortDown,
  FaTimesCircle,
  FaTrash,
  FaTrashRestore,
  FaCalendarAlt,

  FaClipboardList,
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
import MemberDropdown from "./memberDropdown";
import TagInput from "./modalComponents/taskTag";
import Timer from "./modalComponents/timer";
import UserProfilePic from "../../utils/photoGenerator";

import { auth } from "../../firebase/config";
import {
  updateRtTaskByID,
  deleteRtTaskByID,
  createRtTask,
} from "../../firebase/taskCRUD";
import { getprojecByID } from "../../firebase/projectCRUD";
import { getUserByID,getUserFullNameById} from "../../firebase/usersCRUD";

import { modalContext } from "../part/test";

const ProjectModal = ({ isOpen, isClose, taskData,projectStage }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [task, setTask] = useState(taskData ? taskData : {});
  const { tabID } = useContext(modalContext);

  useEffect(() => {
    setTask(taskData);
  }, [taskData]);


  
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
    setTask({ ...task, task_name: newName });
    console.log(task.name);
  };

  const onCompletedChange = (complete) => {
    setTask({ ...task, complete: complete });
  };

  const onAssigneeChange = (newAssignee) => {
    setTask({ ...task, assignee_id: newAssignee });
    console.log(task.assignee_id);
  };

  const onDescriptionChange = (newDescription) => {
    setTask({ ...task, description: newDescription });
    console.log(task.description);
  };

  const onDueDateChange = (newDueDate) => {
    setTask({ ...task, due_date: formatDate(newDueDate) });
    console.log(task.due_date);
  };

  const onProjectChange = (newProject) => {
    setTask({ ...task, project_id: newProject });
    console.log(task.project_id);
  };

  const onHourRequiredChange = (newHourRequired) => {
    setTask({ ...task, work_hour_required: newHourRequired });
    console.log(task.work_hour_required);
  };

  const onCategoryChange = (newCategory) => {
    setTask({ ...task, task_category: newCategory });
    console.log(task.task_category);
  };

  const onChangeStatusAndPrority = (number, state) => {
    if (number === 1) {
      setTask({ ...task, status: state });
      console.log(task.status);
    }
    if (number === 2) {
      setTask({ ...task, priority: state });
      console.log(task.priority);
    }
  };

  const onSaveButton = async () => {
    const assignID = task.assignee_id ? task.assignee_id.assignee_id : null;
    const newFeild = {
      project_id: task.project_id,
      user_id: auth.currentUser.uid,
      task_name: task.task_name,
      description: task.description,
      due_date: task.due_date,
      task_category: task.task_category,
      tracking: task.tracking,
      work_hour_required: task.work_hour_required,
      status: task.status,
      priority: task.priority,
      assignee_id: assignID,
      assignee_dates: formattedDate,
      complete: task.complete,
      complete_date: task.complete_date,
    };
    await updateRtTaskByID(task.id, newFeild);
    handleClose();
  };

  const onDeleteButton = () => {
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
                  IsComplete={task.complete}
                  OnChange={onCompletedChange}
                  className="ml-2"
                />
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-gray-600 text-lg leading-none font-semibold items-center"
                  onClick={handleClose}
                >
                  <FaTimesCircle className="w-6 h-6 hover:text-black" />
                  {console.log(task)}
                </button>
              </div>
              <div className="flex items-center justify-between px-2 py-3 border-b-2 border-solid border-gray-500 rounded-t">
                <TaskName
                  name={task.task_name}
                  onNameChange={handleTaskNameChange}
                />
                {/* <DropdownButton
                  type={"category"}
                  initState={task.task_category}
                  handleChange={onCategoryChange}
                /> */}
                <select
                  className="border-0 text-gray-600 text-lg leading-none rounded-md font-semibold hover:text-black"
                  onChange={(e) => onCategoryChange(e.target.value)}
                >
                  <option value={projectStage[0].stage_name}>
                    {projectStage[0].stage_name}
                  </option>
                  {projectStage.map((stage) => (
                    <option value={stage.stage_name}>
                      {stage.stage_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-row justify-start space-x-5 border-b border-gray-500 p-3 items-center">
                <div className="w-24 font-semibold">Assignee</div>
                
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
              </div>
              <div className="flex flex-row justify-start space-x-5 border-b text-sm sm:text-base border-gray-500 p-3 items-center">
                <FaCalendarAlt size={16} className="-mr-2" />
                <div className="flex items-center w-20 font-semibold">
                  StartDate
                </div>
                <TaskDueDate
                  DueDate={task.start_date}
                  OnChange={onDueDateChange}
                />
                <FaCalendarAlt size={16} className="-mr-4" />
                <div className="flex items-center w-20 font-semibold ">
                  DueDate
                </div>
                <TaskDueDate
                  DueDate={task.due_date}
                  OnChange={onDueDateChange}
                />
              </div>
              <div className="flex flex-row justify-start space-x-5 border-b text-sm sm:text-base border-gray-500 p-3 items-center">
                <div className="flex items-center w-20 font-semibold text-xs">
                  Hour Required
                </div>
                <NumberInput
                  init={task.work_hour_required}
                  OnChange={onHourRequiredChange}
                />
                <div className="flex items-center w-10 font-semibold text-xs">
                  Timer
                </div>
                <Timer />
              </div>
              <div className="flex flex-row justify-start space-x-5  text-sm sm:text-base border-gray-500 p-3 items-center">
                <TaskStatus
                  StatusState={task.status}
                  PrioritySate={task.priority}
                  OnChange={onChangeStatusAndPrority}
                />
              </div>
              <div className="flex flex-row justify-start space-x-5 border-b text-sm sm:text-base border-gray-500 p-3 items-center">
                <div className="flex items-center w-10 font-semibold text-sm">
                  Project
                </div>
                <div className="flex flex-row items-center justify-between space-x-2 border-2 rounded-lg p-2 bg-gray-50">
                  <div className="flex w-6 h-6 items-center justify-center rounded-lg bg-sky-600 text-white">
                    <FaClipboardList className="w-4 h-4" />
                  </div>
                  <span>
                    {task.project_name ? task.project_name : "No Project"}
                  </span>
                </div>

              </div>
              <div className="flex-col justify-start space-y-3 border-b text-sm sm:text-base border-gray-500 p-3 items-start">
                <div className="flex items-center w-24 font-semibold">
                  Description
                </div>
                <EditableBox
                  init={task.description}

                  OnChange={onDescriptionChange}
                  className="w-full"
                ></EditableBox>
              </div>
              <div className="flex items-center justify-end space-x-2 p-6 border-t border-solid border-gray-300 rounded-b">
                <div className="flex flex-row px-2 py-1 justify-center items-center bg-rose-600 rounded-lg">
                  <FaTrash className="w-3 h-3 text-white" />
                  <button
                    className="text-white background-transparent font-bold uppercase px-1 py-1 text-sm outline-none focus:outline-none  ease-linear transition-all duration-150"
                    type="button"
                    onClick={onDeleteButton}
                  >
                    Delete
                  </button>
                </div>
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

export default ProjectModal;
