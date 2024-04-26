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

import { auth } from "../../firebase/config";
import {
  getRtProjectByMemberID,
  getRtProjectByOwnerID,
} from "../../firebase/projectCRUD";
import { getRtTeamsByUserId } from "../../firebase/teamCRUD";

const mockProjectList = [
  { project_id: 1, project_name: "Project 1" },
  { project_id: 2, project_name: "Project 2" },
  { project_id: 3, project_name: "Project 3" },
];

const mockTeamList = [
{
    name: "Sample Team",
    description: "This is a sample team description.",
    milestone: "Sample Milestone",
    members: [
      {
        user_id: "1",
        full_name: "John Doe",
        role: "Developer",
        photoURL: "https://via.placeholder.com/150",
      },
      {
        user_id: "2",
        full_name: "Jane Smith",
        role: "Designer",
        photoURL: "https://via.placeholder.com/150",
      },
      // Add more mock team members as needed
    ],
    projects: [
      {
        project_id: "1",
        project_name: "Sample Project 1",
      },
      {
        project_id: "2",
        project_name: "Sample Project 2",
      },
      // Add more mock projects as needed
    ],
  }
];


function Sidebar({ isOpen, TabNavigate }) {
  const [isOpendrop, setIsOpendrop] = useState(false);
  const [isOpendropInsight, setIsOpendropInsight] = useState(false);
  const [isOpendropProject, setIsOpendropProject] = useState(false);
  const [isOpendropTeam, setIsOpendropTeam] = useState(false);

  const [projectList, setProjectList] = useState(mockProjectList);
  const [teamList, setTeamList] = useState(mockTeamList);
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

  const handleLogout = () =>{
    auth.signOut();
    navigate("/");

  }

  useEffect(() => {
  // Effect: Fetch project and team data based on the current user's ID.
  // getProjectByMemberID,getProjectByOwnnerID
  // getTeamByMemberID,getTeamByOwnerID
  // This hook is triggered when the component mounts.

  // Ideally, this hook would subscribe to changes in the user's authentication status,
  // updating the component state accordingly.

  // In a real-world scenario, the following steps would be executed:
  // 1. Check if the user is authenticated.
  // 2. If the user is authenticated, fetch projects and teams associated with the user.
  // 3. Update the component state with the fetched data.
  // 4. Handle loading and error states accordingly.

  // Cleanup function:
  // Unsubscribe from any ongoing subscriptions to prevent memory leaks
  // and ensure that the effect is only triggered once.
  // when the component unmounts.
  }, []);


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
                  className="flex items-center w-full h-8 px-3 mt-1 rounded  hover:bg-glasses hover:backdrop-blur-sm transform transition-transform hover:scale-105"
                  onClick={() => NavigateTab("Reporting")}
                >
                  <FaChartArea className="w-3 h-3 stroke-current text-blue-900" />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    Reporting
                  </span>
                </button>
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
            {isOpendropProject && (
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
                  Team
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
            {isOpendropTeam && (
              <div className="flex flex-col items-center w-full">
                {/* Dropdown content */}
                {teamList.map((team) => (
                  <button
                    key={team.team_id}
                    className="flex items-center w-full h-8 px-3 mt-1 rounded  hover:bg-glasses hover:backdrop-blur-sm transform transition-transform hover:scale-105"
                    onClick={() => NavigateTabwithParam("Team", team.id)}
                  >
                    <FaUsers className="w-3 h-3 stroke-current text-blue-900" />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {team.name}
                    </span>
                  </button>
                ))}
                <button
                    className="flex items-center w-full h-8 px-3 mt-1 rounded  hover:bg-glasses hover:backdrop-blur-sm transform transition-transform hover:scale-105"
                    onClick={handleCreateTeam}
                  >
                    <FaPlus className="w-3 h-3 stroke-current text-blue-900" />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      Create Team
                    </span>
                  </button>
                {/* Add more dropdown items as needed */}
              </div>
            )}
          </div>
          <button onClick={handleLogout} class="flex items-center justify-start w-full h-16 mt-auto mb-10 border-t border-blue-400 hover:bg-glasses hover:backdrop-blur-sm transform transition-transform hover:scale-105">
            <FaDoorOpen className="w-6 h-6 stroke-current ml-4" />
            <span class="ml-2 text-sm font-medium text-gray-700">Log Out</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
