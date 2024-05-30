// src/Modal.js
import React from "react";
import { useState, useEffect } from "react";

import {
  FaCheckCircle,
  FaClipboardList,
  FaClock,
  FaSave,
  FaSortDown,
  FaTimesCircle,
  FaTrash,
  FaTrashRestore,
  FaCalendarAlt,
} from "react-icons/fa";

import { auth } from "../../firebase/config";

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
import MilestoneDropDown from "./mileStoneDropdown";
import TaskSeveritySelector from "./modalComponents/taskSeveritySelector";
import { apiRequest } from "../../api/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { updateRtTaskByID, deleteRtTaskByID } from "../../firebase/taskCRUD";
import { getprojecByID } from "../../firebase/projectCRUD";
import { formatDate } from "date-fns";

const TaskModal = ({ isOpen, isClose, taskData, taskMilestone }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [task, setTask] = useState(taskData ? taskData : {});
  const [assigneeOption, setAssigneeOption] = useState(null);
  const [projectOption, setProjectOption] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState({});

  const queryClient = useQueryClient();

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    setTask(taskData);
  }, [taskData]);

  const handleClose = () => {
    setIsModalOpen(false);
    isClose();
  };

  const handleMilestoneChange = (e) => {
    setSelectedMilestone(e.target.value);
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
    setTask({ ...task, due_date: newDueDate });
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

  const onSeverityChange = (severity) => {
    setTask({ ...task, severity: severity });
    console.log(task.severity);
  };

  const timestamp = Date.now();
  const formattedDate = new Date(timestamp).toLocaleDateString("en-KH", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const updateTaskMutation = useMutation({
    mutationFn: async (updatedTask) => {
      const response = await apiRequest(
        "put",
        `api/v1/tasks/${updatedTask.id}`,
        updatedTask
      );
      if (!response || response.status !== "Request was successful") {
        throw new Error(response.message || "Failed to update task");
      }
      return response.data;
    },
    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries(["taskList_taskList"]);
      await queryClient.cancelQueries(["taskBoard_taskList"]);

      const previousTasksList = queryClient.getQueryData(["taskList_taskList"]);
      const previousTasksBoard = queryClient.getQueryData([
        "taskBoard_taskList",
      ]);

      queryClient.setQueryData(["taskList_taskList"], (old) => {
        if (!old) return [updatedTask];
        return old.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
      });

      queryClient.setQueryData(["taskBoard_taskList"], (old) => {
        if (!old) return [updatedTask];
        return old.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
      });

      return { previousTasksList, previousTasksBoard };
    },
    onError: (err, updatedTask, context) => {
      console.error("Error occurred:", err);
      if (context.previousTasksList) {
        queryClient.setQueryData(
          ["taskList_taskList"],
          context.previousTasksList
        );
      }
      if (context.previousTasksBoard) {
        queryClient.setQueryData(
          ["taskBoard_taskList"],
          context.previousTasksBoard
        );
      }

      const statusCode = err.response?.status;
      if (statusCode === 403) {
        alert("Unauthorized: You don't have permission to update this task");
      } else {
        alert(`Error: ${statusCode || err.message}`);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["taskList_taskList"]);
      queryClient.invalidateQueries(["taskBoard_taskList"]);
    },
  });

  const onSaveButton = async () => {
    setIsSaving(true);
    let complete_date = null;
    if (task.complete === true) {
      complete_date = formattedDate;
    }

    try {
      const milestone_object = taskMilestone.find(
        (milestone) => milestone.milestone_name === selectedMilestone
      );
      const milestone_id = milestone_object ? milestone_object.id : null;
      const updatedTask = {
        ...task,
        milestone_id,
        task_category: milestone_object?.milestone_name,
        complete_date: complete_date,
      };

      console.log("Updated task data:", updatedTask);

      updateTaskMutation.mutate(updatedTask);
      handleClose();
    } catch (error) {
      console.error("An error occurred while updating the task:", error);
      alert(
        "An error occurred while updating the task. Please try again later."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId) => {
      const response = await apiRequest("delete", `api/v1/tasks/${taskId}`);
      if (!response || response.status !== "Request was successful") {
        throw new Error("Failed to delete task");
      }
      return response.data;
    },
    onMutate: async (taskId) => {
      await queryClient.cancelQueries(["projectList_taskList"]);
      await queryClient.cancelQueries(["projectBoard_taskList"]);

      const previousTasksList = queryClient.getQueryData([
        "projectList_taskList",
      ]);
      const previousTasksBoard = queryClient.getQueryData([
        "projectBoard_taskList",
      ]);

      queryClient.setQueryData(["projectList_taskList"], (old) => {
        if (!old) return [];
        return old.filter((task) => task.id !== taskId);
      });

      queryClient.setQueryData(["projectBoard_taskList"], (old) => {
        if (!old) return [];
        return old.filter((task) => task.id !== taskId);
      });

      return { previousTasksList, previousTasksBoard };
    },
    onError: (err, taskId, context) => {
      console.error("Error occurred:", err);
      if (context.previousTasksList) {
        queryClient.setQueryData(
          ["projectList_taskList"],
          context.previousTasksList
        );
      }
      if (context.previousTasksBoard) {
        queryClient.setQueryData(
          ["projectBoard_taskList"],
          context.previousTasksBoard
        );
      }

      if (err.response) {
        const statusCode = err.response.status;
        if (statusCode === 403) {
          alert("Unauthorized: You don't have permission to delete this task");
        } else {
          alert(`Error: ${statusCode}`);
        }
      } else {
        alert("Error: Unable to delete task. Please try again later.");
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["projectList_taskList"]);
      queryClient.invalidateQueries(["projectBoard_taskList"]);
    },
  });

  const onDeleteButton = async () => {
    setIsDeleting(true);

    try {
      deleteTaskMutation.mutate(task.id);
      handleClose();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("An error occurred while deleting the task");
    } finally {
      setIsDeleting(false);
    }
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

                {taskMilestone && (
                  <select
                    className="border-0 text-gray-600 text-sm bg-yellow-50 leading-none rounded-md font-semibold hover:text-black"
                    onChange={handleMilestoneChange}
                  >
                    <option value={null}>
                      {taskData.milestone_id === null
                        ? "no milestone"
                        : taskData.task_category}
                    </option>
                    {taskMilestone.map((taskMilestone) => (
                      <option value={taskMilestone.milestone_name}>
                        {taskMilestone.milestone_name}
                      </option>
                    ))}
                  </select>
                )}
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

                <div className="flex items-center w-14 font-semibold">
                  Severity
                </div>

                <TaskSeveritySelector
                  initValue={task.severity}
                  onChange={onSeverityChange}
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
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
                <div className="flex flex-row px-2 py-1 justify-center items-center bg-blue-500 hover:bg-blue-800 rounded-lg">
                  <FaSave className="w-3 h-3 text-white" />
                  <button
                    className="text-white background-transparent font-bold uppercase px-1 py-1 text-sm outline-none focus:outline-none  ease-linear transition-all duration-150"
                    type="button"
                    onClick={onSaveButton}
                  >
                    {isSaving ? "Save..." : "Save"}
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

export default TaskModal;
