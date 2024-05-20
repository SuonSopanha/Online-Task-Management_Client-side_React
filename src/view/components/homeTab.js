import React from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotificationBar from "./notificationBar";
import { FaCheckCircle, FaMinusCircle, FaUser, FaUsers } from "react-icons/fa";
import LoadingBalls from "../../utils/loading";
import UserProfilePic from "../../utils/photoGenerator";
import { modalContext } from "../part/test";

const mockUser = {
  full_name: "John Doe",
  photoURL: null,
};

const mockTasks = [
  {
    id: 1,
    task_name: "Mock Task 1",
    complete: false,
    project_id: null,
    priority: "High",
    due_date: "2024-05-25",
  },
  {
    id: 2,
    task_name: "Mock Task 2",
    complete: true,
    project_id: 1,
    priority: "Medium",
    due_date: "2024-05-26",
    project: {
      project_name: "Mock Project",
    },
  },
];

const mockProjects = [
  {
    project_name: "Mock Project 1",
  },
  {
    project_name: "Mock Project 2",
  },
];

const HomeTab = () => {
  const [user, setUser] = useState(mockUser);
  const [loading, setLoading] = useState(false); // Directly set to false since we're using mock data
  const [taskList, setTaskList] = useState(mockTasks);
  const [projectList, setProjectList] = useState(mockProjects);

  const { openModal, setModalTask, setTab } = useContext(modalContext);
  const navigate = useNavigate();

  const priorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "yellow";
      case "Medium":
        return "green";
      case "Low":
        return "blue";
      case "Very High":
        return "red";
      default:
        return "gray";
    }
  };

  const handleChangeCreateProject = () => {
    navigate("/projectCreate");
  };

  const handleCompleteProfile = () => {
    navigate("/welcome");
  };

  if (loading) {
    return <LoadingBalls />;
  }

  const Team = "Team";
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <NotificationBar type="success" message="Your account has been saved." />
      <NotificationBar type="error" message="Your email address is invalid." />

      <div className="container w-full">
        <div className="mt-8 text-center animate-in duration-300 ease-in-out">
          <p className="font-medium">{new Date().toLocaleDateString()}</p>
          <p className="text-3xl font-medium">Good morning, {user.full_name}</p>
        </div>
        <div className="ml-6 mt-12">
          <p className="text-xl font-medium animate-pulse">
            Steps to get started
          </p>
        </div>

        <div className="ml-6 mr-2 mt-8 mx-auto flex flex-col lg:flex-row lg:space-x-4 ">
          <div className="w-full lg:w-4/12 flex flex-col mt-0 mb-2 lg:mt-0">
            <div className="col-span-2 row-span-2 flex flex-col items-center justify-center rounded-2xl bg-glasses backdrop-blur-12 bg-opacity-50 py-4">
              <button
                onClick={handleChangeCreateProject}
                className="flex w-4/5 items-center rounded-2xl border-2 border-sky-600 bg-blue-100 p-1 transition-transform duration-300 transform hover:scale-105"
              >
                <div className="ml-2 h-4 w-4 rounded-full bg-slate-500"></div>
                <span className="ml-2 text-sm font-medium text-gray-500">
                  Create new project
                </span>
              </button>
              <button
                onClick={handleCompleteProfile}
                className="mt-4 flex w-4/5 items-center rounded-2xl border-2 border-sky-600 bg-blue-100 p-1 transition-transform duration-300 transform hover:scale-105"
              >
                <div className="ml-2 h-4 w-4 rounded-full bg-slate-500"></div>
                <span className="ml-2 text-sm font-medium text-gray-500">
                  Complete your profile
                </span>
              </button>
              <button className="mt-4 flex w-4/5 items-center rounded-2xl border-2 border-sky-600 bg-blue-100 p-1 transition-transform duration-300 transform hover:scale-105">
                <div className="ml-2 h-4 w-4 rounded-full bg-slate-500"></div>
                <span className="ml-2 text-sm font-medium text-gray-500">
                  Continue project
                </span>
              </button>
            </div>
            <div className="col-span-2 mt-10 rounded-lg bg-glasses backdrop-blur-12 bg-opacity-50 pb-4">
              <p className="ml-8 mt-4 text-xl font-medium">Project</p>
              <button
                onClick={handleChangeCreateProject}
                className="ml-12 mt-4 flex items-center transition-transform duration-300 transform hover:scale-105"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-2xl border-2 border-dashed border-sky-500">
                  <img
                    width="40"
                    height="40"
                    src="https://img.icons8.com/ios-filled/50/plus-math.png"
                    alt="plus-math"
                  />
                </div>
                <span className="ml-4 text-sm font-medium">
                  {" "}
                  Create projects{" "}
                </span>
              </button>
              {projectList.map((project, index) => (
                <div
                  key={index}
                  className="ml-12 mt-4 flex items-center transition-transform duration-300 transform hover:scale-105"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-2xl">
                    <img
                      width="96"
                      height="96"
                      src="https://img.icons8.com/fluency/96/personal-video-recorder-menu.png"
                      alt="personal-video-recorder-menu"
                    />
                  </div>
                  <span className="ml-4 text-sm font-medium">
                    {project.project_name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-8/12 flex flex-col bg-glasses backdrop-blur-12 bg-opacity-50 rounded-lg">
            <div className="flex flex-row justify-start border-b border-gray-500">
              <div className="flex items-center p-3 ml-1">
                {user.photoURL === null ? (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full">
                    <UserProfilePic
                      name={user.full_name}
                      size={8}
                    ></UserProfilePic>
                  </div>
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full">
                    <img
                      src={user.photoURL}
                      alt="profile-pic"
                      className="rounded-full"
                    />
                  </div>
                )}
              </div>
              <div className="text-sm font-medium text-gray-500 flex flex-col justify-between">
                <div>
                  <h1 className="text-lg font-semibold text-gray-500 pt-3 pb-1 px-1">
                    My Task
                  </h1>
                  <div>
                    <ul className="flex flex-wrap -mb-px">
                      <li className="me-2">
                        <a
                          href="#"
                          className="inline-block px-3 py-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                        >
                          Upcoming
                        </a>
                      </li>
                      <li className="me-2">
                        <a
                          href="#"
                          className="inline-block px-3 py-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                        >
                          Overdue
                        </a>
                      </li>
                      <li className="me-2">
                        <a
                          href="#"
                          className="inline-block px-3 py-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                        >
                          Complete
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <section className="container mx-auto px-6 pb-2 font-mono">
              <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                <div className="w-full overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-md font-semibold tracking-wide text-left text-gray-900 uppercase border-b bg- border-gray-600">
                        <th className="px-4 py-3">Task Name</th>
                        <th className="px-4 py-3 w-1/6">Visibility</th>
                        <th className="px-4 py-3 w-1/6">Priority</th>
                        <th className="px-4 py-3 w-1/4">Due Date</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {taskList.map((task) => (
                        <tr key={task.id} className="text-gray-700">
                          <td className="px-4 py-2 border">
                            <button
                              onClick={() => {
                                openModal();
                                setModalTask(task);
                              }}
                            >
                              <div className="flex justify-center items-center text-sm">
                                {task.complete ? (
                                  <FaCheckCircle className="text-emerald-500 mr-2" />
                                ) : (
                                  <FaMinusCircle className=" text-violet-600 mr-2" />
                                )}

                                <div className="flex flex-col justify-center items-center">
                                  <p className="font-semibold text-black whitespace-nowrap transform transition-transform hover:scale-105">
                                    {task.task_name}
                                  </p>
                                </div>
                              </div>
                            </button>
                          </td>

                          <td className="px-4 py-2 text-ms font-semibold border">
                            <div className="flex items-center text-sm">
                              <div className="flex items-center relative w-4 h-4 mr-3 rounded-full md:block">
                                {task.project_id !== null ? (
                                  <FaUsers />
                                ) : (
                                  <FaUser />
                                )}
                                <div
                                  className="absolute inset-0 rounded-full shadow-inner"
                                  aria-hidden="true"
                                ></div>
                              </div>
                              {task.project_id !== null ? (
                                <span className="text-x whitespace-nowrap">
                                  {task.project
                                    ? task.project.project_name
                                    : Team}
                                </span>
                              ) : (
                                <span className="text-xs">Only Me</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-2 text-xs border">
                            <span
                              className={`px-2 py-1 whitespace-nowrap font-semibold leading-tight text-${priorityColor(
                                task.priority
                              )}-700 rounded-sm bg-${priorityColor(
                                task.priority
                              )}-100`}
                            >
                              {task.priority}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-sm border">
                            {task.due_date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <div className="w-full flex items-center justify-center -mt-6 mb-4">
              <button
                className="transition-transform duration-300 transform hover:scale-105 hover:text-blue-500"
                onClick={() => {
                  setTab("MyTask");
                }}
              >
                See More...
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTab;
