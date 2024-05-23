import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaInbox,
  FaClipboardList,
  FaHome,
  FaChartBar,
  FaProjectDiagram,
  FaUser,
  FaUsers,
  FaChartPie,
  FaChartArea,
  FaDoorOpen,
  FaPlus,
} from "react-icons/fa";

import { apiRequest } from "../../api/api";

import { auth } from "../../firebase/config";
import {
  getRtProjectByMemberID,
  getRtProjectByOwnerID,
} from "../../firebase/projectCRUD";
import { getRtTeamsByUserId } from "../../firebase/teamCRUD";
import { set } from "date-fns";

import { useQuery } from "@tanstack/react-query";

function Sidebar({ isOpen, TabNavigate }) {
  const [isOpendrop, setIsOpendrop] = useState(false);
  const [isOpendropInsight, setIsOpendropInsight] = useState(false);
  const [isOpendropProject, setIsOpendropProject] = useState(false);
  const [isOpendropTeam, setIsOpendropTeam] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const NavigateTab = (Tab) => {
    TabNavigate(Tab);
  };

  const NavigateTabwithParam = (Tab, param) => {
    TabNavigate(Tab, param);
  };

  const toggleDropdownInsight = () => {
    setIsOpendropInsight(!isOpendropInsight);
  };

  const toggleDropdownProject = () => {
    setIsOpendropProject(!isOpendropProject);
  };

  const toggleDropdownTeam = () => {
    setIsOpendropTeam(!isOpendropTeam);
  };

  const handleCreateTeam = () => {
    navigate("/teamCreate");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  async function fetchProjects() {
    try {
      const [response1] = await Promise.all([
        apiRequest("get", "api/v1/user-projects"),

      ]);
      console.log("already Fetched projects");
      return [...response1.data];
    } catch (error) {
      throw new Error("Error fetching projects:", error);
    }
  }

  async function fetchOrganizations() {
    try {
      const [response1] = await Promise.all([
        apiRequest("get", "api/v1/user-organizations"),
      ]);
      console.log("already Fetched organizations");
      return [...response1.data];
    } catch (error) {
      throw new Error("Error fetching organizations:", error);
    }
  }

  const {
    data: projectList,
    isLoading: projectLoading,
    error: projectError,
  } = useQuery({
    queryKey: ["project"],
    queryFn: fetchProjects,
  });
  const {
    data: organizationList,
    isLoading: organizationLoading,
    error: organizationError,
  } = useQuery({
    queryKey: ["organization"],
    queryFn: fetchOrganizations,
  });

  // useEffect(() => {
  //   const fetchProject = async () => {
  //     try {
  //       const [ response1, response2 ] = await Promise.all([
  //         apiRequest("get", "api/v1/projects-by-member"),
  //         apiRequest("get", "api/v1/projects-by-owner")
  //       ]);

  //       const projectList = [...response1.data, ...response2.data];
  //       setProjectList(projectList);
  //       setLoading(false);

  //     }catch(error) {
  //       console.error("Error fetching project:", error);
  //     }
  //   }

  //   const fetchOrganizatoin = async () => {
  //     try {
  //       const [ response1, response2 ] = await Promise.all([
  //         apiRequest("get", "api/v1/organizations-by-member"),
  //         apiRequest("get", "api/v1/organizations-by-owner")
  //       ]);

  //       const organizationList = [...response1.data, ...response2.data];
  //       setOrganizationList(organizationList);
  //       setLoading(false);
  //     }catch(error) {
  //       console.error("Error fetching organization:", error);
  //     }
  //   }

  //   fetchProject();
  //   fetchOrganizatoin();

  // }, []);

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 w-28 sm:w-64 h-screen bg-glasses backdrop-blur-12 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ zIndex: 10, marginTop: "42px" }}
      >
        <div class="flex flex-col items-start w-full h-full overflow-hidden text-blue-500 rounded">
          <div class="flex flex-col items-center w-full mt-3  border-gray-300">
            <button
              class="flex items-center w-full h-8 px-3 mt-1 rounded  hover:bg-glasses hover:backdrop-blur-sm transform transition-transform hover:scale-105"
              onClick={() => NavigateTab("HomeTab")}
            >
              <FaHome class="w-3 h-3 stroke-current" />
              <span class="ml-2 text-sm font-medium text-gray-700">Home</span>
            </button>

            <button
              class="flex items-center w-full h-8 px-3 mt-1 rounded  hover:bg-glasses hover:backdrop-blur-sm transform transition-transform hover:scale-105"
              onClick={() => NavigateTab("MyTask")}
            >
              <FaClipboardList class="w-3 h-3 stroke-current" />

              <span class="ml-2 text-sm font-medium text-gray-700">MyTask</span>
            </button>

            <button
              class="flex items-center w-full h-8 px-3 mt-1 hover:bg-glasses hover:backdrop-blur-sm transform transition-transform hover:scale-105 rounded"
              onClick={() => NavigateTab("Inbox")}
            >
              <FaInbox class="w-3 h-3 stroke-current" />

              <span class="ml-2 text-sm font-medium text-gray-700">Inbox</span>
            </button>
          </div>
          <div class="flex flex-col items-center w-full mt-1 border-t border-blue-400">
            <button
              className="flex justify-between items-center w-full h-8 px-3 mt-1 rounded  hover:bg-glasses hover:backdrop-blur-sm transform transition-transform hover:scale-105 focus:outline-none"
              onClick={toggleDropdownInsight}
            >
              <div className="flex items-center">
                <FaChartBar className="w-3 h-3 stroke-current" />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  Insight
                </span>
              </div>
              <svg
                className={`w-3 h-3 stroke-current ${
                  isOpendrop ? "transform rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>{" "}
            </button>
            {isOpendropInsight && (
              <div className="flex flex-col items-center w-full">
                {/* Dropdown content */}
                <button
                  className="flex items-center w-full h-8 px-3 mt-1 rounded hover:bg-glasses hover:backdrop-blur-sm transform transition-transform hover:scale-105"
                  onClick={() => NavigateTab("Dashboard")}
                >
                  <FaChartPie className="w-3 h-3 stroke-current text-blue-900" />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    Dashboard
                  </span>
                </button>
                {/* Add more dropdown items as needed */}
              </div>
            )}
            <button
              className="flex justify-between items-center w-full h-8 px-3 mt-1 rounded  hover:bg-glasses hover:backdrop-blur-sm transform transition-transform hover:scale-105 focus:outline-none"
              onClick={toggleDropdownProject}
            >
              <div className="flex items-center">
                <FaProjectDiagram className="w-3 h-3 stroke-current" />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  Project
                </span>
              </div>
              <svg
                className={`w-3 h-3 stroke-current ${
                  isOpendrop ? "transform rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>{" "}
            </button>
            {isOpendropProject && !projectLoading && (
              <div className="flex flex-col items-center w-full ">
                {/* Dropdown content */}
                {projectList.map((project) => (
                  <button
                    key={project.project_id}
                    className="flex items-center w-full h-8 px-3 mt-1 rounded  hover:bg-glasses hover:backdrop-blur-sm transform transition-transform hover:scale-105"
                    onClick={() => NavigateTabwithParam("Project", project.id)}
                  >
                    <FaProjectDiagram className="w-3 h-3 stroke-current text-blue-900" />
                    <span className="ml-2 text-sm font-medium text-gray-700 whitespace-nowrap">
                      {project.project_name}
                    </span>
                  </button>
                ))}
                {/* Add more dropdown items as needed */}
              </div>
            )}

            <button
              className="flex justify-between items-center w-full h-8 px-3 mt-1 rounded  hover:bg-glasses hover:backdrop-blur-sm transform transition-transform hover:scale-105 focus:outline-none"
              onClick={toggleDropdownTeam}
            >
              <div className="flex items-center">
                <FaUsers className="w-3 h-3 stroke-current" />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  Organization
                </span>
              </div>
              <svg
                className={`w-3 h-3 stroke-current ${
                  isOpendrop ? "transform rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>{" "}
            </button>
            {isOpendropTeam && !organizationLoading && (
              <div className="flex flex-col items-center w-full">
                {/* Dropdown content */}
                {organizationList.map((organization) => (
                  <button
                    key={organization.team_id}
                    className="flex items-center w-full h-8 px-3 mt-1 rounded  hover:bg-glasses hover:backdrop-blur-sm transform transition-transform hover:scale-105"
                    onClick={() =>
                      NavigateTabwithParam("Team", organization.id)
                    }
                  >
                    <FaUsers className="w-3 h-3 stroke-current text-blue-900" />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {organization.name}
                    </span>
                  </button>
                ))}
                <button
                  className="flex items-center w-full h-8 px-3 mt-1 rounded  hover:bg-glasses hover:backdrop-blur-sm transform transition-transform hover:scale-105"
                  onClick={handleCreateTeam}
                >
                  <FaPlus className="w-3 h-3 stroke-current text-blue-900" />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    Create Organization
                  </span>
                </button>
                {/* Add more dropdown items as needed */}
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            class="flex items-center justify-start w-full h-16 mt-auto mb-10 border-t border-blue-400 hover:bg-glasses hover:backdrop-blur-sm transform transition-transform hover:scale-105"
          >
            <FaDoorOpen className="w-6 h-6 stroke-current ml-4" />
            <span class="ml-2 text-sm font-medium text-gray-700">Log Out</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
