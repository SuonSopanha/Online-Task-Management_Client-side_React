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
import Timer from "./modalComponents/timer";
import TagInput from "./modalComponents/taskTag";
import MemberDropdown from "./memberDropdown";
import ProjectDropdown from "./projectDropdown";
import TaskSeveritySelector from "./modalComponents/taskSeveritySelector";

import { auth } from "../../firebase/config";
import {
  updateRtTaskByID,
  deleteRtTaskByID,
  createRtTask,
} from "../../firebase/taskCRUD";
import { getprojecByID } from "../../firebase/projectCRUD";
import { getUserByID } from "../../firebase/usersCRUD";
import api, { apiRequest } from "../../api/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { modalContext } from "../part/test";
import { createNotification } from "../../firebase/notification";
import context from "react-bootstrap/esm/AccordionContext";

const ProjectCreateTaskModal = ({ isOpen, isClose, taskData }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [task, setTask] = useState(taskData ? taskData : {});
  const [isSaving, setIsSaving] = useState(false);
  const { tabID } = useContext(modalContext);
  const [selectedStage, setSelectedStage] = useState(
    taskData.stage ? taskData.stage[0] : {}
  );
  const [members, setMembers] = useState([]);

  const queryClient = useQueryClient();

  const timestamp = Date.now();
  const formattedDate = new Date(timestamp).toLocaleDateString("en-KH", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-KH", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  let newData = {};

  const handleClose = () => {
    setIsModalOpen(false);
    isClose();
  };

  const handleSelectedStage = (e) => {
    setSelectedStage(e.target.value);
  };

  const handleStartDateChange = (newStartDate) => {
    newData.start_date = formatDate(newStartDate);
    setTask({ ...task, start_date: newStartDate });
    console.log(task.start_date);
  };

  const handleSeverityChange = (newSeverity) => {
    newData.severity = newSeverity;
    setTask({ ...task, severity: newSeverity });
    console.log(task.severity);
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
    setTask({ ...task, due_date: formatDate(newDueDate) });
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

  // const OnSaveButton = async () => {
  //   setIsSaving(true);
  //   const stage_id = parseInt(selectedStage);
  //   const newFeild = {
  //     project_id: tabID,
  //     task_name: task.task_name,
  //     description: task.description,
  //     start_date: task.start_date,
  //     due_date: task.due_date,
  //     task_category: task.task_category,
  //     tracking: task.tracking,
  //     work_hour_required: task.work_hour_required,
  //     status: task.status,
  //     priority: task.priority,
  //     severity: task.severity,
  //     assignee_id: task.assignee_id.user_id,
  //     assignee_dates: formattedDate,
  //     complete: task.complete,
  //     complete_date: task.complete_date,
  //     stage_id: stage_id,
  //     task_category: "random",
  //     complete: false,
  //   };

  //   const { mutate, isloading } = useMutation({
  //     mutationFn: async () => {
  //       const response = await apiRequest("post", "api/v1/tasks", newFeild);
  //       response.data;
  //     },
  //     onMutate: async () => {
  //       await queryClient.cancelQueries(["projectList_taskList"]);
  //       const currentTask = queryClient.getQueriesData([
  //         "projectList_taskList",
  //       ]);

  //       queryClient.setQueryData(["projectList_taskList"], (old) => {
  //         return [...old, newFeild];
  //       });

  //       return { currentTask };
  //     },
  //     onError: (error, variables, context) => {
  //       queryClient.setQueryData(["projectList_taskList"], context.currentTask);
  //     },
  //     onSettled: () => {
  //       queryClient.invalidateQueries(["projectList_taskList"]);
  //     },

  //   });

  //   mutate();

  //   handleClose();
  //   setIsSaving(false);
  // };

  const mutation = useMutation({
    mutationFn: async ({ newTask, name, photo }) => {
      const response = await apiRequest("post", "api/v1/tasks", newTask);
      if (!response || !response.data) {
        throw new Error("Invalid response data");
      }
      return response.data;
    },
    onMutate: async ({ newTask, name, photo }) => {
      await queryClient.cancelQueries(["projectList_taskList"]);
      await queryClient.cancelQueries(["projectBoard_taskList"]);

      const fullNewTask = {
        ...newTask,
        assignee_name: name,
        assignee_photo: photo,
      };
      const previousTasks = queryClient.getQueryData(["projectList_taskList"]);


      queryClient.setQueryData(["projectList_taskList"], (old) => {
        if (!old) {
          return [fullNewTask];
        }
        return [fullNewTask, ...old];
      });

      queryClient.setQueryData(["projectBoard_taskList"], (old) => {
        if (!old) {
          return [fullNewTask];
        }
        return [fullNewTask, ...old];
      });

      return { previousTasks };
    },
    onError: (err, newTask, context) => {
      console.error("Error occurred:", err);
      if (context.previousTasks) {
        queryClient.setQueryData(
          ["projectList_taskList"],
          context.previousTasks
        );
        queryClient.setQueryData(
          ["projectBoard_taskList"],
          context.previousTasks
        );
      }

      alert("Error occurred while creating task");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["projectList_taskList"]);
      queryClient.invalidateQueries(["projectBoard_taskList"]);

      alert("Task created successfully");
    },
  });

  const onSaveButton = async () => {
    setIsSaving(true);
    const stage_id = parseInt(selectedStage);
    const name = task.assignee_id.full_name;
    const photo = task.assignee_id.photo_url;
    const newField = {
      project_id: tabID,
      task_name: task.task_name,
      description: task.description,
      start_date: task.start_date,
      due_date: task.due_date,
      task_category: task.task_category,
      tracking: task.tracking,
      work_hour_required: task.work_hour_required,
      status: task.status,
      priority: task.priority,
      severity: task.severity,
      assignee_id: task.assignee_id.user_id,
      assignee_dates: formattedDate,
      complete: task.complete,
      complete_date: task.complete_date,
      stage_id: stage_id,
      task_category: "random",
      complete: false,
    };

    console.log("New task data:", newField, photo, name);

    try {
      mutation.mutate({ newTask: newField, name, photo });
    } catch (error) {
      console.error("Mutation error:", error);
    } finally {
      handleClose();
      setIsSaving(false);
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-10 top-12 flex items-center justify-center bg-gray-800 bg-opacity-50 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="w-full sm:w-screen max-h-3xl max-w-3xl mx-auto my-6 mt-64">
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg">
              <div className="flex items-center justify-between p-2 border-b border-gray-500">
                <CompleteBox
                  IsComplete={taskData.complete}
                  OnChange={onCompletedChange}
                />
                <button
                  className="p-1 bg-transparent border-0 text-gray-600 text-lg leading-none font-semibold"
                  onClick={handleClose}
                >
                  <FaTimesCircle className="w-6 h-6" />
                </button>
              </div>
              <div className="flex items-center justify-between px-2 py-3 border-b border-gray-500">
                <TaskName
                  name={taskData.task_name}
                  onNameChange={handleTaskNameChange}
                />

                {taskData.stage && (
                  <select
                    className="border-0 text-gray-600 text-lg leading-none rounded-md font-semibold hover:text-black"
                    onChange={handleSelectedStage}
                  >
                    <option value={taskData.stage[0].id}>
                      {taskData.stage[0]?.stage_name}
                    </option>
                    {taskData.stage?.map((stage) => (
                      <option value={stage.id}>{stage.stage_name}</option>
                    ))}
                  </select>
                )}
              </div>

              <div className="flex flex-row justify-start space-x-5 border-b border-gray-500 p-3 items-center">
                <div className="w-20 font-semibold">StartDate</div>
                <TaskDueDate
                  DueDate="04/10/2023"
                  OnChange={handleStartDateChange}
                />
                <div className="w-20 font-semibold">DueDate</div>
                <TaskDueDate DueDate="04/10/2023" OnChange={onDueDateChange} />
              </div>
              <div className="flex flex-row justify-start space-x-5 border-b border-gray-500 p-3 items-center">
                <div className="w-20 font-semibold text-xs">Hour Required</div>
                <NumberInput
                  init={task.work_hour_required}
                  OnChange={onHourRequiredChange}
                />
              </div>
              <div className="flex flex-row justify-start space-x-5 border-b border-gray-500 p-3 items-center">
                <TaskStatus
                  StatusState={task.status}
                  PrioritySate={task.priority}
                  OnChange={onChangeStatusAndPrority}
                />

                <div className="w-16 font-semibold">Severity</div>
                <TaskSeveritySelector
                  initValue={task.severity}
                  onChange={handleSeverityChange}
                />
              </div>
              <div className="flex flex-row justify-start space-x-5 border-b border-gray-500 p-3 items-center">
                <div className="w-24 font-semibold">Assignee</div>
                {taskData.member && (
                  <MemberDropdown
                    members={taskData.member}
                    onChange={onAssigneeChange}
                  />
                )}
              </div>
              <div className="flex flex-col justify-start space-y-3 border-b border-gray-500 p-3 items-start">
                <div className="w-24 font-semibold">Description</div>
                <EditableBox
                  init={task.description}
                  OnChange={onDescriptionChange}
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-end space-x-2 p-6 border-t border-gray-300 rounded-b">
                <div className="flex flex-row px-2 py-1 justify-center items-center bg-blue-500 hover:bg-blue-800 rounded-lg">
                  <FaSave className="w-3 h-3 text-white" />
                  <button
                    className="text-white font-bold uppercase px-1 py-1 text-sm outline-none focus:outline-none"
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

export default ProjectCreateTaskModal;
